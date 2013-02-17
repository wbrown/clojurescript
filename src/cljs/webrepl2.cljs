(ns webrepl
  (:require [cljs.repl :as repl]))

(defn start-prompt []
  (let [prompt-label (str "\n" (repl/prompt))
        continue-label (str (apply str (repeat (- (count prompt-label) 5) " "))
                            "... ")]
    (.SetPromptLabel js/jqconsole prompt-label continue-label)
    (.Prompt js/jqconsole "true"
             (fn [input]
               (repl/eval-print input)
               (start-prompt))
             #(if (repl/complete-form? %)
                false
                0))))

(.ready (js/jQuery js/document)
  (fn []
    (repl/init)
    
    ;; setup the REPL console
    (set! js/jqconsole
          (.jqconsole (js/jQuery "#console")
                      "ClojureScript-in-ClojureScript Web REPL"
                      "\n>>> "
                      ""))
    (.SetIndentWidth js/jqconsole 1)

    ;; Setup the print function
    (set! *out* #(.Write js/jqconsole %))
    (set! *rtn* #(.Write js/jqconsole % "jqconsole-output"))
    (set! *err* #(.Write js/jqconsole % "jqconsole-message-error"))
    (set! *print-fn* #(*out* %1))

    (start-prompt)

    ;; print,evaluate,print some example forms
    ;(pep "(+ 1 2)")
    ;(pep "(let [sqr #(* % %)] (sqr 8))")
    ;(pep "(defmacro unless [pred a b] `(if (not ~pred) ~a ~b))")
    ;(pep "(unless false :yep :nope)")
    ))


