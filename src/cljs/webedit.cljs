(ns webedit
  (:require [cljs.repl :as repl]))


;; file storage

(defn store-item
  "Writes text at key in localStorage."
  [key text]
  (-> js/window .-localStorage (.setItem key text)))

(defn load-item
  "Reads text at key in localStorage."
  [key]
  (-> js/window .-localStorage (.getItem key)))

;; editor keys

(defn- map->js [m]
  (let [out (js-obj)]
    (doseq [[k v] m]
      (aset out (name k) v))
    out))

(defn str-contains? [s x]
  (not= (.indexOf s x) -1))

(defn mac? []
  (str-contains? (str (.-platform js/navigator)) "Mac"))

(def command-prefix (if (mac?) "Cmd" "Ctrl"))

(defn register-shortcuts [editor key-map]
  (let [js-key-map
        (->> (for [[k callback] key-map]
               [(str command-prefix "-" k) callback])
             (into {})
             map->js)]
    (.addKeyMap editor js-key-map)))

;; show/hide editor
  
(def editor-visible (atom false))

(def editor-visible-key "__editor_visible")

(defn update-editor-visibility [show?]
  (let [container (js/$ "#editor-container")]
    (if show?
      (.slideDown container 100)
      (.slideUp container 100))))

(defn store-editor-visibility [show?]
  (store-item editor-visible-key (str show?)))

(defn update-link [show?]
  (.html (js/$ "#toggle-editor")
         (str (if show? "Hide" "Show")
              " file editor")))

(defn add-updating-watch [reference fun]
  (add-watch reference fun (fn [_ _ _ value] (fun value))))

(defn setup-editor-toggling []
  (add-updating-watch editor-visible update-editor-visibility)
  (add-updating-watch editor-visible store-editor-visibility)
  (add-updating-watch editor-visible update-link)
  (.click (js/$ "#toggle-editor") #(swap! editor-visible not))
  (reset! editor-visible (= "true" (load-item editor-visible-key))))
  
;; main editor function
  
(defn editor []
  (let [eval-cmd (str command-prefix "-E")]
    (setup-editor-toggling)
    (.html (js/$ "#tiny-note")
           (str "Press " eval-cmd
                " to evaluate file in REPL."))
    (doto
      (.fromTextArea js/CodeMirror
                     (.getElementById js/document "editor")
                     (map->js {:mode "clojure"
                               :lineNumbers true
                               :matchBrackets true}))
      (.setValue (or (load-item "scratch")
                     ";; Develop your clojurescript program here")))))
