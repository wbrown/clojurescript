goog.provide('cljs.io');
goog.require('cljs.core');
cljs.io.is_node_QMARK_ = (cljs.core.truth_((function (){try{return require;
}catch (e4495){if(cljs.core.instance_QMARK_.call(null,Error,e4495))
{var e = e4495;
return null;
} else
{if("\uFDD0'else")
{throw e4495;
} else
{return null;
}
}
}})())?true:false);
cljs.io.node_fs = (cljs.core.truth_(cljs.io.is_node_QMARK_)?require("fs"):null);
cljs.io.node_path = (cljs.core.truth_(cljs.io.is_node_QMARK_)?require("path"):null);
cljs.io.file_read = (function file_read(path){
if(cljs.core.truth_(cljs.io.is_node_QMARK_))
{return cljs.io.node_fs.readFileSync(path).toString();
} else
{var req = (function (){var G__4497 = (new XMLHttpRequest());
G__4497.open("GET",path,false);
return G__4497;
})();
req.send();
if(cljs.core._EQ_.call(null,200,req.status))
{return req.responseText;
} else
{throw (new Error([cljs.core.str("Could not file-read: "),cljs.core.str(path)].join('')));
}
}
});
cljs.io.file_write = (function file_write(path,data){
if(cljs.core.truth_(cljs.io.is_node_QMARK_))
{return cljs.io.node_fs.writeFileSync(path,data);
} else
{throw (new Error("No file-write capability defined for this JS environment"));
}
});

// Analyzer namespace snapshot:
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.assoc,(new cljs.core.Symbol(null,"cljs.io")),cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map((new cljs.core.Symbol(null,"file-write")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"path")),(new cljs.core.Symbol(null,"data"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"path")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"data")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.io/file-write")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",18,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/io.cljs"),(new cljs.core.Symbol(null,"file-read")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"path"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"path")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.io/file-read")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",7,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/io.cljs"),(new cljs.core.Symbol(null,"node-path")),cljs.core.hash_map("\uFDD0'line",5,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/io.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.io/node-path"))),(new cljs.core.Symbol(null,"node-fs")),cljs.core.hash_map("\uFDD0'line",4,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/io.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.io/node-fs"))),(new cljs.core.Symbol(null,"is-node?")),cljs.core.hash_map("\uFDD0'line",3,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/io.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.io/is-node?")))),"\uFDD0'imports",null,"\uFDD0'uses-macros",null,"\uFDD0'requires",null,"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set([]),"\uFDD0'doc",null,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.io"))));
