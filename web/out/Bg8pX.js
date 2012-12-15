goog.provide('webrepl');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('cljs.compiler');
goog.require('cljs.analyzer');
goog.require('cljs.core');
webrepl._STAR_debug_STAR_ = false;
webrepl._STAR_e = null;
webrepl.prompt = (function prompt(){
return [cljs.core.str(cljs.analyzer._STAR_cljs_ns_STAR_),cljs.core.str("=> ")].join('');
});
webrepl.dom = (function dom(o){
if(cljs.core.coll_QMARK_.call(null,o))
{var vec__2985 = o;
var tag = cljs.core.nth.call(null,vec__2985,0,null);
var attrs = cljs.core.nth.call(null,vec__2985,1,null);
var body = cljs.core.nthnext.call(null,vec__2985,2);
if(cljs.core.keyword_QMARK_.call(null,tag))
{var elem = document.createElement(cljs.core.name.call(null,tag));
if(cljs.core.map_QMARK_.call(null,attrs))
{var G__2986_2988 = cljs.core.seq.call(null,attrs);
while(true){
if(G__2986_2988)
{var vec__2987_2989 = cljs.core.first.call(null,G__2986_2988);
var k_2990 = cljs.core.nth.call(null,vec__2987_2989,0,null);
var v_2991 = cljs.core.nth.call(null,vec__2987_2989,1,null);
if(cljs.core.truth_(v_2991))
{elem.setAttribute(cljs.core.name.call(null,k_2990),v_2991);
} else
{}
{
var G__2992 = cljs.core.next.call(null,G__2986_2988);
G__2986_2988 = G__2992;
continue;
}
} else
{}
break;
}
} else
{}
return cljs.core.PersistentVector.fromArray([webrepl.append_dom.call(null,elem,((cljs.core.map_QMARK_.call(null,attrs))?body:cljs.core.cons.call(null,attrs,body)))], true);
} else
{return cljs.core.mapcat.call(null,dom,o);
}
} else
{if(cljs.core.truth_(o))
{return cljs.core.PersistentVector.fromArray([document.createTextNode([cljs.core.str(o)].join(''))], true);
} else
{return null;
}
}
});
webrepl.append_dom = (function append_dom(parent,v){
var G__2994_2995 = cljs.core.seq.call(null,webrepl.dom.call(null,v));
while(true){
if(G__2994_2995)
{var i_2996 = cljs.core.first.call(null,G__2994_2995);
parent.appendChild(i_2996);
{
var G__2997 = cljs.core.next.call(null,G__2994_2995);
G__2994_2995 = G__2997;
continue;
}
} else
{}
break;
}
return parent;
});
webrepl.repl_print = (function repl_print(log,text,cls){
var G__2999_3000 = cljs.core.seq.call(null,[cljs.core.str(text)].join('').split(/\n/));
while(true){
if(G__2999_3000)
{var line_3001 = cljs.core.first.call(null,G__2999_3000);
webrepl.append_dom.call(null,log,cljs.core.PersistentVector.fromArray(["\uFDD0'div",cljs.core.ObjMap.fromObject(["\uFDD0'class"],{"\uFDD0'class":[cljs.core.str("cg "),cljs.core.str((cljs.core.truth_(cls)?[cljs.core.str(" "),cljs.core.str(cls)].join(''):null))].join('')}),line_3001], true));
{
var G__3002 = cljs.core.next.call(null,G__2999_3000);
G__2999_3000 = G__3002;
continue;
}
} else
{}
break;
}
return log.scrollTop = log.scrollHeight;
});
webrepl.postexpr = (function postexpr(log,text){
return webrepl.append_dom.call(null,log,cljs.core.PersistentVector.fromArray(["\uFDD0'table",cljs.core.PersistentVector.fromArray(["\uFDD0'tbody",cljs.core.PersistentVector.fromArray(["\uFDD0'tr",cljs.core.PersistentVector.fromArray(["\uFDD0'td",cljs.core.ObjMap.fromObject(["\uFDD0'class"],{"\uFDD0'class":"cg"}),webrepl.prompt.call(null)], true),cljs.core.PersistentVector.fromArray(["\uFDD0'td",text.replace(/\n$/,"")], true)], true)], true)], true));
});
webrepl.ep = (function ep(log,text){
try{var res = cljs.compiler.emit_str.call(null,cljs.analyzer.analyze.call(null,env,cljs.reader.read_string.call(null,text)));
if(cljs.core.truth_(webrepl._STAR_debug_STAR_))
{cljs.core.println.call(null,"emit:",res);
} else
{}
return webrepl.repl_print.call(null,log,cljs.core.pr_str.call(null,eval(res)),"rtn");
}catch (e3004){if(cljs.core.instance_QMARK_.call(null,Error,e3004))
{var e = e3004;
webrepl.repl_print.call(null,log,e.stack,"err");
return webrepl._STAR_e = e;
} else
{if("\uFDD0'else")
{throw e3004;
} else
{return null;
}
}
}});
webrepl.pep = (function pep(log,text){
webrepl.postexpr.call(null,log,text);
return webrepl.ep.call(null,log,text);
});
window.onload = (function (){
var log = document.getElementById("log");
var input = document.getElementById("input");
var status = document.getElementById("status");
cljs.core._STAR_print_fn_STAR_ = (function (p1__3005_SHARP_){
return webrepl.repl_print.call(null,log,p1__3005_SHARP_,null);
});
input.onkeypress = (function (ev){
if(((function (){var or__3824__auto__ = ev;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return webrepl.event;
}
})().keyCode === 13))
{try{var form = cljs.reader.read_string.call(null,input.value);
webrepl.pep.call(null,log,input.value);
setTimeout((function (){
return input.value = "";
}),0);
return status.src = "blank.gif";
}catch (e3006){if(cljs.core.instance_QMARK_.call(null,Error,e3006))
{var e = e3006;
if(cljs.core._EQ_.call(null,e.message,"EOF while reading"))
{return status.src = "dots.png";
} else
{return webrepl.repl_print.call(null,log,e,"err");
}
} else
{if("\uFDD0'else")
{throw e3006;
} else
{return null;
}
}
}} else
{return null;
}
});
cljs.core.println.call(null,";; ClojureScript");
webrepl.append_dom.call(null,log,cljs.core.PersistentVector.fromArray(["\uFDD0'div",cljs.core.ObjMap.fromObject(["\uFDD0'class"],{"\uFDD0'class":"cg"}),";;   - ",cljs.core.PersistentVector.fromArray(["\uFDD0'a",cljs.core.ObjMap.fromObject(["\uFDD0'href"],{"\uFDD0'href":"http://github.com/kanaka/clojurescript"}),"http://github.com/kanaka/clojurescript"], true)], true));
cljs.core.println.call(null,";;   - A port of the ClojureScript compiler to ClojureScript");
cljs.core.println.call(null,";;   - No predefined macros (yet), but defmacro works.");
webrepl.pep.call(null,log,"(+ 1 2)");
webrepl.pep.call(null,log,"(def sqr (fn* [x] (* x x)))");
webrepl.pep.call(null,log,"(sqr 8)");
webrepl.pep.call(null,log,"(defmacro unless [pred a b] `(if (not ~pred) ~a ~b))");
webrepl.pep.call(null,log,"(unless false :yep :nope)");
return input.focus();
});
