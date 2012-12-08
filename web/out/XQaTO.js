goog.provide('webrepl');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('cljs.compiler');
goog.require('cljs.analyzer');
goog.require('cljs.core');
webrepl.prompt = (function prompt(){
return [cljs.core.str(cljs.analyzer._STAR_cljs_ns_STAR_),cljs.core.str("=> ")].join('');
});
webrepl.dom = (function dom(o){
if(cljs.core.coll_QMARK_.call(null,o))
{var vec__2848 = o;
var tag = cljs.core.nth.call(null,vec__2848,0,null);
var attrs = cljs.core.nth.call(null,vec__2848,1,null);
var body = cljs.core.nthnext.call(null,vec__2848,2);
if(cljs.core.keyword_QMARK_.call(null,tag))
{var elem = document.createElement(cljs.core.name.call(null,tag));
if(cljs.core.map_QMARK_.call(null,attrs))
{var G__2849_2851 = cljs.core.seq.call(null,attrs);
while(true){
if(G__2849_2851)
{var vec__2850_2852 = cljs.core.first.call(null,G__2849_2851);
var k_2853 = cljs.core.nth.call(null,vec__2850_2852,0,null);
var v_2854 = cljs.core.nth.call(null,vec__2850_2852,1,null);
if(cljs.core.truth_(v_2854))
{elem.setAttribute(cljs.core.name.call(null,k_2853),v_2854);
} else
{}
{
var G__2855 = cljs.core.next.call(null,G__2849_2851);
G__2849_2851 = G__2855;
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
var G__2857_2858 = cljs.core.seq.call(null,webrepl.dom.call(null,v));
while(true){
if(G__2857_2858)
{var i_2859 = cljs.core.first.call(null,G__2857_2858);
parent.appendChild(i_2859);
{
var G__2860 = cljs.core.next.call(null,G__2857_2858);
G__2857_2858 = G__2860;
continue;
}
} else
{}
break;
}
return parent;
});
webrepl._STAR_print_class_STAR_ = null;
webrepl._STAR_e = null;
webrepl.repl_print = (function repl_print(log,text,cls){
var G__2862_2863 = cljs.core.seq.call(null,[cljs.core.str(text)].join('').split(/\n/));
while(true){
if(G__2862_2863)
{var line_2864 = cljs.core.first.call(null,G__2862_2863);
webrepl.append_dom.call(null,log,cljs.core.PersistentVector.fromArray(["\uFDD0'div",cljs.core.ObjMap.fromObject(["\uFDD0'class"],{"\uFDD0'class":[cljs.core.str("cg "),cljs.core.str((cljs.core.truth_(cls)?[cljs.core.str(" "),cljs.core.str(cls)].join(''):null))].join('')}),line_2864], true));
{
var G__2865 = cljs.core.next.call(null,G__2862_2863);
G__2862_2863 = G__2865;
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
webrepl.pep = (function pep(log,text){
webrepl.postexpr.call(null,log,text);
try{return webrepl.repl_print.call(null,log,cljs.core.pr_str.call(null,eval(cljs.compiler.emit_str.call(null,cljs.analyzer.analyze.call(null,env,cljs.reader.read_string.call(null,text))))),"rtn");
}catch (e2869){if(cljs.core.instance_QMARK_.call(null,Error,e2869))
{var e = e2869;
return webrepl.repl_print.call(null,log,e,"err");
} else
{if("\uFDD0'else")
{throw e2869;
} else
{return null;
}
}
}});
window.onload = (function (){
var log = document.getElementById("log");
var input = document.getElementById("input");
var status = document.getElementById("status");
cljs.core._STAR_print_fn_STAR_ = (function (p1__2867_SHARP_){
return webrepl.repl_print.call(null,log,p1__2867_SHARP_,null);
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
}catch (e2870){if(cljs.core.instance_QMARK_.call(null,Error,e2870))
{var e = e2870;
if(cljs.core._EQ_.call(null,e.message,"EOF while reading"))
{return status.src = "dots.png";
} else
{return webrepl.repl_print.call(null,log,e,"err");
}
} else
{if("\uFDD0'else")
{throw e2870;
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
cljs.core.println.call(null,";;   - A port of the ClojureScript to ClojureScript");
cljs.core.println.call(null,";;   - No macros (yet)");
webrepl.pep.call(null,log,"(+ 1 2)");
webrepl.pep.call(null,log,"(def sqr (fn* [x] (* x x)))");
webrepl.pep.call(null,log,"(sqr 8)");
webrepl.pep.call(null,log,"(defmacro unless [pred a b] `(if (not ~pred) ~a ~b))");
webrepl.pep.call(null,log,"(unless false :yep :nope)");
return input.focus();
});
