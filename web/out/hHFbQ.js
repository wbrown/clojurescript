goog.provide('webrepl');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('cljs.compiler');
goog.require('cljs.analyzer');
goog.require('cljs.core');
webrepl._STAR_debug_STAR_ = false;
webrepl._STAR_e = null;
webrepl.prompt = (function prompt(){
return [cljs.core.str(cljs.core._STAR_ns_sym_STAR_),cljs.core.str("=> ")].join('');
});
webrepl.dom = (function dom(o){
if(cljs.core.coll_QMARK_.call(null,o))
{var vec__3150 = o;
var tag = cljs.core.nth.call(null,vec__3150,0,null);
var attrs = cljs.core.nth.call(null,vec__3150,1,null);
var body = cljs.core.nthnext.call(null,vec__3150,2);
if(cljs.core.keyword_QMARK_.call(null,tag))
{var elem = document.createElement(cljs.core.name.call(null,tag));
if(cljs.core.map_QMARK_.call(null,attrs))
{var G__3151_3153 = cljs.core.seq.call(null,attrs);
while(true){
if(G__3151_3153)
{var vec__3152_3154 = cljs.core.first.call(null,G__3151_3153);
var k_3155 = cljs.core.nth.call(null,vec__3152_3154,0,null);
var v_3156 = cljs.core.nth.call(null,vec__3152_3154,1,null);
if(cljs.core.truth_(v_3156))
{elem.setAttribute(cljs.core.name.call(null,k_3155),v_3156);
} else
{}
{
var G__3157 = cljs.core.next.call(null,G__3151_3153);
G__3151_3153 = G__3157;
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
var G__3159_3160 = cljs.core.seq.call(null,webrepl.dom.call(null,v));
while(true){
if(G__3159_3160)
{var i_3161 = cljs.core.first.call(null,G__3159_3160);
parent.appendChild(i_3161);
{
var G__3162 = cljs.core.next.call(null,G__3159_3160);
G__3159_3160 = G__3162;
continue;
}
} else
{}
break;
}
return parent;
});
webrepl.repl_print = (function repl_print(log,text,cls){
var G__3164_3165 = cljs.core.seq.call(null,[cljs.core.str(text)].join('').split(/\n/));
while(true){
if(G__3164_3165)
{var line_3166 = cljs.core.first.call(null,G__3164_3165);
webrepl.append_dom.call(null,log,cljs.core.PersistentVector.fromArray(["\uFDD0'div",cljs.core.ObjMap.fromObject(["\uFDD0'class"],{"\uFDD0'class":[cljs.core.str("cg "),cljs.core.str((cljs.core.truth_(cls)?[cljs.core.str(" "),cljs.core.str(cls)].join(''):null))].join('')}),line_3166], true));
{
var G__3167 = cljs.core.next.call(null,G__3164_3165);
G__3164_3165 = G__3167;
continue;
}
} else
{}
break;
}
return log.scrollTop = log.scrollHeight;
});
webrepl.read_next_form = (function read_next_form(text){
var _STAR_ns_sym_STAR_3170 = cljs.core._STAR_ns_sym_STAR_;
try{cljs.core._STAR_ns_sym_STAR_ = cljs.core._STAR_ns_sym_STAR_;
return cljs.reader.read_string.call(null,text);
}finally {cljs.core._STAR_ns_sym_STAR_ = _STAR_ns_sym_STAR_3170;
}});
webrepl.postexpr = (function postexpr(log,text){
return webrepl.append_dom.call(null,log,cljs.core.PersistentVector.fromArray(["\uFDD0'table",cljs.core.PersistentVector.fromArray(["\uFDD0'tbody",cljs.core.PersistentVector.fromArray(["\uFDD0'tr",cljs.core.PersistentVector.fromArray(["\uFDD0'td",cljs.core.ObjMap.fromObject(["\uFDD0'class"],{"\uFDD0'class":"cg"}),webrepl.prompt.call(null)], true),cljs.core.PersistentVector.fromArray(["\uFDD0'td",text.replace(/\n$/,"")], true)], true)], true)], true));
});
webrepl.ep = (function ep(log,text){
try{var env = cljs.core.assoc.call(null,cljs.analyzer.empty_env.call(null),"\uFDD0'context","\uFDD0'expr");
var form = webrepl.read_next_form.call(null,text);
var _ = (cljs.core.truth_(webrepl._STAR_debug_STAR_)?cljs.core.println.call(null,"READ:",cljs.core.pr_str.call(null,form)):null);
var body = cljs.analyzer.analyze.call(null,env,form);
var ___$1 = (cljs.core.truth_(webrepl._STAR_debug_STAR_)?cljs.core.println.call(null,"ANALYZED:",cljs.core.pr_str.call(null,(new cljs.core.Keyword("\uFDD0'form")).call(null,body))):null);
var res = cljs.compiler.emit_str.call(null,body);
var ___$2 = (cljs.core.truth_(webrepl._STAR_debug_STAR_)?cljs.core.println.call(null,"EMITTED:",cljs.core.pr_str.call(null,res)):null);
var value = eval(res);
cljs.core._STAR_3 = cljs.core._STAR_2;
cljs.core._STAR_2 = cljs.core._STAR_1;
cljs.core._STAR_1 = value;
return webrepl.repl_print.call(null,log,cljs.core.pr_str.call(null,value),"rtn");
}catch (e3173){if(cljs.core.instance_QMARK_.call(null,Error,e3173))
{var e = e3173;
webrepl.repl_print.call(null,log,e.stack,"err");
return webrepl._STAR_e = e;
} else
{if("\uFDD0'else")
{throw e3173;
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
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_emitted_provides_STAR_,cljs.core.conj,cljs.core.symbol.call(null,"cljs.user"));
goog.provide("cljs.user");
cljs.core._STAR_ns_sym_STAR_ = cljs.core.symbol.call(null,"cljs.user");
var log = document.getElementById("log");
var input = document.getElementById("input");
var status1 = document.getElementById("status1");
var status2 = document.getElementById("status2");
cljs.core._STAR_print_fn_STAR_ = (function (p1__3174_SHARP_){
return webrepl.repl_print.call(null,log,p1__3174_SHARP_,null);
});
cljs.core.println.call(null,";; ClojureScript");
webrepl.append_dom.call(null,log,cljs.core.PersistentVector.fromArray(["\uFDD0'div",cljs.core.ObjMap.fromObject(["\uFDD0'class"],{"\uFDD0'class":"cg"}),";;   - ",cljs.core.PersistentVector.fromArray(["\uFDD0'a",cljs.core.ObjMap.fromObject(["\uFDD0'href"],{"\uFDD0'href":"http://github.com/kanaka/clojurescript"}),"http://github.com/kanaka/clojurescript"], true)], true));
cljs.core.println.call(null,";;   - A port of the ClojureScript compiler to ClojureScript");
webrepl.pep.call(null,log,"(+ 1 2)");
webrepl.pep.call(null,log,"(defn sqr [x] (* x x))");
webrepl.pep.call(null,log,"(sqr 8)");
webrepl.pep.call(null,log,"(defmacro unless [pred a b] `(if (not ~pred) ~a ~b))");
webrepl.pep.call(null,log,"(unless false :yep :nope)");
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
status1.style.visibility = "visible";
status2.style.visibility = "hidden";
return document.getElementById("ns").innerText = webrepl.prompt.call(null);
}catch (e3175){if(cljs.core.instance_QMARK_.call(null,Error,e3175))
{var e = e3175;
if(cljs.core.truth_(cljs.core.re_find.call(null,/EOF while reading/,e.message)))
{status1.style.visibility = "hidden";
return status2.style.visibility = "visible";
} else
{return webrepl.repl_print.call(null,log,e,"err");
}
} else
{if("\uFDD0'else")
{throw e3175;
} else
{return null;
}
}
}} else
{return null;
}
});
return input.focus();
});
