(ns noderepl
  (:require [cljs.repl :as repl]))

(defn pep [text]
  (println (str (repl/prompt) text))
  (repl/eval-print text)
  (println))

(defn -main [& args]
  (repl/init)

  ;; Setup the print function
  (set! *out* #(.write (.-stdout js/process) %))
  (set! *rtn* #(.write (.-stdout js/process) %))
  (set! *err* #(.write (.-stderr js/process) %))
  (set! *print-fn* #(*out* %))

  (println ";; ClojureScript")
  (println ";;   - http://github.com/kanaka/clojurescript")
  (println ";;   - A port of the ClojureScript compiler to ClojureScript")
  (pep "(+ 1 2)")
  (pep "(defn sqr [x] (* x x))")
  (pep "(sqr 8)")
  (pep "(defmacro unless [pred a b] `(if (not ~pred) ~a ~b))")
  (pep "(unless false :yep :nope)")

  (let [readline (js/require "readline")
        rl (.createInterface readline js/process.stdin js/process.stdout)]
    (.setPrompt rl (repl/prompt))
    (.prompt rl)
    (.on rl "line" (fn [line]
                     (when (seq (filter #(not= " " %) line))
                       (repl/eval-print line)
                       (println))
                     (.setPrompt rl (repl/prompt))
                     (.prompt rl)))
    (.on rl "close" (fn [] (.exit js/process 0)))))

(set! *main-cli-fn* -main)

