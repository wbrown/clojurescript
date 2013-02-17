(ns cljs.repl
  (:require [cljs.analyzer :as ana]
            [cljs.compiler :as comp]
            [cljs.reader :as reader]))

(def ^:dynamic *debug* false)
(def ^:dynamic *e nil)

(defn prompt [] (str *ns-sym* "=> "))

(defn read-forms [text]
  ;; Save and restore *ns-sym*
  (binding [*ns-sym* *ns-sym*]
    (reader/read-string (str "(do " text ")"))))

(defn eval-print [text]
  (try
    (let [env (assoc (ana/empty-env) :context :expr)
          forms (read-forms text)
          _ (when *debug* (println "READ:" (pr-str forms)))
          body (ana/analyze env forms)
          _ (when *debug* (println "ANALYZED:" (pr-str (:form body))))
          res (comp/emit-str body)
          _ (when *debug* (println "EMITTED:" (pr-str res)))
          value (js/eval res)]
      (set! *3 *2)
      (set! *2 *1)
      (set! *1 value)
      (binding [*out* *rtn*] (print (pr-str value))
      {:value value :js res}))
    (catch js/Error e
      (set! *e e)
      (binding [*out* *err*] (print  (.-stack e)))
      {:error (.-stack e)})))

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
   
