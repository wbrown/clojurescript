goog.provide('webrepl');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('cljs.compiler');
goog.require('cljs.analyzer');
goog.require('clojure.string');
goog.require('cljs.core');
webrepl._STAR_debug_STAR_ = false;
webrepl._STAR_e = null;
webrepl.prompt = (function prompt(){
return [cljs.core.str(cljs.analyzer._STAR_cljs_ns_STAR_),cljs.core.str("=> ")].join('');
});
webrepl.read_next_form = (function read_next_form(text){
var _STAR_ns_sym_STAR_3139 = cljs.core._STAR_ns_sym_STAR_;
try{cljs.core._STAR_ns_sym_STAR_ = cljs.analyzer._STAR_cljs_ns_STAR_;
return cljs.reader.read_string.call(null,text);
}finally {cljs.core._STAR_ns_sym_STAR_ = _STAR_ns_sym_STAR_3139;
}});
webrepl.ep = (function ep(text){
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
return cljs.core.ObjMap.fromObject(["\uFDD0'value","\uFDD0'js"],{"\uFDD0'value":value,"\uFDD0'js":res});
}catch (e3142){if(cljs.core.instance_QMARK_.call(null,Error,e3142))
{var e = e3142;
webrepl._STAR_e = e;
return cljs.core.ObjMap.fromObject(["\uFDD0'error"],{"\uFDD0'error":e.stack});
} else
{if("\uFDD0'else")
{throw e3142;
} else
{return null;
}
}
}});
webrepl.pep = (function pep(text){
jconsole.promptText(text);
return jconsole.commandTrigger();
});
webrepl.map__GT_js = (function map__GT_js(m){
var out = {};
var G__3145_3147 = cljs.core.seq.call(null,m);
while(true){
if(G__3145_3147)
{var vec__3146_3148 = cljs.core.first.call(null,G__3145_3147);
var k_3149 = cljs.core.nth.call(null,vec__3146_3148,0,null);
var v_3150 = cljs.core.nth.call(null,vec__3146_3148,1,null);
(out[cljs.core.name.call(null,k_3149)] = v_3150);
{
var G__3151 = cljs.core.next.call(null,G__3145_3147);
G__3145_3147 = G__3151;
continue;
}
} else
{}
break;
}
return out;
});
webrepl.on_validate = (function on_validate(input){
return !(cljs.core.empty_QMARK_.call(null,input));
});
webrepl.build_msg = (function build_msg(title,msg,klass){
return [webrepl.map__GT_js.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'msg","\uFDD0'className"],{"\uFDD0'msg":[cljs.core.str(title),cljs.core.str(msg)].join(''),"\uFDD0'className":klass}))];
});
webrepl.starts_with_QMARK_ = (function starts_with_QMARK_(o,s){
return cljs.core._EQ_.call(null,clojure.string.trim.call(null,s).slice(0,o.length),o);
});
webrepl.is_comment_QMARK_ = (function is_comment_QMARK_(p1__3152_SHARP_){
return webrepl.starts_with_QMARK_.call(null,";",p1__3152_SHARP_);
});
webrepl.on_handle = (function on_handle(line,report){
webrepl.build_msg.call(null,"","","jquery-console-message-value");
var input = jQuery.trim(line);
var compiled = webrepl.ep.call(null,input);
var temp__3971__auto__ = (function (){var and__3822__auto__ = compiled;
if(cljs.core.truth_(and__3822__auto__))
{return (new cljs.core.Keyword("\uFDD0'error")).call(null,compiled);
} else
{return and__3822__auto__;
}
})();
if(cljs.core.truth_(temp__3971__auto__))
{var err = temp__3971__auto__;
return webrepl.build_msg.call(null,"Compilation error: ",err,"jquery-console-message-error");
} else
{try{jconsole.promptLabel(webrepl.prompt.call(null));
return webrepl.build_msg.call(null,"",cljs.core.pr_str.call(null,(new cljs.core.Keyword("\uFDD0'value")).call(null,compiled)),"jquery-console-message-value");
}catch (e3155){if(cljs.core.instance_QMARK_.call(null,Error,e3155))
{var e = e3155;
return webrepl.build_msg.call(null,"Compilation error: ",e,"jquery-console-message-error");
} else
{if("\uFDD0'else")
{throw e3155;
} else
{return null;
}
}
}}
});
jQuery(document).ready((function (){
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_emitted_provides_STAR_,cljs.core.conj,cljs.core.symbol.call(null,"cljs.user"));
goog.provide("cljs.user");
cljs.core._STAR_ns_sym_STAR_ = cljs.core.symbol.call(null,"cljs.user");
controller = jQuery("#console");
jconsole = controller.console(webrepl.map__GT_js.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'welcomeMessage","\uFDD0'promptLabel","\uFDD0'commandValidate","\uFDD0'commandHandle","\uFDD0'autofocus","\uFDD0'animateScroll","\uFDD0'promptHistory"],{"\uFDD0'welcomeMessage":"ClojureScript-in-ClojureScript Web REPL","\uFDD0'promptLabel":"cljs.user> ","\uFDD0'commandValidate":webrepl.on_validate,"\uFDD0'commandHandle":webrepl.on_handle,"\uFDD0'autofocus":true,"\uFDD0'animateScroll":true,"\uFDD0'promptHistory":true})));
cljs.core._STAR_print_fn_STAR_ = (function (p1__3153_SHARP_){
return jconsole.message(clojure.string.trim.call(null,p1__3153_SHARP_));
});
webrepl.pep.call(null,"(+ 1 2)");
webrepl.pep.call(null,"(let [sqr #(* % %)] (sqr 8))");
webrepl.pep.call(null,"(defmacro unless [pred a b] `(if (not ~pred) ~a ~b))");
return webrepl.pep.call(null,"(unless false :yep :nope)");
}));
