(ns nodecljs
  (:require [cljs.repl :as repl]))

(defn -main [file & args]
  (repl/init)

  ;; Setup the print function
  (set! *out* #(.write (.-stdout js/process) %))
  (set! *rtn* identity)
  (set! *err* #(.write (.-stderr js/process) %))
  (set! *print-fn* #(*out* %1))

  ;(set! repl/*debug* true)
  (let [fs (js/require "fs")
        text (.toString (.readFileSync fs file))
        res (repl/eval-print text)
        ret (:value res)]
    (.exit js/process (if (number? ret) ret 0))))

(set! *main-cli-fn* -main)

