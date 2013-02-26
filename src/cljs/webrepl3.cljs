(ns webrepl
  (:require [cljs.repl :as repl]
            [webconsole :as webconsole]
            [webedit :as webedit]))

(defn evaluate-file
  "Evaluates the editor's file in the REPL console."
  [editor console]
  (let [text (.getValue editor)
        prompt-text (webconsole/cancel-input console "Evaluating file...\n")]
    (repl/eval-print text)
    (webedit/store-item "scratch" text)
    (webconsole/start-prompt console prompt-text)))
    
(defn start-app []
  (let [editor (webedit/editor)
        console (webconsole/console "#console")]
    (webconsole/register-shortcuts console
      {"E" #(this-as this-console
              (evaluate-file editor this-console))})
    (webedit/register-shortcuts editor
      {"E" #(evaluate-file % console)})))
    
(.ready (js/jQuery js/document) start-app)


