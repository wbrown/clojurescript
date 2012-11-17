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
{var map__3600 = s;
var map__3600__$1 = ((cljs.core.seq_QMARK_.call(null,map__3600))?cljs.core.apply.call(null,cljs.core.hash_map,map__3600):map__3600);
var info = map__3600__$1;
var field = cljs.core._lookup.call(null,map__3600__$1,"\uFDD0'field",null);
var name = cljs.core._lookup.call(null,map__3600__$1,"\uFDD0'name",null);
var depth = (function (){var d = 0;
var G__3602 = info;
var map__3603 = G__3602;
var map__3603__$1 = ((cljs.core.seq_QMARK_.call(null,map__3603))?cljs.core.apply.call(null,cljs.core.hash_map,map__3603):map__3603);
var shadow = cljs.core._lookup.call(null,map__3603__$1,"\uFDD0'shadow",null);
var d__$1 = d;
var G__3602__$1 = G__3602;
while(true){
var d__$2 = d__$1;
var map__3604 = G__3602__$1;
var map__3604__$1 = ((cljs.core.seq_QMARK_.call(null,map__3604))?cljs.core.apply.call(null,cljs.core.hash_map,map__3604):map__3604);
var shadow__$1 = cljs.core._lookup.call(null,map__3604__$1,"\uFDD0'shadow",null);
if(cljs.core.truth_(shadow__$1))
{{
var G__3605 = (d__$2 + 1);
var G__3606 = shadow__$1;
d__$1 = G__3605;
G__3602__$1 = G__3606;
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
var ss__$1 = clojure.string.join.call(null,".",cljs.core.map.call(null,(function (p1__3593_SHARP_){
if(cljs.core.truth_(reserved.call(null,p1__3593_SHARP_)))
{return [cljs.core.str(p1__3593_SHARP_),cljs.core.str("$")].join('');
} else
{return p1__3593_SHARP_;
}
}),clojure.string.split.call(null,ss,/[.]/)));
var ms = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__3594_SHARP_){
return cljs.core._lookup.call(null,cljs.compiler.CHAR_MAP,p1__3594_SHARP_,p1__3594_SHARP_);
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
var G__3609 = cp;
if(cljs.core._EQ_.call(null,9,G__3609))
{return "\\t";
} else
{if(cljs.core._EQ_.call(null,13,G__3609))
{return "\\r";
} else
{if(cljs.core._EQ_.call(null,10,G__3609))
{return "\\n";
} else
{if(cljs.core._EQ_.call(null,12,G__3609))
{return "\\f";
} else
{if(cljs.core._EQ_.call(null,8,G__3609))
{return "\\b";
} else
{if(cljs.core._EQ_.call(null,92,G__3609))
{return "\\\\";
} else
{if(cljs.core._EQ_.call(null,34,G__3609))
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
return cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__3607_SHARP_){
return cljs.compiler.escape_char.call(null,p1__3607_SHARP_);
}),s));
});
cljs.compiler.wrap_in_double_quotes = (function wrap_in_double_quotes(x){
return [cljs.core.str("\""),cljs.core.str(x),cljs.core.str("\"")].join('');
});
cljs.compiler.emit = (function (){var method_table__2175__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var prefer_table__2176__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var method_cache__2177__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var cached_hierarchy__2178__auto__ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var hierarchy__2179__auto__ = cljs.core._lookup.call(null,cljs.core.ObjMap.EMPTY,"\uFDD0'hierarchy",cljs.core.global_hierarchy);
return (new cljs.core.MultiFn("emit","\uFDD0'op","\uFDD0'default",hierarchy__2179__auto__,method_table__2175__auto__,prefer_table__2176__auto__,method_cache__2177__auto__,cached_hierarchy__2178__auto__));
})();
/**
* @param {...*} var_args
*/
cljs.compiler.emits = (function() { 
var emits__delegate = function (xs){
var G__3613_3616 = cljs.core.seq.call(null,xs);
while(true){
if(G__3613_3616)
{var x_3617 = cljs.core.first.call(null,G__3613_3616);
if((x_3617 == null))
{} else
{if(cljs.core.map_QMARK_.call(null,x_3617))
{cljs.compiler.emit.call(null,x_3617);
} else
{if(cljs.core.seq_QMARK_.call(null,x_3617))
{cljs.core.apply.call(null,emits,x_3617);
} else
{if(cljs.core.fn_QMARK_.call(null,x_3617))
{x_3617.call(null);
} else
{if("\uFDD0'else")
{var s_3618 = cljs.core.print_str.call(null,x_3617);
if(cljs.core.truth_(cljs.compiler._STAR_position_STAR_))
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_position_STAR_,((function (G__3613_3616,s_3618,x_3617){
return (function (p__3614){
var vec__3615 = p__3614;
var line = cljs.core.nth.call(null,vec__3615,0,null);
var column = cljs.core.nth.call(null,vec__3615,1,null);
return cljs.core.PersistentVector.fromArray([line,(column + cljs.core.count.call(null,s_3618))], true);
});})(G__3613_3616,s_3618,x_3617))
);
} else
{}
cljs.core.print.call(null,s_3618);
} else
{}
}
}
}
}
{
var G__3619 = cljs.core.next.call(null,G__3613_3616);
G__3613_3616 = G__3619;
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
emits.cljs$lang$applyTo = (function (arglist__3620){
var xs = cljs.core.seq(arglist__3620);;
return emits__delegate(xs);
});
emits.cljs$lang$arity$variadic = emits__delegate;
return emits;
})()
;
cljs.compiler.emit_str = (function emit_str(expr){
var sb__2215__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_3623_3625 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2216__auto__){
return sb__2215__auto__.append(x__2216__auto__);
});
cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_3623_3625;
}return [cljs.core.str(sb__2215__auto__)].join('');
});
/**
* @param {...*} var_args
*/
cljs.compiler.emitln = (function() { 
var emitln__delegate = function (xs){
cljs.core.apply.call(null,cljs.compiler.emits,xs);
cljs.core.println.call(null);
if(cljs.core.truth_(cljs.compiler._STAR_position_STAR_))
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_position_STAR_,(function (p__3628){
var vec__3629 = p__3628;
var line = cljs.core.nth.call(null,vec__3629,0,null);
var column = cljs.core.nth.call(null,vec__3629,1,null);
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
emitln.cljs$lang$applyTo = (function (arglist__3630){
var xs = cljs.core.seq(arglist__3630);;
return emitln__delegate(xs);
});
emitln.cljs$lang$arity$variadic = emitln__delegate;
return emitln;
})()
;
cljs.compiler.emit_str = (function emit_str(expr){
var sb__2215__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_3633_3635 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2216__auto__){
return sb__2215__auto__.append(x__2216__auto__);
});
cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_3633_3635;
}return [cljs.core.str(sb__2215__auto__)].join('');
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
emit_meta_constant.cljs$lang$applyTo = (function (arglist__3636){
var x = cljs.core.first(arglist__3636);
var body = cljs.core.rest(arglist__3636);
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
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.hash_map("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__3637_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3637_SHARP_);
});
}),cljs.core.apply.call(null,cljs.core.concat,x))),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.compiler.emit_constant_set = (function emit_constant_set(x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.set(["], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__3638_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3638_SHARP_);
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
{var x__2003__auto__ = (((x == null))?null:x);
return (function (){var or__3824__auto__ = (cljs.compiler.emit_constant[goog.typeOf(x__2003__auto__)]);
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
var vec__3647 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str(x)].join(''));
var _ = cljs.core.nth.call(null,vec__3647,0,null);
var flags = cljs.core.nth.call(null,vec__3647,1,null);
var pattern = cljs.core.nth.call(null,vec__3647,2,null);
var all_slashes = (new RegExp("\\/","g"));
return cljs.compiler.emits.call(null,[cljs.core.str("/"),cljs.core.str(pattern.replace(all_slashes,"\\\\/")),cljs.core.str("/"),cljs.core.str(flags)].join(''));
});
cljs.core.PersistentVector.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentVector.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.vec(["], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__3641_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3641_SHARP_);
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
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.list("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__3640_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3640_SHARP_);
});
}),x)),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.core.PersistentTreeMap.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentTreeMap.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_map.call(null,x);
});
cljs.core.List.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.List.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.list("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__3639_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3639_SHARP_);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'var",(function (p__3648){
var map__3649 = p__3648;
var map__3649__$1 = ((cljs.core.seq_QMARK_.call(null,map__3649))?cljs.core.apply.call(null,cljs.core.hash_map,map__3649):map__3649);
var arg = map__3649__$1;
var env = cljs.core._lookup.call(null,map__3649__$1,"\uFDD0'env",null);
var info = cljs.core._lookup.call(null,map__3649__$1,"\uFDD0'info",null);
var n = (new cljs.core.Keyword("\uFDD0'name")).call(null,info);
var n__$1 = ((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,n),"js"))?cljs.core.name.call(null,n):info);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,n__$1));
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'meta",(function (p__3650){
var map__3651 = p__3650;
var map__3651__$1 = ((cljs.core.seq_QMARK_.call(null,map__3651))?cljs.core.apply.call(null,cljs.core.hash_map,map__3651):map__3651);
var env = cljs.core._lookup.call(null,map__3651__$1,"\uFDD0'env",null);
var meta = cljs.core._lookup.call(null,map__3651__$1,"\uFDD0'meta",null);
var expr = cljs.core._lookup.call(null,map__3651__$1,"\uFDD0'expr",null);
var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.array_map_threshold = 16;
cljs.compiler.obj_map_threshold = 32;
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'map",(function (p__3652){
var map__3653 = p__3652;
var map__3653__$1 = ((cljs.core.seq_QMARK_.call(null,map__3653))?cljs.core.apply.call(null,cljs.core.hash_map,map__3653):map__3653);
var vals = cljs.core._lookup.call(null,map__3653__$1,"\uFDD0'vals",null);
var keys = cljs.core._lookup.call(null,map__3653__$1,"\uFDD0'keys",null);
var simple_keys_QMARK_ = cljs.core._lookup.call(null,map__3653__$1,"\uFDD0'simple-keys?",null);
var env = cljs.core._lookup.call(null,map__3653__$1,"\uFDD0'env",null);
var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
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
var sb__2215__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_3654_3656 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2216__auto__){
return sb__2215__auto__.append(x__2216__auto__);
});
cljs.compiler.emit.call(null,k);
cljs.core.print.call(null,":");
cljs.compiler.emit.call(null,v);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_3654_3656;
}return [cljs.core.str(sb__2215__auto__)].join('');
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
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'vector",(function (p__3657){
var map__3658 = p__3657;
var map__3658__$1 = ((cljs.core.seq_QMARK_.call(null,map__3658))?cljs.core.apply.call(null,cljs.core.hash_map,map__3658):map__3658);
var env = cljs.core._lookup.call(null,map__3658__$1,"\uFDD0'env",null);
var items = cljs.core._lookup.call(null,map__3658__$1,"\uFDD0'items",null);
var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.empty_QMARK_.call(null,items))
{cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else
{cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep.call(null,items),"], true)");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'set",(function (p__3659){
var map__3660 = p__3659;
var map__3660__$1 = ((cljs.core.seq_QMARK_.call(null,map__3660))?cljs.core.apply.call(null,cljs.core.hash_map,map__3660):map__3660);
var env = cljs.core._lookup.call(null,map__3660__$1,"\uFDD0'env",null);
var items = cljs.core._lookup.call(null,map__3660__$1,"\uFDD0'items",null);
var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.empty_QMARK_.call(null,items))
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.EMPTY");
} else
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.fromArray([",cljs.compiler.comma_sep.call(null,items),"])");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'constant",(function (p__3661){
var map__3662 = p__3661;
var map__3662__$1 = ((cljs.core.seq_QMARK_.call(null,map__3662))?cljs.core.apply.call(null,cljs.core.hash_map,map__3662):map__3662);
var env = cljs.core._lookup.call(null,map__3662__$1,"\uFDD0'env",null);
var form = cljs.core._lookup.call(null,map__3662__$1,"\uFDD0'form",null);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emit_constant.call(null,form);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
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
{var G__3665 = (new cljs.core.Keyword("\uFDD0'op")).call(null,e);
if(cljs.core._EQ_.call(null,"\uFDD0'constant",G__3665))
{var G__3666 = (new cljs.core.Keyword("\uFDD0'form")).call(null,e);
if(cljs.core._EQ_.call(null,false,G__3666))
{return "\uFDD1'boolean";
} else
{if(cljs.core._EQ_.call(null,true,G__3666))
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
{if(cljs.core._EQ_.call(null,"\uFDD0'if",G__3665))
{var then_tag = infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'then")).call(null,e));
var else_tag = infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'else")).call(null,e));
if(cljs.core._EQ_.call(null,then_tag,else_tag))
{return then_tag;
} else
{return null;
}
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'let",G__3665))
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'if",(function (p__3667){
var map__3668 = p__3667;
var map__3668__$1 = ((cljs.core.seq_QMARK_.call(null,map__3668))?cljs.core.apply.call(null,cljs.core.hash_map,map__3668):map__3668);
var unchecked = cljs.core._lookup.call(null,map__3668__$1,"\uFDD0'unchecked",null);
var env = cljs.core._lookup.call(null,map__3668__$1,"\uFDD0'env",null);
var else$ = cljs.core._lookup.call(null,map__3668__$1,"\uFDD0'else",null);
var then = cljs.core._lookup.call(null,map__3668__$1,"\uFDD0'then",null);
var test = cljs.core._lookup.call(null,map__3668__$1,"\uFDD0'test",null);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'throw",(function (p__3669){
var map__3670 = p__3669;
var map__3670__$1 = ((cljs.core.seq_QMARK_.call(null,map__3670))?cljs.core.apply.call(null,cljs.core.hash_map,map__3670):map__3670);
var env = cljs.core._lookup.call(null,map__3670__$1,"\uFDD0'env",null);
var throw$ = cljs.core._lookup.call(null,map__3670__$1,"\uFDD0'throw",null);
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
var G__3675 = cljs.core.seq.call(null,clojure.string.split_lines.call(null,e));
while(true){
if(G__3675)
{var next_line = cljs.core.first.call(null,G__3675);
cljs.compiler.emitln.call(null,"* ",clojure.string.trim.call(null,next_line));
{
var G__3677 = cljs.core.next.call(null,G__3675);
G__3675 = G__3677;
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
var G__3676_3678 = cljs.core.seq.call(null,docs__$2);
while(true){
if(G__3676_3678)
{var e_3679 = cljs.core.first.call(null,G__3676_3678);
if(cljs.core.truth_(e_3679))
{print_comment_lines.call(null,e_3679);
} else
{}
{
var G__3680 = cljs.core.next.call(null,G__3676_3678);
G__3676_3678 = G__3680;
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'def",(function (p__3681){
var map__3682 = p__3681;
var map__3682__$1 = ((cljs.core.seq_QMARK_.call(null,map__3682))?cljs.core.apply.call(null,cljs.core.hash_map,map__3682):map__3682);
var export$ = cljs.core._lookup.call(null,map__3682__$1,"\uFDD0'export",null);
var doc = cljs.core._lookup.call(null,map__3682__$1,"\uFDD0'doc",null);
var env = cljs.core._lookup.call(null,map__3682__$1,"\uFDD0'env",null);
var init = cljs.core._lookup.call(null,map__3682__$1,"\uFDD0'init",null);
var name = cljs.core._lookup.call(null,map__3682__$1,"\uFDD0'name",null);
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
cljs.compiler.emit_apply_to = (function emit_apply_to(p__3683){
var map__3687 = p__3683;
var map__3687__$1 = ((cljs.core.seq_QMARK_.call(null,map__3687))?cljs.core.apply.call(null,cljs.core.hash_map,map__3687):map__3687);
var env = cljs.core._lookup.call(null,map__3687__$1,"\uFDD0'env",null);
var params = cljs.core._lookup.call(null,map__3687__$1,"\uFDD0'params",null);
var name = cljs.core._lookup.call(null,map__3687__$1,"\uFDD0'name",null);
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str("__delegate")].join('');
var params__$1 = cljs.core.map.call(null,cljs.compiler.munge,params);
cljs.compiler.emitln.call(null,"(function (",arglist,"){");
var G__3688_3690 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.butlast.call(null,params__$1)));
while(true){
if(G__3688_3690)
{var vec__3689_3691 = cljs.core.first.call(null,G__3688_3690);
var i_3692 = cljs.core.nth.call(null,vec__3689_3691,0,null);
var param_3693 = cljs.core.nth.call(null,vec__3689_3691,1,null);
cljs.compiler.emits.call(null,"var ",param_3693," = cljs.core.first(");
var n__2165__auto___3694 = i_3692;
var __3695 = 0;
while(true){
if((__3695 < n__2165__auto___3694))
{cljs.compiler.emits.call(null,"cljs.core.next(");
{
var G__3696 = (__3695 + 1);
__3695 = G__3696;
continue;
}
} else
{}
break;
}
cljs.compiler.emits.call(null,arglist,")");
var n__2165__auto___3697 = i_3692;
var __3698 = 0;
while(true){
if((__3698 < n__2165__auto___3697))
{cljs.compiler.emits.call(null,")");
{
var G__3699 = (__3698 + 1);
__3698 = G__3699;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,";");
{
var G__3700 = cljs.core.next.call(null,G__3688_3690);
G__3688_3690 = G__3700;
continue;
}
} else
{}
break;
}
if((1 < cljs.core.count.call(null,params__$1)))
{cljs.compiler.emits.call(null,"var ",cljs.core.last.call(null,params__$1)," = cljs.core.rest(");
var n__2165__auto___3701 = (cljs.core.count.call(null,params__$1) - 2);
var __3702 = 0;
while(true){
if((__3702 < n__2165__auto___3701))
{cljs.compiler.emits.call(null,"cljs.core.next(");
{
var G__3703 = (__3702 + 1);
__3702 = G__3703;
continue;
}
} else
{}
break;
}
cljs.compiler.emits.call(null,arglist);
var n__2165__auto___3704 = (cljs.core.count.call(null,params__$1) - 2);
var __3705 = 0;
while(true){
if((__3705 < n__2165__auto___3704))
{cljs.compiler.emits.call(null,")");
{
var G__3706 = (__3705 + 1);
__3705 = G__3706;
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
cljs.compiler.emit_fn_method = (function emit_fn_method(p__3707){
var map__3709 = p__3707;
var map__3709__$1 = ((cljs.core.seq_QMARK_.call(null,map__3709))?cljs.core.apply.call(null,cljs.core.hash_map,map__3709):map__3709);
var max_fixed_arity = cljs.core._lookup.call(null,map__3709__$1,"\uFDD0'max-fixed-arity",null);
var recurs = cljs.core._lookup.call(null,map__3709__$1,"\uFDD0'recurs",null);
var env = cljs.core._lookup.call(null,map__3709__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__3709__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__3709__$1,"\uFDD0'statements",null);
var params = cljs.core._lookup.call(null,map__3709__$1,"\uFDD0'params",null);
var variadic = cljs.core._lookup.call(null,map__3709__$1,"\uFDD0'variadic",null);
var name = cljs.core._lookup.call(null,map__3709__$1,"\uFDD0'name",null);
var type = cljs.core._lookup.call(null,map__3709__$1,"\uFDD0'type",null);
var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
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
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
});
cljs.compiler.emit_variadic_fn_method = (function emit_variadic_fn_method(p__3713){
var map__3715 = p__3713;
var map__3715__$1 = ((cljs.core.seq_QMARK_.call(null,map__3715))?cljs.core.apply.call(null,cljs.core.hash_map,map__3715):map__3715);
var f = map__3715__$1;
var max_fixed_arity = cljs.core._lookup.call(null,map__3715__$1,"\uFDD0'max-fixed-arity",null);
var recurs = cljs.core._lookup.call(null,map__3715__$1,"\uFDD0'recurs",null);
var env = cljs.core._lookup.call(null,map__3715__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__3715__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__3715__$1,"\uFDD0'statements",null);
var params = cljs.core._lookup.call(null,map__3715__$1,"\uFDD0'params",null);
var variadic = cljs.core._lookup.call(null,map__3715__$1,"\uFDD0'variadic",null);
var name = cljs.core._lookup.call(null,map__3715__$1,"\uFDD0'name",null);
var type = cljs.core._lookup.call(null,map__3715__$1,"\uFDD0'type",null);
var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
var name_3716__$1 = (function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null);
}
})();
var mname_3717 = cljs.compiler.munge.call(null,name_3716__$1);
var params_3718__$1 = cljs.core.map.call(null,cljs.compiler.munge,params);
var delegate_name_3719 = [cljs.core.str(mname_3717),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.call(null,"(function() { ");
cljs.compiler.emitln.call(null,"var ",delegate_name_3719," = function (",cljs.compiler.comma_sep.call(null,params_3718__$1),"){");
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
cljs.compiler.emitln.call(null,"var ",mname_3717," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params_3718__$1),cljs.core.PersistentVector.fromArray(["\uFDD1'var_args"], true)):params_3718__$1)),"){");
if(cljs.core.truth_(type))
{cljs.compiler.emitln.call(null,"var self__ = this;");
} else
{}
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,"var ",cljs.core.last.call(null,params_3718__$1)," = null;");
cljs.compiler.emitln.call(null,"if (goog.isDef(var_args)) {");
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params_3718__$1)," = cljs.core.array_seq(Array.prototype.slice.call(arguments, ",(cljs.core.count.call(null,params_3718__$1) - 1),"),0);");
cljs.compiler.emitln.call(null,"} ");
} else
{}
cljs.compiler.emitln.call(null,"return ",delegate_name_3719,".call(",clojure.string.join.call(null,", ",cljs.core.cons.call(null,"this",params_3718__$1)),");");
cljs.compiler.emitln.call(null,"};");
cljs.compiler.emitln.call(null,mname_3717,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");
cljs.compiler.emits.call(null,mname_3717,".cljs$lang$applyTo = ");
cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,"\uFDD0'name",name_3716__$1));
cljs.compiler.emitln.call(null,";");
cljs.compiler.emitln.call(null,mname_3717,".cljs$lang$arity$variadic = ",delegate_name_3719,";");
cljs.compiler.emitln.call(null,"return ",mname_3717,";");
cljs.compiler.emitln.call(null,"})()");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'fn",(function (p__3720){
var map__3721 = p__3720;
var map__3721__$1 = ((cljs.core.seq_QMARK_.call(null,map__3721))?cljs.core.apply.call(null,cljs.core.hash_map,map__3721):map__3721);
var loop_lets = cljs.core._lookup.call(null,map__3721__$1,"\uFDD0'loop-lets",null);
var recur_frames = cljs.core._lookup.call(null,map__3721__$1,"\uFDD0'recur-frames",null);
var variadic = cljs.core._lookup.call(null,map__3721__$1,"\uFDD0'variadic",null);
var max_fixed_arity = cljs.core._lookup.call(null,map__3721__$1,"\uFDD0'max-fixed-arity",null);
var methods$ = cljs.core._lookup.call(null,map__3721__$1,"\uFDD0'methods",null);
var env = cljs.core._lookup.call(null,map__3721__$1,"\uFDD0'env",null);
var name = cljs.core._lookup.call(null,map__3721__$1,"\uFDD0'name",null);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,cljs.core.mapcat.call(null,"\uFDD0'params",cljs.core.filter.call(null,(function (p1__3710_SHARP_){
var and__3822__auto__ = p1__3710_SHARP_;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core.deref.call(null,(new cljs.core.Keyword("\uFDD0'flag")).call(null,p1__3710_SHARP_));
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
{var has_name_QMARK__3729 = (function (){var and__3822__auto__ = name;
if(cljs.core.truth_(and__3822__auto__))
{return true;
} else
{return and__3822__auto__;
}
})();
var name_3730__$1 = (function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null);
}
})();
var mname_3731 = cljs.compiler.munge.call(null,name_3730__$1);
var maxparams_3732 = cljs.core.map.call(null,cljs.compiler.munge,cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,"\uFDD0'params",methods$)));
var mmap_3733 = cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (method){
return cljs.core.PersistentVector.fromArray([cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str(mname_3731),cljs.core.str("__"),cljs.core.str(cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,method)))].join(''))),method], true);
}),methods$));
var ms_3734 = cljs.core.sort_by.call(null,(function (p1__3711_SHARP_){
return cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,cljs.core.second.call(null,p1__3711_SHARP_)));
}),cljs.core.seq.call(null,mmap_3733));
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emitln.call(null,"(function() {");
cljs.compiler.emitln.call(null,"var ",mname_3731," = null;");
var G__3722_3735 = cljs.core.seq.call(null,ms_3734);
while(true){
if(G__3722_3735)
{var vec__3723_3736 = cljs.core.first.call(null,G__3722_3735);
var n_3737 = cljs.core.nth.call(null,vec__3723_3736,0,null);
var meth_3738 = cljs.core.nth.call(null,vec__3723_3736,1,null);
cljs.compiler.emits.call(null,"var ",n_3737," = ");
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_3738)))
{cljs.compiler.emit_variadic_fn_method.call(null,meth_3738);
} else
{cljs.compiler.emit_fn_method.call(null,meth_3738);
}
cljs.compiler.emitln.call(null,";");
{
var G__3739 = cljs.core.next.call(null,G__3722_3735);
G__3722_3735 = G__3739;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,mname_3731," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_3732),cljs.core.PersistentVector.fromArray(["\uFDD1'var_args"], true)):maxparams_3732)),"){");
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,"var ",cljs.core.last.call(null,maxparams_3732)," = var_args;");
} else
{}
cljs.compiler.emitln.call(null,"switch(arguments.length){");
var G__3724_3740 = cljs.core.seq.call(null,ms_3734);
while(true){
if(G__3724_3740)
{var vec__3725_3741 = cljs.core.first.call(null,G__3724_3740);
var n_3742 = cljs.core.nth.call(null,vec__3725_3741,0,null);
var meth_3743 = cljs.core.nth.call(null,vec__3725_3741,1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_3743)))
{cljs.compiler.emitln.call(null,"default:");
cljs.compiler.emitln.call(null,"return ",n_3742,".cljs$lang$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_3732)),(((cljs.core.count.call(null,maxparams_3732) > 1))?", ":null),"cljs.core.array_seq(arguments, ",max_fixed_arity,"));");
} else
{var pcnt_3744 = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,meth_3743));
cljs.compiler.emitln.call(null,"case ",pcnt_3744,":");
cljs.compiler.emitln.call(null,"return ",n_3742,".call(this",(((pcnt_3744 === 0))?null:cljs.core.list.call(null,",",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_3744,maxparams_3732)))),");");
}
{
var G__3745 = cljs.core.next.call(null,G__3724_3740);
G__3724_3740 = G__3745;
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
{cljs.compiler.emitln.call(null,mname_3731,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");
cljs.compiler.emitln.call(null,mname_3731,".cljs$lang$applyTo = ",cljs.core.some.call(null,(function (p1__3712_SHARP_){
var vec__3726 = p1__3712_SHARP_;
var n = cljs.core.nth.call(null,vec__3726,0,null);
var m = cljs.core.nth.call(null,vec__3726,1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,m)))
{return n;
} else
{return null;
}
}),ms_3734),".cljs$lang$applyTo;");
} else
{}
if(cljs.core.truth_(has_name_QMARK__3729))
{var G__3727_3746 = cljs.core.seq.call(null,ms_3734);
while(true){
if(G__3727_3746)
{var vec__3728_3747 = cljs.core.first.call(null,G__3727_3746);
var n_3748 = cljs.core.nth.call(null,vec__3728_3747,0,null);
var meth_3749 = cljs.core.nth.call(null,vec__3728_3747,1,null);
var c_3750 = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,meth_3749));
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_3749)))
{cljs.compiler.emitln.call(null,mname_3731,".cljs$lang$arity$variadic = ",n_3748,".cljs$lang$arity$variadic;");
} else
{cljs.compiler.emitln.call(null,mname_3731,".cljs$lang$arity$",c_3750," = ",n_3748,";");
}
{
var G__3751 = cljs.core.next.call(null,G__3727_3746);
G__3727_3746 = G__3751;
continue;
}
} else
{}
break;
}
} else
{}
cljs.compiler.emitln.call(null,"return ",mname_3731,";");
cljs.compiler.emitln.call(null,"})()");
}
if(loop_locals)
{return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else
{return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'do",(function (p__3752){
var map__3753 = p__3752;
var map__3753__$1 = ((cljs.core.seq_QMARK_.call(null,map__3753))?cljs.core.apply.call(null,cljs.core.hash_map,map__3753):map__3753);
var env = cljs.core._lookup.call(null,map__3753__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__3753__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__3753__$1,"\uFDD0'statements",null);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'try*",(function (p__3755){
var map__3756 = p__3755;
var map__3756__$1 = ((cljs.core.seq_QMARK_.call(null,map__3756))?cljs.core.apply.call(null,cljs.core.hash_map,map__3756):map__3756);
var finally$ = cljs.core._lookup.call(null,map__3756__$1,"\uFDD0'finally",null);
var name = cljs.core._lookup.call(null,map__3756__$1,"\uFDD0'name",null);
var catch$ = cljs.core._lookup.call(null,map__3756__$1,"\uFDD0'catch",null);
var try$ = cljs.core._lookup.call(null,map__3756__$1,"\uFDD0'try",null);
var env = cljs.core._lookup.call(null,map__3756__$1,"\uFDD0'env",null);
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
var map__3757_3761 = try$;
var map__3757_3762__$1 = ((cljs.core.seq_QMARK_.call(null,map__3757_3761))?cljs.core.apply.call(null,cljs.core.hash_map,map__3757_3761):map__3757_3761);
var ret_3763 = cljs.core._lookup.call(null,map__3757_3762__$1,"\uFDD0'ret",null);
var statements_3764 = cljs.core._lookup.call(null,map__3757_3762__$1,"\uFDD0'statements",null);
cljs.compiler.emit_block.call(null,subcontext,statements_3764,ret_3763);
cljs.compiler.emits.call(null,"}");
if(cljs.core.truth_(name))
{cljs.compiler.emits.call(null,"catch (",cljs.compiler.munge.call(null,name),"){");
if(cljs.core.truth_(catch$))
{var map__3758_3765 = catch$;
var map__3758_3766__$1 = ((cljs.core.seq_QMARK_.call(null,map__3758_3765))?cljs.core.apply.call(null,cljs.core.hash_map,map__3758_3765):map__3758_3765);
var ret_3767 = cljs.core._lookup.call(null,map__3758_3766__$1,"\uFDD0'ret",null);
var statements_3768 = cljs.core._lookup.call(null,map__3758_3766__$1,"\uFDD0'statements",null);
cljs.compiler.emit_block.call(null,subcontext,statements_3768,ret_3767);
} else
{}
cljs.compiler.emits.call(null,"}");
} else
{}
if(cljs.core.truth_(finally$))
{var map__3759_3769 = finally$;
var map__3759_3770__$1 = ((cljs.core.seq_QMARK_.call(null,map__3759_3769))?cljs.core.apply.call(null,cljs.core.hash_map,map__3759_3769):map__3759_3769);
var ret_3771 = cljs.core._lookup.call(null,map__3759_3770__$1,"\uFDD0'ret",null);
var statements_3772 = cljs.core._lookup.call(null,map__3759_3770__$1,"\uFDD0'statements",null);
if(cljs.core.not_EQ_.call(null,"\uFDD0'constant",(new cljs.core.Keyword("\uFDD0'op")).call(null,ret_3771)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("finally block cannot contain constant"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not=","\uFDD0'constant",cljs.core.with_meta(cljs.core.list("\uFDD0'op","\uFDD1'ret"),cljs.core.hash_map("\uFDD0'line",647))),cljs.core.hash_map("\uFDD0'line",647))))].join('')));
}
cljs.compiler.emits.call(null,"finally {");
cljs.compiler.emit_block.call(null,subcontext,statements_3772,ret_3771);
cljs.compiler.emits.call(null,"}");
} else
{}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
} else
{var map__3760 = try$;
var map__3760__$1 = ((cljs.core.seq_QMARK_.call(null,map__3760))?cljs.core.apply.call(null,cljs.core.hash_map,map__3760):map__3760);
var ret = cljs.core._lookup.call(null,map__3760__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__3760__$1,"\uFDD0'statements",null);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'let",(function (p__3773){
var map__3774 = p__3773;
var map__3774__$1 = ((cljs.core.seq_QMARK_.call(null,map__3774))?cljs.core.apply.call(null,cljs.core.hash_map,map__3774):map__3774);
var loop = cljs.core._lookup.call(null,map__3774__$1,"\uFDD0'loop",null);
var env = cljs.core._lookup.call(null,map__3774__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__3774__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__3774__$1,"\uFDD0'statements",null);
var bindings = cljs.core._lookup.call(null,map__3774__$1,"\uFDD0'bindings",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
var _STAR_lexical_renames_STAR_3775_3779 = cljs.compiler._STAR_lexical_renames_STAR_;
try{cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,"\uFDD0'statement",context))?cljs.core.map.call(null,(function (p1__3754_SHARP_){
return cljs.core.vector.call(null,cljs.core.hash.call(null,p1__3754_SHARP_),cljs.core.gensym.call(null,[cljs.core.str((new cljs.core.Keyword("\uFDD0'name")).call(null,p1__3754_SHARP_)),cljs.core.str("-")].join('')));
}),bindings):null));
var G__3777_3780 = cljs.core.seq.call(null,bindings);
while(true){
if(G__3777_3780)
{var map__3778_3781 = cljs.core.first.call(null,G__3777_3780);
var map__3778_3782__$1 = ((cljs.core.seq_QMARK_.call(null,map__3778_3781))?cljs.core.apply.call(null,cljs.core.hash_map,map__3778_3781):map__3778_3781);
var binding_3783 = map__3778_3782__$1;
var init_3784 = cljs.core._lookup.call(null,map__3778_3782__$1,"\uFDD0'init",null);
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_3783)," = ",init_3784,";");
{
var G__3785 = cljs.core.next.call(null,G__3777_3780);
G__3777_3780 = G__3785;
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
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_3775_3779;
}if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'recur",(function (p__3786){
var map__3787 = p__3786;
var map__3787__$1 = ((cljs.core.seq_QMARK_.call(null,map__3787))?cljs.core.apply.call(null,cljs.core.hash_map,map__3787):map__3787);
var env = cljs.core._lookup.call(null,map__3787__$1,"\uFDD0'env",null);
var exprs = cljs.core._lookup.call(null,map__3787__$1,"\uFDD0'exprs",null);
var frame = cljs.core._lookup.call(null,map__3787__$1,"\uFDD0'frame",null);
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = (new cljs.core.Keyword("\uFDD0'params")).call(null,frame);
cljs.compiler.emitln.call(null,"{");
var n__2165__auto___3788 = cljs.core.count.call(null,exprs);
var i_3789 = 0;
while(true){
if((i_3789 < n__2165__auto___3788))
{cljs.compiler.emitln.call(null,"var ",temps.call(null,i_3789)," = ",exprs.call(null,i_3789),";");
{
var G__3790 = (i_3789 + 1);
i_3789 = G__3790;
continue;
}
} else
{}
break;
}
var n__2165__auto___3791 = cljs.core.count.call(null,exprs);
var i_3792 = 0;
while(true){
if((i_3792 < n__2165__auto___3791))
{cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_3792))," = ",temps.call(null,i_3792),";");
{
var G__3793 = (i_3792 + 1);
i_3792 = G__3793;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,"continue;");
return cljs.compiler.emitln.call(null,"}");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'letfn",(function (p__3794){
var map__3795 = p__3794;
var map__3795__$1 = ((cljs.core.seq_QMARK_.call(null,map__3795))?cljs.core.apply.call(null,cljs.core.hash_map,map__3795):map__3795);
var env = cljs.core._lookup.call(null,map__3795__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__3795__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__3795__$1,"\uFDD0'statements",null);
var bindings = cljs.core._lookup.call(null,map__3795__$1,"\uFDD0'bindings",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
var G__3796_3798 = cljs.core.seq.call(null,bindings);
while(true){
if(G__3796_3798)
{var map__3797_3799 = cljs.core.first.call(null,G__3796_3798);
var map__3797_3800__$1 = ((cljs.core.seq_QMARK_.call(null,map__3797_3799))?cljs.core.apply.call(null,cljs.core.hash_map,map__3797_3799):map__3797_3799);
var binding_3801 = map__3797_3800__$1;
var init_3802 = cljs.core._lookup.call(null,map__3797_3800__$1,"\uFDD0'init",null);
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_3801)," = ",init_3802,";");
{
var G__3803 = cljs.core.next.call(null,G__3796_3798);
G__3796_3798 = G__3803;
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'invoke",(function (p__3804){
var map__3805 = p__3804;
var map__3805__$1 = ((cljs.core.seq_QMARK_.call(null,map__3805))?cljs.core.apply.call(null,cljs.core.hash_map,map__3805):map__3805);
var expr = map__3805__$1;
var env = cljs.core._lookup.call(null,map__3805__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__3805__$1,"\uFDD0'args",null);
var f = cljs.core._lookup.call(null,map__3805__$1,"\uFDD0'f",null);
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
var vec__3806 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
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
var f__$1 = cljs.core.nth.call(null,vec__3806,0,null);
var variadic_invoke = cljs.core.nth.call(null,vec__3806,1,null);
var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(opt_not_QMARK_))
{cljs.compiler.emits.call(null,"!(",cljs.core.first.call(null,args),")");
} else
{if(cljs.core.truth_(proto_QMARK_))
{var pimpl_3807 = [cljs.core.str(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str(cljs.compiler.munge.call(null,cljs.core.name.call(null,(new cljs.core.Keyword("\uFDD0'name")).call(null,info)))),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_3807,"(",cljs.compiler.comma_sep.call(null,args),")");
} else
{if(cljs.core.truth_(keyword_QMARK_))
{cljs.compiler.emits.call(null,"(new cljs.core.Keyword(",f__$1,")).call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
} else
{if(cljs.core.truth_(variadic_invoke))
{var mfa_3808 = (new cljs.core.Keyword("\uFDD0'max-fixed-arity")).call(null,variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_3808,args)),(((mfa_3808 === 0))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_3808,args)),"], 0))");
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
{var fprop_3809 = [cljs.core.str(".cljs$lang$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,"(",f__$1,fprop_3809," ? ",f__$1,fprop_3809,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
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
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'new",(function (p__3810){
var map__3811 = p__3810;
var map__3811__$1 = ((cljs.core.seq_QMARK_.call(null,map__3811))?cljs.core.apply.call(null,cljs.core.hash_map,map__3811):map__3811);
var env = cljs.core._lookup.call(null,map__3811__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__3811__$1,"\uFDD0'args",null);
var ctor = cljs.core._lookup.call(null,map__3811__$1,"\uFDD0'ctor",null);
var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'set!",(function (p__3812){
var map__3813 = p__3812;
var map__3813__$1 = ((cljs.core.seq_QMARK_.call(null,map__3813))?cljs.core.apply.call(null,cljs.core.hash_map,map__3813):map__3813);
var env = cljs.core._lookup.call(null,map__3813__$1,"\uFDD0'env",null);
var val = cljs.core._lookup.call(null,map__3813__$1,"\uFDD0'val",null);
var target = cljs.core._lookup.call(null,map__3813__$1,"\uFDD0'target",null);
var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,target," = ",val);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'ns",(function (p__3814){
var map__3815 = p__3814;
var map__3815__$1 = ((cljs.core.seq_QMARK_.call(null,map__3815))?cljs.core.apply.call(null,cljs.core.hash_map,map__3815):map__3815);
var env = cljs.core._lookup.call(null,map__3815__$1,"\uFDD0'env",null);
var requires_macros = cljs.core._lookup.call(null,map__3815__$1,"\uFDD0'requires-macros",null);
var uses = cljs.core._lookup.call(null,map__3815__$1,"\uFDD0'uses",null);
var requires = cljs.core._lookup.call(null,map__3815__$1,"\uFDD0'requires",null);
var name = cljs.core._lookup.call(null,map__3815__$1,"\uFDD0'name",null);
cljs.core.swap_BANG_.call(null,cljs.compiler.ns_first_segments,cljs.core.conj,cljs.core.first.call(null,clojure.string.split.call(null,[cljs.core.str(name)].join(''),/\./)));
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,name),"');");
if(cljs.core._EQ_.call(null,name,"\uFDD1'cljs.core"))
{} else
{cljs.compiler.emitln.call(null,"goog.require('cljs.core');");
}
var G__3816 = cljs.core.seq.call(null,cljs.core.into.call(null,cljs.core.vals.call(null,requires),cljs.core.distinct.call(null,cljs.core.vals.call(null,uses))));
while(true){
if(G__3816)
{var lib = cljs.core.first.call(null,G__3816);
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib),"');");
{
var G__3817 = cljs.core.next.call(null,G__3816);
G__3816 = G__3817;
continue;
}
} else
{return null;
}
break;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'deftype*",(function (p__3818){
var map__3819 = p__3818;
var map__3819__$1 = ((cljs.core.seq_QMARK_.call(null,map__3819))?cljs.core.apply.call(null,cljs.core.hash_map,map__3819):map__3819);
var pmasks = cljs.core._lookup.call(null,map__3819__$1,"\uFDD0'pmasks",null);
var fields = cljs.core._lookup.call(null,map__3819__$1,"\uFDD0'fields",null);
var t = cljs.core._lookup.call(null,map__3819__$1,"\uFDD0't",null);
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emit_provide.call(null,t);
cljs.compiler.emitln.call(null,"");
cljs.compiler.emitln.call(null,"/**");
cljs.compiler.emitln.call(null,"* @constructor");
cljs.compiler.emitln.call(null,"*/");
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");
var G__3820_3823 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__3820_3823)
{var fld_3824 = cljs.core.first.call(null,G__3820_3823);
cljs.compiler.emitln.call(null,"this.",fld_3824," = ",fld_3824,";");
{
var G__3825 = cljs.core.next.call(null,G__3820_3823);
G__3820_3823 = G__3825;
continue;
}
} else
{}
break;
}
var G__3821_3826 = cljs.core.seq.call(null,pmasks);
while(true){
if(G__3821_3826)
{var vec__3822_3827 = cljs.core.first.call(null,G__3821_3826);
var pno_3828 = cljs.core.nth.call(null,vec__3822_3827,0,null);
var pmask_3829 = cljs.core.nth.call(null,vec__3822_3827,1,null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_3828,"$ = ",pmask_3829,";");
{
var G__3830 = cljs.core.next.call(null,G__3821_3826);
G__3821_3826 = G__3830;
continue;
}
} else
{}
break;
}
return cljs.compiler.emitln.call(null,"})");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'defrecord*",(function (p__3831){
var map__3832 = p__3831;
var map__3832__$1 = ((cljs.core.seq_QMARK_.call(null,map__3832))?cljs.core.apply.call(null,cljs.core.hash_map,map__3832):map__3832);
var pmasks = cljs.core._lookup.call(null,map__3832__$1,"\uFDD0'pmasks",null);
var fields = cljs.core._lookup.call(null,map__3832__$1,"\uFDD0'fields",null);
var t = cljs.core._lookup.call(null,map__3832__$1,"\uFDD0't",null);
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),cljs.core.vec(["\uFDD1'__meta","\uFDD1'__extmap"]));
cljs.compiler.emit_provide.call(null,t);
cljs.compiler.emitln.call(null,"");
cljs.compiler.emitln.call(null,"/**");
cljs.compiler.emitln.call(null,"* @constructor");
var G__3833_3837 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__3833_3837)
{var fld_3838 = cljs.core.first.call(null,G__3833_3837);
cljs.compiler.emitln.call(null,"* @param {*} ",fld_3838);
{
var G__3839 = cljs.core.next.call(null,G__3833_3837);
G__3833_3837 = G__3839;
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
var G__3834_3840 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__3834_3840)
{var fld_3841 = cljs.core.first.call(null,G__3834_3840);
cljs.compiler.emitln.call(null,"this.",fld_3841," = ",fld_3841,";");
{
var G__3842 = cljs.core.next.call(null,G__3834_3840);
G__3834_3840 = G__3842;
continue;
}
} else
{}
break;
}
var G__3835_3843 = cljs.core.seq.call(null,pmasks);
while(true){
if(G__3835_3843)
{var vec__3836_3844 = cljs.core.first.call(null,G__3835_3843);
var pno_3845 = cljs.core.nth.call(null,vec__3836_3844,0,null);
var pmask_3846 = cljs.core.nth.call(null,vec__3836_3844,1,null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_3845,"$ = ",pmask_3846,";");
{
var G__3847 = cljs.core.next.call(null,G__3835_3843);
G__3835_3843 = G__3847;
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'dot",(function (p__3848){
var map__3849 = p__3848;
var map__3849__$1 = ((cljs.core.seq_QMARK_.call(null,map__3849))?cljs.core.apply.call(null,cljs.core.hash_map,map__3849):map__3849);
var env = cljs.core._lookup.call(null,map__3849__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__3849__$1,"\uFDD0'args",null);
var method = cljs.core._lookup.call(null,map__3849__$1,"\uFDD0'method",null);
var field = cljs.core._lookup.call(null,map__3849__$1,"\uFDD0'field",null);
var target = cljs.core._lookup.call(null,map__3849__$1,"\uFDD0'target",null);
var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(field))
{cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else
{cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'js",(function (p__3850){
var map__3851 = p__3850;
var map__3851__$1 = ((cljs.core.seq_QMARK_.call(null,map__3851))?cljs.core.apply.call(null,cljs.core.hash_map,map__3851):map__3851);
var args = cljs.core._lookup.call(null,map__3851__$1,"\uFDD0'args",null);
var segs = cljs.core._lookup.call(null,map__3851__$1,"\uFDD0'segs",null);
var code = cljs.core._lookup.call(null,map__3851__$1,"\uFDD0'code",null);
var env = cljs.core._lookup.call(null,map__3851__$1,"\uFDD0'env",null);
var env__2655__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(code))
{cljs.compiler.emits.call(null,code);
} else
{cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,cljs.core.PersistentVector.fromArray([null], true))));
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2655__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.ns_snap = (function ns_snap(){
var nss = cljs.compiler.read_string.call(null,cljs.core.pr_str.call(null,cljs.core.update_in.call(null,cljs.core.deref.call(null,cljs.analyzer.namespaces),cljs.core.PersistentVector.fromArray(["\uFDD1'cljs.core","\uFDD0'defs"], true),cljs.core.dissoc,"\uFDD1'/")));
return cljs.compiler.with_core_cljs.call(null,(function (){var _STAR_cljs_ns_STAR_3860 = cljs.analyzer._STAR_cljs_ns_STAR_;
try{cljs.analyzer._STAR_cljs_ns_STAR_ = "\uFDD1'cljs.user";
return cljs.compiler.spit.call(null,"src/cljs/bs.js",cljs.core.apply.call(null,cljs.core.str,(function (){var iter__2100__auto__ = (function iter__3862(s__3863){
return (new cljs.core.LazySeq(null,false,(function (){
var s__3863__$1 = s__3863;
while(true){
if(cljs.core.seq.call(null,s__3863__$1))
{var form = cljs.core.first.call(null,s__3863__$1);
return cljs.core.cons.call(null,(cljs.core.truth_(form)?(function (){var sb__2215__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_3866_3868 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_fn_STAR_3866_3868,sb__2215__auto__,form){
return (function (x__2216__auto__){
return sb__2215__auto__.append(x__2216__auto__);
});})(_STAR_print_fn_STAR_3866_3868,sb__2215__auto__,form))
;
cljs.compiler.emit.call(null,cljs.analyzer.analyze.call(null,cljs.analyzer.empty_env.call(null),form));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_3866_3868;
}return [cljs.core.str(sb__2215__auto__)].join('');
})():null),iter__3862.call(null,cljs.core.rest.call(null,s__3863__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2100__auto__.call(null,cljs.core.PersistentVector.fromArray([cljs.core.with_meta(cljs.core.list("\uFDD1'ns","\uFDD1'bs"),cljs.core.hash_map("\uFDD0'line",1019)),cljs.core.list.call(null,"\uFDD1'def","\uFDD1'nss",cljs.core.list.call(null,"\uFDD1'quote",nss)),cljs.core.with_meta(cljs.core.list("\uFDD1'defn","\uFDD1'reset",cljs.core.vec([]),cljs.core.with_meta(cljs.core.list("\uFDD1'reset!","\uFDD1'cljs.analyzer/namespace","\uFDD1'nss"),cljs.core.hash_map("\uFDD0'line",1021))),cljs.core.hash_map("\uFDD0'line",1021))], true));
})()));
}finally {cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_3860;
}})());
});
