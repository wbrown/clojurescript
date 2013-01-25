goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('cljs.analyzer');
goog.require('clojure.string');
goog.require('cljs.io');
cljs.compiler.js_reserved = cljs.core.PersistentHashSet.fromArray(["new","debugger","enum","default","abstract","goto","private","finally","const","in","import","package","with","throw","continue","var","boolean","byte","for","public","transient","do","delete","instanceof","throws","yield","static","protected","int","return","case","implements","typeof","while","double","methods","synchronized","void","switch","export","final","char","native","class","function","extends","else","interface","try","let","catch","super","short","volatile","float","long","if","this","break"]);
cljs.compiler._STAR_position_STAR_ = null;
cljs.compiler._STAR_emitted_provides_STAR_ = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
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
{var map__4267 = s;
var map__4267__$1 = ((cljs.core.seq_QMARK_.call(null,map__4267))?cljs.core.apply.call(null,cljs.core.hash_map,map__4267):map__4267);
var info = map__4267__$1;
var field = cljs.core._lookup.call(null,map__4267__$1,"\uFDD0'field",null);
var name = cljs.core._lookup.call(null,map__4267__$1,"\uFDD0'name",null);
var depth = (function (){var d = 0;
var G__4269 = info;
var map__4270 = G__4269;
var map__4270__$1 = ((cljs.core.seq_QMARK_.call(null,map__4270))?cljs.core.apply.call(null,cljs.core.hash_map,map__4270):map__4270);
var shadow = cljs.core._lookup.call(null,map__4270__$1,"\uFDD0'shadow",null);
var d__$1 = d;
var G__4269__$1 = G__4269;
while(true){
var d__$2 = d__$1;
var map__4271 = G__4269__$1;
var map__4271__$1 = ((cljs.core.seq_QMARK_.call(null,map__4271))?cljs.core.apply.call(null,cljs.core.hash_map,map__4271):map__4271);
var shadow__$1 = cljs.core._lookup.call(null,map__4271__$1,"\uFDD0'shadow",null);
if(cljs.core.truth_(shadow__$1))
{{
var G__4272 = (d__$2 + 1);
var G__4273 = shadow__$1;
d__$1 = G__4272;
G__4269__$1 = G__4273;
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
{var ss = clojure.string.replace.call(null,[cljs.core.str(s)].join(''),/[.][.]/,"_DOTDOT_");
var ss__$1 = clojure.string.replace.call(null,ss,/\/(.)/,".$1");
var ss__$2 = clojure.string.join.call(null,".",cljs.core.map.call(null,(function (p1__4260_SHARP_){
if(cljs.core.truth_(reserved.call(null,p1__4260_SHARP_)))
{return [cljs.core.str(p1__4260_SHARP_),cljs.core.str("$")].join('');
} else
{return p1__4260_SHARP_;
}
}),clojure.string.split.call(null,ss__$1,/[.]/)));
var ms = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__4261_SHARP_){
return cljs.core._lookup.call(null,cljs.compiler.CHAR_MAP,p1__4261_SHARP_,p1__4261_SHARP_);
}),ss__$2));
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
var G__4275 = cp;
if(cljs.core._EQ_.call(null,9,G__4275))
{return "\\t";
} else
{if(cljs.core._EQ_.call(null,13,G__4275))
{return "\\r";
} else
{if(cljs.core._EQ_.call(null,10,G__4275))
{return "\\n";
} else
{if(cljs.core._EQ_.call(null,12,G__4275))
{return "\\f";
} else
{if(cljs.core._EQ_.call(null,8,G__4275))
{return "\\b";
} else
{if(cljs.core._EQ_.call(null,92,G__4275))
{return "\\\\";
} else
{if(cljs.core._EQ_.call(null,34,G__4275))
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
{return cljs.core.apply.call(null,cljs.core.str,"\\u",cljs.core.take_last.call(null,4,[cljs.core.str("0000"),cljs.core.str(cp.toString(16))].join('')));
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
cljs.compiler.escape_pattern = (function escape_pattern(pattern){
return pattern.split("\\/").join("/").split("/").join("\\/");
});
cljs.compiler.escape_string = (function escape_string(s){
return cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__4276_SHARP_){
return cljs.compiler.escape_char.call(null,p1__4276_SHARP_);
}),s));
});
cljs.compiler.wrap_in_double_quotes = (function wrap_in_double_quotes(x){
return [cljs.core.str("\""),cljs.core.str(x),cljs.core.str("\"")].join('');
});
cljs.compiler.emit = (function (){var method_table__2178__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var prefer_table__2179__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var method_cache__2180__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var cached_hierarchy__2181__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var hierarchy__2182__auto__ = cljs.core._lookup.call(null,cljs.core.ObjMap.EMPTY,"\uFDD0'hierarchy",cljs.core.global_hierarchy);
return (new cljs.core.MultiFn("emit","\uFDD0'op","\uFDD0'default",hierarchy__2182__auto__,method_table__2178__auto__,prefer_table__2179__auto__,method_cache__2180__auto__,cached_hierarchy__2181__auto__));
})();
/**
* @param {...*} var_args
*/
cljs.compiler.emits = (function() { 
var emits__delegate = function (xs){
var G__4280_4283 = cljs.core.seq.call(null,xs);
while(true){
if(G__4280_4283)
{var x_4284 = cljs.core.first.call(null,G__4280_4283);
if((x_4284 == null))
{} else
{if(cljs.core.map_QMARK_.call(null,x_4284))
{cljs.compiler.emit.call(null,x_4284);
} else
{if(cljs.core.seq_QMARK_.call(null,x_4284))
{cljs.core.apply.call(null,emits,x_4284);
} else
{if(cljs.core.fn_QMARK_.call(null,x_4284))
{x_4284.call(null);
} else
{if("\uFDD0'else")
{var s_4285 = cljs.core.print_str.call(null,x_4284);
if(cljs.core.truth_(cljs.compiler._STAR_position_STAR_))
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_position_STAR_,((function (G__4280_4283,s_4285,x_4284){
return (function (p__4281){
var vec__4282 = p__4281;
var line = cljs.core.nth.call(null,vec__4282,0,null);
var column = cljs.core.nth.call(null,vec__4282,1,null);
return cljs.core.PersistentVector.fromArray([line,(column + cljs.core.count.call(null,s_4285))], true);
});})(G__4280_4283,s_4285,x_4284))
);
} else
{}
cljs.core.print.call(null,s_4285);
} else
{}
}
}
}
}
{
var G__4286 = cljs.core.next.call(null,G__4280_4283);
G__4280_4283 = G__4286;
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
emits.cljs$lang$applyTo = (function (arglist__4287){
var xs = cljs.core.seq(arglist__4287);;
return emits__delegate(xs);
});
emits.cljs$lang$arity$variadic = emits__delegate;
return emits;
})()
;
cljs.compiler.emit_str = (function emit_str(expr){
var sb__2218__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_4290_4292 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2219__auto__){
return sb__2218__auto__.append(x__2219__auto__);
});
cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_4290_4292;
}return [cljs.core.str(sb__2218__auto__)].join('');
});
/**
* @param {...*} var_args
*/
cljs.compiler.emitln = (function() { 
var emitln__delegate = function (xs){
cljs.core.apply.call(null,cljs.compiler.emits,xs);
cljs.core.println.call(null);
if(cljs.core.truth_(cljs.compiler._STAR_position_STAR_))
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_position_STAR_,(function (p__4295){
var vec__4296 = p__4295;
var line = cljs.core.nth.call(null,vec__4296,0,null);
var column = cljs.core.nth.call(null,vec__4296,1,null);
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
emitln.cljs$lang$applyTo = (function (arglist__4297){
var xs = cljs.core.seq(arglist__4297);;
return emitln__delegate(xs);
});
emitln.cljs$lang$arity$variadic = emitln__delegate;
return emitln;
})()
;
cljs.compiler.emit_provide = (function emit_provide(sym){
if(cljs.core.truth_(goog.getObjectByName([cljs.core.str(sym)].join(''))))
{return null;
} else
{if((function (){var or__3824__auto__ = (cljs.compiler._STAR_emitted_provides_STAR_ == null);
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
emit_meta_constant.cljs$lang$applyTo = (function (arglist__4298){
var x = cljs.core.first(arglist__4298);
var body = cljs.core.rest(arglist__4298);
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
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.hash_map("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4299_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4299_SHARP_);
});
}),cljs.core.apply.call(null,cljs.core.concat,x))),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.compiler.emit_constant_set = (function emit_constant_set(x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.set(["], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4300_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4300_SHARP_);
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
{var x__2006__auto__ = (((x == null))?null:x);
return (function (){var or__3824__auto__ = (cljs.compiler.emit_constant[goog.typeOf(x__2006__auto__)]);
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
var vec__4304 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str(x)].join(''));
var _ = cljs.core.nth.call(null,vec__4304,0,null);
var flags = cljs.core.nth.call(null,vec__4304,1,null);
var pattern = cljs.core.nth.call(null,vec__4304,2,null);
return cljs.compiler.emits.call(null,[cljs.core.str("/"),cljs.core.str(cljs.compiler.escape_pattern.call(null,pattern)),cljs.core.str("/"),cljs.core.str(flags)].join(''));
});
cljs.core.PersistentVector.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentVector.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.vec(["], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4303_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4303_SHARP_);
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
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.list("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4302_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4302_SHARP_);
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
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.list("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__4301_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__4301_SHARP_);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'var",(function (p__4305){
var map__4306 = p__4305;
var map__4306__$1 = ((cljs.core.seq_QMARK_.call(null,map__4306))?cljs.core.apply.call(null,cljs.core.hash_map,map__4306):map__4306);
var arg = map__4306__$1;
var env = cljs.core._lookup.call(null,map__4306__$1,"\uFDD0'env",null);
var info = cljs.core._lookup.call(null,map__4306__$1,"\uFDD0'info",null);
var n = (new cljs.core.Keyword("\uFDD0'name")).call(null,info);
var n__$1 = ((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,n),"js"))?cljs.core.name.call(null,n):info);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,n__$1));
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'meta",(function (p__4307){
var map__4308 = p__4307;
var map__4308__$1 = ((cljs.core.seq_QMARK_.call(null,map__4308))?cljs.core.apply.call(null,cljs.core.hash_map,map__4308):map__4308);
var env = cljs.core._lookup.call(null,map__4308__$1,"\uFDD0'env",null);
var meta = cljs.core._lookup.call(null,map__4308__$1,"\uFDD0'meta",null);
var expr = cljs.core._lookup.call(null,map__4308__$1,"\uFDD0'expr",null);
var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.array_map_threshold = 16;
cljs.compiler.obj_map_threshold = 32;
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'map",(function (p__4309){
var map__4310 = p__4309;
var map__4310__$1 = ((cljs.core.seq_QMARK_.call(null,map__4310))?cljs.core.apply.call(null,cljs.core.hash_map,map__4310):map__4310);
var vals = cljs.core._lookup.call(null,map__4310__$1,"\uFDD0'vals",null);
var keys = cljs.core._lookup.call(null,map__4310__$1,"\uFDD0'keys",null);
var simple_keys_QMARK_ = cljs.core._lookup.call(null,map__4310__$1,"\uFDD0'simple-keys?",null);
var env = cljs.core._lookup.call(null,map__4310__$1,"\uFDD0'env",null);
var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
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
var sb__2218__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_4311_4313 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2219__auto__){
return sb__2218__auto__.append(x__2219__auto__);
});
cljs.compiler.emit.call(null,k);
cljs.core.print.call(null,":");
cljs.compiler.emit.call(null,v);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_4311_4313;
}return [cljs.core.str(sb__2218__auto__)].join('');
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
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'vector",(function (p__4314){
var map__4315 = p__4314;
var map__4315__$1 = ((cljs.core.seq_QMARK_.call(null,map__4315))?cljs.core.apply.call(null,cljs.core.hash_map,map__4315):map__4315);
var env = cljs.core._lookup.call(null,map__4315__$1,"\uFDD0'env",null);
var items = cljs.core._lookup.call(null,map__4315__$1,"\uFDD0'items",null);
var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.empty_QMARK_.call(null,items))
{cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else
{cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep.call(null,items),"], true)");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'set",(function (p__4316){
var map__4317 = p__4316;
var map__4317__$1 = ((cljs.core.seq_QMARK_.call(null,map__4317))?cljs.core.apply.call(null,cljs.core.hash_map,map__4317):map__4317);
var env = cljs.core._lookup.call(null,map__4317__$1,"\uFDD0'env",null);
var items = cljs.core._lookup.call(null,map__4317__$1,"\uFDD0'items",null);
var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.empty_QMARK_.call(null,items))
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.EMPTY");
} else
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.fromArray([",cljs.compiler.comma_sep.call(null,items),"])");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'constant",(function (p__4318){
var map__4319 = p__4318;
var map__4319__$1 = ((cljs.core.seq_QMARK_.call(null,map__4319))?cljs.core.apply.call(null,cljs.core.hash_map,map__4319):map__4319);
var env = cljs.core._lookup.call(null,map__4319__$1,"\uFDD0'env",null);
var form = cljs.core._lookup.call(null,map__4319__$1,"\uFDD0'form",null);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emit_constant.call(null,form);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
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
{var G__4322 = (new cljs.core.Keyword("\uFDD0'op")).call(null,e);
if(cljs.core._EQ_.call(null,"\uFDD0'constant",G__4322))
{var G__4323 = (new cljs.core.Keyword("\uFDD0'form")).call(null,e);
if(cljs.core._EQ_.call(null,false,G__4323))
{return (new cljs.core.Symbol(null,"boolean"));
} else
{if(cljs.core._EQ_.call(null,true,G__4323))
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
{if(cljs.core._EQ_.call(null,"\uFDD0'if",G__4322))
{var then_tag = infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'then")).call(null,e));
var else_tag = infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'else")).call(null,e));
if(cljs.core._EQ_.call(null,then_tag,else_tag))
{return then_tag;
} else
{return null;
}
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'let",G__4322))
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'if",(function (p__4324){
var map__4325 = p__4324;
var map__4325__$1 = ((cljs.core.seq_QMARK_.call(null,map__4325))?cljs.core.apply.call(null,cljs.core.hash_map,map__4325):map__4325);
var unchecked = cljs.core._lookup.call(null,map__4325__$1,"\uFDD0'unchecked",null);
var env = cljs.core._lookup.call(null,map__4325__$1,"\uFDD0'env",null);
var else$ = cljs.core._lookup.call(null,map__4325__$1,"\uFDD0'else",null);
var then = cljs.core._lookup.call(null,map__4325__$1,"\uFDD0'then",null);
var test = cljs.core._lookup.call(null,map__4325__$1,"\uFDD0'test",null);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'throw",(function (p__4326){
var map__4327 = p__4326;
var map__4327__$1 = ((cljs.core.seq_QMARK_.call(null,map__4327))?cljs.core.apply.call(null,cljs.core.hash_map,map__4327):map__4327);
var env = cljs.core._lookup.call(null,map__4327__$1,"\uFDD0'env",null);
var throw$ = cljs.core._lookup.call(null,map__4327__$1,"\uFDD0'throw",null);
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
var G__4332 = cljs.core.seq.call(null,clojure.string.split_lines.call(null,e));
while(true){
if(G__4332)
{var next_line = cljs.core.first.call(null,G__4332);
cljs.compiler.emitln.call(null,"* ",clojure.string.trim.call(null,next_line));
{
var G__4334 = cljs.core.next.call(null,G__4332);
G__4332 = G__4334;
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
var G__4333_4335 = cljs.core.seq.call(null,docs__$2);
while(true){
if(G__4333_4335)
{var e_4336 = cljs.core.first.call(null,G__4333_4335);
if(cljs.core.truth_(e_4336))
{print_comment_lines.call(null,e_4336);
} else
{}
{
var G__4337 = cljs.core.next.call(null,G__4333_4335);
G__4333_4335 = G__4337;
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'def",(function (p__4338){
var map__4339 = p__4338;
var map__4339__$1 = ((cljs.core.seq_QMARK_.call(null,map__4339))?cljs.core.apply.call(null,cljs.core.hash_map,map__4339):map__4339);
var export$ = cljs.core._lookup.call(null,map__4339__$1,"\uFDD0'export",null);
var doc = cljs.core._lookup.call(null,map__4339__$1,"\uFDD0'doc",null);
var env = cljs.core._lookup.call(null,map__4339__$1,"\uFDD0'env",null);
var init = cljs.core._lookup.call(null,map__4339__$1,"\uFDD0'init",null);
var name = cljs.core._lookup.call(null,map__4339__$1,"\uFDD0'name",null);
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
cljs.compiler.emit_apply_to = (function emit_apply_to(p__4340){
var map__4344 = p__4340;
var map__4344__$1 = ((cljs.core.seq_QMARK_.call(null,map__4344))?cljs.core.apply.call(null,cljs.core.hash_map,map__4344):map__4344);
var env = cljs.core._lookup.call(null,map__4344__$1,"\uFDD0'env",null);
var params = cljs.core._lookup.call(null,map__4344__$1,"\uFDD0'params",null);
var name = cljs.core._lookup.call(null,map__4344__$1,"\uFDD0'name",null);
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str("__delegate")].join('');
var params__$1 = cljs.core.map.call(null,cljs.compiler.munge,params);
cljs.compiler.emitln.call(null,"(function (",arglist,"){");
var G__4345_4347 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.butlast.call(null,params__$1)));
while(true){
if(G__4345_4347)
{var vec__4346_4348 = cljs.core.first.call(null,G__4345_4347);
var i_4349 = cljs.core.nth.call(null,vec__4346_4348,0,null);
var param_4350 = cljs.core.nth.call(null,vec__4346_4348,1,null);
cljs.compiler.emits.call(null,"var ",param_4350," = cljs.core.first(");
var n__2168__auto___4351 = i_4349;
var __4352 = 0;
while(true){
if((__4352 < n__2168__auto___4351))
{cljs.compiler.emits.call(null,"cljs.core.next(");
{
var G__4353 = (__4352 + 1);
__4352 = G__4353;
continue;
}
} else
{}
break;
}
cljs.compiler.emits.call(null,arglist,")");
var n__2168__auto___4354 = i_4349;
var __4355 = 0;
while(true){
if((__4355 < n__2168__auto___4354))
{cljs.compiler.emits.call(null,")");
{
var G__4356 = (__4355 + 1);
__4355 = G__4356;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,";");
{
var G__4357 = cljs.core.next.call(null,G__4345_4347);
G__4345_4347 = G__4357;
continue;
}
} else
{}
break;
}
if((1 < cljs.core.count.call(null,params__$1)))
{cljs.compiler.emits.call(null,"var ",cljs.core.last.call(null,params__$1)," = cljs.core.rest(");
var n__2168__auto___4358 = (cljs.core.count.call(null,params__$1) - 2);
var __4359 = 0;
while(true){
if((__4359 < n__2168__auto___4358))
{cljs.compiler.emits.call(null,"cljs.core.next(");
{
var G__4360 = (__4359 + 1);
__4359 = G__4360;
continue;
}
} else
{}
break;
}
cljs.compiler.emits.call(null,arglist);
var n__2168__auto___4361 = (cljs.core.count.call(null,params__$1) - 2);
var __4362 = 0;
while(true){
if((__4362 < n__2168__auto___4361))
{cljs.compiler.emits.call(null,")");
{
var G__4363 = (__4362 + 1);
__4362 = G__4363;
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
cljs.compiler.emit_fn_method = (function emit_fn_method(p__4364){
var map__4366 = p__4364;
var map__4366__$1 = ((cljs.core.seq_QMARK_.call(null,map__4366))?cljs.core.apply.call(null,cljs.core.hash_map,map__4366):map__4366);
var max_fixed_arity = cljs.core._lookup.call(null,map__4366__$1,"\uFDD0'max-fixed-arity",null);
var recurs = cljs.core._lookup.call(null,map__4366__$1,"\uFDD0'recurs",null);
var env = cljs.core._lookup.call(null,map__4366__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4366__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4366__$1,"\uFDD0'statements",null);
var params = cljs.core._lookup.call(null,map__4366__$1,"\uFDD0'params",null);
var variadic = cljs.core._lookup.call(null,map__4366__$1,"\uFDD0'variadic",null);
var name = cljs.core._lookup.call(null,map__4366__$1,"\uFDD0'name",null);
var type = cljs.core._lookup.call(null,map__4366__$1,"\uFDD0'type",null);
var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
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
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
});
cljs.compiler.emit_variadic_fn_method = (function emit_variadic_fn_method(p__4370){
var map__4372 = p__4370;
var map__4372__$1 = ((cljs.core.seq_QMARK_.call(null,map__4372))?cljs.core.apply.call(null,cljs.core.hash_map,map__4372):map__4372);
var f = map__4372__$1;
var max_fixed_arity = cljs.core._lookup.call(null,map__4372__$1,"\uFDD0'max-fixed-arity",null);
var recurs = cljs.core._lookup.call(null,map__4372__$1,"\uFDD0'recurs",null);
var env = cljs.core._lookup.call(null,map__4372__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4372__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4372__$1,"\uFDD0'statements",null);
var params = cljs.core._lookup.call(null,map__4372__$1,"\uFDD0'params",null);
var variadic = cljs.core._lookup.call(null,map__4372__$1,"\uFDD0'variadic",null);
var name = cljs.core._lookup.call(null,map__4372__$1,"\uFDD0'name",null);
var type = cljs.core._lookup.call(null,map__4372__$1,"\uFDD0'type",null);
var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
var name_4373__$1 = (function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null);
}
})();
var mname_4374 = cljs.compiler.munge.call(null,name_4373__$1);
var params_4375__$1 = cljs.core.map.call(null,cljs.compiler.munge,params);
var delegate_name_4376 = [cljs.core.str(mname_4374),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.call(null,"(function() { ");
cljs.compiler.emitln.call(null,"var ",delegate_name_4376," = function (",cljs.compiler.comma_sep.call(null,params_4375__$1),"){");
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
cljs.compiler.emitln.call(null,"var ",mname_4374," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params_4375__$1),cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(null,"var_args"))], true)):params_4375__$1)),"){");
if(cljs.core.truth_(type))
{cljs.compiler.emitln.call(null,"var self__ = this;");
} else
{}
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,"var ",cljs.core.last.call(null,params_4375__$1)," = null;");
cljs.compiler.emitln.call(null,"if (goog.isDef(var_args)) {");
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params_4375__$1)," = cljs.core.array_seq(Array.prototype.slice.call(arguments, ",(cljs.core.count.call(null,params_4375__$1) - 1),"),0);");
cljs.compiler.emitln.call(null,"} ");
} else
{}
cljs.compiler.emitln.call(null,"return ",delegate_name_4376,".call(",clojure.string.join.call(null,", ",cljs.core.cons.call(null,"this",params_4375__$1)),");");
cljs.compiler.emitln.call(null,"};");
cljs.compiler.emitln.call(null,mname_4374,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");
cljs.compiler.emits.call(null,mname_4374,".cljs$lang$applyTo = ");
cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,"\uFDD0'name",name_4373__$1));
cljs.compiler.emitln.call(null,";");
cljs.compiler.emitln.call(null,mname_4374,".cljs$lang$arity$variadic = ",delegate_name_4376,";");
cljs.compiler.emitln.call(null,"return ",mname_4374,";");
cljs.compiler.emitln.call(null,"})()");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'fn",(function (p__4377){
var map__4378 = p__4377;
var map__4378__$1 = ((cljs.core.seq_QMARK_.call(null,map__4378))?cljs.core.apply.call(null,cljs.core.hash_map,map__4378):map__4378);
var loop_lets = cljs.core._lookup.call(null,map__4378__$1,"\uFDD0'loop-lets",null);
var recur_frames = cljs.core._lookup.call(null,map__4378__$1,"\uFDD0'recur-frames",null);
var variadic = cljs.core._lookup.call(null,map__4378__$1,"\uFDD0'variadic",null);
var max_fixed_arity = cljs.core._lookup.call(null,map__4378__$1,"\uFDD0'max-fixed-arity",null);
var methods$ = cljs.core._lookup.call(null,map__4378__$1,"\uFDD0'methods",null);
var env = cljs.core._lookup.call(null,map__4378__$1,"\uFDD0'env",null);
var name = cljs.core._lookup.call(null,map__4378__$1,"\uFDD0'name",null);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,cljs.core.mapcat.call(null,"\uFDD0'params",cljs.core.filter.call(null,(function (p1__4367_SHARP_){
var and__3822__auto__ = p1__4367_SHARP_;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core.deref.call(null,(new cljs.core.Keyword("\uFDD0'flag")).call(null,p1__4367_SHARP_));
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
{var has_name_QMARK__4386 = (function (){var and__3822__auto__ = name;
if(cljs.core.truth_(and__3822__auto__))
{return true;
} else
{return and__3822__auto__;
}
})();
var name_4387__$1 = (function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null);
}
})();
var mname_4388 = cljs.compiler.munge.call(null,name_4387__$1);
var maxparams_4389 = cljs.core.map.call(null,cljs.compiler.munge,cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,"\uFDD0'params",methods$)));
var mmap_4390 = cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (method){
return cljs.core.PersistentVector.fromArray([cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str(mname_4388),cljs.core.str("__"),cljs.core.str(cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,method)))].join(''))),method], true);
}),methods$));
var ms_4391 = cljs.core.sort_by.call(null,(function (p1__4368_SHARP_){
return cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,cljs.core.second.call(null,p1__4368_SHARP_)));
}),cljs.core.seq.call(null,mmap_4390));
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emitln.call(null,"(function() {");
cljs.compiler.emitln.call(null,"var ",mname_4388," = null;");
var G__4379_4392 = cljs.core.seq.call(null,ms_4391);
while(true){
if(G__4379_4392)
{var vec__4380_4393 = cljs.core.first.call(null,G__4379_4392);
var n_4394 = cljs.core.nth.call(null,vec__4380_4393,0,null);
var meth_4395 = cljs.core.nth.call(null,vec__4380_4393,1,null);
cljs.compiler.emits.call(null,"var ",n_4394," = ");
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_4395)))
{cljs.compiler.emit_variadic_fn_method.call(null,meth_4395);
} else
{cljs.compiler.emit_fn_method.call(null,meth_4395);
}
cljs.compiler.emitln.call(null,";");
{
var G__4396 = cljs.core.next.call(null,G__4379_4392);
G__4379_4392 = G__4396;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,mname_4388," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_4389),cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(null,"var_args"))], true)):maxparams_4389)),"){");
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,"var ",cljs.core.last.call(null,maxparams_4389)," = var_args;");
} else
{}
cljs.compiler.emitln.call(null,"switch(arguments.length){");
var G__4381_4397 = cljs.core.seq.call(null,ms_4391);
while(true){
if(G__4381_4397)
{var vec__4382_4398 = cljs.core.first.call(null,G__4381_4397);
var n_4399 = cljs.core.nth.call(null,vec__4382_4398,0,null);
var meth_4400 = cljs.core.nth.call(null,vec__4382_4398,1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_4400)))
{cljs.compiler.emitln.call(null,"default:");
cljs.compiler.emitln.call(null,"return ",n_4399,".cljs$lang$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_4389)),(((cljs.core.count.call(null,maxparams_4389) > 1))?", ":null),"cljs.core.array_seq(arguments, ",max_fixed_arity,"));");
} else
{var pcnt_4401 = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,meth_4400));
cljs.compiler.emitln.call(null,"case ",pcnt_4401,":");
cljs.compiler.emitln.call(null,"return ",n_4399,".call(this",(((pcnt_4401 === 0))?null:cljs.core.list.call(null,",",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_4401,maxparams_4389)))),");");
}
{
var G__4402 = cljs.core.next.call(null,G__4381_4397);
G__4381_4397 = G__4402;
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
{cljs.compiler.emitln.call(null,mname_4388,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");
cljs.compiler.emitln.call(null,mname_4388,".cljs$lang$applyTo = ",cljs.core.some.call(null,(function (p1__4369_SHARP_){
var vec__4383 = p1__4369_SHARP_;
var n = cljs.core.nth.call(null,vec__4383,0,null);
var m = cljs.core.nth.call(null,vec__4383,1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,m)))
{return n;
} else
{return null;
}
}),ms_4391),".cljs$lang$applyTo;");
} else
{}
if(cljs.core.truth_(has_name_QMARK__4386))
{var G__4384_4403 = cljs.core.seq.call(null,ms_4391);
while(true){
if(G__4384_4403)
{var vec__4385_4404 = cljs.core.first.call(null,G__4384_4403);
var n_4405 = cljs.core.nth.call(null,vec__4385_4404,0,null);
var meth_4406 = cljs.core.nth.call(null,vec__4385_4404,1,null);
var c_4407 = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,meth_4406));
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_4406)))
{cljs.compiler.emitln.call(null,mname_4388,".cljs$lang$arity$variadic = ",n_4405,".cljs$lang$arity$variadic;");
} else
{cljs.compiler.emitln.call(null,mname_4388,".cljs$lang$arity$",c_4407," = ",n_4405,";");
}
{
var G__4408 = cljs.core.next.call(null,G__4384_4403);
G__4384_4403 = G__4408;
continue;
}
} else
{}
break;
}
} else
{}
cljs.compiler.emitln.call(null,"return ",mname_4388,";");
cljs.compiler.emitln.call(null,"})()");
}
if(loop_locals)
{return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else
{return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'do",(function (p__4409){
var map__4410 = p__4409;
var map__4410__$1 = ((cljs.core.seq_QMARK_.call(null,map__4410))?cljs.core.apply.call(null,cljs.core.hash_map,map__4410):map__4410);
var env = cljs.core._lookup.call(null,map__4410__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4410__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4410__$1,"\uFDD0'statements",null);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'try*",(function (p__4412){
var map__4413 = p__4412;
var map__4413__$1 = ((cljs.core.seq_QMARK_.call(null,map__4413))?cljs.core.apply.call(null,cljs.core.hash_map,map__4413):map__4413);
var finally$ = cljs.core._lookup.call(null,map__4413__$1,"\uFDD0'finally",null);
var name = cljs.core._lookup.call(null,map__4413__$1,"\uFDD0'name",null);
var catch$ = cljs.core._lookup.call(null,map__4413__$1,"\uFDD0'catch",null);
var try$ = cljs.core._lookup.call(null,map__4413__$1,"\uFDD0'try",null);
var env = cljs.core._lookup.call(null,map__4413__$1,"\uFDD0'env",null);
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
var map__4414_4418 = try$;
var map__4414_4419__$1 = ((cljs.core.seq_QMARK_.call(null,map__4414_4418))?cljs.core.apply.call(null,cljs.core.hash_map,map__4414_4418):map__4414_4418);
var ret_4420 = cljs.core._lookup.call(null,map__4414_4419__$1,"\uFDD0'ret",null);
var statements_4421 = cljs.core._lookup.call(null,map__4414_4419__$1,"\uFDD0'statements",null);
cljs.compiler.emit_block.call(null,subcontext,statements_4421,ret_4420);
cljs.compiler.emits.call(null,"}");
if(cljs.core.truth_(name))
{cljs.compiler.emits.call(null,"catch (",cljs.compiler.munge.call(null,name),"){");
if(cljs.core.truth_(catch$))
{var map__4415_4422 = catch$;
var map__4415_4423__$1 = ((cljs.core.seq_QMARK_.call(null,map__4415_4422))?cljs.core.apply.call(null,cljs.core.hash_map,map__4415_4422):map__4415_4422);
var ret_4424 = cljs.core._lookup.call(null,map__4415_4423__$1,"\uFDD0'ret",null);
var statements_4425 = cljs.core._lookup.call(null,map__4415_4423__$1,"\uFDD0'statements",null);
cljs.compiler.emit_block.call(null,subcontext,statements_4425,ret_4424);
} else
{}
cljs.compiler.emits.call(null,"}");
} else
{}
if(cljs.core.truth_(finally$))
{var map__4416_4426 = finally$;
var map__4416_4427__$1 = ((cljs.core.seq_QMARK_.call(null,map__4416_4426))?cljs.core.apply.call(null,cljs.core.hash_map,map__4416_4426):map__4416_4426);
var ret_4428 = cljs.core._lookup.call(null,map__4416_4427__$1,"\uFDD0'ret",null);
var statements_4429 = cljs.core._lookup.call(null,map__4416_4427__$1,"\uFDD0'statements",null);
if(cljs.core.not_EQ_.call(null,"\uFDD0'constant",(new cljs.core.Keyword("\uFDD0'op")).call(null,ret_4428)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("finally block cannot contain constant"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"not=")),"\uFDD0'constant",cljs.core.with_meta(cljs.core.list("\uFDD0'op",(new cljs.core.Symbol(null,"ret"))),cljs.core.hash_map("\uFDD0'line",587))),cljs.core.hash_map("\uFDD0'line",587))))].join('')));
}
cljs.compiler.emits.call(null,"finally {");
cljs.compiler.emit_block.call(null,subcontext,statements_4429,ret_4428);
cljs.compiler.emits.call(null,"}");
} else
{}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
} else
{var map__4417 = try$;
var map__4417__$1 = ((cljs.core.seq_QMARK_.call(null,map__4417))?cljs.core.apply.call(null,cljs.core.hash_map,map__4417):map__4417);
var ret = cljs.core._lookup.call(null,map__4417__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4417__$1,"\uFDD0'statements",null);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'let",(function (p__4430){
var map__4431 = p__4430;
var map__4431__$1 = ((cljs.core.seq_QMARK_.call(null,map__4431))?cljs.core.apply.call(null,cljs.core.hash_map,map__4431):map__4431);
var loop = cljs.core._lookup.call(null,map__4431__$1,"\uFDD0'loop",null);
var env = cljs.core._lookup.call(null,map__4431__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4431__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4431__$1,"\uFDD0'statements",null);
var bindings = cljs.core._lookup.call(null,map__4431__$1,"\uFDD0'bindings",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
var _STAR_lexical_renames_STAR_4432_4436 = cljs.compiler._STAR_lexical_renames_STAR_;
try{cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,"\uFDD0'statement",context))?cljs.core.map.call(null,(function (p1__4411_SHARP_){
return cljs.core.vector.call(null,cljs.core.hash.call(null,p1__4411_SHARP_),cljs.core.gensym.call(null,[cljs.core.str((new cljs.core.Keyword("\uFDD0'name")).call(null,p1__4411_SHARP_)),cljs.core.str("-")].join('')));
}),bindings):null));
var G__4434_4437 = cljs.core.seq.call(null,bindings);
while(true){
if(G__4434_4437)
{var map__4435_4438 = cljs.core.first.call(null,G__4434_4437);
var map__4435_4439__$1 = ((cljs.core.seq_QMARK_.call(null,map__4435_4438))?cljs.core.apply.call(null,cljs.core.hash_map,map__4435_4438):map__4435_4438);
var binding_4440 = map__4435_4439__$1;
var init_4441 = cljs.core._lookup.call(null,map__4435_4439__$1,"\uFDD0'init",null);
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_4440)," = ",init_4441,";");
{
var G__4442 = cljs.core.next.call(null,G__4434_4437);
G__4434_4437 = G__4442;
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
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_4432_4436;
}if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'recur",(function (p__4443){
var map__4444 = p__4443;
var map__4444__$1 = ((cljs.core.seq_QMARK_.call(null,map__4444))?cljs.core.apply.call(null,cljs.core.hash_map,map__4444):map__4444);
var env = cljs.core._lookup.call(null,map__4444__$1,"\uFDD0'env",null);
var exprs = cljs.core._lookup.call(null,map__4444__$1,"\uFDD0'exprs",null);
var frame = cljs.core._lookup.call(null,map__4444__$1,"\uFDD0'frame",null);
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = (new cljs.core.Keyword("\uFDD0'params")).call(null,frame);
cljs.compiler.emitln.call(null,"{");
var n__2168__auto___4445 = cljs.core.count.call(null,exprs);
var i_4446 = 0;
while(true){
if((i_4446 < n__2168__auto___4445))
{cljs.compiler.emitln.call(null,"var ",temps.call(null,i_4446)," = ",exprs.call(null,i_4446),";");
{
var G__4447 = (i_4446 + 1);
i_4446 = G__4447;
continue;
}
} else
{}
break;
}
var n__2168__auto___4448 = cljs.core.count.call(null,exprs);
var i_4449 = 0;
while(true){
if((i_4449 < n__2168__auto___4448))
{cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_4449))," = ",temps.call(null,i_4449),";");
{
var G__4450 = (i_4449 + 1);
i_4449 = G__4450;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,"continue;");
return cljs.compiler.emitln.call(null,"}");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'letfn",(function (p__4451){
var map__4452 = p__4451;
var map__4452__$1 = ((cljs.core.seq_QMARK_.call(null,map__4452))?cljs.core.apply.call(null,cljs.core.hash_map,map__4452):map__4452);
var env = cljs.core._lookup.call(null,map__4452__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__4452__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__4452__$1,"\uFDD0'statements",null);
var bindings = cljs.core._lookup.call(null,map__4452__$1,"\uFDD0'bindings",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
var G__4453_4455 = cljs.core.seq.call(null,bindings);
while(true){
if(G__4453_4455)
{var map__4454_4456 = cljs.core.first.call(null,G__4453_4455);
var map__4454_4457__$1 = ((cljs.core.seq_QMARK_.call(null,map__4454_4456))?cljs.core.apply.call(null,cljs.core.hash_map,map__4454_4456):map__4454_4456);
var binding_4458 = map__4454_4457__$1;
var init_4459 = cljs.core._lookup.call(null,map__4454_4457__$1,"\uFDD0'init",null);
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_4458)," = ",init_4459,";");
{
var G__4460 = cljs.core.next.call(null,G__4453_4455);
G__4453_4455 = G__4460;
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
return cljs.core.symbol.call(null,[cljs.core.str([cljs.core.str(psym)].join('').replace((new RegExp("\\.","g")),"$").replace((new RegExp("\\/","g")),"$")),cljs.core.str("$")].join(''));
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'invoke",(function (p__4461){
var map__4462 = p__4461;
var map__4462__$1 = ((cljs.core.seq_QMARK_.call(null,map__4462))?cljs.core.apply.call(null,cljs.core.hash_map,map__4462):map__4462);
var expr = map__4462__$1;
var env = cljs.core._lookup.call(null,map__4462__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__4462__$1,"\uFDD0'args",null);
var f = cljs.core._lookup.call(null,map__4462__$1,"\uFDD0'f",null);
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
var vec__4463 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
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
var f__$1 = cljs.core.nth.call(null,vec__4463,0,null);
var variadic_invoke = cljs.core.nth.call(null,vec__4463,1,null);
var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(opt_not_QMARK_))
{cljs.compiler.emits.call(null,"!(",cljs.core.first.call(null,args),")");
} else
{if(cljs.core.truth_(proto_QMARK_))
{var pimpl_4464 = [cljs.core.str(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str(cljs.compiler.munge.call(null,cljs.core.name.call(null,(new cljs.core.Keyword("\uFDD0'name")).call(null,info)))),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_4464,"(",cljs.compiler.comma_sep.call(null,args),")");
} else
{if(cljs.core.truth_(keyword_QMARK_))
{cljs.compiler.emits.call(null,"(new cljs.core.Keyword(",f__$1,")).call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
} else
{if(cljs.core.truth_(variadic_invoke))
{var mfa_4465 = (new cljs.core.Keyword("\uFDD0'max-fixed-arity")).call(null,variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_4465,args)),(((mfa_4465 === 0))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_4465,args)),"], 0))");
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
{var fprop_4466 = [cljs.core.str(".cljs$lang$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,"(",f__$1,fprop_4466," ? ",f__$1,fprop_4466,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
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
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'new",(function (p__4467){
var map__4468 = p__4467;
var map__4468__$1 = ((cljs.core.seq_QMARK_.call(null,map__4468))?cljs.core.apply.call(null,cljs.core.hash_map,map__4468):map__4468);
var env = cljs.core._lookup.call(null,map__4468__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__4468__$1,"\uFDD0'args",null);
var ctor = cljs.core._lookup.call(null,map__4468__$1,"\uFDD0'ctor",null);
var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'set!",(function (p__4469){
var map__4470 = p__4469;
var map__4470__$1 = ((cljs.core.seq_QMARK_.call(null,map__4470))?cljs.core.apply.call(null,cljs.core.hash_map,map__4470):map__4470);
var env = cljs.core._lookup.call(null,map__4470__$1,"\uFDD0'env",null);
var val = cljs.core._lookup.call(null,map__4470__$1,"\uFDD0'val",null);
var target = cljs.core._lookup.call(null,map__4470__$1,"\uFDD0'target",null);
var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,target," = ",val);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'ns",(function (p__4471){
var map__4472 = p__4471;
var map__4472__$1 = ((cljs.core.seq_QMARK_.call(null,map__4472))?cljs.core.apply.call(null,cljs.core.hash_map,map__4472):map__4472);
var env = cljs.core._lookup.call(null,map__4472__$1,"\uFDD0'env",null);
var requires_macros = cljs.core._lookup.call(null,map__4472__$1,"\uFDD0'requires-macros",null);
var uses = cljs.core._lookup.call(null,map__4472__$1,"\uFDD0'uses",null);
var requires = cljs.core._lookup.call(null,map__4472__$1,"\uFDD0'requires",null);
var name = cljs.core._lookup.call(null,map__4472__$1,"\uFDD0'name",null);
cljs.core.swap_BANG_.call(null,cljs.compiler.ns_first_segments,cljs.core.conj,cljs.core.first.call(null,clojure.string.split.call(null,[cljs.core.str(name)].join(''),/\./)));
cljs.compiler.emit_provide.call(null,cljs.compiler.munge.call(null,name));
if(cljs.core._EQ_.call(null,name,(new cljs.core.Symbol(null,"cljs.core"))))
{} else
{cljs.compiler.emitln.call(null,"goog.require('cljs.core');");
}
var G__4473 = cljs.core.seq.call(null,cljs.core.into.call(null,cljs.core.vals.call(null,requires),cljs.core.distinct.call(null,cljs.core.vals.call(null,uses))));
while(true){
if(G__4473)
{var lib = cljs.core.first.call(null,G__4473);
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib),"');");
{
var G__4474 = cljs.core.next.call(null,G__4473);
G__4473 = G__4474;
continue;
}
} else
{return null;
}
break;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'deftype*",(function (p__4475){
var map__4476 = p__4475;
var map__4476__$1 = ((cljs.core.seq_QMARK_.call(null,map__4476))?cljs.core.apply.call(null,cljs.core.hash_map,map__4476):map__4476);
var pmasks = cljs.core._lookup.call(null,map__4476__$1,"\uFDD0'pmasks",null);
var fields = cljs.core._lookup.call(null,map__4476__$1,"\uFDD0'fields",null);
var t = cljs.core._lookup.call(null,map__4476__$1,"\uFDD0't",null);
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emit_provide.call(null,t);
cljs.compiler.emitln.call(null,"");
cljs.compiler.emitln.call(null,"/**");
cljs.compiler.emitln.call(null,"* @constructor");
cljs.compiler.emitln.call(null,"*/");
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");
var G__4477_4480 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__4477_4480)
{var fld_4481 = cljs.core.first.call(null,G__4477_4480);
cljs.compiler.emitln.call(null,"this.",fld_4481," = ",fld_4481,";");
{
var G__4482 = cljs.core.next.call(null,G__4477_4480);
G__4477_4480 = G__4482;
continue;
}
} else
{}
break;
}
var G__4478_4483 = cljs.core.seq.call(null,pmasks);
while(true){
if(G__4478_4483)
{var vec__4479_4484 = cljs.core.first.call(null,G__4478_4483);
var pno_4485 = cljs.core.nth.call(null,vec__4479_4484,0,null);
var pmask_4486 = cljs.core.nth.call(null,vec__4479_4484,1,null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_4485,"$ = ",pmask_4486,";");
{
var G__4487 = cljs.core.next.call(null,G__4478_4483);
G__4478_4483 = G__4487;
continue;
}
} else
{}
break;
}
return cljs.compiler.emitln.call(null,"})");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'defrecord*",(function (p__4488){
var map__4489 = p__4488;
var map__4489__$1 = ((cljs.core.seq_QMARK_.call(null,map__4489))?cljs.core.apply.call(null,cljs.core.hash_map,map__4489):map__4489);
var pmasks = cljs.core._lookup.call(null,map__4489__$1,"\uFDD0'pmasks",null);
var fields = cljs.core._lookup.call(null,map__4489__$1,"\uFDD0'fields",null);
var t = cljs.core._lookup.call(null,map__4489__$1,"\uFDD0't",null);
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),cljs.core.vec([(new cljs.core.Symbol(null,"__meta")),(new cljs.core.Symbol(null,"__extmap"))]));
cljs.compiler.emit_provide.call(null,t);
cljs.compiler.emitln.call(null,"");
cljs.compiler.emitln.call(null,"/**");
cljs.compiler.emitln.call(null,"* @constructor");
var G__4490_4494 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__4490_4494)
{var fld_4495 = cljs.core.first.call(null,G__4490_4494);
cljs.compiler.emitln.call(null,"* @param {*} ",fld_4495);
{
var G__4496 = cljs.core.next.call(null,G__4490_4494);
G__4490_4494 = G__4496;
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
var G__4491_4497 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__4491_4497)
{var fld_4498 = cljs.core.first.call(null,G__4491_4497);
cljs.compiler.emitln.call(null,"this.",fld_4498," = ",fld_4498,";");
{
var G__4499 = cljs.core.next.call(null,G__4491_4497);
G__4491_4497 = G__4499;
continue;
}
} else
{}
break;
}
var G__4492_4500 = cljs.core.seq.call(null,pmasks);
while(true){
if(G__4492_4500)
{var vec__4493_4501 = cljs.core.first.call(null,G__4492_4500);
var pno_4502 = cljs.core.nth.call(null,vec__4493_4501,0,null);
var pmask_4503 = cljs.core.nth.call(null,vec__4493_4501,1,null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_4502,"$ = ",pmask_4503,";");
{
var G__4504 = cljs.core.next.call(null,G__4492_4500);
G__4492_4500 = G__4504;
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'dot",(function (p__4505){
var map__4506 = p__4505;
var map__4506__$1 = ((cljs.core.seq_QMARK_.call(null,map__4506))?cljs.core.apply.call(null,cljs.core.hash_map,map__4506):map__4506);
var env = cljs.core._lookup.call(null,map__4506__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__4506__$1,"\uFDD0'args",null);
var method = cljs.core._lookup.call(null,map__4506__$1,"\uFDD0'method",null);
var field = cljs.core._lookup.call(null,map__4506__$1,"\uFDD0'field",null);
var target = cljs.core._lookup.call(null,map__4506__$1,"\uFDD0'target",null);
var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(field))
{cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else
{cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'js",(function (p__4507){
var map__4508 = p__4507;
var map__4508__$1 = ((cljs.core.seq_QMARK_.call(null,map__4508))?cljs.core.apply.call(null,cljs.core.hash_map,map__4508):map__4508);
var args = cljs.core._lookup.call(null,map__4508__$1,"\uFDD0'args",null);
var segs = cljs.core._lookup.call(null,map__4508__$1,"\uFDD0'segs",null);
var code = cljs.core._lookup.call(null,map__4508__$1,"\uFDD0'code",null);
var env = cljs.core._lookup.call(null,map__4508__$1,"\uFDD0'env",null);
var env__2979__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(code))
{cljs.compiler.emits.call(null,code);
} else
{cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,cljs.core.PersistentVector.fromArray([null], true))));
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2979__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
/**
* Seq of forms in a Clojure or ClojureScript file.
*/
cljs.compiler.forms_seq = (function() {
var forms_seq = null;
var forms_seq__1 = (function (f){
return forms_seq.call(null,f,cljs.reader.push_back_reader.call(null,cljs.io.file_read.call(null,f)));
});
var forms_seq__2 = (function (f,rdr){
var temp__3971__auto__ = (function (){var _STAR_ns_sym_STAR_4511 = cljs.core._STAR_ns_sym_STAR_;
try{cljs.core._STAR_ns_sym_STAR_ = cljs.analyzer._STAR_reader_ns_name_STAR_;
return cljs.reader.read.call(null,rdr,null,null);
}finally {cljs.core._STAR_ns_sym_STAR_ = _STAR_ns_sym_STAR_4511;
}})();
if(cljs.core.truth_(temp__3971__auto__))
{var form = temp__3971__auto__;
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,form,forms_seq.call(null,f,rdr));
}),null));
} else
{return null;
}
});
forms_seq = function(f,rdr){
switch(arguments.length){
case 1:
return forms_seq__1.call(this,f);
case 2:
return forms_seq__2.call(this,f,rdr);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
forms_seq.cljs$lang$arity$1 = forms_seq__1;
forms_seq.cljs$lang$arity$2 = forms_seq__2;
return forms_seq;
})()
;
/**
* Change the file extension from .cljs to .js. Takes a File or a
* String. Always returns a String.
*/
cljs.compiler.rename_to_js = (function rename_to_js(file_str){
return clojure.string.replace.call(null,file_str,/\.cljs$/,".js");
});
/**
* Create all parent directories for the passed file.
*/
cljs.compiler.mkdirs = (function mkdirs(f){
return f.getCanonicalFile().getParentFile().mkdirs();
});
cljs.compiler.compile_forms_STAR_ = (function() {
var compile_forms_STAR_ = null;
var compile_forms_STAR___1 = (function (forms){
return compile_forms_STAR_.call(null,forms,null,null,"","");
});
var compile_forms_STAR___5 = (function (forms,ns_name,deps,code,output){
while(true){
if(cljs.core.seq.call(null,forms))
{var env = cljs.analyzer.empty_env.call(null);
var ast = cljs.analyzer.analyze.call(null,env,cljs.core.first.call(null,forms));
var js_str = cljs.compiler.emit_str.call(null,ast);
var code__$1 = [cljs.core.str(code),cljs.core.str(js_str)].join('');
var output1 = (function (){try{var sb__2218__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_4517_4519 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = ((function (forms,ns_name,deps,code,output){
return (function (x__2219__auto__){
return sb__2218__auto__.append(x__2219__auto__);
});})(forms,ns_name,deps,code,output))
;
eval(js_str);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_4517_4519;
}return [cljs.core.str(sb__2218__auto__)].join('');
}catch (e4516){if(cljs.core.instance_QMARK_.call(null,Error,e4516))
{var e = e4516;
throw (new Error([cljs.core.str("Failed to evaluate: "),cljs.core.str(cljs.core.pr_str.call(null,js_str)),cljs.core.str("\n"),cljs.core.str(e)].join('')));
} else
{if("\uFDD0'else")
{throw e4516;
} else
{return null;
}
}
}})();
var output__$1 = [cljs.core.str(output),cljs.core.str(output1)].join('');
if(cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'op")).call(null,ast),"\uFDD0'ns"))
{{
var G__4520 = cljs.core.rest.call(null,forms);
var G__4521 = (new cljs.core.Keyword("\uFDD0'name")).call(null,ast);
var G__4522 = cljs.core.merge.call(null,(new cljs.core.Keyword("\uFDD0'uses")).call(null,ast),(new cljs.core.Keyword("\uFDD0'requires")).call(null,ast));
var G__4523 = code__$1;
var G__4524 = output__$1;
forms = G__4520;
ns_name = G__4521;
deps = G__4522;
code = G__4523;
output = G__4524;
continue;
}
} else
{{
var G__4525 = cljs.core.rest.call(null,forms);
var G__4526 = ns_name;
var G__4527 = deps;
var G__4528 = code__$1;
var G__4529 = output__$1;
forms = G__4525;
ns_name = G__4526;
deps = G__4527;
code = G__4528;
output = G__4529;
continue;
}
}
} else
{return cljs.core.ObjMap.fromObject(["\uFDD0'ns","\uFDD0'emit-str","\uFDD0'output","\uFDD0'provides","\uFDD0'requires"],{"\uFDD0'ns":(function (){var or__3824__auto__ = ns_name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.analyzer._STAR_cljs_ns_STAR_;
}
})(),"\uFDD0'emit-str":code,"\uFDD0'output":output,"\uFDD0'provides":cljs.core.PersistentVector.fromArray([ns_name], true),"\uFDD0'requires":((cljs.core._EQ_.call(null,ns_name,(new cljs.core.Symbol(null,"cljs.core"))))?cljs.core.set.call(null,cljs.core.vals.call(null,deps)):cljs.core.conj.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,deps)),(new cljs.core.Symbol(null,"cljs.core"))))});
}
break;
}
});
compile_forms_STAR_ = function(forms,ns_name,deps,code,output){
switch(arguments.length){
case 1:
return compile_forms_STAR___1.call(this,forms);
case 5:
return compile_forms_STAR___5.call(this,forms,ns_name,deps,code,output);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
compile_forms_STAR_.cljs$lang$arity$1 = compile_forms_STAR___1;
compile_forms_STAR_.cljs$lang$arity$5 = compile_forms_STAR___5;
return compile_forms_STAR_;
})()
;
/**
* Snapshot the given namespace. Returns the JavaScript to update
* cljs.core/namespace based on the snapshot.
*/
cljs.compiler.ns_snap = (function ns_snap(ns){
var nss1 = cljs.core.update_in.call(null,cljs.core.dissoc.call(null,cljs.core._lookup.call(null,cljs.core.deref.call(null,cljs.analyzer.namespaces),ns,null),"\uFDD0'requires-macros"),cljs.core.PersistentVector.fromArray(["\uFDD0'defs",(new cljs.core.Symbol(null,"/"))], true),cljs.core.assoc,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.core/_SLASH_")));
var nss2 = cljs.core.update_in.call(null,cljs.reader.read_string.call(null,cljs.core.pr_str.call(null,nss1)),cljs.core.PersistentVector.fromArray(["\uFDD0'defs",(new cljs.core.Symbol(null,"/"))], true),cljs.core.assoc,"\uFDD0'name",cljs.core.symbol.call(null,"cljs.core//"));
return cljs.core.apply.call(null,cljs.core.str,cljs.compiler.emit_str.call(null,cljs.analyzer.analyze.call(null,cljs.analyzer.empty_env.call(null),cljs.core.list.call(null,(new cljs.core.Symbol(null,"swap!")),(new cljs.core.Symbol(null,"cljs.core/namespaces")),(new cljs.core.Symbol(null,"assoc")),cljs.core.list.call(null,(new cljs.core.Symbol(null,"quote")),ns),cljs.core.list.call(null,(new cljs.core.Symbol(null,"quote")),nss2)))));
});
cljs.compiler.compile_file_STAR_ = (function compile_file_STAR_(src,dest){
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'defs")).call(null,cljs.core._lookup.call(null,cljs.core.deref.call(null,cljs.analyzer.namespaces),(new cljs.core.Symbol(null,"cljs.core")),null))))
{} else
{cljs.core.println.call(null,"// analyzing cljs/core.cljs");
cljs.analyzer.analyze_file.call(null,"cljs/core.cljs");
}
var _STAR_cljs_ns_STAR_4535 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_cljs_file_STAR_4536 = cljs.analyzer._STAR_cljs_file_STAR_;
var _STAR_position_STAR_4537 = cljs.compiler._STAR_position_STAR_;
var _STAR_emitted_provides_STAR_4538 = cljs.compiler._STAR_emitted_provides_STAR_;
try{cljs.analyzer._STAR_cljs_ns_STAR_ = (new cljs.core.Symbol(null,"cljs.user"));
cljs.analyzer._STAR_cljs_file_STAR_ = src.getPath();
cljs.compiler._STAR_position_STAR_ = cljs.core.atom.call(null,cljs.core.PersistentVector.fromArray([0,0], true));
cljs.compiler._STAR_emitted_provides_STAR_ = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
var cf = cljs.core.merge.call(null,cljs.compiler.compile_forms_STAR_.call(null,cljs.compiler.forms_seq.call(null,src)),cljs.core.ObjMap.fromObject(["\uFDD0'file"],{"\uFDD0'file":dest.getPath()}));
var ns_str = cljs.compiler.ns_snap.call(null,cljs.core.first.call(null,(new cljs.core.Keyword("\uFDD0'provides")).call(null,cf)));
var write_str = [cljs.core.str((new cljs.core.Keyword("\uFDD0'emit-str")).call(null,cf)),cljs.core.str("\n// Analyzer namespace snapshot:\n"),cljs.core.str(ns_str)].join('');
cljs.io.file_write.call(null,dest,write_str);
return cljs.core.dissoc.call(null,cf,"\uFDD0'emit-str","\uFDD0'output");
}finally {cljs.compiler._STAR_emitted_provides_STAR_ = _STAR_emitted_provides_STAR_4538;
cljs.compiler._STAR_position_STAR_ = _STAR_position_STAR_4537;
cljs.analyzer._STAR_cljs_file_STAR_ = _STAR_cljs_file_STAR_4536;
cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_4535;
}});
/**
* Return true if the src file requires compilation.
*/
cljs.compiler.requires_compilation_QMARK_ = (function requires_compilation_QMARK_(src,dest){
var or__3824__auto__ = cljs.core.not.call(null,dest.exists());
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return (src.lastModified() > dest.lastModified());
}
});
/**
* Compiles src to a file of the same name, but with a .js extension,
* in the src file's directory.
* 
* With dest argument, write file to provided location. If the dest
* argument is a file outside the source tree, missing parent
* directories will be created. The src file will only be compiled if
* the dest file has an older modification time.
* 
* Both src and dest may be either a String or a File.
* 
* Returns a map containing {:ns .. :provides .. :requires .. :file ..}.
* If the file was not compiled returns only {:file ...}
*/
cljs.compiler.compile_file = (function() {
var compile_file = null;
var compile_file__1 = (function (src){
var dest = cljs.compiler.rename_to_js.call(null,src);
return compile_file.call(null,src,dest);
});
var compile_file__2 = (function (src,dest){
var src_file = cljs.io.file.call(null,src);
var dest_file = cljs.io.file.call(null,dest);
if(cljs.core.truth_(src_file.exists()))
{if(cljs.core.truth_(cljs.compiler.requires_compilation_QMARK_.call(null,src_file,dest_file)))
{cljs.compiler.mkdirs.call(null,dest_file);
return cljs.compiler.compile_file_STAR_.call(null,src_file,dest_file);
} else
{return cljs.core.ObjMap.fromObject(["\uFDD0'file"],{"\uFDD0'file":dest_file});
}
} else
{throw (new Error([cljs.core.str("The file "),cljs.core.str(src),cljs.core.str(" does not exist.")].join('')));
}
});
compile_file = function(src,dest){
switch(arguments.length){
case 1:
return compile_file__1.call(this,src);
case 2:
return compile_file__2.call(this,src,dest);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
compile_file.cljs$lang$arity$1 = compile_file__1;
compile_file.cljs$lang$arity$2 = compile_file__2;
return compile_file;
})()
;
cljs.compiler.path_seq = (function path_seq(file_str){
return clojure.string.split.call(null,file_str,cljs.io.path_separator);
});
cljs.compiler.to_path = (function() {
var to_path = null;
var to_path__1 = (function (parts){
return to_path.call(null,parts,cljs.io.path_separator);
});
var to_path__2 = (function (parts,sep){
return cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null,sep,parts));
});
to_path = function(parts,sep){
switch(arguments.length){
case 1:
return to_path__1.call(this,parts);
case 2:
return to_path__2.call(this,parts,sep);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
to_path.cljs$lang$arity$1 = to_path__1;
to_path.cljs$lang$arity$2 = to_path__2;
return to_path;
})()
;
/**
* Given the source root directory, the output target directory and
* file under the source root, produce the target file.
*/
cljs.compiler.to_target_file = (function to_target_file(dir,target,file){
var dir_path = cljs.compiler.path_seq.call(null,dir.getAbsolutePath());
var file_path = cljs.compiler.path_seq.call(null,file.getAbsolutePath());
var relative_path = cljs.core.drop.call(null,cljs.core.count.call(null,dir_path),file_path);
var parents = cljs.core.butlast.call(null,relative_path);
var parent_file = cljs.io.file.call(null,cljs.compiler.to_path.call(null,cljs.core.cons.call(null,target,parents)));
return cljs.io.file.call(null,parent_file,cljs.compiler.rename_to_js.call(null,cljs.core.last.call(null,relative_path)));
});
/**
* Return a sequence of all .cljs files in the given directory.
*/
cljs.compiler.cljs_files_in = (function cljs_files_in(dir){
return cljs.core.filter.call(null,(function (p1__4540_SHARP_){
var name = p1__4540_SHARP_.getName();
var and__3822__auto__ = cljs.core.re_find.call(null,/\.cljs$/,name);
if(cljs.core.truth_(and__3822__auto__))
{var and__3822__auto____$1 = cljs.core.not_EQ_.call(null,".",cljs.core.first.call(null,name));
if(and__3822__auto____$1)
{return !(cljs.core.contains_QMARK_.call(null,cljs.compiler.cljs_reserved_file_names,name));
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
}),cljs.io.file_seq.call(null,dir));
});
/**
* Looks recursively in src-dir for .cljs files and compiles them to
* .js files. If target-dir is provided, output will go into this
* directory mirroring the source directory structure. Returns a list
* of maps containing information about each file which was compiled
* in dependency order.
*/
cljs.compiler.compile_root = (function() {
var compile_root = null;
var compile_root__1 = (function (src_dir){
return compile_root.call(null,src_dir,"out");
});
var compile_root__2 = (function (src_dir,target_dir){
var src_dir_file = cljs.io.file.call(null,src_dir);
var cljs_files = cljs.compiler.cljs_files_in.call(null,src_dir_file);
var output_files = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.seq.call(null,cljs_files))
{var cljs_file = cljs.core.first.call(null,cljs_files);
var output_file = cljs.compiler.to_target_file.call(null,src_dir_file,target_dir,cljs_file);
var ns_info = cljs.compiler.compile_file.call(null,cljs_file,output_file);
{
var G__4541 = cljs.core.rest.call(null,cljs_files);
var G__4542 = cljs.core.conj.call(null,output_files,cljs.core.assoc.call(null,ns_info,"\uFDD0'file-name",output_file.getPath()));
cljs_files = G__4541;
output_files = G__4542;
continue;
}
} else
{return output_files;
}
break;
}
});
compile_root = function(src_dir,target_dir){
switch(arguments.length){
case 1:
return compile_root__1.call(this,src_dir);
case 2:
return compile_root__2.call(this,src_dir,target_dir);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
compile_root.cljs$lang$arity$1 = compile_root__1;
compile_root.cljs$lang$arity$2 = compile_root__2;
return compile_root;
})()
;

// Analyzer namespace snapshot:
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.assoc,(new cljs.core.Symbol(null,"cljs.compiler")),cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map((new cljs.core.Symbol(null,"cljs-reserved-file-names")),cljs.core.hash_map("\uFDD0'line",41,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/cljs-reserved-file-names"))),(new cljs.core.Symbol(null,"get-tag")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"e"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"e")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/get-tag")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",337,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-apply-to")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec([(new cljs.core.Symbol(null,"name")),(new cljs.core.Symbol(null,"params")),(new cljs.core.Symbol(null,"env"))]))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4340")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-apply-to")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",409,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"escape-char")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"c"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"c")),"\uFDD0'tag",(new cljs.core.Symbol(null,"Character")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/escape-char")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",105,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"*lexical-renames*")),cljs.core.hash_map("\uFDD0'line",40,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/*lexical-renames*"))),(new cljs.core.Symbol(null,"infer-tag")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"e"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"e")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/infer-tag")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",341,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"requires-compilation?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"src")),(new cljs.core.Symbol(null,"dest"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"src")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"dest")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/requires-compilation?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Return true if the src file requires compilation.","\uFDD0'line",881,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-provide")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"sym"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sym")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-provide")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",167,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"mkdirs")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"f"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"f")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/mkdirs")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Create all parent directories for the passed file.","\uFDD0'line",817,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant-set")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant-set")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",205,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"munge")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]),cljs.core.vec([(new cljs.core.Symbol(null,"s")),(new cljs.core.Symbol(null,"reserved"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reserved")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/munge")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",73,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-meta-constant")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x")),(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"body"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"body")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-meta-constant")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",174,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"ns-first-segments")),cljs.core.hash_map("\uFDD0'line",44,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/ns-first-segments"))),(new cljs.core.Symbol(null,"forms-seq")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"f"))]),cljs.core.vec([(new cljs.core.Symbol(null,"f")),(new cljs.core.Symbol(null,"rdr"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"f")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"f")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/forms-seq")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Seq of forms in a Clojure or ClojureScript file.","\uFDD0'line",802,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"js-reserved")),cljs.core.hash_map("\uFDD0'line",24,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/js-reserved"))),(new cljs.core.Symbol(null,"safe-test?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"e"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"e")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/safe-test?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",356,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"compile-file*")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"src")),(new cljs.core.Symbol(null,"dest"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"src")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"dest")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/compile-file*")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",867,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emitln")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"xs"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"xs")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emitln")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",155,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"/")),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"cljs.core//"))),(new cljs.core.Symbol(null,"array-map-threshold")),cljs.core.hash_map("\uFDD0'line",283,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'private",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/array-map-threshold"))),(new cljs.core.Symbol(null,"escape-string")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",(new cljs.core.Symbol(null,"CharSequence")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/escape-string")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",129,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant-keyword")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant-keyword")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",182,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"escape-pattern")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"pattern"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"pattern")),"\uFDD0'tag",(new cljs.core.Symbol(null,"String")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/escape-pattern")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",122,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'protocol",(new cljs.core.Symbol(null,"cljs.compiler/EmitConstant")),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",211,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-block")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"context")),(new cljs.core.Symbol(null,"statements")),(new cljs.core.Symbol(null,"ret"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"context")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"statements")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ret")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-block")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",255,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-variadic-fn-method")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec([(new cljs.core.Symbol(null,"type")),(new cljs.core.Symbol(null,"name")),(new cljs.core.Symbol(null,"variadic")),(new cljs.core.Symbol(null,"params")),(new cljs.core.Symbol(null,"statements")),(new cljs.core.Symbol(null,"ret")),(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"recurs")),(new cljs.core.Symbol(null,"max-fixed-arity"))]),"\uFDD0'as",(new cljs.core.Symbol(null,"f")))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4370")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-variadic-fn-method")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",449,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"cljs-files-in")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"dir"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"dir")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/cljs-files-in")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Return a sequence of all .cljs files in the given directory.","\uFDD0'line",943,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"*emitted-provides*")),cljs.core.hash_map("\uFDD0'line",39,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/*emitted-provides*"))),(new cljs.core.Symbol(null,"rename-to-js")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"file-str"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"file-str")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/rename-to-js")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Change the file extension from .cljs to .js. Takes a File or a\n  String. Always returns a String.","\uFDD0'line",811,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-fn-method")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec([(new cljs.core.Symbol(null,"type")),(new cljs.core.Symbol(null,"name")),(new cljs.core.Symbol(null,"variadic")),(new cljs.core.Symbol(null,"params")),(new cljs.core.Symbol(null,"statements")),(new cljs.core.Symbol(null,"ret")),(new cljs.core.Symbol(null,"env")),(new cljs.core.Symbol(null,"recurs")),(new cljs.core.Symbol(null,"max-fixed-arity"))]))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"p__4364")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-fn-method")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",436,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"path-seq")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"file-str"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"file-str")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/path-seq")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",922,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"EmitConstant")),cljs.core.hash_map("\uFDD0'line",211,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'protocol-symbol",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/EmitConstant"))),(new cljs.core.Symbol(null,"*position*")),cljs.core.hash_map("\uFDD0'line",38,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/*position*"))),(new cljs.core.Symbol(null,"to-path")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"parts"))]),cljs.core.vec([(new cljs.core.Symbol(null,"parts")),(new cljs.core.Symbol(null,"sep"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"parts")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"parts")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sep")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/to-path")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",926,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-str")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"expr"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"expr")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-str")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",152,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'tag",(new cljs.core.Symbol(null,"String"))),(new cljs.core.Symbol(null,"compile-forms*")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"forms"))]),cljs.core.vec([(new cljs.core.Symbol(null,"forms")),(new cljs.core.Symbol(null,"ns-name")),(new cljs.core.Symbol(null,"deps")),(new cljs.core.Symbol(null,"code")),(new cljs.core.Symbol(null,"output"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"forms")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"forms")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ns-name")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"deps")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"code")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"output")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/compile-forms*")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",5,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",822,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"compile-root")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"src-dir"))]),cljs.core.vec([(new cljs.core.Symbol(null,"src-dir")),(new cljs.core.Symbol(null,"target-dir"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"src-dir")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"src-dir")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"target-dir")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/compile-root")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Looks recursively in src-dir for .cljs files and compiles them to\n   .js files. If target-dir is provided, output will go into this\n   directory mirroring the source directory structure. Returns a list\n   of maps containing information about each file which was compiled\n   in dependency order.","\uFDD0'line",952,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"to-target-file")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"dir")),(new cljs.core.Symbol(null,"target")),(new cljs.core.Symbol(null,"file"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"dir")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"target")),"\uFDD0'tag",(new cljs.core.Symbol(null,"String")),"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"file")),"\uFDD0'tag",(new cljs.core.Symbol(null,"cljs.io.File")),"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/to-target-file")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Given the source root directory, the output target directory and\n  file under the source root, produce the target file.","\uFDD0'line",932,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"comma-sep")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"xs"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"xs")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/comma-sep")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",102,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant-symbol")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant-symbol")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",189,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"protocol-prefix")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"psym"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"psym")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/protocol-prefix")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",637,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"obj-map-threshold")),cljs.core.hash_map("\uFDD0'line",284,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'private",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/obj-map-threshold"))),(new cljs.core.Symbol(null,"emit-comment")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"doc")),(new cljs.core.Symbol(null,"jsdoc"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"doc")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"jsdoc")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-comment")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Emit a nicely formatted comment string.","\uFDD0'line",383,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"compile-file")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"src"))]),cljs.core.vec([(new cljs.core.Symbol(null,"src")),(new cljs.core.Symbol(null,"dest"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"src")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"src")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"dest")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/compile-file")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Compiles src to a file of the same name, but with a .js extension,\n   in the src file's directory.\n\n   With dest argument, write file to provided location. If the dest\n   argument is a file outside the source tree, missing parent\n   directories will be created. The src file will only be compiled if\n   the dest file has an older modification time.\n\n   Both src and dest may be either a String or a File.\n\n   Returns a map containing {:ns .. :provides .. :requires .. :file ..}.\n   If the file was not compiled returns only {:file ...}","\uFDD0'line",887,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emits")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"xs"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"xs")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emits")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",137,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"emit-constant-map")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit-constant-map")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",198,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"wrap-in-double-quotes")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"x"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"x")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/wrap-in-double-quotes")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",132,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs"),(new cljs.core.Symbol(null,"CHAR_MAP")),cljs.core.hash_map("\uFDD0'line",47,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/CHAR_MAP"))),(new cljs.core.Symbol(null,"emit")),cljs.core.hash_map("\uFDD0'line",135,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/emit"))),(new cljs.core.Symbol(null,"ns-snap")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"ns"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ns")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler/ns-snap")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Snapshot the given namespace. Returns the JavaScript to update\n  cljs.core/namespace based on the snapshot.","\uFDD0'line",852,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/compiler.cljs")),"\uFDD0'imports",null,"\uFDD0'uses-macros",cljs.core.hash_map((new cljs.core.Symbol(null,"with-core-cljs")),(new cljs.core.Symbol(null,"cljs.compiler-macros")),(new cljs.core.Symbol(null,"emit-wrap")),(new cljs.core.Symbol(null,"cljs.compiler-macros"))),"\uFDD0'requires",cljs.core.hash_map((new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"cljs.reader")),(new cljs.core.Symbol(null,"ana")),(new cljs.core.Symbol(null,"cljs.analyzer")),(new cljs.core.Symbol(null,"string")),(new cljs.core.Symbol(null,"clojure.string")),(new cljs.core.Symbol(null,"io")),(new cljs.core.Symbol(null,"cljs.io"))),"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set([(new cljs.core.Symbol(null,"munge")),(new cljs.core.Symbol(null,"macroexpand-1"))]),"\uFDD0'doc",null,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.compiler"))));
