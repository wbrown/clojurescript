(ns cljs.repl
  (:require [cljs.analyzer :as ana]
            [cljs.compiler :as comp]
            [cljs.reader :as reader]))

(def ^:dynamic *debug* false)

(defn prompt [] (str *ns-sym* "=> "))

(defn evaluate-next-form
  "Evaluates next clojure form in reader. Returns a map, containing
   either resulting value and emitted javascript, or an error
   object, or {:finished true}."
  [rdr]
  (try
    (let [form (reader/read rdr false ::finished-reading)
          _ (when *debug* (println "READ:" (pr-str form)))]
      (if (= form ::finished-reading)
        {:finished true}
        (let [env (assoc (ana/empty-env) :context :expr)
              body (ana/analyze env form)
              _ (when *debug* (println "ANALYZED:" (pr-str (:form body))))
              res (comp/emit-str body)
              _ (when *debug* (println "EMITTED:" (pr-str res)))
              value (js/eval res)]
          {:value value :js res})))
    (catch js/Error e
      {:error e :line-number (reader/get-line-number rdr)})))

(defn evaluate-code
  "Evaluates some text from REPL input. If multiple forms are
   present, evaluates in sequence until one throws an error
   or the last form is reached. The result from the last
   evaluated form is returned. *1, *2, *3, and *e are updated
   appropriately." 
  [text]
  (let [rdr (reader/indexing-push-back-reader text)]
    (loop [last-output nil]
      (let [output (evaluate-next-form rdr)]
        (if-not (:finished output)
          (if-let [err (:error output)]
            (do (set! cljs.core/*e err)
                output)
            (recur output))
          (do (set! *3 *2)
              (set! *2 *1)
              (set! *1 (:value last-output))
              last-output))))))
      
(defn print-error [{:keys [error line-number]}]
  (print error "at line" line-number))

(defn eval-print [input]
  (let [evaluated (evaluate-code input)]
    (if (:error evaluated)
      (binding [*out* *err*] (print-error evaluated))
      (try
        (binding [*out* *rtn*] (pr (:value evaluated)))
        (catch js/Error e
          (binding [*out* *err*] (println err)))))))
    
(defn complete-form? [text]
  (try
    (reader/read-string text)
    true
    (catch js/Error e
      (not (re-find #"EOF while reading" (.-message e))))))
  
(defn init []
  ;; Bootstrap an empty version of the cljs.user namespace
  (swap! comp/*emitted-provides* conj (symbol "cljs.user"))
  (.provide js/goog "cljs.user")
  (set! cljs.core/*ns-sym* (symbol "cljs.user")))
   
