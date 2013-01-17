goog.addDependency("base.js", ['goog'], []);
goog.addDependency("../cljs/core.js", ['cljs.core'], ['goog.array', 'goog.object', 'goog.string.format', 'goog.string.StringBuffer', 'goog.string']);
goog.addDependency("../clojure/string.js", ['clojure.string'], ['cljs.core', 'goog.string.StringBuffer', 'goog.string']);
goog.addDependency("../cljs/io.js", ['cljs.io', 'cljs.io.File'], ['cljs.core']);
goog.addDependency("../cljs/analyzer.js", ['cljs.analyzer'], ['cljs.core', 'clojure.string']);
goog.addDependency("../cljs/reader.js", ['cljs.reader', 'cljs.reader.StringPushbackReader'], ['cljs.core', 'cljs.analyzer', 'goog.string']);
goog.addDependency("../cljs/compiler.js", ['cljs.compiler'], ['cljs.core', 'cljs.reader', 'cljs.analyzer', 'clojure.string', 'cljs.io']);
goog.addDependency("../5fKWm.js", ['webrepl', 'cljs.user'], ['cljs.core', 'cljs.reader', 'cljs.compiler', 'cljs.analyzer', 'clojure.string', 'cljs.core']);
