goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('cljs.analyzer');
goog.require('clojure.string');
cljs.compiler.js_reserved = cljs.core.PersistentHashSet.fromArray(["new","debugger","enum","default","abstract","goto","private","finally","const","in","import","package","with","throw","continue","var","boolean","byte","for","public","transient","do","delete","instanceof","throws","yield","static","protected","int","return","case","implements","typeof","while","double","methods","synchronized","void","switch","export","final","char","native","class","function","extends","else","interface","try","let","catch","super","short","volatile","float","long","if","this","break"]);
cljs.compiler._STAR_position_STAR_ = null;
cljs.compiler._STAR_emitted_provides_STAR_ = null;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.ObjMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = cljs.core.PersistentHashSet.fromArray(["deps.cljs"]);
cljs.compiler.ns_first_segments = cljs.core.atom.call(null,cljs.core.set(["clojure","cljs"]));
cljs.compiler.CHAR_MAP = cljs.core.ObjMap.fromObject(["@","!","\"","#","%","&","'","*","+","-","/",":","[","{","<","\\","|","=","]","}",">","^","~","?"],{"@":"_CIRCA_","!":"_BANG_","\"":"_DOUBLEQUOTE_","#":"_SHARP_","%":"_PERCENT_","&":"_AMPERSAND_","'":"_SINGLEQUOTE_","*":"_STAR_","+":"_PLUS_","-":"_","/":"_SLASH_",":":"_COLON_","[":"_LBRACK_","{":"_LBRACE_","<":"_LT_","\\":"_BSLASH_","|":"_BAR_","=":"_EQ_","]":"_RBRACK_","}":"_RBRACE_",">":"_GT_","^":"_CARET_","~":"_TILDE_","?":"_QMARK_"});
cljs.compiler.munge = (function() {
var munge = null;
var munge__1 = (function (s){
return munge.call(null,s,cljs.compiler.js_reserved);
});
var munge__2 = (function (s,reserved){
if(cljs.core.map_QMARK_.call(null,s))
{var map__3961 = s;
var map__3961__$1 = ((cljs.core.seq_QMARK_.call(null,map__3961))?cljs.core.apply.call(null,cljs.core.hash_map,map__3961):map__3961);
var info = map__3961__$1;
var field = cljs.core._lookup.call(null,map__3961__$1,"\uFDD0'field",null);
var name = cljs.core._lookup.call(null,map__3961__$1,"\uFDD0'name",null);
var depth = (function (){var d = 0;
var G__3963 = info;
var map__3964 = G__3963;
var map__3964__$1 = ((cljs.core.seq_QMARK_.call(null,map__3964))?cljs.core.apply.call(null,cljs.core.hash_map,map__3964):map__3964);
var shadow = cljs.core._lookup.call(null,map__3964__$1,"\uFDD0'shadow",null);
var d__$1 = d;
var G__3963__$1 = G__3963;
while(true){
var d__$2 = d__$1;
var map__3965 = G__3963__$1;
var map__3965__$1 = ((cljs.core.seq_QMARK_.call(null,map__3965))?cljs.core.apply.call(null,cljs.core.hash_map,map__3965):map__3965);
var shadow__$1 = cljs.core._lookup.call(null,map__3965__$1,"\uFDD0'shadow",null);
if(cljs.core.truth_(shadow__$1))
{{
var G__3966 = (d__$2 + 1);
var G__3967 = shadow__$1;
d__$1 = G__3966;
G__3963__$1 = G__3967;
continue;
}
} else
{if(cljs.core.truth_(cljs.core.deref.call(null,cljs.compiler.ns_first_segments).call(null,[cljs.core.str(name)].join(''))))
{return (d__$2 + 1);
} else
{if("\uFDD0'else")
{return d__$2;
} else
{return null;
}
}
}
break;
}
})();
var renamed = cljs.compiler._STAR_lexical_renames_STAR_.call(null,cljs.core.hash.call(null,s));
var munged_name = munge.call(null,(cljs.core.truth_(field)?[cljs.core.str("self__."),cljs.core.str(name)].join(''):(cljs.core.truth_(renamed)?renamed:(("\uFDD0'else")?name:null))),reserved);
if(cljs.core.truth_((function (){var or__3824__auto__ = field;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return (depth === 0);
}
})()))
{return munged_name;
} else
{return cljs.core.symbol.call(null,[cljs.core.str(munged_name),cljs.core.str("__$"),cljs.core.str(depth)].join(''));
}
} else
{var ss = clojure.string.replace.call(null,[cljs.core.str(s)].join(''),/\/(.)/,".$1");
var ss__$1 = clojure.string.join.call(null,".",cljs.core.map.call(null,(function (p1__3954_SHARP_){
if(cljs.core.truth_(reserved.call(null,p1__3954_SHARP_)))
{return [cljs.core.str(p1__3954_SHARP_),cljs.core.str("$")].join('');
} else
{return p1__3954_SHARP_;
}
}),clojure.string.split.call(null,ss,/[.]/)));
var ms = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__3955_SHARP_){
return cljs.core._lookup.call(null,cljs.compiler.CHAR_MAP,p1__3955_SHARP_,p1__3955_SHARP_);
}),ss__$1));
if(cljs.core.symbol_QMARK_.call(null,s))
{return cljs.core.symbol.call(null,ms);
} else
{return ms;
}
}
});
munge = function(s,reserved){
switch(arguments.length){
case 1:
return munge__1.call(this,s);
case 2:
return munge__2.call(this,s,reserved);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
munge.cljs$lang$arity$1 = munge__1;
munge.cljs$lang$arity$2 = munge__2;
return munge;
})()
;
cljs.compiler.comma_sep = (function comma_sep(xs){
return cljs.core.interpose.call(null,",",xs);
});
cljs.compiler.escape_char = (function escape_char(c){
var cp = c.charCodeAt(0);
var G__3970 = cp;
if(cljs.core._EQ_.call(null,9,G__3970))
{return "\\t";
} else
{if(cljs.core._EQ_.call(null,13,G__3970))
{return "\\r";
} else
{if(cljs.core._EQ_.call(null,10,G__3970))
{return "\\n";
} else
{if(cljs.core._EQ_.call(null,12,G__3970))
{return "\\f";
} else
{if(cljs.core._EQ_.call(null,8,G__3970))
{return "\\b";
} else
{if(cljs.core._EQ_.call(null,92,G__3970))
{return "\\\\";
} else
{if(cljs.core._EQ_.call(null,34,G__3970))
{return "\\\"";
} else
{if("\uFDD0'else")
{if((function (){var and__3822__auto__ = (31 < cp);
if(and__3822__auto__)
{return (cp < 127);
} else
{return and__3822__auto__;
}
})())
{return c;
} else
{return cljs.core.format.call(null,"\\u%04X",cp);
}
} else
{return null;
}
}
}
}
}
}
}
}
});
cljs.compiler.escape_string = (function escape_string(s){
return cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__3968_SHARP_){
return cljs.compiler.escape_char.call(null,p1__3968_SHARP_);
}),s));
});
cljs.compiler.wrap_in_double_quotes = (function wrap_in_double_quotes(x){
return [cljs.core.str("\""),cljs.core.str(x),cljs.core.str("\"")].join('');
});
cljs.compiler.emit = (function (){var method_table__2176__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var prefer_table__2177__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var method_cache__2178__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var cached_hierarchy__2179__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var hierarchy__2180__auto__ = cljs.core._lookup.call(null,cljs.core.ObjMap.EMPTY,"\uFDD0'hierarchy",cljs.core.global_hierarchy);
return (new cljs.core.MultiFn("emit","\uFDD0'op","\uFDD0'default",hierarchy__2180__auto__,method_table__2176__auto__,prefer_table__2177__auto__,method_cache__2178__auto__,cached_hierarchy__2179__auto__));
})();
/**
* @param {...*} var_args
*/
cljs.compiler.emits = (function() { 
var emits__delegate = function (xs){
var G__3974_3977 = cljs.core.seq.call(null,xs);
while(true){
if(G__3974_3977)
{var x_3978 = cljs.core.first.call(null,G__3974_3977);
if((x_3978 == null))
{} else
{if(cljs.core.map_QMARK_.call(null,x_3978))
{cljs.compiler.emit.call(null,x_3978);
} else
{if(cljs.core.seq_QMARK_.call(null,x_3978))
{cljs.core.apply.call(null,emits,x_3978);
} else
{if(cljs.core.fn_QMARK_.call(null,x_3978))
{x_3978.call(null);
} else
{if("\uFDD0'else")
{var s_3979 = cljs.core.print_str.call(null,x_3978);
if(cljs.core.truth_(cljs.compiler._STAR_position_STAR_))
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_position_STAR_,((function (G__3974_3977,s_3979,x_3978){
return (function (p__3975){
var vec__3976 = p__3975;
var line = cljs.core.nth.call(null,vec__3976,0,null);
var column = cljs.core.nth.call(null,vec__3976,1,null);
return cljs.core.PersistentVector.fromArray([line,(column + cljs.core.count.call(null,s_3979))], true);
});})(G__3974_3977,s_3979,x_3978))
);
} else
{}
cljs.core.print.call(null,s_3979);
} else
{}
}
}
}
}
{
var G__3980 = cljs.core.next.call(null,G__3974_3977);
G__3974_3977 = G__3980;
continue;
}
} else
{}
break;
}
return null;
};
var emits = function (var_args){
var xs = null;
if (goog.isDef(var_args)) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return emits__delegate.call(this, xs);
};
emits.cljs$lang$maxFixedArity = 0;
emits.cljs$lang$applyTo = (function (arglist__3981){
var xs = cljs.core.seq(arglist__3981);;
return emits__delegate(xs);
});
emits.cljs$lang$arity$variadic = emits__delegate;
return emits;
})()
;
cljs.compiler.emit_str = (function emit_str(expr){
var sb__2216__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_3984_3986 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2217__auto__){
return sb__2216__auto__.append(x__2217__auto__);
});
cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_3984_3986;
}return [cljs.core.str(sb__2216__auto__)].join('');
});
/**
* @param {...*} var_args
*/
cljs.compiler.emitln = (function() { 
var emitln__delegate = function (xs){
cljs.core.apply.call(null,cljs.compiler.emits,xs);
cljs.core.println.call(null);
if(cljs.core.truth_(cljs.compiler._STAR_position_STAR_))
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_position_STAR_,(function (p__3989){
var vec__3990 = p__3989;
var line = cljs.core.nth.call(null,vec__3990,0,null);
var column = cljs.core.nth.call(null,vec__3990,1,null);
return cljs.core.PersistentVector.fromArray([(line + 1),0], true);
}));
} else
{}
return null;
};
var emitln = function (var_args){
var xs = null;
if (goog.isDef(var_args)) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return emitln__delegate.call(this, xs);
};
emitln.cljs$lang$maxFixedArity = 0;
emitln.cljs$lang$applyTo = (function (arglist__3991){
var xs = cljs.core.seq(arglist__3991);;
return emitln__delegate(xs);
});
emitln.cljs$lang$arity$variadic = emitln__delegate;
return emitln;
})()
;
cljs.compiler.emit_str = (function emit_str(expr){
var sb__2216__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_3994_3996 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2217__auto__){
return sb__2216__auto__.append(x__2217__auto__);
});
cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_3994_3996;
}return [cljs.core.str(sb__2216__auto__)].join('');
});
cljs.compiler.emit_provide = (function emit_provide(sym){
if((function (){var or__3824__auto__ = (cljs.compiler._STAR_emitted_provides_STAR_ == null);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,cljs.compiler._STAR_emitted_provides_STAR_),sym);
}
})())
{return null;
} else
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_emitted_provides_STAR_,cljs.core.conj,sym);
return cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,sym),"');");
}
});
/**
* @param {...*} var_args
*/
cljs.compiler.emit_meta_constant = (function() { 
var emit_meta_constant__delegate = function (x,body){
if(cljs.core.truth_(cljs.core.meta.call(null,x)))
{cljs.compiler.emits.call(null,"cljs.core.with_meta(",body,",");
cljs.compiler.emit_constant.call(null,cljs.core.meta.call(null,x));
return cljs.compiler.emits.call(null,")");
} else
{return cljs.compiler.emits.call(null,body);
}
};
var emit_meta_constant = function (x,var_args){
var body = null;
if (goog.isDef(var_args)) {
  body = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return emit_meta_constant__delegate.call(this, x, body);
};
emit_meta_constant.cljs$lang$maxFixedArity = 1;
emit_meta_constant.cljs$lang$applyTo = (function (arglist__3997){
var x = cljs.core.first(arglist__3997);
var body = cljs.core.rest(arglist__3997);
return emit_meta_constant__delegate(x, body);
});
emit_meta_constant.cljs$lang$arity$variadic = emit_meta_constant__delegate;
return emit_meta_constant;
})()
;
cljs.compiler.emit_constant_keyword = (function emit_constant_keyword(x){
return cljs.compiler.emits.call(null,"\"","\\uFDD0","'",(cljs.core.truth_(cljs.core.namespace.call(null,x))?[cljs.core.str(cljs.core.namespace.call(null,x)),cljs.core.str("/")].join(''):""),cljs.core.name.call(null,x),"\"");
});
cljs.compiler.emit_constant_symbol = (function emit_constant_symbol(x){
return cljs.compiler.emits.call(null,"\"","\\uFDD1","'",(cljs.core.truth_(cljs.core.namespace.call(null,x))?[cljs.core.str(cljs.core.namespace.call(null,x)),cljs.core.str("/")].join(''):""),cljs.core.name.call(null,x),"\"");
});
cljs.compiler.emit_constant_map = (function emit_constant_map(x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.hash_map("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__3998_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3998_SHARP_);
});
}),cljs.core.apply.call(null,cljs.core.concat,x))),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.compiler.emit_constant_set = (function emit_constant_set(x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.set(["], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__3999_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3999_SHARP_);
});
}),x)),cljs.core.PersistentVector.fromArray(["])"], true)));
});
cljs.compiler.EmitConstant = {};
cljs.compiler.emit_constant = (function emit_constant(x){
if((function (){var and__3822__auto__ = x;
if(and__3822__auto__)
{return x.cljs$compiler$EmitConstant$emit_constant$arity$1;
} else
{return and__3822__auto__;
}
})())
{return x.cljs$compiler$EmitConstant$emit_constant$arity$1(x);
} else
{var x__2004__auto__ = (((x == null))?null:x);
return (function (){var or__3824__auto__ = (cljs.compiler.emit_constant[goog.typeOf(x__2004__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.compiler.emit_constant["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"EmitConstant.emit-constant",x);
}
}
})().call(null,x);
}
});
(cljs.compiler.EmitConstant["null"] = true);
(cljs.compiler.emit_constant["null"] = (function (x){
return cljs.compiler.emits.call(null,"null");
}));
cljs.core.PersistentArrayMap.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_map.call(null,x);
});
(cljs.compiler.EmitConstant["number"] = true);
(cljs.compiler.emit_constant["number"] = (function (x){
return cljs.compiler.emits.call(null,x);
}));
cljs.core.EmptyList.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.EmptyList.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,"cljs.core.List.EMPTY");
});
(cljs.compiler.EmitConstant["boolean"] = true);
(cljs.compiler.emit_constant["boolean"] = (function (x){
return cljs.compiler.emits.call(null,(cljs.core.truth_(x)?"true":"false"));
}));
(cljs.compiler.EmitConstant["string"] = true);
(cljs.compiler.emit_constant["string"] = (function (x){
if(cljs.core.symbol_QMARK_.call(null,x))
{return cljs.compiler.emit_constant_symbol.call(null,x);
} else
{if(cljs.core.keyword_QMARK_.call(null,x))
{return cljs.compiler.emit_constant_keyword.call(null,x);
} else
{if("\uFDD0'else")
{return cljs.compiler.emits.call(null,cljs.compiler.wrap_in_double_quotes.call(null,cljs.compiler.escape_string.call(null,x)));
} else
{return null;
}
}
}
}));
RegExp.prototype.cljs$compiler$EmitConstant$ = true;
RegExp.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
var vec__4003 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str(x)].join(''));
var _ = cljs.core.nth.call(null,vec__4003,0,null);
var flags = cljs.core.nth.call(null,vec__4003,1,null);
var pattern = cljs.core.nth.call(null,vec__4003,2,null);
var all_slashes = (new RegExp("\\/","g"));
return cljs.compiler.emits.call(null,[cljs.core.str("/"),cljs.core.str(pattern.replace(all_slashes,"\\\\/")),cljs.core.str("/"),cljs.core.str(flags)].join(''));
});
cljs.core.PersistentVector.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentVector.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.vec(["], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4002_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4002_SHARP_);
});
}),x)),cljs.core.PersistentVector.fromArray(["])"], true)));
});
cljs.core.PersistentTreeSet.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentTreeSet.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_set.call(null,x);
});
cljs.core.PersistentHashMap.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentHashMap.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_map.call(null,x);
});
cljs.core.Cons.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.Cons.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.list("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4001_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4001_SHARP_);
});
}),x)),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.core.PersistentTreeMap.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentTreeMap.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_map.call(null,x);
});
cljs.core.List.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.List.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.list("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4000_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4000_SHARP_);
});
}),x)),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.core.PersistentHashSet.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentHashSet.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_set.call(null,x);
});
cljs.compiler.emit_block = (function emit_block(context,statements,ret){
if(cljs.core.truth_(statements))
{cljs.compiler.emits.call(null,statements);
} else
{}
return cljs.compiler.emit.call(null,ret);
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'no-op",(function (m){
return null;
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'var",(function (p__4004){
var map__4005 = p__4004;
var map__4005__$1 = ((cljs.core.seq_QMARK_.call(null,map__4005))?cljs.core.apply.call(null,cljs.core.hash_map,map__4005):map__4005);
var arg = map__4005__$1;
var env = cljs.core._lookup.call(null,map__4005__$1,"\uFDD0'env",null);
var info = cljs.core._lookup.call(null,map__4005__$1,"\uFDD0'info",null);
var n = (new cljs.core.Keyword("\uFDD0'name")).call(null,info);
var n__$1 = ((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,n),"js"))?cljs.core.name.call(null,n):info);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,n__$1));
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'meta",(function (p__4006){
var map__4007 = p__4006;
var map__4007__$1 = ((cljs.core.seq_QMARK_.call(null,map__4007))?cljs.core.apply.call(null,cljs.core.hash_map,map__4007):map__4007);
var env = cljs.core._lookup.call(null,map__4007__$1,"\uFDD0'env",null);
var meta = cljs.core._lookup.call(null,map__4007__$1,"\uFDD0'meta",null);
var expr = cljs.core._lookup.call(null,map__4007__$1,"\uFDD0'expr",null);
var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.array_map_threshold = 16;
cljs.compiler.obj_map_threshold = 32;
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'map",(function (p__4008){
var map__4009 = p__4008;
var map__4009__$1 = ((cljs.core.seq_QMARK_.call(null,map__4009))?cljs.core.apply.call(null,cljs.core.hash_map,map__4009):map__4009);
var vals = cljs.core._lookup.call(null,map__4009__$1,"\uFDD0'vals",null);
var keys = cljs.core._lookup.call(null,map__4009__$1,"\uFDD0'keys",null);
var simple_keys_QMARK_ = cljs.core._lookup.call(null,map__4009__$1,"\uFDD0'simple-keys?",null);
var env = cljs.core._lookup.call(null,map__4009__$1,"\uFDD0'env",null);
var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if((cljs.core.count.call(null,keys) === 0))
{cljs.compiler.emits.call(null,"cljs.core.ObjMap.EMPTY");
} else
{if(cljs.core.truth_((function (){var and__3822__auto__ = simple_keys_QMARK_;
if(cljs.core.truth_(and__3822__auto__))
{return (cljs.core.count.call(null,keys) <= cljs.compiler.obj_map_threshold);
} else
{return and__3822__auto__;
}
})()))
{cljs.compiler.emits.call(null,"cljs.core.ObjMap.fromObject([",cljs.compiler.comma_sep.call(null,keys),"],{",cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (k,v){
var sb__2216__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_4010_4012 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2217__auto__){
return sb__2216__auto__.append(x__2217__auto__);
});
cljs.compiler.emit.call(null,k);
cljs.core.print.call(null,":");
cljs.compiler.emit.call(null,v);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_4010_4012;
}return [cljs.core.str(sb__2216__auto__)].join('');
}),keys,vals)),"})");
} else
{if((cljs.core.count.call(null,keys) <= cljs.compiler.array_map_threshold))
{cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.fromArrays([",cljs.compiler.comma_sep.call(null,keys),"],[",cljs.compiler.comma_sep.call(null,vals),"])");
} else
{if("\uFDD0'else")
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashMap.fromArrays([",cljs.compiler.comma_sep.call(null,keys),"],[",cljs.compiler.comma_sep.call(null,vals),"])");
} else
{}
}
}
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'vector",(function (p__4013){
var map__4014 = p__4013;
var map__4014__$1 = ((cljs.core.seq_QMARK_.call(null,map__4014))?cljs.core.apply.call(null,cljs.core.hash_map,map__4014):map__4014);
var env = cljs.core._lookup.call(null,map__4014__$1,"\uFDD0'env",null);
var items = cljs.core._lookup.call(null,map__4014__$1,"\uFDD0'items",null);
var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.empty_QMARK_.call(null,items))
{cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else
{cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep.call(null,items),"], true)");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'set",(function (p__4015){
var map__4016 = p__4015;
var map__4016__$1 = ((cljs.core.seq_QMARK_.call(null,map__4016))?cljs.core.apply.call(null,cljs.core.hash_map,map__4016):map__4016);
var env = cljs.core._lookup.call(null,map__4016__$1,"\uFDD0'env",null);
var items = cljs.core._lookup.call(null,map__4016__$1,"\uFDD0'items",null);
var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.empty_QMARK_.call(null,items))
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.EMPTY");
} else
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.fromArray([",cljs.compiler.comma_sep.call(null,items),"])");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'constant",(function (p__4017){
var map__4018 = p__4017;
var map__4018__$1 = ((cljs.core.seq_QMARK_.call(null,map__4018))?cljs.core.apply.call(null,cljs.core.hash_map,map__4018):map__4018);
var env = cljs.core._lookup.call(null,map__4018__$1,"\uFDD0'env",null);
var form = cljs.core._lookup.call(null,map__4018__$1,"\uFDD0'form",null);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emit_constant.call(null,form);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.get_tag = (function get_tag(e){
var or__3824__auto__ = (new cljs.core.Keyword("\uFDD0'tag")).call(null,e);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return (new cljs.core.Keyword("\uFDD0'tag")).call(null,(new cljs.core.Keyword("\uFDD0'info")).call(null,e));
}
});
cljs.compiler.infer_tag = (function infer_tag(e){
var temp__3971__auto__ = cljs.compiler.get_tag.call(null,e);
if(cljs.core.truth_(temp__3971__auto__))
{var tag = temp__3971__auto__;
return tag;
} else
{var G__4021 = (new cljs.core.Keyword("\uFDD0'op")).call(null,e);
if(cljs.core._EQ_.call(null,"\uFDD0'constant",G__4021))
{var G__4022 = (new cljs.core.Keyword("\uFDD0'form")).call(null,e);
if(cljs.core._EQ_.call(null,false,G__4022))
{return "\uFDD1'boolean";
} else
{if(cljs.core._EQ_.call(null,true,G__4022))
{return "\uFDD1'boolean";
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'if",G__4021))
{var then_tag = infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'then")).call(null,e));
var else_tag = infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'else")).call(null,e));
if(cljs.core._EQ_.call(null,then_tag,else_tag))
{return then_tag;
} else
{return null;
}
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'let",G__4021))
{return infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'ret")).call(null,e));
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
}
}
});
cljs.compiler.safe_test_QMARK_ = (function safe_test_QMARK_(e){
var tag = cljs.compiler.infer_tag.call(null,e);
var or__3824__auto__ = cljs.core.PersistentHashSet.fromArray(["\uFDD1'boolean","\uFDD1'seq"]).call(null,tag);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{if(cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'op")).call(null,e),"\uFDD0'constant"))
{var form = (new cljs.core.Keyword("\uFDD0'form")).call(null,e);
return cljs.core.not.call(null,(function (){var or__3824__auto____$1 = (function (){var and__3822__auto__ = cljs.core.string_QMARK_.call(null,form);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,form,"");
} else
{return and__3822__auto__;
}
})();
if(cljs.core.truth_(or__3824__auto____$1))
{return or__3824__auto____$1;
} else
{var and__3822__auto__ = cljs.core.number_QMARK_.call(null,form);
if(and__3822__auto__)
{return (form === 0);
} else
{return and__3822__auto__;
}
}
})());
} else
{return null;
}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'if",(function (p__4023){
var map__4024 = p__4023;
var map__4024__$1 = ((cljs.core.seq_QMARK_.call(null,map__4024))?cljs.core.apply.call(null,cljs.core.hash_map,map__4024):map__4024);
var unchecked = cljs.core._lookup.call(null,map__4024__$1,"\uFDD0'unchecked",null);
var env = cljs.core._lookup.call(null,map__4024__$1,"\uFDD0'env",null);
var else$ = cljs.core._lookup.call(null,map__4024__$1,"\uFDD0'else",null);
var then = cljs.core._lookup.call(null,map__4024__$1,"\uFDD0'then",null);
var test = cljs.core._lookup.call(null,map__4024__$1,"\uFDD0'test",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
var checked = cljs.core.not.call(null,(function (){var or__3824__auto__ = unchecked;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.compiler.safe_test_QMARK_.call(null,test);
}
})());
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"(",((checked)?"cljs.core.truth_":null),"(",test,")?",then,":",else$,")");
} else
{if(checked)
{cljs.compiler.emitln.call(null,"if(cljs.core.truth_(",test,"))");
} else
{cljs.compiler.emitln.call(null,"if(",test,")");
}
cljs.compiler.emitln.call(null,"{",then,"} else");
return cljs.compiler.emitln.call(null,"{",else$,"}");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'throw",(function (p__4025){
var map__4026 = p__4025;
var map__4026__$1 = ((cljs.core.seq_QMARK_.call(null,map__4026))?cljs.core.apply.call(null,cljs.core.hash_map,map__4026):map__4026);
var env = cljs.core._lookup.call(null,map__4026__$1,"\uFDD0'env",null);
var throw$ = cljs.core._lookup.call(null,map__4026__$1,"\uFDD0'throw",null);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return cljs.compiler.emits.call(null,"(function(){throw ",throw$,"})()");
} else
{return cljs.compiler.emitln.call(null,"throw ",throw$,";");
}
}));
/**
* Emit a nicely formatted comment string.
*/
cljs.compiler.emit_comment = (function emit_comment(doc,jsdoc){
var docs = (cljs.core.truth_(doc)?cljs.core.PersistentVector.fromArray([doc], true):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.call(null,docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.call(null,cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = (function print_comment_lines(e){
var G__4031 = cljs.core.seq.call(null,clojure.string.split_lines.call(null,e));
while(true){
if(G__4031)
{var next_line = cljs.core.first.call(null,G__4031);
cljs.compiler.emitln.call(null,"* ",clojure.string.trim.call(null,next_line));
{
var G__4033 = cljs.core.next.call(null,G__4031);
G__4031 = G__4033;
continue;
}
} else
{return null;
}
break;
}
});
if(cljs.core.seq.call(null,docs__$2))
{cljs.compiler.emitln.call(null,"/**");
var G__4032_4034 = cljs.core.seq.call(null,docs__$2);
while(true){
if(G__4032_4034)
{var e_4035 = cljs.core.first.call(null,G__4032_4034);
if(cljs.core.truth_(e_4035))
{print_comment_lines.call(null,e_4035);
} else
{}
{
var G__4036 = cljs.core.next.call(null,G__4032_4034);
G__4032_4034 = G__4036;
continue;
}
} else
{}
break;
}
return cljs.compiler.emitln.call(null,"*/");
} else
{return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'def",(function (p__4037){
var map__4038 = p__4037;
var map__4038__$1 = ((cljs.core.seq_QMARK_.call(null,map__4038))?cljs.core.apply.call(null,cljs.core.hash_map,map__4038):map__4038);
var export$ = cljs.core._lookup.call(null,map__4038__$1,"\uFDD0'export",null);
var doc = cljs.core._lookup.call(null,map__4038__$1,"\uFDD0'doc",null);
var env = cljs.core._lookup.call(null,map__4038__$1,"\uFDD0'env",null);
var init = cljs.core._lookup.call(null,map__4038__$1,"\uFDD0'init",null);
var name = cljs.core._lookup.call(null,map__4038__$1,"\uFDD0'name",null);
if(cljs.core.truth_(init))
{var mname = cljs.compiler.munge.call(null,name);
cljs.compiler.emit_comment.call(null,doc,(new cljs.core.Keyword("\uFDD0'jsdoc")).call(null,init));
cljs.compiler.emits.call(null,mname);
cljs.compiler.emits.call(null," = ",init);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{} else
{cljs.compiler.emitln.call(null,";");
}
if(cljs.core.truth_(export$))
{return cljs.compiler.emitln.call(null,"goog.exportSymbol('",cljs.compiler.munge.call(null,export$),"', ",mname,");");
} else
{return null;
}
} else
{return null;
}
}));
cljs.compiler.emit_apply_to = (function emit_apply_to(p__4039){
var map__4043 = p__4039;
var map__4043__$1 = ((cljs.core.seq_QMARK_.call(null,map__4043))?cljs.core.apply.call(null,cljs.core.hash_map,map__4043):map__4043);
var env = cljs.core._lookup.call(null,map__4043__$1,"\uFDD0'env",null);
var params = cljs.core._lookup.call(null,map__4043__$1,"\uFDD0'params",null);
var name = cljs.core._lookup.call(null,map__4043__$1,"\uFDD0'name",null);
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str("__delegate")].join('');
var params__$1 = cljs.core.map.call(null,cljs.compiler.munge,params);
cljs.compiler.emitln.call(null,"(function (",arglist,"){");
var G__4044_4046 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.butlast.call(null,params__$1)));
while(true){
if(G__4044_4046)
{var vec__4045_4047 = cljs.core.first.call(null,G__4044_4046);
var i_4048 = cljs.core.nth.call(null,vec__4045_4047,0,null);
var param_4049 = cljs.core.nth.call(null,vec__4045_4047,1,null);
cljs.compiler.emits.call(null,"var ",param_4049," = cljs.core.first(");
var n__2166__auto___4050 = i_4048;
var __4051 = 0;
while(true){
if((__4051 < n__2166__auto___4050))
{cljs.compiler.emits.call(null,"cljs.core.next(");
{
var G__4052 = (__4051 + 1);
__4051 = G__4052;
continue;
}
} else
{}
break;
}
cljs.compiler.emits.call(null,arglist,")");
var n__2166__auto___4053 = i_4048;
var __4054 = 0;
while(true){
if((__4054 < n__2166__auto___4053))
{cljs.compiler.emits.call(null,")");
{
var G__4055 = (__4054 + 1);
__4054 = G__4055;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,";");
{
var G__4056 = cljs.core.next.call(null,G__4044_4046);
G__4044_4046 = G__4056;
continue;
}
} else
{}
break;
}
if((1 < cljs.core.count.call(null,params__$1)))
{cljs.compiler.emits.call(null,"var ",cljs.core.last.call(null,params__$1)," = cljs.core.rest(");
var n__2166__auto___4057 = (cljs.core.count.call(null,params__$1) - 2);
var __4058 = 0;
while(true){
if((__4058 < n__2166__auto___4057))
{cljs.compiler.emits.call(null,"cljs.core.next(");
{
var G__4059 = (__4058 + 1);
__4058 = G__4059;
continue;
}
} else
{}
break;
}
cljs.compiler.emits.call(null,arglist);
var n__2166__auto___4060 = (cljs.core.count.call(null,params__$1) - 2);
var __4061 = 0;
while(true){
if((__4061 < n__2166__auto___4060))
{cljs.compiler.emits.call(null,")");
{
var G__4062 = (__4061 + 1);
__4061 = G__4062;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,");");
cljs.compiler.emitln.call(null,"return ",delegate_name,"(",clojure.string.join.call(null,", ",params__$1),");");
} else
{cljs.compiler.emits.call(null,"var ",cljs.core.last.call(null,params__$1)," = ");
cljs.compiler.emits.call(null,"cljs.core.seq(",arglist,");");
cljs.compiler.emitln.call(null,";");
cljs.compiler.emitln.call(null,"return ",delegate_name,"(",clojure.string.join.call(null,", ",params__$1),");");
}
return cljs.compiler.emits.call(null,"})");
});
cljs.compiler.emit_fn_method = (function emit_fn_method(p__4063){
var map__4065 = p__4063;
var map__4065__$1 = ((cljs.core.seq_QMARK_.call(null,map__4065))?cljs.core.apply.call(null,cljs.core.hash_map,map__4065):map__4065);
var max_fixed_arity = cljs.core._lookup.call(null,map__4065__$1,"\uFDD0'max-fixed-arity",null);
var recurs = cljs.core._lookup.call(null,map__4065__$1,"\uFDD0'recurs",null);
var env = cljs.core._lookup.call(null,map__4065__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4065__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4065__$1,"\uFDD0'statements",null);
var params = cljs.core._lookup.call(null,map__4065__$1,"\uFDD0'params",null);
var variadic = cljs.core._lookup.call(null,map__4065__$1,"\uFDD0'variadic",null);
var name = cljs.core._lookup.call(null,map__4065__$1,"\uFDD0'name",null);
var type = cljs.core._lookup.call(null,map__4065__$1,"\uFDD0'type",null);
var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emitln.call(null,"(function ",cljs.compiler.munge.call(null,name),"(",cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,cljs.compiler.munge,params)),"){");
if(cljs.core.truth_(type))
{cljs.compiler.emitln.call(null,"var self__ = this;");
} else
{}
if(cljs.core.truth_(recurs))
{cljs.compiler.emitln.call(null,"while(true){");
} else
{}
cljs.compiler.emit_block.call(null,"\uFDD0'return",statements,ret);
if(cljs.core.truth_(recurs))
{cljs.compiler.emitln.call(null,"break;");
cljs.compiler.emitln.call(null,"}");
} else
{}
cljs.compiler.emits.call(null,"})");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
});
cljs.compiler.emit_variadic_fn_method = (function emit_variadic_fn_method(p__4069){
var map__4071 = p__4069;
var map__4071__$1 = ((cljs.core.seq_QMARK_.call(null,map__4071))?cljs.core.apply.call(null,cljs.core.hash_map,map__4071):map__4071);
var f = map__4071__$1;
var max_fixed_arity = cljs.core._lookup.call(null,map__4071__$1,"\uFDD0'max-fixed-arity",null);
var recurs = cljs.core._lookup.call(null,map__4071__$1,"\uFDD0'recurs",null);
var env = cljs.core._lookup.call(null,map__4071__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4071__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4071__$1,"\uFDD0'statements",null);
var params = cljs.core._lookup.call(null,map__4071__$1,"\uFDD0'params",null);
var variadic = cljs.core._lookup.call(null,map__4071__$1,"\uFDD0'variadic",null);
var name = cljs.core._lookup.call(null,map__4071__$1,"\uFDD0'name",null);
var type = cljs.core._lookup.call(null,map__4071__$1,"\uFDD0'type",null);
var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
var name_4072__$1 = (function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null);
}
})();
var mname_4073 = cljs.compiler.munge.call(null,name_4072__$1);
var params_4074__$1 = cljs.core.map.call(null,cljs.compiler.munge,params);
var delegate_name_4075 = [cljs.core.str(mname_4073),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.call(null,"(function() { ");
cljs.compiler.emitln.call(null,"var ",delegate_name_4075," = function (",cljs.compiler.comma_sep.call(null,params_4074__$1),"){");
if(cljs.core.truth_(recurs))
{cljs.compiler.emitln.call(null,"while(true){");
} else
{}
cljs.compiler.emit_block.call(null,"\uFDD0'return",statements,ret);
if(cljs.core.truth_(recurs))
{cljs.compiler.emitln.call(null,"break;");
cljs.compiler.emitln.call(null,"}");
} else
{}
cljs.compiler.emitln.call(null,"};");
cljs.compiler.emitln.call(null,"var ",mname_4073," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params_4074__$1),cljs.core.PersistentVector.fromArray(["\uFDD1'var_args"], true)):params_4074__$1)),"){");
if(cljs.core.truth_(type))
{cljs.compiler.emitln.call(null,"var self__ = this;");
} else
{}
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,"var ",cljs.core.last.call(null,params_4074__$1)," = null;");
cljs.compiler.emitln.call(null,"if (goog.isDef(var_args)) {");
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params_4074__$1)," = cljs.core.array_seq(Array.prototype.slice.call(arguments, ",(cljs.core.count.call(null,params_4074__$1) - 1),"),0);");
cljs.compiler.emitln.call(null,"} ");
} else
{}
cljs.compiler.emitln.call(null,"return ",delegate_name_4075,".call(",clojure.string.join.call(null,", ",cljs.core.cons.call(null,"this",params_4074__$1)),");");
cljs.compiler.emitln.call(null,"};");
cljs.compiler.emitln.call(null,mname_4073,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");
cljs.compiler.emits.call(null,mname_4073,".cljs$lang$applyTo = ");
cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,"\uFDD0'name",name_4072__$1));
cljs.compiler.emitln.call(null,";");
cljs.compiler.emitln.call(null,mname_4073,".cljs$lang$arity$variadic = ",delegate_name_4075,";");
cljs.compiler.emitln.call(null,"return ",mname_4073,";");
cljs.compiler.emitln.call(null,"})()");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'fn",(function (p__4076){
var map__4077 = p__4076;
var map__4077__$1 = ((cljs.core.seq_QMARK_.call(null,map__4077))?cljs.core.apply.call(null,cljs.core.hash_map,map__4077):map__4077);
var loop_lets = cljs.core._lookup.call(null,map__4077__$1,"\uFDD0'loop-lets",null);
var recur_frames = cljs.core._lookup.call(null,map__4077__$1,"\uFDD0'recur-frames",null);
var variadic = cljs.core._lookup.call(null,map__4077__$1,"\uFDD0'variadic",null);
var max_fixed_arity = cljs.core._lookup.call(null,map__4077__$1,"\uFDD0'max-fixed-arity",null);
var methods$ = cljs.core._lookup.call(null,map__4077__$1,"\uFDD0'methods",null);
var env = cljs.core._lookup.call(null,map__4077__$1,"\uFDD0'env",null);
var name = cljs.core._lookup.call(null,map__4077__$1,"\uFDD0'name",null);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,cljs.core.mapcat.call(null,"\uFDD0'params",cljs.core.filter.call(null,(function (p1__4066_SHARP_){
var and__3822__auto__ = p1__4066_SHARP_;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core.deref.call(null,(new cljs.core.Keyword("\uFDD0'flag")).call(null,p1__4066_SHARP_));
} else
{return and__3822__auto__;
}
}),recur_frames)),cljs.core.mapcat.call(null,"\uFDD0'params",loop_lets))));
if(loop_locals)
{if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emitln.call(null,"((function (",cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,cljs.compiler.munge,loop_locals)),"){");
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{} else
{cljs.compiler.emits.call(null,"return ");
}
} else
{}
if(cljs.core._EQ_.call(null,1,cljs.core.count.call(null,methods$)))
{if(cljs.core.truth_(variadic))
{cljs.compiler.emit_variadic_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),"\uFDD0'name",name));
} else
{cljs.compiler.emit_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),"\uFDD0'name",name));
}
} else
{var has_name_QMARK__4085 = (function (){var and__3822__auto__ = name;
if(cljs.core.truth_(and__3822__auto__))
{return true;
} else
{return and__3822__auto__;
}
})();
var name_4086__$1 = (function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null);
}
})();
var mname_4087 = cljs.compiler.munge.call(null,name_4086__$1);
var maxparams_4088 = cljs.core.map.call(null,cljs.compiler.munge,cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,"\uFDD0'params",methods$)));
var mmap_4089 = cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (method){
return cljs.core.PersistentVector.fromArray([cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str(mname_4087),cljs.core.str("__"),cljs.core.str(cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,method)))].join(''))),method], true);
}),methods$));
var ms_4090 = cljs.core.sort_by.call(null,(function (p1__4067_SHARP_){
return cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,cljs.core.second.call(null,p1__4067_SHARP_)));
}),cljs.core.seq.call(null,mmap_4089));
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emitln.call(null,"(function() {");
cljs.compiler.emitln.call(null,"var ",mname_4087," = null;");
var G__4078_4091 = cljs.core.seq.call(null,ms_4090);
while(true){
if(G__4078_4091)
{var vec__4079_4092 = cljs.core.first.call(null,G__4078_4091);
var n_4093 = cljs.core.nth.call(null,vec__4079_4092,0,null);
var meth_4094 = cljs.core.nth.call(null,vec__4079_4092,1,null);
cljs.compiler.emits.call(null,"var ",n_4093," = ");
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_4094)))
{cljs.compiler.emit_variadic_fn_method.call(null,meth_4094);
} else
{cljs.compiler.emit_fn_method.call(null,meth_4094);
}
cljs.compiler.emitln.call(null,";");
{
var G__4095 = cljs.core.next.call(null,G__4078_4091);
G__4078_4091 = G__4095;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,mname_4087," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_4088),cljs.core.PersistentVector.fromArray(["\uFDD1'var_args"], true)):maxparams_4088)),"){");
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,"var ",cljs.core.last.call(null,maxparams_4088)," = var_args;");
} else
{}
cljs.compiler.emitln.call(null,"switch(arguments.length){");
var G__4080_4096 = cljs.core.seq.call(null,ms_4090);
while(true){
if(G__4080_4096)
{var vec__4081_4097 = cljs.core.first.call(null,G__4080_4096);
var n_4098 = cljs.core.nth.call(null,vec__4081_4097,0,null);
var meth_4099 = cljs.core.nth.call(null,vec__4081_4097,1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_4099)))
{cljs.compiler.emitln.call(null,"default:");
cljs.compiler.emitln.call(null,"return ",n_4098,".cljs$lang$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_4088)),(((cljs.core.count.call(null,maxparams_4088) > 1))?", ":null),"cljs.core.array_seq(arguments, ",max_fixed_arity,"));");
} else
{var pcnt_4100 = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,meth_4099));
cljs.compiler.emitln.call(null,"case ",pcnt_4100,":");
cljs.compiler.emitln.call(null,"return ",n_4098,".call(this",(((pcnt_4100 === 0))?null:cljs.core.list.call(null,",",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_4100,maxparams_4088)))),");");
}
{
var G__4101 = cljs.core.next.call(null,G__4080_4096);
G__4080_4096 = G__4101;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,"}");
cljs.compiler.emitln.call(null,"throw(new Error('Invalid arity: ' + arguments.length));");
cljs.compiler.emitln.call(null,"};");
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,mname_4087,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");
cljs.compiler.emitln.call(null,mname_4087,".cljs$lang$applyTo = ",cljs.core.some.call(null,(function (p1__4068_SHARP_){
var vec__4082 = p1__4068_SHARP_;
var n = cljs.core.nth.call(null,vec__4082,0,null);
var m = cljs.core.nth.call(null,vec__4082,1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,m)))
{return n;
} else
{return null;
}
}),ms_4090),".cljs$lang$applyTo;");
} else
{}
if(cljs.core.truth_(has_name_QMARK__4085))
{var G__4083_4102 = cljs.core.seq.call(null,ms_4090);
while(true){
if(G__4083_4102)
{var vec__4084_4103 = cljs.core.first.call(null,G__4083_4102);
var n_4104 = cljs.core.nth.call(null,vec__4084_4103,0,null);
var meth_4105 = cljs.core.nth.call(null,vec__4084_4103,1,null);
var c_4106 = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,meth_4105));
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_4105)))
{cljs.compiler.emitln.call(null,mname_4087,".cljs$lang$arity$variadic = ",n_4104,".cljs$lang$arity$variadic;");
} else
{cljs.compiler.emitln.call(null,mname_4087,".cljs$lang$arity$",c_4106," = ",n_4104,";");
}
{
var G__4107 = cljs.core.next.call(null,G__4083_4102);
G__4083_4102 = G__4107;
continue;
}
} else
{}
break;
}
} else
{}
cljs.compiler.emitln.call(null,"return ",mname_4087,";");
cljs.compiler.emitln.call(null,"})()");
}
if(loop_locals)
{return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else
{return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'do",(function (p__4108){
var map__4109 = p__4108;
var map__4109__$1 = ((cljs.core.seq_QMARK_.call(null,map__4109))?cljs.core.apply.call(null,cljs.core.hash_map,map__4109):map__4109);
var env = cljs.core._lookup.call(null,map__4109__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4109__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4109__$1,"\uFDD0'statements",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core.truth_((function (){var and__3822__auto__ = statements;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,"\uFDD0'expr",context);
} else
{return and__3822__auto__;
}
})()))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
cljs.compiler.emit_block.call(null,context,statements,ret);
if(cljs.core.truth_((function (){var and__3822__auto__ = statements;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,"\uFDD0'expr",context);
} else
{return and__3822__auto__;
}
})()))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'try*",(function (p__4111){
var map__4112 = p__4111;
var map__4112__$1 = ((cljs.core.seq_QMARK_.call(null,map__4112))?cljs.core.apply.call(null,cljs.core.hash_map,map__4112):map__4112);
var finally$ = cljs.core._lookup.call(null,map__4112__$1,"\uFDD0'finally",null);
var name = cljs.core._lookup.call(null,map__4112__$1,"\uFDD0'name",null);
var catch$ = cljs.core._lookup.call(null,map__4112__$1,"\uFDD0'catch",null);
var try$ = cljs.core._lookup.call(null,map__4112__$1,"\uFDD0'try",null);
var env = cljs.core._lookup.call(null,map__4112__$1,"\uFDD0'env",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
var subcontext = ((cljs.core._EQ_.call(null,"\uFDD0'expr",context))?"\uFDD0'return":context);
if(cljs.core.truth_((function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return finally$;
}
})()))
{if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
cljs.compiler.emits.call(null,"try{");
var map__4113_4117 = try$;
var map__4113_4118__$1 = ((cljs.core.seq_QMARK_.call(null,map__4113_4117))?cljs.core.apply.call(null,cljs.core.hash_map,map__4113_4117):map__4113_4117);
var ret_4119 = cljs.core._lookup.call(null,map__4113_4118__$1,"\uFDD0'ret",null);
var statements_4120 = cljs.core._lookup.call(null,map__4113_4118__$1,"\uFDD0'statements",null);
cljs.compiler.emit_block.call(null,subcontext,statements_4120,ret_4119);
cljs.compiler.emits.call(null,"}");
if(cljs.core.truth_(name))
{cljs.compiler.emits.call(null,"catch (",cljs.compiler.munge.call(null,name),"){");
if(cljs.core.truth_(catch$))
{var map__4114_4121 = catch$;
var map__4114_4122__$1 = ((cljs.core.seq_QMARK_.call(null,map__4114_4121))?cljs.core.apply.call(null,cljs.core.hash_map,map__4114_4121):map__4114_4121);
var ret_4123 = cljs.core._lookup.call(null,map__4114_4122__$1,"\uFDD0'ret",null);
var statements_4124 = cljs.core._lookup.call(null,map__4114_4122__$1,"\uFDD0'statements",null);
cljs.compiler.emit_block.call(null,subcontext,statements_4124,ret_4123);
} else
{}
cljs.compiler.emits.call(null,"}");
} else
{}
if(cljs.core.truth_(finally$))
{var map__4115_4125 = finally$;
var map__4115_4126__$1 = ((cljs.core.seq_QMARK_.call(null,map__4115_4125))?cljs.core.apply.call(null,cljs.core.hash_map,map__4115_4125):map__4115_4125);
var ret_4127 = cljs.core._lookup.call(null,map__4115_4126__$1,"\uFDD0'ret",null);
var statements_4128 = cljs.core._lookup.call(null,map__4115_4126__$1,"\uFDD0'statements",null);
if(cljs.core.not_EQ_.call(null,"\uFDD0'constant",(new cljs.core.Keyword("\uFDD0'op")).call(null,ret_4127)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("finally block cannot contain constant"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not=","\uFDD0'constant",cljs.core.with_meta(cljs.core.list("\uFDD0'op","\uFDD1'ret"),cljs.core.hash_map("\uFDD0'line",578))),cljs.core.hash_map("\uFDD0'line",578))))].join('')));
}
cljs.compiler.emits.call(null,"finally {");
cljs.compiler.emit_block.call(null,subcontext,statements_4128,ret_4127);
cljs.compiler.emits.call(null,"}");
} else
{}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
} else
{var map__4116 = try$;
var map__4116__$1 = ((cljs.core.seq_QMARK_.call(null,map__4116))?cljs.core.apply.call(null,cljs.core.hash_map,map__4116):map__4116);
var ret = cljs.core._lookup.call(null,map__4116__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4116__$1,"\uFDD0'statements",null);
if(cljs.core.truth_((function (){var and__3822__auto__ = statements;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,"\uFDD0'expr",context);
} else
{return and__3822__auto__;
}
})()))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
cljs.compiler.emit_block.call(null,subcontext,statements,ret);
if(cljs.core.truth_((function (){var and__3822__auto__ = statements;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,"\uFDD0'expr",context);
} else
{return and__3822__auto__;
}
})()))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'let",(function (p__4129){
var map__4130 = p__4129;
var map__4130__$1 = ((cljs.core.seq_QMARK_.call(null,map__4130))?cljs.core.apply.call(null,cljs.core.hash_map,map__4130):map__4130);
var loop = cljs.core._lookup.call(null,map__4130__$1,"\uFDD0'loop",null);
var env = cljs.core._lookup.call(null,map__4130__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4130__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4130__$1,"\uFDD0'statements",null);
var bindings = cljs.core._lookup.call(null,map__4130__$1,"\uFDD0'bindings",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
var _STAR_lexical_renames_STAR_4131_4135 = cljs.compiler._STAR_lexical_renames_STAR_;
try{cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,"\uFDD0'statement",context))?cljs.core.map.call(null,(function (p1__4110_SHARP_){
return cljs.core.vector.call(null,cljs.core.hash.call(null,p1__4110_SHARP_),cljs.core.gensym.call(null,[cljs.core.str((new cljs.core.Keyword("\uFDD0'name")).call(null,p1__4110_SHARP_)),cljs.core.str("-")].join('')));
}),bindings):null));
var G__4133_4136 = cljs.core.seq.call(null,bindings);
while(true){
if(G__4133_4136)
{var map__4134_4137 = cljs.core.first.call(null,G__4133_4136);
var map__4134_4138__$1 = ((cljs.core.seq_QMARK_.call(null,map__4134_4137))?cljs.core.apply.call(null,cljs.core.hash_map,map__4134_4137):map__4134_4137);
var binding_4139 = map__4134_4138__$1;
var init_4140 = cljs.core._lookup.call(null,map__4134_4138__$1,"\uFDD0'init",null);
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_4139)," = ",init_4140,";");
{
var G__4141 = cljs.core.next.call(null,G__4133_4136);
G__4133_4136 = G__4141;
continue;
}
} else
{}
break;
}
if(cljs.core.truth_(loop))
{cljs.compiler.emitln.call(null,"while(true){");
} else
{}
cljs.compiler.emit_block.call(null,((cljs.core._EQ_.call(null,"\uFDD0'expr",context))?"\uFDD0'return":context),statements,ret);
if(cljs.core.truth_(loop))
{cljs.compiler.emitln.call(null,"break;");
cljs.compiler.emitln.call(null,"}");
} else
{}
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_4131_4135;
}if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'recur",(function (p__4142){
var map__4143 = p__4142;
var map__4143__$1 = ((cljs.core.seq_QMARK_.call(null,map__4143))?cljs.core.apply.call(null,cljs.core.hash_map,map__4143):map__4143);
var env = cljs.core._lookup.call(null,map__4143__$1,"\uFDD0'env",null);
var exprs = cljs.core._lookup.call(null,map__4143__$1,"\uFDD0'exprs",null);
var frame = cljs.core._lookup.call(null,map__4143__$1,"\uFDD0'frame",null);
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = (new cljs.core.Keyword("\uFDD0'params")).call(null,frame);
cljs.compiler.emitln.call(null,"{");
var n__2166__auto___4144 = cljs.core.count.call(null,exprs);
var i_4145 = 0;
while(true){
if((i_4145 < n__2166__auto___4144))
{cljs.compiler.emitln.call(null,"var ",temps.call(null,i_4145)," = ",exprs.call(null,i_4145),";");
{
var G__4146 = (i_4145 + 1);
i_4145 = G__4146;
continue;
}
} else
{}
break;
}
var n__2166__auto___4147 = cljs.core.count.call(null,exprs);
var i_4148 = 0;
while(true){
if((i_4148 < n__2166__auto___4147))
{cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_4148))," = ",temps.call(null,i_4148),";");
{
var G__4149 = (i_4148 + 1);
i_4148 = G__4149;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,"continue;");
return cljs.compiler.emitln.call(null,"}");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'letfn",(function (p__4150){
var map__4151 = p__4150;
var map__4151__$1 = ((cljs.core.seq_QMARK_.call(null,map__4151))?cljs.core.apply.call(null,cljs.core.hash_map,map__4151):map__4151);
var env = cljs.core._lookup.call(null,map__4151__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4151__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4151__$1,"\uFDD0'statements",null);
var bindings = cljs.core._lookup.call(null,map__4151__$1,"\uFDD0'bindings",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
var G__4152_4154 = cljs.core.seq.call(null,bindings);
while(true){
if(G__4152_4154)
{var map__4153_4155 = cljs.core.first.call(null,G__4152_4154);
var map__4153_4156__$1 = ((cljs.core.seq_QMARK_.call(null,map__4153_4155))?cljs.core.apply.call(null,cljs.core.hash_map,map__4153_4155):map__4153_4155);
var binding_4157 = map__4153_4156__$1;
var init_4158 = cljs.core._lookup.call(null,map__4153_4156__$1,"\uFDD0'init",null);
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_4157)," = ",init_4158,";");
{
var G__4159 = cljs.core.next.call(null,G__4152_4154);
G__4152_4154 = G__4159;
continue;
}
} else
{}
break;
}
cljs.compiler.emit_block.call(null,((cljs.core._EQ_.call(null,"\uFDD0'expr",context))?"\uFDD0'return":context),statements,ret);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
}));
cljs.compiler.protocol_prefix = (function protocol_prefix(psym){
return cljs.core.symbol.call(null,[cljs.core.str([cljs.core.str(psym)].join('').replace(".","$").replace("/","$")),cljs.core.str("$")].join(''));
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'invoke",(function (p__4160){
var map__4161 = p__4160;
var map__4161__$1 = ((cljs.core.seq_QMARK_.call(null,map__4161))?cljs.core.apply.call(null,cljs.core.hash_map,map__4161):map__4161);
var expr = map__4161__$1;
var env = cljs.core._lookup.call(null,map__4161__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__4161__$1,"\uFDD0'args",null);
var f = cljs.core._lookup.call(null,map__4161__$1,"\uFDD0'f",null);
var info = (new cljs.core.Keyword("\uFDD0'info")).call(null,f);
var fn_QMARK_ = (function (){var and__3822__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__3822__auto__))
{var and__3822__auto____$1 = cljs.core.not.call(null,(new cljs.core.Keyword("\uFDD0'dynamic")).call(null,info));
if(and__3822__auto____$1)
{return (new cljs.core.Keyword("\uFDD0'fn-var")).call(null,info);
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
})();
var protocol = (new cljs.core.Keyword("\uFDD0'protocol")).call(null,info);
var proto_QMARK_ = (function (){var tag = cljs.compiler.infer_tag.call(null,cljs.core.first.call(null,(new cljs.core.Keyword("\uFDD0'args")).call(null,expr)));
var and__3822__auto__ = protocol;
if(cljs.core.truth_(and__3822__auto__))
{var and__3822__auto____$1 = tag;
if(cljs.core.truth_(and__3822__auto____$1))
{var and__3822__auto____$2 = (function (){var or__3824__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return (new cljs.core.Keyword("\uFDD0'protocol-inline")).call(null,env);
}
})();
if(cljs.core.truth_(and__3822__auto____$2))
{var or__3824__auto__ = cljs.core._EQ_.call(null,protocol,tag);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var temp__3974__auto__ = (new cljs.core.Keyword("\uFDD0'protocols")).call(null,cljs.analyzer.resolve_existing_var.call(null,cljs.core.dissoc.call(null,env,"\uFDD0'locals"),tag));
if(cljs.core.truth_(temp__3974__auto__))
{var ps = temp__3974__auto__;
return ps.call(null,protocol);
} else
{return null;
}
}
} else
{return and__3822__auto____$2;
}
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
})();
var opt_not_QMARK_ = (function (){var and__3822__auto__ = cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'name")).call(null,info),"\uFDD1'cljs.core/not");
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,cljs.compiler.infer_tag.call(null,cljs.core.first.call(null,(new cljs.core.Keyword("\uFDD0'args")).call(null,expr))),"\uFDD1'boolean");
} else
{return and__3822__auto__;
}
})();
var ns = (new cljs.core.Keyword("\uFDD0'ns")).call(null,info);
var js_QMARK_ = cljs.core._EQ_.call(null,ns,"\uFDD1'js");
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__3824__auto__ = cljs.core._EQ_.call(null,ns,"\uFDD1'goog");
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var temp__3974__auto__ = [cljs.core.str(ns)].join('');
if(cljs.core.truth_(temp__3974__auto__))
{var ns_str = temp__3974__auto__;
return cljs.core._EQ_.call(null,cljs.core._lookup.call(null,clojure.string.split.call(null,ns_str,/\./),0,null),"goog");
} else
{return null;
}
}
})():null);
var keyword_QMARK_ = (function (){var and__3822__auto__ = cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'op")).call(null,f),"\uFDD0'constant");
if(and__3822__auto__)
{return cljs.core.keyword_QMARK_.call(null,(new cljs.core.Keyword("\uFDD0'form")).call(null,f));
} else
{return and__3822__auto__;
}
})();
var vec__4162 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
var variadic_QMARK_ = (new cljs.core.Keyword("\uFDD0'variadic")).call(null,info);
var mps = (new cljs.core.Keyword("\uFDD0'method-params")).call(null,info);
var mfa = (new cljs.core.Keyword("\uFDD0'max-fixed-arity")).call(null,info);
if((function (){var and__3822__auto__ = cljs.core.not.call(null,variadic_QMARK_);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,cljs.core.count.call(null,mps),1);
} else
{return and__3822__auto__;
}
})())
{return cljs.core.PersistentVector.fromArray([f,null], true);
} else
{if(cljs.core.truth_((function (){var and__3822__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__3822__auto__))
{return (arity > mfa);
} else
{return and__3822__auto__;
}
})()))
{return cljs.core.PersistentVector.fromArray([cljs.core.update_in.call(null,f,cljs.core.PersistentVector.fromArray(["\uFDD0'info","\uFDD0'name"], true),(function (name){
return cljs.core.symbol.call(null,[cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str(".cljs$lang$arity$variadic")].join(''));
})),cljs.core.ObjMap.fromObject(["\uFDD0'max-fixed-arity"],{"\uFDD0'max-fixed-arity":mfa})], true);
} else
{if("\uFDD0'else")
{var arities = cljs.core.map.call(null,cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([arity]),arities)))
{return cljs.core.PersistentVector.fromArray([cljs.core.update_in.call(null,f,cljs.core.PersistentVector.fromArray(["\uFDD0'info","\uFDD0'name"], true),(function (name){
return cljs.core.symbol.call(null,[cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str(".cljs$lang$arity$"),cljs.core.str(arity)].join(''));
})),null], true);
} else
{return cljs.core.PersistentVector.fromArray([f,null], true);
}
} else
{return null;
}
}
}
})():cljs.core.PersistentVector.fromArray([f,null], true));
var f__$1 = cljs.core.nth.call(null,vec__4162,0,null);
var variadic_invoke = cljs.core.nth.call(null,vec__4162,1,null);
var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(opt_not_QMARK_))
{cljs.compiler.emits.call(null,"!(",cljs.core.first.call(null,args),")");
} else
{if(cljs.core.truth_(proto_QMARK_))
{var pimpl_4163 = [cljs.core.str(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str(cljs.compiler.munge.call(null,cljs.core.name.call(null,(new cljs.core.Keyword("\uFDD0'name")).call(null,info)))),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_4163,"(",cljs.compiler.comma_sep.call(null,args),")");
} else
{if(cljs.core.truth_(keyword_QMARK_))
{cljs.compiler.emits.call(null,"(new cljs.core.Keyword(",f__$1,")).call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
} else
{if(cljs.core.truth_(variadic_invoke))
{var mfa_4164 = (new cljs.core.Keyword("\uFDD0'max-fixed-arity")).call(null,variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_4164,args)),(((mfa_4164 === 0))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_4164,args)),"], 0))");
} else
{if(cljs.core.truth_((function (){var or__3824__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = js_QMARK_;
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{return goog_QMARK_;
}
}
})()))
{cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,args),")");
} else
{if("\uFDD0'else")
{if(cljs.core.truth_((function (){var and__3822__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'op")).call(null,f__$1),"\uFDD0'var");
} else
{return and__3822__auto__;
}
})()))
{var fprop_4165 = [cljs.core.str(".cljs$lang$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,"(",f__$1,fprop_4165," ? ",f__$1,fprop_4165,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
} else
{cljs.compiler.emits.call(null,f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
}
} else
{}
}
}
}
}
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'new",(function (p__4166){
var map__4167 = p__4166;
var map__4167__$1 = ((cljs.core.seq_QMARK_.call(null,map__4167))?cljs.core.apply.call(null,cljs.core.hash_map,map__4167):map__4167);
var env = cljs.core._lookup.call(null,map__4167__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__4167__$1,"\uFDD0'args",null);
var ctor = cljs.core._lookup.call(null,map__4167__$1,"\uFDD0'ctor",null);
var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'set!",(function (p__4168){
var map__4169 = p__4168;
var map__4169__$1 = ((cljs.core.seq_QMARK_.call(null,map__4169))?cljs.core.apply.call(null,cljs.core.hash_map,map__4169):map__4169);
var env = cljs.core._lookup.call(null,map__4169__$1,"\uFDD0'env",null);
var val = cljs.core._lookup.call(null,map__4169__$1,"\uFDD0'val",null);
var target = cljs.core._lookup.call(null,map__4169__$1,"\uFDD0'target",null);
var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,target," = ",val);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'ns",(function (p__4170){
var map__4171 = p__4170;
var map__4171__$1 = ((cljs.core.seq_QMARK_.call(null,map__4171))?cljs.core.apply.call(null,cljs.core.hash_map,map__4171):map__4171);
var env = cljs.core._lookup.call(null,map__4171__$1,"\uFDD0'env",null);
var requires_macros = cljs.core._lookup.call(null,map__4171__$1,"\uFDD0'requires-macros",null);
var uses = cljs.core._lookup.call(null,map__4171__$1,"\uFDD0'uses",null);
var requires = cljs.core._lookup.call(null,map__4171__$1,"\uFDD0'requires",null);
var name = cljs.core._lookup.call(null,map__4171__$1,"\uFDD0'name",null);
cljs.core.swap_BANG_.call(null,cljs.compiler.ns_first_segments,cljs.core.conj,cljs.core.first.call(null,clojure.string.split.call(null,[cljs.core.str(name)].join(''),/\./)));
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,name),"');");
if(cljs.core._EQ_.call(null,name,"\uFDD1'cljs.core"))
{} else
{cljs.compiler.emitln.call(null,"goog.require('cljs.core');");
}
var G__4172 = cljs.core.seq.call(null,cljs.core.into.call(null,cljs.core.vals.call(null,requires),cljs.core.distinct.call(null,cljs.core.vals.call(null,uses))));
while(true){
if(G__4172)
{var lib = cljs.core.first.call(null,G__4172);
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib),"');");
{
var G__4173 = cljs.core.next.call(null,G__4172);
G__4172 = G__4173;
continue;
}
} else
{return null;
}
break;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'deftype*",(function (p__4174){
var map__4175 = p__4174;
var map__4175__$1 = ((cljs.core.seq_QMARK_.call(null,map__4175))?cljs.core.apply.call(null,cljs.core.hash_map,map__4175):map__4175);
var pmasks = cljs.core._lookup.call(null,map__4175__$1,"\uFDD0'pmasks",null);
var fields = cljs.core._lookup.call(null,map__4175__$1,"\uFDD0'fields",null);
var t = cljs.core._lookup.call(null,map__4175__$1,"\uFDD0't",null);
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emit_provide.call(null,t);
cljs.compiler.emitln.call(null,"");
cljs.compiler.emitln.call(null,"/**");
cljs.compiler.emitln.call(null,"* @constructor");
cljs.compiler.emitln.call(null,"*/");
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");
var G__4176_4179 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__4176_4179)
{var fld_4180 = cljs.core.first.call(null,G__4176_4179);
cljs.compiler.emitln.call(null,"this.",fld_4180," = ",fld_4180,";");
{
var G__4181 = cljs.core.next.call(null,G__4176_4179);
G__4176_4179 = G__4181;
continue;
}
} else
{}
break;
}
var G__4177_4182 = cljs.core.seq.call(null,pmasks);
while(true){
if(G__4177_4182)
{var vec__4178_4183 = cljs.core.first.call(null,G__4177_4182);
var pno_4184 = cljs.core.nth.call(null,vec__4178_4183,0,null);
var pmask_4185 = cljs.core.nth.call(null,vec__4178_4183,1,null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_4184,"$ = ",pmask_4185,";");
{
var G__4186 = cljs.core.next.call(null,G__4177_4182);
G__4177_4182 = G__4186;
continue;
}
} else
{}
break;
}
return cljs.compiler.emitln.call(null,"})");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'defrecord*",(function (p__4187){
var map__4188 = p__4187;
var map__4188__$1 = ((cljs.core.seq_QMARK_.call(null,map__4188))?cljs.core.apply.call(null,cljs.core.hash_map,map__4188):map__4188);
var pmasks = cljs.core._lookup.call(null,map__4188__$1,"\uFDD0'pmasks",null);
var fields = cljs.core._lookup.call(null,map__4188__$1,"\uFDD0'fields",null);
var t = cljs.core._lookup.call(null,map__4188__$1,"\uFDD0't",null);
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),cljs.core.vec(["\uFDD1'__meta","\uFDD1'__extmap"]));
cljs.compiler.emit_provide.call(null,t);
cljs.compiler.emitln.call(null,"");
cljs.compiler.emitln.call(null,"/**");
cljs.compiler.emitln.call(null,"* @constructor");
var G__4189_4193 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__4189_4193)
{var fld_4194 = cljs.core.first.call(null,G__4189_4193);
cljs.compiler.emitln.call(null,"* @param {*} ",fld_4194);
{
var G__4195 = cljs.core.next.call(null,G__4189_4193);
G__4189_4193 = G__4195;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,"* @param {*=} __meta ");
cljs.compiler.emitln.call(null,"* @param {*=} __extmap");
cljs.compiler.emitln.call(null,"*/");
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");
var G__4190_4196 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__4190_4196)
{var fld_4197 = cljs.core.first.call(null,G__4190_4196);
cljs.compiler.emitln.call(null,"this.",fld_4197," = ",fld_4197,";");
{
var G__4198 = cljs.core.next.call(null,G__4190_4196);
G__4190_4196 = G__4198;
continue;
}
} else
{}
break;
}
var G__4191_4199 = cljs.core.seq.call(null,pmasks);
while(true){
if(G__4191_4199)
{var vec__4192_4200 = cljs.core.first.call(null,G__4191_4199);
var pno_4201 = cljs.core.nth.call(null,vec__4192_4200,0,null);
var pmask_4202 = cljs.core.nth.call(null,vec__4192_4200,1,null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_4201,"$ = ",pmask_4202,";");
{
var G__4203 = cljs.core.next.call(null,G__4191_4199);
G__4191_4199 = G__4203;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,"if(arguments.length>",(cljs.core.count.call(null,fields__$1) - 2),"){");
cljs.compiler.emitln.call(null,"this.__meta = __meta;");
cljs.compiler.emitln.call(null,"this.__extmap = __extmap;");
cljs.compiler.emitln.call(null,"} else {");
cljs.compiler.emits.call(null,"this.__meta=");
cljs.compiler.emit_constant.call(null,null);
cljs.compiler.emitln.call(null,";");
cljs.compiler.emits.call(null,"this.__extmap=");
cljs.compiler.emit_constant.call(null,null);
cljs.compiler.emitln.call(null,";");
cljs.compiler.emitln.call(null,"}");
return cljs.compiler.emitln.call(null,"})");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'dot",(function (p__4204){
var map__4205 = p__4204;
var map__4205__$1 = ((cljs.core.seq_QMARK_.call(null,map__4205))?cljs.core.apply.call(null,cljs.core.hash_map,map__4205):map__4205);
var env = cljs.core._lookup.call(null,map__4205__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__4205__$1,"\uFDD0'args",null);
var method = cljs.core._lookup.call(null,map__4205__$1,"\uFDD0'method",null);
var field = cljs.core._lookup.call(null,map__4205__$1,"\uFDD0'field",null);
var target = cljs.core._lookup.call(null,map__4205__$1,"\uFDD0'target",null);
var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(field))
{cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else
{cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'js",(function (p__4206){
var map__4207 = p__4206;
var map__4207__$1 = ((cljs.core.seq_QMARK_.call(null,map__4207))?cljs.core.apply.call(null,cljs.core.hash_map,map__4207):map__4207);
var args = cljs.core._lookup.call(null,map__4207__$1,"\uFDD0'args",null);
var segs = cljs.core._lookup.call(null,map__4207__$1,"\uFDD0'segs",null);
var code = cljs.core._lookup.call(null,map__4207__$1,"\uFDD0'code",null);
var env = cljs.core._lookup.call(null,map__4207__$1,"\uFDD0'env",null);
var env__2788__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(code))
{cljs.compiler.emits.call(null,code);
} else
{cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,cljs.core.PersistentVector.fromArray([null], true))));
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2788__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));

// Analyzer namespace snapshot:
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.assoc,"\uFDD1'cljs.compiler",cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map("\uFDD1'cljs-reserved-file-names",cljs.core.hash_map("\uFDD0'line",40,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name","\uFDD1'cljs.compiler/cljs-reserved-file-names"),"\uFDD1'get-tag",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'e"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'e","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/get-tag","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",328,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-apply-to",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec(["\uFDD1'name","\uFDD1'params","\uFDD1'env"]))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'p__4039","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-apply-to","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",400,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'escape-char",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'c"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'c","\uFDD0'tag","\uFDD1'Character","\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/escape-char","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",103,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'*lexical-renames*",cljs.core.hash_map("\uFDD0'line",39,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name","\uFDD1'cljs.compiler/*lexical-renames*"),"\uFDD1'infer-tag",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'e"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'e","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/infer-tag","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",332,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-provide",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'sym"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'sym","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-provide","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",160,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-constant-set",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-constant-set","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",195,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'munge",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1's"]),cljs.core.vec(["\uFDD1's","\uFDD1'reserved"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'reserved","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/munge","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",72,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-meta-constant",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x","\uFDD1'&","\uFDD1'body"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'body","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-meta-constant","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",166,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'ns-first-segments",cljs.core.hash_map("\uFDD0'line",43,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name","\uFDD1'cljs.compiler/ns-first-segments"),"\uFDD1'js-reserved",cljs.core.hash_map("\uFDD0'line",23,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name","\uFDD1'cljs.compiler/js-reserved"),"\uFDD1'safe-test?",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'e"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'e","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/safe-test?","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",347,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emitln",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'&","\uFDD1'xs"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'xs","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emitln","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",145,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'array-map-threshold",cljs.core.hash_map("\uFDD0'line",274,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'private",true,"\uFDD0'name","\uFDD1'cljs.compiler/array-map-threshold"),"\uFDD1'escape-string",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1's"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag","\uFDD1'CharSequence","\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/escape-string","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",119,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-constant-keyword",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-constant-keyword","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",174,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-constant",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'protocol","\uFDD1'cljs.compiler/EmitConstant","\uFDD0'name","\uFDD1'cljs.compiler/emit-constant","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",201,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-block",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'context","\uFDD1'statements","\uFDD1'ret"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'context","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'statements","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'ret","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-block","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",246,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-variadic-fn-method",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec(["\uFDD1'type","\uFDD1'name","\uFDD1'variadic","\uFDD1'params","\uFDD1'statements","\uFDD1'ret","\uFDD1'env","\uFDD1'recurs","\uFDD1'max-fixed-arity"]),"\uFDD0'as","\uFDD1'f")]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'p__4069","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-variadic-fn-method","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",440,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'*emitted-provides*",cljs.core.hash_map("\uFDD0'line",38,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name","\uFDD1'cljs.compiler/*emitted-provides*"),"\uFDD1'emit-fn-method",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec(["\uFDD1'type","\uFDD1'name","\uFDD1'variadic","\uFDD1'params","\uFDD1'statements","\uFDD1'ret","\uFDD1'env","\uFDD1'recurs","\uFDD1'max-fixed-arity"]))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'p__4063","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-fn-method","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",427,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'EmitConstant",cljs.core.hash_map("\uFDD0'line",201,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'protocol-symbol",true,"\uFDD0'name","\uFDD1'cljs.compiler/EmitConstant"),"\uFDD1'*position*",cljs.core.hash_map("\uFDD0'line",37,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name","\uFDD1'cljs.compiler/*position*"),"\uFDD1'emit-str",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'expr"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'expr","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-str","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",157,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'tag","\uFDD1'String"),"\uFDD1'comma-sep",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'xs"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'xs","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/comma-sep","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",100,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-constant-symbol",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-constant-symbol","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",181,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'protocol-prefix",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'psym"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'psym","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/protocol-prefix","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",628,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'obj-map-threshold",cljs.core.hash_map("\uFDD0'line",275,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'private",true,"\uFDD0'name","\uFDD1'cljs.compiler/obj-map-threshold"),"\uFDD1'emit-comment",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'doc","\uFDD1'jsdoc"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'doc","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'jsdoc","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-comment","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Emit a nicely formatted comment string.","\uFDD0'line",374,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emits",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'&","\uFDD1'xs"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'xs","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emits","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",127,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-constant-map",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-constant-map","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",188,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'wrap-in-double-quotes",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/wrap-in-double-quotes","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",122,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'CHAR_MAP",cljs.core.hash_map("\uFDD0'line",46,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name","\uFDD1'cljs.compiler/CHAR_MAP"),"\uFDD1'emit",cljs.core.hash_map("\uFDD0'line",125,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name","\uFDD1'cljs.compiler/emit")),"\uFDD0'imports",null,"\uFDD0'uses-macros",cljs.core.hash_map("\uFDD1'emit-wrap","\uFDD1'cljs.compiler-macros"),"\uFDD0'requires",cljs.core.hash_map("\uFDD1'ana","\uFDD1'cljs.analyzer","\uFDD1'string","\uFDD1'clojure.string"),"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set(["\uFDD1'munge","\uFDD1'macroexpand-1","\uFDD1'protocol-prefix"]),"\uFDD0'doc",null,"\uFDD0'name","\uFDD1'cljs.compiler"));
