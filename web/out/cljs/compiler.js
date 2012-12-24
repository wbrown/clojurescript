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
{var map__4190 = s;
var map__4190__$1 = ((cljs.core.seq_QMARK_.call(null,map__4190))?cljs.core.apply.call(null,cljs.core.hash_map,map__4190):map__4190);
var info = map__4190__$1;
var field = cljs.core._lookup.call(null,map__4190__$1,"\uFDD0'field",null);
var name = cljs.core._lookup.call(null,map__4190__$1,"\uFDD0'name",null);
var depth = (function (){var d = 0;
var G__4192 = info;
var map__4193 = G__4192;
var map__4193__$1 = ((cljs.core.seq_QMARK_.call(null,map__4193))?cljs.core.apply.call(null,cljs.core.hash_map,map__4193):map__4193);
var shadow = cljs.core._lookup.call(null,map__4193__$1,"\uFDD0'shadow",null);
var d__$1 = d;
var G__4192__$1 = G__4192;
while(true){
var d__$2 = d__$1;
var map__4194 = G__4192__$1;
var map__4194__$1 = ((cljs.core.seq_QMARK_.call(null,map__4194))?cljs.core.apply.call(null,cljs.core.hash_map,map__4194):map__4194);
var shadow__$1 = cljs.core._lookup.call(null,map__4194__$1,"\uFDD0'shadow",null);
if(cljs.core.truth_(shadow__$1))
{{
var G__4195 = (d__$2 + 1);
var G__4196 = shadow__$1;
d__$1 = G__4195;
G__4192__$1 = G__4196;
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
var ss__$1 = clojure.string.join.call(null,".",cljs.core.map.call(null,(function (p1__4183_SHARP_){
if(cljs.core.truth_(reserved.call(null,p1__4183_SHARP_)))
{return [cljs.core.str(p1__4183_SHARP_),cljs.core.str("$")].join('');
} else
{return p1__4183_SHARP_;
}
}),clojure.string.split.call(null,ss,/[.]/)));
var ms = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__4184_SHARP_){
return cljs.core._lookup.call(null,cljs.compiler.CHAR_MAP,p1__4184_SHARP_,p1__4184_SHARP_);
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
var G__4199 = cp;
if(cljs.core._EQ_.call(null,9,G__4199))
{return "\\t";
} else
{if(cljs.core._EQ_.call(null,13,G__4199))
{return "\\r";
} else
{if(cljs.core._EQ_.call(null,10,G__4199))
{return "\\n";
} else
{if(cljs.core._EQ_.call(null,12,G__4199))
{return "\\f";
} else
{if(cljs.core._EQ_.call(null,8,G__4199))
{return "\\b";
} else
{if(cljs.core._EQ_.call(null,92,G__4199))
{return "\\\\";
} else
{if(cljs.core._EQ_.call(null,34,G__4199))
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
return cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__4197_SHARP_){
return cljs.compiler.escape_char.call(null,p1__4197_SHARP_);
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
var G__4203_4206 = cljs.core.seq.call(null,xs);
while(true){
if(G__4203_4206)
{var x_4207 = cljs.core.first.call(null,G__4203_4206);
if((x_4207 == null))
{} else
{if(cljs.core.map_QMARK_.call(null,x_4207))
{cljs.compiler.emit.call(null,x_4207);
} else
{if(cljs.core.seq_QMARK_.call(null,x_4207))
{cljs.core.apply.call(null,emits,x_4207);
} else
{if(cljs.core.fn_QMARK_.call(null,x_4207))
{x_4207.call(null);
} else
{if("\uFDD0'else")
{var s_4208 = cljs.core.print_str.call(null,x_4207);
if(cljs.core.truth_(cljs.compiler._STAR_position_STAR_))
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_position_STAR_,((function (G__4203_4206,s_4208,x_4207){
return (function (p__4204){
var vec__4205 = p__4204;
var line = cljs.core.nth.call(null,vec__4205,0,null);
var column = cljs.core.nth.call(null,vec__4205,1,null);
return cljs.core.PersistentVector.fromArray([line,(column + cljs.core.count.call(null,s_4208))], true);
});})(G__4203_4206,s_4208,x_4207))
);
} else
{}
cljs.core.print.call(null,s_4208);
} else
{}
}
}
}
}
{
var G__4209 = cljs.core.next.call(null,G__4203_4206);
G__4203_4206 = G__4209;
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
emits.cljs$lang$applyTo = (function (arglist__4210){
var xs = cljs.core.seq(arglist__4210);;
return emits__delegate(xs);
});
emits.cljs$lang$arity$variadic = emits__delegate;
return emits;
})()
;
cljs.compiler.emit_str = (function emit_str(expr){
var sb__2216__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_4213_4215 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2217__auto__){
return sb__2216__auto__.append(x__2217__auto__);
});
cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_4213_4215;
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
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_position_STAR_,(function (p__4218){
var vec__4219 = p__4218;
var line = cljs.core.nth.call(null,vec__4219,0,null);
var column = cljs.core.nth.call(null,vec__4219,1,null);
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
emitln.cljs$lang$applyTo = (function (arglist__4220){
var xs = cljs.core.seq(arglist__4220);;
return emitln__delegate(xs);
});
emitln.cljs$lang$arity$variadic = emitln__delegate;
return emitln;
})()
;
cljs.compiler.emit_str = (function emit_str(expr){
var sb__2216__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_4223_4225 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2217__auto__){
return sb__2216__auto__.append(x__2217__auto__);
});
cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_4223_4225;
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
emit_meta_constant.cljs$lang$applyTo = (function (arglist__4226){
var x = cljs.core.first(arglist__4226);
var body = cljs.core.rest(arglist__4226);
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
return cljs.compiler.emits.call(null,"(new cljs.core.Symbol(",(cljs.core.truth_(cljs.core.meta.call(null,x))?cljs.compiler.emit_constant.call(null,cljs.core.meta.call(null,x)):"null"),",",[cljs.core.str("\""),cljs.core.str(x),cljs.core.str("\"")].join(''),"))");
});
cljs.compiler.emit_constant_map = (function emit_constant_map(x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.hash_map("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4227_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4227_SHARP_);
});
}),cljs.core.apply.call(null,cljs.core.concat,x))),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.compiler.emit_constant_set = (function emit_constant_set(x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.set(["], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4228_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4228_SHARP_);
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
if(cljs.core.keyword_QMARK_.call(null,x))
{return cljs.compiler.emit_constant_keyword.call(null,x);
} else
{if("\uFDD0'else")
{return cljs.compiler.emits.call(null,cljs.compiler.wrap_in_double_quotes.call(null,cljs.compiler.escape_string.call(null,x)));
} else
{return null;
}
}
}));
RegExp.prototype.cljs$compiler$EmitConstant$ = true;
RegExp.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
var vec__4232 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str(x)].join(''));
var _ = cljs.core.nth.call(null,vec__4232,0,null);
var flags = cljs.core.nth.call(null,vec__4232,1,null);
var pattern = cljs.core.nth.call(null,vec__4232,2,null);
var all_slashes = (new RegExp("\\/","g"));
return cljs.compiler.emits.call(null,[cljs.core.str("/"),cljs.core.str(pattern.replace(all_slashes,"\\\\/")),cljs.core.str("/"),cljs.core.str(flags)].join(''));
});
cljs.core.PersistentVector.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentVector.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.vec(["], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4231_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4231_SHARP_);
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
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.list("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4230_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4230_SHARP_);
});
}),x)),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.core.Symbol.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.Symbol.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_symbol.call(null,x);
});
cljs.core.PersistentTreeMap.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentTreeMap.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_map.call(null,x);
});
cljs.core.List.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.List.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.list("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4229_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4229_SHARP_);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'var",(function (p__4233){
var map__4234 = p__4233;
var map__4234__$1 = ((cljs.core.seq_QMARK_.call(null,map__4234))?cljs.core.apply.call(null,cljs.core.hash_map,map__4234):map__4234);
var arg = map__4234__$1;
var env = cljs.core._lookup.call(null,map__4234__$1,"\uFDD0'env",null);
var info = cljs.core._lookup.call(null,map__4234__$1,"\uFDD0'info",null);
var n = (new cljs.core.Keyword("\uFDD0'name")).call(null,info);
var n__$1 = ((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,n),"js"))?cljs.core.name.call(null,n):info);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,n__$1));
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'meta",(function (p__4235){
var map__4236 = p__4235;
var map__4236__$1 = ((cljs.core.seq_QMARK_.call(null,map__4236))?cljs.core.apply.call(null,cljs.core.hash_map,map__4236):map__4236);
var env = cljs.core._lookup.call(null,map__4236__$1,"\uFDD0'env",null);
var meta = cljs.core._lookup.call(null,map__4236__$1,"\uFDD0'meta",null);
var expr = cljs.core._lookup.call(null,map__4236__$1,"\uFDD0'expr",null);
var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.array_map_threshold = 16;
cljs.compiler.obj_map_threshold = 32;
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'map",(function (p__4237){
var map__4238 = p__4237;
var map__4238__$1 = ((cljs.core.seq_QMARK_.call(null,map__4238))?cljs.core.apply.call(null,cljs.core.hash_map,map__4238):map__4238);
var vals = cljs.core._lookup.call(null,map__4238__$1,"\uFDD0'vals",null);
var keys = cljs.core._lookup.call(null,map__4238__$1,"\uFDD0'keys",null);
var simple_keys_QMARK_ = cljs.core._lookup.call(null,map__4238__$1,"\uFDD0'simple-keys?",null);
var env = cljs.core._lookup.call(null,map__4238__$1,"\uFDD0'env",null);
var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
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
var _STAR_print_fn_STAR_4239_4241 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2217__auto__){
return sb__2216__auto__.append(x__2217__auto__);
});
cljs.compiler.emit.call(null,k);
cljs.core.print.call(null,":");
cljs.compiler.emit.call(null,v);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_4239_4241;
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
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'vector",(function (p__4242){
var map__4243 = p__4242;
var map__4243__$1 = ((cljs.core.seq_QMARK_.call(null,map__4243))?cljs.core.apply.call(null,cljs.core.hash_map,map__4243):map__4243);
var env = cljs.core._lookup.call(null,map__4243__$1,"\uFDD0'env",null);
var items = cljs.core._lookup.call(null,map__4243__$1,"\uFDD0'items",null);
var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.empty_QMARK_.call(null,items))
{cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else
{cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep.call(null,items),"], true)");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'set",(function (p__4244){
var map__4245 = p__4244;
var map__4245__$1 = ((cljs.core.seq_QMARK_.call(null,map__4245))?cljs.core.apply.call(null,cljs.core.hash_map,map__4245):map__4245);
var env = cljs.core._lookup.call(null,map__4245__$1,"\uFDD0'env",null);
var items = cljs.core._lookup.call(null,map__4245__$1,"\uFDD0'items",null);
var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.empty_QMARK_.call(null,items))
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.EMPTY");
} else
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.fromArray([",cljs.compiler.comma_sep.call(null,items),"])");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'constant",(function (p__4246){
var map__4247 = p__4246;
var map__4247__$1 = ((cljs.core.seq_QMARK_.call(null,map__4247))?cljs.core.apply.call(null,cljs.core.hash_map,map__4247):map__4247);
var env = cljs.core._lookup.call(null,map__4247__$1,"\uFDD0'env",null);
var form = cljs.core._lookup.call(null,map__4247__$1,"\uFDD0'form",null);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emit_constant.call(null,form);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
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
{var G__4250 = (new cljs.core.Keyword("\uFDD0'op")).call(null,e);
if(cljs.core._EQ_.call(null,"\uFDD0'constant",G__4250))
{var G__4251 = (new cljs.core.Keyword("\uFDD0'form")).call(null,e);
if(cljs.core._EQ_.call(null,false,G__4251))
{return (new cljs.core.Symbol(null,"boolean"));
} else
{if(cljs.core._EQ_.call(null,true,G__4251))
{return (new cljs.core.Symbol(null,"boolean"));
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'if",G__4250))
{var then_tag = infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'then")).call(null,e));
var else_tag = infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'else")).call(null,e));
if(cljs.core._EQ_.call(null,then_tag,else_tag))
{return then_tag;
} else
{return null;
}
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'let",G__4250))
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
var or__3824__auto__ = cljs.core.PersistentHashSet.fromArray([(new cljs.core.Symbol(null,"boolean")),(new cljs.core.Symbol(null,"seq"))]).call(null,tag);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'if",(function (p__4252){
var map__4253 = p__4252;
var map__4253__$1 = ((cljs.core.seq_QMARK_.call(null,map__4253))?cljs.core.apply.call(null,cljs.core.hash_map,map__4253):map__4253);
var unchecked = cljs.core._lookup.call(null,map__4253__$1,"\uFDD0'unchecked",null);
var env = cljs.core._lookup.call(null,map__4253__$1,"\uFDD0'env",null);
var else$ = cljs.core._lookup.call(null,map__4253__$1,"\uFDD0'else",null);
var then = cljs.core._lookup.call(null,map__4253__$1,"\uFDD0'then",null);
var test = cljs.core._lookup.call(null,map__4253__$1,"\uFDD0'test",null);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'throw",(function (p__4254){
var map__4255 = p__4254;
var map__4255__$1 = ((cljs.core.seq_QMARK_.call(null,map__4255))?cljs.core.apply.call(null,cljs.core.hash_map,map__4255):map__4255);
var env = cljs.core._lookup.call(null,map__4255__$1,"\uFDD0'env",null);
var throw$ = cljs.core._lookup.call(null,map__4255__$1,"\uFDD0'throw",null);
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
var G__4260 = cljs.core.seq.call(null,clojure.string.split_lines.call(null,e));
while(true){
if(G__4260)
{var next_line = cljs.core.first.call(null,G__4260);
cljs.compiler.emitln.call(null,"* ",clojure.string.trim.call(null,next_line));
{
var G__4262 = cljs.core.next.call(null,G__4260);
G__4260 = G__4262;
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
var G__4261_4263 = cljs.core.seq.call(null,docs__$2);
while(true){
if(G__4261_4263)
{var e_4264 = cljs.core.first.call(null,G__4261_4263);
if(cljs.core.truth_(e_4264))
{print_comment_lines.call(null,e_4264);
} else
{}
{
var G__4265 = cljs.core.next.call(null,G__4261_4263);
G__4261_4263 = G__4265;
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'def",(function (p__4266){
var map__4267 = p__4266;
var map__4267__$1 = ((cljs.core.seq_QMARK_.call(null,map__4267))?cljs.core.apply.call(null,cljs.core.hash_map,map__4267):map__4267);
var export$ = cljs.core._lookup.call(null,map__4267__$1,"\uFDD0'export",null);
var doc = cljs.core._lookup.call(null,map__4267__$1,"\uFDD0'doc",null);
var env = cljs.core._lookup.call(null,map__4267__$1,"\uFDD0'env",null);
var init = cljs.core._lookup.call(null,map__4267__$1,"\uFDD0'init",null);
var name = cljs.core._lookup.call(null,map__4267__$1,"\uFDD0'name",null);
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
cljs.compiler.emit_apply_to = (function emit_apply_to(p__4268){
var map__4272 = p__4268;
var map__4272__$1 = ((cljs.core.seq_QMARK_.call(null,map__4272))?cljs.core.apply.call(null,cljs.core.hash_map,map__4272):map__4272);
var env = cljs.core._lookup.call(null,map__4272__$1,"\uFDD0'env",null);
var params = cljs.core._lookup.call(null,map__4272__$1,"\uFDD0'params",null);
var name = cljs.core._lookup.call(null,map__4272__$1,"\uFDD0'name",null);
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str("__delegate")].join('');
var params__$1 = cljs.core.map.call(null,cljs.compiler.munge,params);
cljs.compiler.emitln.call(null,"(function (",arglist,"){");
var G__4273_4275 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.butlast.call(null,params__$1)));
while(true){
if(G__4273_4275)
{var vec__4274_4276 = cljs.core.first.call(null,G__4273_4275);
var i_4277 = cljs.core.nth.call(null,vec__4274_4276,0,null);
var param_4278 = cljs.core.nth.call(null,vec__4274_4276,1,null);
cljs.compiler.emits.call(null,"var ",param_4278," = cljs.core.first(");
var n__2166__auto___4279 = i_4277;
var __4280 = 0;
while(true){
if((__4280 < n__2166__auto___4279))
{cljs.compiler.emits.call(null,"cljs.core.next(");
{
var G__4281 = (__4280 + 1);
__4280 = G__4281;
continue;
}
} else
{}
break;
}
cljs.compiler.emits.call(null,arglist,")");
var n__2166__auto___4282 = i_4277;
var __4283 = 0;
while(true){
if((__4283 < n__2166__auto___4282))
{cljs.compiler.emits.call(null,")");
{
var G__4284 = (__4283 + 1);
__4283 = G__4284;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,";");
{
var G__4285 = cljs.core.next.call(null,G__4273_4275);
G__4273_4275 = G__4285;
continue;
}
} else
{}
break;
}
if((1 < cljs.core.count.call(null,params__$1)))
{cljs.compiler.emits.call(null,"var ",cljs.core.last.call(null,params__$1)," = cljs.core.rest(");
var n__2166__auto___4286 = (cljs.core.count.call(null,params__$1) - 2);
var __4287 = 0;
while(true){
if((__4287 < n__2166__auto___4286))
{cljs.compiler.emits.call(null,"cljs.core.next(");
{
var G__4288 = (__4287 + 1);
__4287 = G__4288;
continue;
}
} else
{}
break;
}
cljs.compiler.emits.call(null,arglist);
var n__2166__auto___4289 = (cljs.core.count.call(null,params__$1) - 2);
var __4290 = 0;
while(true){
if((__4290 < n__2166__auto___4289))
{cljs.compiler.emits.call(null,")");
{
var G__4291 = (__4290 + 1);
__4290 = G__4291;
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
cljs.compiler.emit_fn_method = (function emit_fn_method(p__4292){
var map__4294 = p__4292;
var map__4294__$1 = ((cljs.core.seq_QMARK_.call(null,map__4294))?cljs.core.apply.call(null,cljs.core.hash_map,map__4294):map__4294);
var max_fixed_arity = cljs.core._lookup.call(null,map__4294__$1,"\uFDD0'max-fixed-arity",null);
var recurs = cljs.core._lookup.call(null,map__4294__$1,"\uFDD0'recurs",null);
var env = cljs.core._lookup.call(null,map__4294__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4294__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4294__$1,"\uFDD0'statements",null);
var params = cljs.core._lookup.call(null,map__4294__$1,"\uFDD0'params",null);
var variadic = cljs.core._lookup.call(null,map__4294__$1,"\uFDD0'variadic",null);
var name = cljs.core._lookup.call(null,map__4294__$1,"\uFDD0'name",null);
var type = cljs.core._lookup.call(null,map__4294__$1,"\uFDD0'type",null);
var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
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
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
});
cljs.compiler.emit_variadic_fn_method = (function emit_variadic_fn_method(p__4298){
var map__4300 = p__4298;
var map__4300__$1 = ((cljs.core.seq_QMARK_.call(null,map__4300))?cljs.core.apply.call(null,cljs.core.hash_map,map__4300):map__4300);
var f = map__4300__$1;
var max_fixed_arity = cljs.core._lookup.call(null,map__4300__$1,"\uFDD0'max-fixed-arity",null);
var recurs = cljs.core._lookup.call(null,map__4300__$1,"\uFDD0'recurs",null);
var env = cljs.core._lookup.call(null,map__4300__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4300__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4300__$1,"\uFDD0'statements",null);
var params = cljs.core._lookup.call(null,map__4300__$1,"\uFDD0'params",null);
var variadic = cljs.core._lookup.call(null,map__4300__$1,"\uFDD0'variadic",null);
var name = cljs.core._lookup.call(null,map__4300__$1,"\uFDD0'name",null);
var type = cljs.core._lookup.call(null,map__4300__$1,"\uFDD0'type",null);
var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
var name_4301__$1 = (function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null);
}
})();
var mname_4302 = cljs.compiler.munge.call(null,name_4301__$1);
var params_4303__$1 = cljs.core.map.call(null,cljs.compiler.munge,params);
var delegate_name_4304 = [cljs.core.str(mname_4302),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.call(null,"(function() { ");
cljs.compiler.emitln.call(null,"var ",delegate_name_4304," = function (",cljs.compiler.comma_sep.call(null,params_4303__$1),"){");
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
cljs.compiler.emitln.call(null,"var ",mname_4302," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params_4303__$1),cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(null,"var_args"))], true)):params_4303__$1)),"){");
if(cljs.core.truth_(type))
{cljs.compiler.emitln.call(null,"var self__ = this;");
} else
{}
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,"var ",cljs.core.last.call(null,params_4303__$1)," = null;");
cljs.compiler.emitln.call(null,"if (goog.isDef(var_args)) {");
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params_4303__$1)," = cljs.core.array_seq(Array.prototype.slice.call(arguments, ",(cljs.core.count.call(null,params_4303__$1) - 1),"),0);");
cljs.compiler.emitln.call(null,"} ");
} else
{}
cljs.compiler.emitln.call(null,"return ",delegate_name_4304,".call(",clojure.string.join.call(null,", ",cljs.core.cons.call(null,"this",params_4303__$1)),");");
cljs.compiler.emitln.call(null,"};");
cljs.compiler.emitln.call(null,mname_4302,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");
cljs.compiler.emits.call(null,mname_4302,".cljs$lang$applyTo = ");
cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,"\uFDD0'name",name_4301__$1));
cljs.compiler.emitln.call(null,";");
cljs.compiler.emitln.call(null,mname_4302,".cljs$lang$arity$variadic = ",delegate_name_4304,";");
cljs.compiler.emitln.call(null,"return ",mname_4302,";");
cljs.compiler.emitln.call(null,"})()");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'fn",(function (p__4305){
var map__4306 = p__4305;
var map__4306__$1 = ((cljs.core.seq_QMARK_.call(null,map__4306))?cljs.core.apply.call(null,cljs.core.hash_map,map__4306):map__4306);
var loop_lets = cljs.core._lookup.call(null,map__4306__$1,"\uFDD0'loop-lets",null);
var recur_frames = cljs.core._lookup.call(null,map__4306__$1,"\uFDD0'recur-frames",null);
var variadic = cljs.core._lookup.call(null,map__4306__$1,"\uFDD0'variadic",null);
var max_fixed_arity = cljs.core._lookup.call(null,map__4306__$1,"\uFDD0'max-fixed-arity",null);
var methods$ = cljs.core._lookup.call(null,map__4306__$1,"\uFDD0'methods",null);
var env = cljs.core._lookup.call(null,map__4306__$1,"\uFDD0'env",null);
var name = cljs.core._lookup.call(null,map__4306__$1,"\uFDD0'name",null);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,cljs.core.mapcat.call(null,"\uFDD0'params",cljs.core.filter.call(null,(function (p1__4295_SHARP_){
var and__3822__auto__ = p1__4295_SHARP_;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core.deref.call(null,(new cljs.core.Keyword("\uFDD0'flag")).call(null,p1__4295_SHARP_));
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
{var has_name_QMARK__4314 = (function (){var and__3822__auto__ = name;
if(cljs.core.truth_(and__3822__auto__))
{return true;
} else
{return and__3822__auto__;
}
})();
var name_4315__$1 = (function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null);
}
})();
var mname_4316 = cljs.compiler.munge.call(null,name_4315__$1);
var maxparams_4317 = cljs.core.map.call(null,cljs.compiler.munge,cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,"\uFDD0'params",methods$)));
var mmap_4318 = cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (method){
return cljs.core.PersistentVector.fromArray([cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str(mname_4316),cljs.core.str("__"),cljs.core.str(cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,method)))].join(''))),method], true);
}),methods$));
var ms_4319 = cljs.core.sort_by.call(null,(function (p1__4296_SHARP_){
return cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,cljs.core.second.call(null,p1__4296_SHARP_)));
}),cljs.core.seq.call(null,mmap_4318));
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emitln.call(null,"(function() {");
cljs.compiler.emitln.call(null,"var ",mname_4316," = null;");
var G__4307_4320 = cljs.core.seq.call(null,ms_4319);
while(true){
if(G__4307_4320)
{var vec__4308_4321 = cljs.core.first.call(null,G__4307_4320);
var n_4322 = cljs.core.nth.call(null,vec__4308_4321,0,null);
var meth_4323 = cljs.core.nth.call(null,vec__4308_4321,1,null);
cljs.compiler.emits.call(null,"var ",n_4322," = ");
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_4323)))
{cljs.compiler.emit_variadic_fn_method.call(null,meth_4323);
} else
{cljs.compiler.emit_fn_method.call(null,meth_4323);
}
cljs.compiler.emitln.call(null,";");
{
var G__4324 = cljs.core.next.call(null,G__4307_4320);
G__4307_4320 = G__4324;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,mname_4316," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_4317),cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(null,"var_args"))], true)):maxparams_4317)),"){");
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,"var ",cljs.core.last.call(null,maxparams_4317)," = var_args;");
} else
{}
cljs.compiler.emitln.call(null,"switch(arguments.length){");
var G__4309_4325 = cljs.core.seq.call(null,ms_4319);
while(true){
if(G__4309_4325)
{var vec__4310_4326 = cljs.core.first.call(null,G__4309_4325);
var n_4327 = cljs.core.nth.call(null,vec__4310_4326,0,null);
var meth_4328 = cljs.core.nth.call(null,vec__4310_4326,1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_4328)))
{cljs.compiler.emitln.call(null,"default:");
cljs.compiler.emitln.call(null,"return ",n_4327,".cljs$lang$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_4317)),(((cljs.core.count.call(null,maxparams_4317) > 1))?", ":null),"cljs.core.array_seq(arguments, ",max_fixed_arity,"));");
} else
{var pcnt_4329 = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,meth_4328));
cljs.compiler.emitln.call(null,"case ",pcnt_4329,":");
cljs.compiler.emitln.call(null,"return ",n_4327,".call(this",(((pcnt_4329 === 0))?null:cljs.core.list.call(null,",",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_4329,maxparams_4317)))),");");
}
{
var G__4330 = cljs.core.next.call(null,G__4309_4325);
G__4309_4325 = G__4330;
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
{cljs.compiler.emitln.call(null,mname_4316,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");
cljs.compiler.emitln.call(null,mname_4316,".cljs$lang$applyTo = ",cljs.core.some.call(null,(function (p1__4297_SHARP_){
var vec__4311 = p1__4297_SHARP_;
var n = cljs.core.nth.call(null,vec__4311,0,null);
var m = cljs.core.nth.call(null,vec__4311,1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,m)))
{return n;
} else
{return null;
}
}),ms_4319),".cljs$lang$applyTo;");
} else
{}
if(cljs.core.truth_(has_name_QMARK__4314))
{var G__4312_4331 = cljs.core.seq.call(null,ms_4319);
while(true){
if(G__4312_4331)
{var vec__4313_4332 = cljs.core.first.call(null,G__4312_4331);
var n_4333 = cljs.core.nth.call(null,vec__4313_4332,0,null);
var meth_4334 = cljs.core.nth.call(null,vec__4313_4332,1,null);
var c_4335 = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,meth_4334));
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_4334)))
{cljs.compiler.emitln.call(null,mname_4316,".cljs$lang$arity$variadic = ",n_4333,".cljs$lang$arity$variadic;");
} else
{cljs.compiler.emitln.call(null,mname_4316,".cljs$lang$arity$",c_4335," = ",n_4333,";");
}
{
var G__4336 = cljs.core.next.call(null,G__4312_4331);
G__4312_4331 = G__4336;
continue;
}
} else
{}
break;
}
} else
{}
cljs.compiler.emitln.call(null,"return ",mname_4316,";");
cljs.compiler.emitln.call(null,"})()");
}
if(loop_locals)
{return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else
{return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'do",(function (p__4337){
var map__4338 = p__4337;
var map__4338__$1 = ((cljs.core.seq_QMARK_.call(null,map__4338))?cljs.core.apply.call(null,cljs.core.hash_map,map__4338):map__4338);
var env = cljs.core._lookup.call(null,map__4338__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4338__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4338__$1,"\uFDD0'statements",null);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'try*",(function (p__4340){
var map__4341 = p__4340;
var map__4341__$1 = ((cljs.core.seq_QMARK_.call(null,map__4341))?cljs.core.apply.call(null,cljs.core.hash_map,map__4341):map__4341);
var finally$ = cljs.core._lookup.call(null,map__4341__$1,"\uFDD0'finally",null);
var name = cljs.core._lookup.call(null,map__4341__$1,"\uFDD0'name",null);
var catch$ = cljs.core._lookup.call(null,map__4341__$1,"\uFDD0'catch",null);
var try$ = cljs.core._lookup.call(null,map__4341__$1,"\uFDD0'try",null);
var env = cljs.core._lookup.call(null,map__4341__$1,"\uFDD0'env",null);
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
var map__4342_4346 = try$;
var map__4342_4347__$1 = ((cljs.core.seq_QMARK_.call(null,map__4342_4346))?cljs.core.apply.call(null,cljs.core.hash_map,map__4342_4346):map__4342_4346);
var ret_4348 = cljs.core._lookup.call(null,map__4342_4347__$1,"\uFDD0'ret",null);
var statements_4349 = cljs.core._lookup.call(null,map__4342_4347__$1,"\uFDD0'statements",null);
cljs.compiler.emit_block.call(null,subcontext,statements_4349,ret_4348);
cljs.compiler.emits.call(null,"}");
if(cljs.core.truth_(name))
{cljs.compiler.emits.call(null,"catch (",cljs.compiler.munge.call(null,name),"){");
if(cljs.core.truth_(catch$))
{var map__4343_4350 = catch$;
var map__4343_4351__$1 = ((cljs.core.seq_QMARK_.call(null,map__4343_4350))?cljs.core.apply.call(null,cljs.core.hash_map,map__4343_4350):map__4343_4350);
var ret_4352 = cljs.core._lookup.call(null,map__4343_4351__$1,"\uFDD0'ret",null);
var statements_4353 = cljs.core._lookup.call(null,map__4343_4351__$1,"\uFDD0'statements",null);
cljs.compiler.emit_block.call(null,subcontext,statements_4353,ret_4352);
} else
{}
cljs.compiler.emits.call(null,"}");
} else
{}
if(cljs.core.truth_(finally$))
{var map__4344_4354 = finally$;
var map__4344_4355__$1 = ((cljs.core.seq_QMARK_.call(null,map__4344_4354))?cljs.core.apply.call(null,cljs.core.hash_map,map__4344_4354):map__4344_4354);
var ret_4356 = cljs.core._lookup.call(null,map__4344_4355__$1,"\uFDD0'ret",null);
var statements_4357 = cljs.core._lookup.call(null,map__4344_4355__$1,"\uFDD0'statements",null);
if(cljs.core.not_EQ_.call(null,"\uFDD0'constant",(new cljs.core.Keyword("\uFDD0'op")).call(null,ret_4356)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("finally block cannot contain constant"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"not=")),"\uFDD0'constant",cljs.core.with_meta(cljs.core.list("\uFDD0'op",(new cljs.core.Symbol(null,"ret"))),cljs.core.hash_map("\uFDD0'line",580))),cljs.core.hash_map("\uFDD0'line",580))))].join('')));
}
cljs.compiler.emits.call(null,"finally {");
cljs.compiler.emit_block.call(null,subcontext,statements_4357,ret_4356);
cljs.compiler.emits.call(null,"}");
} else
{}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
} else
{var map__4345 = try$;
var map__4345__$1 = ((cljs.core.seq_QMARK_.call(null,map__4345))?cljs.core.apply.call(null,cljs.core.hash_map,map__4345):map__4345);
var ret = cljs.core._lookup.call(null,map__4345__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4345__$1,"\uFDD0'statements",null);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'let",(function (p__4358){
var map__4359 = p__4358;
var map__4359__$1 = ((cljs.core.seq_QMARK_.call(null,map__4359))?cljs.core.apply.call(null,cljs.core.hash_map,map__4359):map__4359);
var loop = cljs.core._lookup.call(null,map__4359__$1,"\uFDD0'loop",null);
var env = cljs.core._lookup.call(null,map__4359__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4359__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4359__$1,"\uFDD0'statements",null);
var bindings = cljs.core._lookup.call(null,map__4359__$1,"\uFDD0'bindings",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
var _STAR_lexical_renames_STAR_4360_4364 = cljs.compiler._STAR_lexical_renames_STAR_;
try{cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,"\uFDD0'statement",context))?cljs.core.map.call(null,(function (p1__4339_SHARP_){
return cljs.core.vector.call(null,cljs.core.hash.call(null,p1__4339_SHARP_),cljs.core.gensym.call(null,[cljs.core.str((new cljs.core.Keyword("\uFDD0'name")).call(null,p1__4339_SHARP_)),cljs.core.str("-")].join('')));
}),bindings):null));
var G__4362_4365 = cljs.core.seq.call(null,bindings);
while(true){
if(G__4362_4365)
{var map__4363_4366 = cljs.core.first.call(null,G__4362_4365);
var map__4363_4367__$1 = ((cljs.core.seq_QMARK_.call(null,map__4363_4366))?cljs.core.apply.call(null,cljs.core.hash_map,map__4363_4366):map__4363_4366);
var binding_4368 = map__4363_4367__$1;
var init_4369 = cljs.core._lookup.call(null,map__4363_4367__$1,"\uFDD0'init",null);
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_4368)," = ",init_4369,";");
{
var G__4370 = cljs.core.next.call(null,G__4362_4365);
G__4362_4365 = G__4370;
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
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_4360_4364;
}if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'recur",(function (p__4371){
var map__4372 = p__4371;
var map__4372__$1 = ((cljs.core.seq_QMARK_.call(null,map__4372))?cljs.core.apply.call(null,cljs.core.hash_map,map__4372):map__4372);
var env = cljs.core._lookup.call(null,map__4372__$1,"\uFDD0'env",null);
var exprs = cljs.core._lookup.call(null,map__4372__$1,"\uFDD0'exprs",null);
var frame = cljs.core._lookup.call(null,map__4372__$1,"\uFDD0'frame",null);
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = (new cljs.core.Keyword("\uFDD0'params")).call(null,frame);
cljs.compiler.emitln.call(null,"{");
var n__2166__auto___4373 = cljs.core.count.call(null,exprs);
var i_4374 = 0;
while(true){
if((i_4374 < n__2166__auto___4373))
{cljs.compiler.emitln.call(null,"var ",temps.call(null,i_4374)," = ",exprs.call(null,i_4374),";");
{
var G__4375 = (i_4374 + 1);
i_4374 = G__4375;
continue;
}
} else
{}
break;
}
var n__2166__auto___4376 = cljs.core.count.call(null,exprs);
var i_4377 = 0;
while(true){
if((i_4377 < n__2166__auto___4376))
{cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_4377))," = ",temps.call(null,i_4377),";");
{
var G__4378 = (i_4377 + 1);
i_4377 = G__4378;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,"continue;");
return cljs.compiler.emitln.call(null,"}");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'letfn",(function (p__4379){
var map__4380 = p__4379;
var map__4380__$1 = ((cljs.core.seq_QMARK_.call(null,map__4380))?cljs.core.apply.call(null,cljs.core.hash_map,map__4380):map__4380);
var env = cljs.core._lookup.call(null,map__4380__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4380__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4380__$1,"\uFDD0'statements",null);
var bindings = cljs.core._lookup.call(null,map__4380__$1,"\uFDD0'bindings",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
var G__4381_4383 = cljs.core.seq.call(null,bindings);
while(true){
if(G__4381_4383)
{var map__4382_4384 = cljs.core.first.call(null,G__4381_4383);
var map__4382_4385__$1 = ((cljs.core.seq_QMARK_.call(null,map__4382_4384))?cljs.core.apply.call(null,cljs.core.hash_map,map__4382_4384):map__4382_4384);
var binding_4386 = map__4382_4385__$1;
var init_4387 = cljs.core._lookup.call(null,map__4382_4385__$1,"\uFDD0'init",null);
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_4386)," = ",init_4387,";");
{
var G__4388 = cljs.core.next.call(null,G__4381_4383);
G__4381_4383 = G__4388;
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'invoke",(function (p__4389){
var map__4390 = p__4389;
var map__4390__$1 = ((cljs.core.seq_QMARK_.call(null,map__4390))?cljs.core.apply.call(null,cljs.core.hash_map,map__4390):map__4390);
var expr = map__4390__$1;
var env = cljs.core._lookup.call(null,map__4390__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__4390__$1,"\uFDD0'args",null);
var f = cljs.core._lookup.call(null,map__4390__$1,"\uFDD0'f",null);
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
var opt_not_QMARK_ = (function (){var and__3822__auto__ = cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'name")).call(null,info),(new cljs.core.Symbol(null,"cljs.core/not")));
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,cljs.compiler.infer_tag.call(null,cljs.core.first.call(null,(new cljs.core.Keyword("\uFDD0'args")).call(null,expr))),(new cljs.core.Symbol(null,"boolean")));
} else
{return and__3822__auto__;
}
})();
var ns = (new cljs.core.Keyword("\uFDD0'ns")).call(null,info);
var js_QMARK_ = cljs.core._EQ_.call(null,ns,(new cljs.core.Symbol(null,"js")));
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__3824__auto__ = cljs.core._EQ_.call(null,ns,(new cljs.core.Symbol(null,"goog")));
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
var vec__4391 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
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
var f__$1 = cljs.core.nth.call(null,vec__4391,0,null);
var variadic_invoke = cljs.core.nth.call(null,vec__4391,1,null);
var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(opt_not_QMARK_))
{cljs.compiler.emits.call(null,"!(",cljs.core.first.call(null,args),")");
} else
{if(cljs.core.truth_(proto_QMARK_))
{var pimpl_4392 = [cljs.core.str(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str(cljs.compiler.munge.call(null,cljs.core.name.call(null,(new cljs.core.Keyword("\uFDD0'name")).call(null,info)))),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_4392,"(",cljs.compiler.comma_sep.call(null,args),")");
} else
{if(cljs.core.truth_(keyword_QMARK_))
{cljs.compiler.emits.call(null,"(new cljs.core.Keyword(",f__$1,")).call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
} else
{if(cljs.core.truth_(variadic_invoke))
{var mfa_4393 = (new cljs.core.Keyword("\uFDD0'max-fixed-arity")).call(null,variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_4393,args)),(((mfa_4393 === 0))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_4393,args)),"], 0))");
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
{var fprop_4394 = [cljs.core.str(".cljs$lang$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,"(",f__$1,fprop_4394," ? ",f__$1,fprop_4394,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
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
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'new",(function (p__4395){
var map__4396 = p__4395;
var map__4396__$1 = ((cljs.core.seq_QMARK_.call(null,map__4396))?cljs.core.apply.call(null,cljs.core.hash_map,map__4396):map__4396);
var env = cljs.core._lookup.call(null,map__4396__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__4396__$1,"\uFDD0'args",null);
var ctor = cljs.core._lookup.call(null,map__4396__$1,"\uFDD0'ctor",null);
var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'set!",(function (p__4397){
var map__4398 = p__4397;
var map__4398__$1 = ((cljs.core.seq_QMARK_.call(null,map__4398))?cljs.core.apply.call(null,cljs.core.hash_map,map__4398):map__4398);
var env = cljs.core._lookup.call(null,map__4398__$1,"\uFDD0'env",null);
var val = cljs.core._lookup.call(null,map__4398__$1,"\uFDD0'val",null);
var target = cljs.core._lookup.call(null,map__4398__$1,"\uFDD0'target",null);
var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,target," = ",val);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'ns",(function (p__4399){
var map__4400 = p__4399;
var map__4400__$1 = ((cljs.core.seq_QMARK_.call(null,map__4400))?cljs.core.apply.call(null,cljs.core.hash_map,map__4400):map__4400);
var env = cljs.core._lookup.call(null,map__4400__$1,"\uFDD0'env",null);
var requires_macros = cljs.core._lookup.call(null,map__4400__$1,"\uFDD0'requires-macros",null);
var uses = cljs.core._lookup.call(null,map__4400__$1,"\uFDD0'uses",null);
var requires = cljs.core._lookup.call(null,map__4400__$1,"\uFDD0'requires",null);
var name = cljs.core._lookup.call(null,map__4400__$1,"\uFDD0'name",null);
cljs.core.swap_BANG_.call(null,cljs.compiler.ns_first_segments,cljs.core.conj,cljs.core.first.call(null,clojure.string.split.call(null,[cljs.core.str(name)].join(''),/\./)));
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,name),"');");
if(cljs.core._EQ_.call(null,name,(new cljs.core.Symbol(null,"cljs.core"))))
{} else
{cljs.compiler.emitln.call(null,"goog.require('cljs.core');");
}
var G__4401 = cljs.core.seq.call(null,cljs.core.into.call(null,cljs.core.vals.call(null,requires),cljs.core.distinct.call(null,cljs.core.vals.call(null,uses))));
while(true){
if(G__4401)
{var lib = cljs.core.first.call(null,G__4401);
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib),"');");
{
var G__4402 = cljs.core.next.call(null,G__4401);
G__4401 = G__4402;
continue;
}
} else
{return null;
}
break;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'deftype*",(function (p__4403){
var map__4404 = p__4403;
var map__4404__$1 = ((cljs.core.seq_QMARK_.call(null,map__4404))?cljs.core.apply.call(null,cljs.core.hash_map,map__4404):map__4404);
var pmasks = cljs.core._lookup.call(null,map__4404__$1,"\uFDD0'pmasks",null);
var fields = cljs.core._lookup.call(null,map__4404__$1,"\uFDD0'fields",null);
var t = cljs.core._lookup.call(null,map__4404__$1,"\uFDD0't",null);
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emit_provide.call(null,t);
cljs.compiler.emitln.call(null,"");
cljs.compiler.emitln.call(null,"/**");
cljs.compiler.emitln.call(null,"* @constructor");
cljs.compiler.emitln.call(null,"*/");
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");
var G__4405_4408 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__4405_4408)
{var fld_4409 = cljs.core.first.call(null,G__4405_4408);
cljs.compiler.emitln.call(null,"this.",fld_4409," = ",fld_4409,";");
{
var G__4410 = cljs.core.next.call(null,G__4405_4408);
G__4405_4408 = G__4410;
continue;
}
} else
{}
break;
}
var G__4406_4411 = cljs.core.seq.call(null,pmasks);
while(true){
if(G__4406_4411)
{var vec__4407_4412 = cljs.core.first.call(null,G__4406_4411);
var pno_4413 = cljs.core.nth.call(null,vec__4407_4412,0,null);
var pmask_4414 = cljs.core.nth.call(null,vec__4407_4412,1,null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_4413,"$ = ",pmask_4414,";");
{
var G__4415 = cljs.core.next.call(null,G__4406_4411);
G__4406_4411 = G__4415;
continue;
}
} else
{}
break;
}
return cljs.compiler.emitln.call(null,"})");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'defrecord*",(function (p__4416){
var map__4417 = p__4416;
var map__4417__$1 = ((cljs.core.seq_QMARK_.call(null,map__4417))?cljs.core.apply.call(null,cljs.core.hash_map,map__4417):map__4417);
var pmasks = cljs.core._lookup.call(null,map__4417__$1,"\uFDD0'pmasks",null);
var fields = cljs.core._lookup.call(null,map__4417__$1,"\uFDD0'fields",null);
var t = cljs.core._lookup.call(null,map__4417__$1,"\uFDD0't",null);
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),cljs.core.vec([(new cljs.core.Symbol(null,"__meta")),(new cljs.core.Symbol(null,"__extmap"))]));
cljs.compiler.emit_provide.call(null,t);
cljs.compiler.emitln.call(null,"");
cljs.compiler.emitln.call(null,"/**");
cljs.compiler.emitln.call(null,"* @constructor");
var G__4418_4422 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__4418_4422)
{var fld_4423 = cljs.core.first.call(null,G__4418_4422);
cljs.compiler.emitln.call(null,"* @param {*} ",fld_4423);
{
var G__4424 = cljs.core.next.call(null,G__4418_4422);
G__4418_4422 = G__4424;
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
var G__4419_4425 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__4419_4425)
{var fld_4426 = cljs.core.first.call(null,G__4419_4425);
cljs.compiler.emitln.call(null,"this.",fld_4426," = ",fld_4426,";");
{
var G__4427 = cljs.core.next.call(null,G__4419_4425);
G__4419_4425 = G__4427;
continue;
}
} else
{}
break;
}
var G__4420_4428 = cljs.core.seq.call(null,pmasks);
while(true){
if(G__4420_4428)
{var vec__4421_4429 = cljs.core.first.call(null,G__4420_4428);
var pno_4430 = cljs.core.nth.call(null,vec__4421_4429,0,null);
var pmask_4431 = cljs.core.nth.call(null,vec__4421_4429,1,null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_4430,"$ = ",pmask_4431,";");
{
var G__4432 = cljs.core.next.call(null,G__4420_4428);
G__4420_4428 = G__4432;
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'dot",(function (p__4433){
var map__4434 = p__4433;
var map__4434__$1 = ((cljs.core.seq_QMARK_.call(null,map__4434))?cljs.core.apply.call(null,cljs.core.hash_map,map__4434):map__4434);
var env = cljs.core._lookup.call(null,map__4434__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__4434__$1,"\uFDD0'args",null);
var method = cljs.core._lookup.call(null,map__4434__$1,"\uFDD0'method",null);
var field = cljs.core._lookup.call(null,map__4434__$1,"\uFDD0'field",null);
var target = cljs.core._lookup.call(null,map__4434__$1,"\uFDD0'target",null);
var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(field))
{cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else
{cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'js",(function (p__4435){
var map__4436 = p__4435;
var map__4436__$1 = ((cljs.core.seq_QMARK_.call(null,map__4436))?cljs.core.apply.call(null,cljs.core.hash_map,map__4436):map__4436);
var args = cljs.core._lookup.call(null,map__4436__$1,"\uFDD0'args",null);
var segs = cljs.core._lookup.call(null,map__4436__$1,"\uFDD0'segs",null);
var code = cljs.core._lookup.call(null,map__4436__$1,"\uFDD0'code",null);
var env = cljs.core._lookup.call(null,map__4436__$1,"\uFDD0'env",null);
var env__2894__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(code))
{cljs.compiler.emits.call(null,code);
} else
{cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,cljs.core.PersistentVector.fromArray([null], true))));
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2894__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));

// Analyzer namespace snapshot:
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.assoc,(new cljs.core.Symbol(null,"cljs.compiler")),cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map((new cljs.core.Symbol(null,"cljs-reserved-file-names")),cljs.core.hash_map("\uFDD0'line",40,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/cljs-reserved-file-names"))),(new cljs.core.Symbol(null,"get-tag")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"e"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"e")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/get-tag")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",330,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-apply-to")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec([(new cljs.core.Symbol(null,"name")),(new cljs.core.Symbol(null,"params")),(new cljs.core.Symbol(null,"env"))]))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4268")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-apply-to")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",402,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"escape-char")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"c"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"c")),"\uFDD0'tag",(new cljs.core.Symbol(null,"Character")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/escape-char")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",103,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"*lexical-renames*")),cljs.core.hash_map("\uFDD0'line",39,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/*lexical-renames*"))),(new cljs.core.Symbol(null,"infer-tag")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"e"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"e")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/infer-tag")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",334,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-provide")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"sym"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sym")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-provide")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",160,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant-set")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant-set")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",197,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"munge")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]),cljs.core.vec([(new cljs.core.Symbol(null,"s")),(new cljs.core.Symbol(null,"reserved"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reserved")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/munge")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",72,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-meta-constant")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x")),(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"body"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"body")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-meta-constant")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",166,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"ns-first-segments")),cljs.core.hash_map("\uFDD0'line",43,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/ns-first-segments"))),(new cljs.core.Symbol(null,"js-reserved")),cljs.core.hash_map("\uFDD0'line",23,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/js-reserved"))),(new cljs.core.Symbol(null,"safe-test?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"e"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"e")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/safe-test?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",349,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emitln")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"xs"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"xs")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emitln")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",145,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"array-map-threshold")),cljs.core.hash_map("\uFDD0'line",276,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'private",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/array-map-threshold"))),(new cljs.core.Symbol(null,"escape-string")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",(new cljs.core.Symbol(null,"CharSequence")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/escape-string")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",119,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant-keyword")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant-keyword")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",174,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'protocol",(new cljs.core.Symbol(null,"cljs.compiler/EmitConstant")),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",203,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-block")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"context")),(new cljs.core.Symbol(null,"statements")),(new cljs.core.Symbol(null,"ret"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"context")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"statements")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ret")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-block")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",248,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-variadic-fn-method")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec([(new cljs.core.Symbol(null,"type")),(new cljs.core.Symbol(null,"name")),(new cljs.core.Symbol(null,"variadic")),(new cljs.core.Symbol(null,"params")),(new cljs.core.Symbol(null,"statements")),(new cljs.core.Symbol(null,"ret")),(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"recurs")),(new cljs.core.Symbol(null,"max-fixed-arity"))]),"\uFDD0'as",(new cljs.core.Symbol(null,"f")))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4298")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-variadic-fn-method")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",442,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"*emitted-provides*")),cljs.core.hash_map("\uFDD0'line",38,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/*emitted-provides*"))),(new cljs.core.Symbol(null,"emit-fn-method")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec([(new cljs.core.Symbol(null,"type")),(new cljs.core.Symbol(null,"name")),(new cljs.core.Symbol(null,"variadic")),(new cljs.core.Symbol(null,"params")),(new cljs.core.Symbol(null,"statements")),(new cljs.core.Symbol(null,"ret")),(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"recurs")),(new cljs.core.Symbol(null,"max-fixed-arity"))]))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4292")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-fn-method")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",429,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"EmitConstant")),cljs.core.hash_map("\uFDD0'line",203,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'protocol-symbol",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/EmitConstant"))),(new cljs.core.Symbol(null,"*position*")),cljs.core.hash_map("\uFDD0'line",37,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/*position*"))),(new cljs.core.Symbol(null,"emit-str")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"expr"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"expr")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-str")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",157,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'tag",(new cljs.core.Symbol(null,"String"))),(new cljs.core.Symbol(null,"comma-sep")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"xs"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"xs")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/comma-sep")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",100,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant-symbol")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant-symbol")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",181,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"protocol-prefix")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"psym"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"psym")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/protocol-prefix")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",630,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"obj-map-threshold")),cljs.core.hash_map("\uFDD0'line",277,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'private",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/obj-map-threshold"))),(new cljs.core.Symbol(null,"emit-comment")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"doc")),(new cljs.core.Symbol(null,"jsdoc"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"doc")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"jsdoc")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-comment")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Emit a nicely formatted comment string.","\uFDD0'line",376,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emits")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"xs"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"xs")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emits")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",127,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant-map")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant-map")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",190,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"wrap-in-double-quotes")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/wrap-in-double-quotes")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",122,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"CHAR_MAP")),cljs.core.hash_map("\uFDD0'line",46,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/CHAR_MAP"))),(new cljs.core.Symbol(null,"emit")),cljs.core.hash_map("\uFDD0'line",125,"\uFDD0'file","/home/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit")))),"\uFDD0'imports",null,"\uFDD0'uses-macros",cljs.core.hash_map((new cljs.core.Symbol(null,"emit-wrap")),(new cljs.core.Symbol(null,"cljs.compiler-macros"))),"\uFDD0'requires",cljs.core.hash_map((new cljs.core.Symbol(null,"ana")),(new cljs.core.Symbol(null,"cljs.analyzer")),(new cljs.core.Symbol(null,"string")),(new cljs.core.Symbol(null,"clojure.string"))),"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set([(new cljs.core.Symbol(null,"munge")),(new cljs.core.Symbol(null,"macroexpand-1"))]),"\uFDD0'doc",null,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler"))));
