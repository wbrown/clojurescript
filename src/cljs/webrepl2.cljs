(ns webrepl
  (:require webconsole))

(.ready (js/jQuery js/document)
  (fn []
    (webconsole/console "#console" {})
    ;; print,evaluate,print some example forms
    ;(pep "(+ 1 2)")
    ;(pep "(let [sqr #(* % %)] (sqr 8))")
    ;(pep "(defmacro unless [pred a b] `(if (not ~pred) ~a ~b))")
    ;(pep "(unless false :yep :nope)")
    ))


