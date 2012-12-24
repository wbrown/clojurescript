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
{var vec__3091 = o;
var tag = cljs.core.nth.call(null,vec__3091,0,null);
var attrs = cljs.core.nth.call(null,vec__3091,1,null);
var body = cljs.core.nthnext.call(null,vec__3091,2);
if(cljs.core.keyword_QMARK_.call(null,tag))
{var elem = document.createElement(cljs.core.name.call(null,tag));
if(cljs.core.map_QMARK_.call(null,attrs))
{var G__3092_3094 = cljs.core.seq.call(null,attrs);
while(true){
if(G__3092_3094)
{var vec__3093_3095 = cljs.core.first.call(null,G__3092_3094);
var k_3096 = cljs.core.nth.call(null,vec__3093_3095,0,null);
var v_3097 = cljs.core.nth.call(null,vec__3093_3095,1,null);
if(cljs.core.truth_(v_3097))
{elem.setAttribute(cljs.core.name.call(null,k_3096),v_3097);
} else
{}
{
var G__3098 = cljs.core.next.call(null,G__3092_3094);
G__3092_3094 = G__3098;
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
var G__3100_3101 = cljs.core.seq.call(null,webrepl.dom.call(null,v));
while(true){
if(G__3100_3101)
{var i_3102 = cljs.core.first.call(null,G__3100_3101);
parent.appendChild(i_3102);
{
var G__3103 = cljs.core.next.call(null,G__3100_3101);
G__3100_3101 = G__3103;
continue;
}
} else
{}
break;
}
return parent;
});
webrepl.repl_print = (function repl_print(log,text,cls){
var G__3105_3106 = cljs.core.seq.call(null,[cljs.core.str(text)].join('').split(/\n/));
while(true){
if(G__3105_3106)
{var line_3107 = cljs.core.first.call(null,G__3105_3106);
webrepl.append_dom.call(null,log,cljs.core.PersistentVector.fromArray(["\uFDD0'div",cljs.core.ObjMap.fromObject(["\uFDD0'class"],{"\uFDD0'class":[cljs.core.str("cg "),cljs.core.str((cljs.core.truth_(cls)?[cljs.core.str(" "),cljs.core.str(cls)].join(''):null))].join('')}),line_3107], true));
{
var G__3108 = cljs.core.next.call(null,G__3105_3106);
G__3105_3106 = G__3108;
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
}catch (e3110){if(cljs.core.instance_QMARK_.call(null,Error,e3110))
{var e = e3110;
webrepl.repl_print.call(null,log,e.stack,"err");
return webrepl._STAR_e = e;
} else
{if("\uFDD0'else")
{throw e3110;
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
cljs.core._STAR_print_fn_STAR_ = (function (p1__3111_SHARP_){
return webrepl.repl_print.call(null,log,p1__3111_SHARP_,null);
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
}catch (e3112){if(cljs.core.instance_QMARK_.call(null,Error,e3112))
{var e = e3112;
if(cljs.core._EQ_.call(null,e.message,"EOF while reading"))
{return status.src = "dots.png";
} else
{return webrepl.repl_print.call(null,log,e,"err");
}
} else
{if("\uFDD0'else")
{throw e3112;
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
webrepl.pep.call(null,log,"(+ 1 2)");
webrepl.pep.call(null,log,"(def sqr (fn* [x] (* x x)))");
webrepl.pep.call(null,log,"(sqr 8)");
webrepl.pep.call(null,log,"(defmacro unless [pred a b] `(if (not ~pred) ~a ~b))");
webrepl.pep.call(null,log,"(unless false :yep :nope)");
return input.focus();
});
