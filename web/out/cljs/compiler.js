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
{var map__3649 = s;
var map__3649__$1 = ((cljs.core.seq_QMARK_.call(null,map__3649))?cljs.core.apply.call(null,cljs.core.hash_map,map__3649):map__3649);
var info = map__3649__$1;
var field = cljs.core._lookup.call(null,map__3649__$1,"\uFDD0'field",null);
var name = cljs.core._lookup.call(null,map__3649__$1,"\uFDD0'name",null);
var depth = (function (){var d = 0;
var G__3651 = info;
var map__3652 = G__3651;
var map__3652__$1 = ((cljs.core.seq_QMARK_.call(null,map__3652))?cljs.core.apply.call(null,cljs.core.hash_map,map__3652):map__3652);
var shadow = cljs.core._lookup.call(null,map__3652__$1,"\uFDD0'shadow",null);
var d__$1 = d;
var G__3651__$1 = G__3651;
while(true){
var d__$2 = d__$1;
var map__3653 = G__3651__$1;
var map__3653__$1 = ((cljs.core.seq_QMARK_.call(null,map__3653))?cljs.core.apply.call(null,cljs.core.hash_map,map__3653):map__3653);
var shadow__$1 = cljs.core._lookup.call(null,map__3653__$1,"\uFDD0'shadow",null);
if(cljs.core.truth_(shadow__$1))
{{
var G__3654 = (d__$2 + 1);
var G__3655 = shadow__$1;
d__$1 = G__3654;
G__3651__$1 = G__3655;
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
var ss__$1 = clojure.string.join.call(null,".",cljs.core.map.call(null,(function (p1__3642_SHARP_){
if(cljs.core.truth_(reserved.call(null,p1__3642_SHARP_)))
{return [cljs.core.str(p1__3642_SHARP_),cljs.core.str("$")].join('');
} else
{return p1__3642_SHARP_;
}
}),clojure.string.split.call(null,ss,/[.]/)));
var ms = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__3643_SHARP_){
return cljs.core._lookup.call(null,cljs.compiler.CHAR_MAP,p1__3643_SHARP_,p1__3643_SHARP_);
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
var G__3658 = cp;
if(cljs.core._EQ_.call(null,9,G__3658))
{return "\\t";
} else
{if(cljs.core._EQ_.call(null,13,G__3658))
{return "\\r";
} else
{if(cljs.core._EQ_.call(null,10,G__3658))
{return "\\n";
} else
{if(cljs.core._EQ_.call(null,12,G__3658))
{return "\\f";
} else
{if(cljs.core._EQ_.call(null,8,G__3658))
{return "\\b";
} else
{if(cljs.core._EQ_.call(null,92,G__3658))
{return "\\\\";
} else
{if(cljs.core._EQ_.call(null,34,G__3658))
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
return cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__3656_SHARP_){
return cljs.compiler.escape_char.call(null,p1__3656_SHARP_);
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
var G__3662_3665 = cljs.core.seq.call(null,xs);
while(true){
if(G__3662_3665)
{var x_3666 = cljs.core.first.call(null,G__3662_3665);
if((x_3666 == null))
{} else
{if(cljs.core.map_QMARK_.call(null,x_3666))
{cljs.compiler.emit.call(null,x_3666);
} else
{if(cljs.core.seq_QMARK_.call(null,x_3666))
{cljs.core.apply.call(null,emits,x_3666);
} else
{if(cljs.core.fn_QMARK_.call(null,x_3666))
{x_3666.call(null);
} else
{if("\uFDD0'else")
{var s_3667 = cljs.core.print_str.call(null,x_3666);
if(cljs.core.truth_(cljs.compiler._STAR_position_STAR_))
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_position_STAR_,((function (G__3662_3665,s_3667,x_3666){
return (function (p__3663){
var vec__3664 = p__3663;
var line = cljs.core.nth.call(null,vec__3664,0,null);
var column = cljs.core.nth.call(null,vec__3664,1,null);
return cljs.core.PersistentVector.fromArray([line,(column + cljs.core.count.call(null,s_3667))], true);
});})(G__3662_3665,s_3667,x_3666))
);
} else
{}
cljs.core.print.call(null,s_3667);
} else
{}
}
}
}
}
{
var G__3668 = cljs.core.next.call(null,G__3662_3665);
G__3662_3665 = G__3668;
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
emits.cljs$lang$applyTo = (function (arglist__3669){
var xs = cljs.core.seq(arglist__3669);;
return emits__delegate(xs);
});
emits.cljs$lang$arity$variadic = emits__delegate;
return emits;
})()
;
cljs.compiler.emit_str = (function emit_str(expr){
var sb__2216__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_3672_3674 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2217__auto__){
return sb__2216__auto__.append(x__2217__auto__);
});
cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_3672_3674;
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
{cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_position_STAR_,(function (p__3677){
var vec__3678 = p__3677;
var line = cljs.core.nth.call(null,vec__3678,0,null);
var column = cljs.core.nth.call(null,vec__3678,1,null);
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
emitln.cljs$lang$applyTo = (function (arglist__3679){
var xs = cljs.core.seq(arglist__3679);;
return emitln__delegate(xs);
});
emitln.cljs$lang$arity$variadic = emitln__delegate;
return emitln;
})()
;
cljs.compiler.emit_str = (function emit_str(expr){
var sb__2216__auto__ = (new goog.string.StringBuffer());
var _STAR_print_fn_STAR_3682_3684 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2217__auto__){
return sb__2216__auto__.append(x__2217__auto__);
});
cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_3682_3684;
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
emit_meta_constant.cljs$lang$applyTo = (function (arglist__3685){
var x = cljs.core.first(arglist__3685);
var body = cljs.core.rest(arglist__3685);
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
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.hash_map("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__3686_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3686_SHARP_);
});
}),cljs.core.apply.call(null,cljs.core.concat,x))),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.compiler.emit_constant_set = (function emit_constant_set(x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.set(["], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__3687_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3687_SHARP_);
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
var vec__3691 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str(x)].join(''));
var _ = cljs.core.nth.call(null,vec__3691,0,null);
var flags = cljs.core.nth.call(null,vec__3691,1,null);
var pattern = cljs.core.nth.call(null,vec__3691,2,null);
var all_slashes = (new RegExp("\\/","g"));
return cljs.compiler.emits.call(null,[cljs.core.str("/"),cljs.core.str(pattern.replace(all_slashes,"\\\\/")),cljs.core.str("/"),cljs.core.str(flags)].join(''));
});
cljs.core.PersistentVector.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentVector.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.vec(["], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__3690_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3690_SHARP_);
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
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.list("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__3689_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3689_SHARP_);
});
}),x)),cljs.core.PersistentVector.fromArray([")"], true)));
});
cljs.core.PersistentTreeMap.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.PersistentTreeMap.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_constant_map.call(null,x);
});
cljs.core.List.prototype.cljs$compiler$EmitConstant$ = true;
cljs.core.List.prototype.cljs$compiler$EmitConstant$emit_constant$arity$1 = (function (x){
return cljs.compiler.emit_meta_constant.call(null,x,cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["cljs.core.list("], true),cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,(function (p1__3688_SHARP_){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__3688_SHARP_);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'var",(function (p__3692){
var map__3693 = p__3692;
var map__3693__$1 = ((cljs.core.seq_QMARK_.call(null,map__3693))?cljs.core.apply.call(null,cljs.core.hash_map,map__3693):map__3693);
var arg = map__3693__$1;
var env = cljs.core._lookup.call(null,map__3693__$1,"\uFDD0'env",null);
var info = cljs.core._lookup.call(null,map__3693__$1,"\uFDD0'info",null);
var n = (new cljs.core.Keyword("\uFDD0'name")).call(null,info);
var n__$1 = ((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,n),"js"))?cljs.core.name.call(null,n):info);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,n__$1));
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'meta",(function (p__3694){
var map__3695 = p__3694;
var map__3695__$1 = ((cljs.core.seq_QMARK_.call(null,map__3695))?cljs.core.apply.call(null,cljs.core.hash_map,map__3695):map__3695);
var env = cljs.core._lookup.call(null,map__3695__$1,"\uFDD0'env",null);
var meta = cljs.core._lookup.call(null,map__3695__$1,"\uFDD0'meta",null);
var expr = cljs.core._lookup.call(null,map__3695__$1,"\uFDD0'expr",null);
var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.array_map_threshold = 16;
cljs.compiler.obj_map_threshold = 32;
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'map",(function (p__3696){
var map__3697 = p__3696;
var map__3697__$1 = ((cljs.core.seq_QMARK_.call(null,map__3697))?cljs.core.apply.call(null,cljs.core.hash_map,map__3697):map__3697);
var vals = cljs.core._lookup.call(null,map__3697__$1,"\uFDD0'vals",null);
var keys = cljs.core._lookup.call(null,map__3697__$1,"\uFDD0'keys",null);
var simple_keys_QMARK_ = cljs.core._lookup.call(null,map__3697__$1,"\uFDD0'simple-keys?",null);
var env = cljs.core._lookup.call(null,map__3697__$1,"\uFDD0'env",null);
var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
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
var _STAR_print_fn_STAR_3698_3700 = cljs.core._STAR_print_fn_STAR_;
try{cljs.core._STAR_print_fn_STAR_ = (function (x__2217__auto__){
return sb__2216__auto__.append(x__2217__auto__);
});
cljs.compiler.emit.call(null,k);
cljs.core.print.call(null,":");
cljs.compiler.emit.call(null,v);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_3698_3700;
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
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'vector",(function (p__3701){
var map__3702 = p__3701;
var map__3702__$1 = ((cljs.core.seq_QMARK_.call(null,map__3702))?cljs.core.apply.call(null,cljs.core.hash_map,map__3702):map__3702);
var env = cljs.core._lookup.call(null,map__3702__$1,"\uFDD0'env",null);
var items = cljs.core._lookup.call(null,map__3702__$1,"\uFDD0'items",null);
var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.empty_QMARK_.call(null,items))
{cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else
{cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep.call(null,items),"], true)");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'set",(function (p__3703){
var map__3704 = p__3703;
var map__3704__$1 = ((cljs.core.seq_QMARK_.call(null,map__3704))?cljs.core.apply.call(null,cljs.core.hash_map,map__3704):map__3704);
var env = cljs.core._lookup.call(null,map__3704__$1,"\uFDD0'env",null);
var items = cljs.core._lookup.call(null,map__3704__$1,"\uFDD0'items",null);
var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.empty_QMARK_.call(null,items))
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.EMPTY");
} else
{cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.fromArray([",cljs.compiler.comma_sep.call(null,items),"])");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'constant",(function (p__3705){
var map__3706 = p__3705;
var map__3706__$1 = ((cljs.core.seq_QMARK_.call(null,map__3706))?cljs.core.apply.call(null,cljs.core.hash_map,map__3706):map__3706);
var env = cljs.core._lookup.call(null,map__3706__$1,"\uFDD0'env",null);
var form = cljs.core._lookup.call(null,map__3706__$1,"\uFDD0'form",null);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emit_constant.call(null,form);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
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
{var G__3709 = (new cljs.core.Keyword("\uFDD0'op")).call(null,e);
if(cljs.core._EQ_.call(null,"\uFDD0'constant",G__3709))
{var G__3710 = (new cljs.core.Keyword("\uFDD0'form")).call(null,e);
if(cljs.core._EQ_.call(null,false,G__3710))
{return "\uFDD1'boolean";
} else
{if(cljs.core._EQ_.call(null,true,G__3710))
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
{if(cljs.core._EQ_.call(null,"\uFDD0'if",G__3709))
{var then_tag = infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'then")).call(null,e));
var else_tag = infer_tag.call(null,(new cljs.core.Keyword("\uFDD0'else")).call(null,e));
if(cljs.core._EQ_.call(null,then_tag,else_tag))
{return then_tag;
} else
{return null;
}
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'let",G__3709))
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'if",(function (p__3711){
var map__3712 = p__3711;
var map__3712__$1 = ((cljs.core.seq_QMARK_.call(null,map__3712))?cljs.core.apply.call(null,cljs.core.hash_map,map__3712):map__3712);
var unchecked = cljs.core._lookup.call(null,map__3712__$1,"\uFDD0'unchecked",null);
var env = cljs.core._lookup.call(null,map__3712__$1,"\uFDD0'env",null);
var else$ = cljs.core._lookup.call(null,map__3712__$1,"\uFDD0'else",null);
var then = cljs.core._lookup.call(null,map__3712__$1,"\uFDD0'then",null);
var test = cljs.core._lookup.call(null,map__3712__$1,"\uFDD0'test",null);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'throw",(function (p__3713){
var map__3714 = p__3713;
var map__3714__$1 = ((cljs.core.seq_QMARK_.call(null,map__3714))?cljs.core.apply.call(null,cljs.core.hash_map,map__3714):map__3714);
var env = cljs.core._lookup.call(null,map__3714__$1,"\uFDD0'env",null);
var throw$ = cljs.core._lookup.call(null,map__3714__$1,"\uFDD0'throw",null);
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
var G__3719 = cljs.core.seq.call(null,clojure.string.split_lines.call(null,e));
while(true){
if(G__3719)
{var next_line = cljs.core.first.call(null,G__3719);
cljs.compiler.emitln.call(null,"* ",clojure.string.trim.call(null,next_line));
{
var G__3721 = cljs.core.next.call(null,G__3719);
G__3719 = G__3721;
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
var G__3720_3722 = cljs.core.seq.call(null,docs__$2);
while(true){
if(G__3720_3722)
{var e_3723 = cljs.core.first.call(null,G__3720_3722);
if(cljs.core.truth_(e_3723))
{print_comment_lines.call(null,e_3723);
} else
{}
{
var G__3724 = cljs.core.next.call(null,G__3720_3722);
G__3720_3722 = G__3724;
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'def",(function (p__3725){
var map__3726 = p__3725;
var map__3726__$1 = ((cljs.core.seq_QMARK_.call(null,map__3726))?cljs.core.apply.call(null,cljs.core.hash_map,map__3726):map__3726);
var export$ = cljs.core._lookup.call(null,map__3726__$1,"\uFDD0'export",null);
var doc = cljs.core._lookup.call(null,map__3726__$1,"\uFDD0'doc",null);
var env = cljs.core._lookup.call(null,map__3726__$1,"\uFDD0'env",null);
var init = cljs.core._lookup.call(null,map__3726__$1,"\uFDD0'init",null);
var name = cljs.core._lookup.call(null,map__3726__$1,"\uFDD0'name",null);
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
cljs.compiler.emit_apply_to = (function emit_apply_to(p__3727){
var map__3731 = p__3727;
var map__3731__$1 = ((cljs.core.seq_QMARK_.call(null,map__3731))?cljs.core.apply.call(null,cljs.core.hash_map,map__3731):map__3731);
var env = cljs.core._lookup.call(null,map__3731__$1,"\uFDD0'env",null);
var params = cljs.core._lookup.call(null,map__3731__$1,"\uFDD0'params",null);
var name = cljs.core._lookup.call(null,map__3731__$1,"\uFDD0'name",null);
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str("__delegate")].join('');
var params__$1 = cljs.core.map.call(null,cljs.compiler.munge,params);
cljs.compiler.emitln.call(null,"(function (",arglist,"){");
var G__3732_3734 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.butlast.call(null,params__$1)));
while(true){
if(G__3732_3734)
{var vec__3733_3735 = cljs.core.first.call(null,G__3732_3734);
var i_3736 = cljs.core.nth.call(null,vec__3733_3735,0,null);
var param_3737 = cljs.core.nth.call(null,vec__3733_3735,1,null);
cljs.compiler.emits.call(null,"var ",param_3737," = cljs.core.first(");
var n__2166__auto___3738 = i_3736;
var __3739 = 0;
while(true){
if((__3739 < n__2166__auto___3738))
{cljs.compiler.emits.call(null,"cljs.core.next(");
{
var G__3740 = (__3739 + 1);
__3739 = G__3740;
continue;
}
} else
{}
break;
}
cljs.compiler.emits.call(null,arglist,")");
var n__2166__auto___3741 = i_3736;
var __3742 = 0;
while(true){
if((__3742 < n__2166__auto___3741))
{cljs.compiler.emits.call(null,")");
{
var G__3743 = (__3742 + 1);
__3742 = G__3743;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,";");
{
var G__3744 = cljs.core.next.call(null,G__3732_3734);
G__3732_3734 = G__3744;
continue;
}
} else
{}
break;
}
if((1 < cljs.core.count.call(null,params__$1)))
{cljs.compiler.emits.call(null,"var ",cljs.core.last.call(null,params__$1)," = cljs.core.rest(");
var n__2166__auto___3745 = (cljs.core.count.call(null,params__$1) - 2);
var __3746 = 0;
while(true){
if((__3746 < n__2166__auto___3745))
{cljs.compiler.emits.call(null,"cljs.core.next(");
{
var G__3747 = (__3746 + 1);
__3746 = G__3747;
continue;
}
} else
{}
break;
}
cljs.compiler.emits.call(null,arglist);
var n__2166__auto___3748 = (cljs.core.count.call(null,params__$1) - 2);
var __3749 = 0;
while(true){
if((__3749 < n__2166__auto___3748))
{cljs.compiler.emits.call(null,")");
{
var G__3750 = (__3749 + 1);
__3749 = G__3750;
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
cljs.compiler.emit_fn_method = (function emit_fn_method(p__3751){
var map__3753 = p__3751;
var map__3753__$1 = ((cljs.core.seq_QMARK_.call(null,map__3753))?cljs.core.apply.call(null,cljs.core.hash_map,map__3753):map__3753);
var max_fixed_arity = cljs.core._lookup.call(null,map__3753__$1,"\uFDD0'max-fixed-arity",null);
var recurs = cljs.core._lookup.call(null,map__3753__$1,"\uFDD0'recurs",null);
var env = cljs.core._lookup.call(null,map__3753__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__3753__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__3753__$1,"\uFDD0'statements",null);
var params = cljs.core._lookup.call(null,map__3753__$1,"\uFDD0'params",null);
var variadic = cljs.core._lookup.call(null,map__3753__$1,"\uFDD0'variadic",null);
var name = cljs.core._lookup.call(null,map__3753__$1,"\uFDD0'name",null);
var type = cljs.core._lookup.call(null,map__3753__$1,"\uFDD0'type",null);
var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
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
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
});
cljs.compiler.emit_variadic_fn_method = (function emit_variadic_fn_method(p__3757){
var map__3759 = p__3757;
var map__3759__$1 = ((cljs.core.seq_QMARK_.call(null,map__3759))?cljs.core.apply.call(null,cljs.core.hash_map,map__3759):map__3759);
var f = map__3759__$1;
var max_fixed_arity = cljs.core._lookup.call(null,map__3759__$1,"\uFDD0'max-fixed-arity",null);
var recurs = cljs.core._lookup.call(null,map__3759__$1,"\uFDD0'recurs",null);
var env = cljs.core._lookup.call(null,map__3759__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__3759__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__3759__$1,"\uFDD0'statements",null);
var params = cljs.core._lookup.call(null,map__3759__$1,"\uFDD0'params",null);
var variadic = cljs.core._lookup.call(null,map__3759__$1,"\uFDD0'variadic",null);
var name = cljs.core._lookup.call(null,map__3759__$1,"\uFDD0'name",null);
var type = cljs.core._lookup.call(null,map__3759__$1,"\uFDD0'type",null);
var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
var name_3760__$1 = (function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null);
}
})();
var mname_3761 = cljs.compiler.munge.call(null,name_3760__$1);
var params_3762__$1 = cljs.core.map.call(null,cljs.compiler.munge,params);
var delegate_name_3763 = [cljs.core.str(mname_3761),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.call(null,"(function() { ");
cljs.compiler.emitln.call(null,"var ",delegate_name_3763," = function (",cljs.compiler.comma_sep.call(null,params_3762__$1),"){");
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
cljs.compiler.emitln.call(null,"var ",mname_3761," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params_3762__$1),cljs.core.PersistentVector.fromArray(["\uFDD1'var_args"], true)):params_3762__$1)),"){");
if(cljs.core.truth_(type))
{cljs.compiler.emitln.call(null,"var self__ = this;");
} else
{}
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,"var ",cljs.core.last.call(null,params_3762__$1)," = null;");
cljs.compiler.emitln.call(null,"if (goog.isDef(var_args)) {");
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params_3762__$1)," = cljs.core.array_seq(Array.prototype.slice.call(arguments, ",(cljs.core.count.call(null,params_3762__$1) - 1),"),0);");
cljs.compiler.emitln.call(null,"} ");
} else
{}
cljs.compiler.emitln.call(null,"return ",delegate_name_3763,".call(",clojure.string.join.call(null,", ",cljs.core.cons.call(null,"this",params_3762__$1)),");");
cljs.compiler.emitln.call(null,"};");
cljs.compiler.emitln.call(null,mname_3761,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");
cljs.compiler.emits.call(null,mname_3761,".cljs$lang$applyTo = ");
cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,"\uFDD0'name",name_3760__$1));
cljs.compiler.emitln.call(null,";");
cljs.compiler.emitln.call(null,mname_3761,".cljs$lang$arity$variadic = ",delegate_name_3763,";");
cljs.compiler.emitln.call(null,"return ",mname_3761,";");
cljs.compiler.emitln.call(null,"})()");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'fn",(function (p__3764){
var map__3765 = p__3764;
var map__3765__$1 = ((cljs.core.seq_QMARK_.call(null,map__3765))?cljs.core.apply.call(null,cljs.core.hash_map,map__3765):map__3765);
var loop_lets = cljs.core._lookup.call(null,map__3765__$1,"\uFDD0'loop-lets",null);
var recur_frames = cljs.core._lookup.call(null,map__3765__$1,"\uFDD0'recur-frames",null);
var variadic = cljs.core._lookup.call(null,map__3765__$1,"\uFDD0'variadic",null);
var max_fixed_arity = cljs.core._lookup.call(null,map__3765__$1,"\uFDD0'max-fixed-arity",null);
var methods$ = cljs.core._lookup.call(null,map__3765__$1,"\uFDD0'methods",null);
var env = cljs.core._lookup.call(null,map__3765__$1,"\uFDD0'env",null);
var name = cljs.core._lookup.call(null,map__3765__$1,"\uFDD0'name",null);
if(cljs.core._EQ_.call(null,"\uFDD0'statement",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{return null;
} else
{var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,cljs.core.mapcat.call(null,"\uFDD0'params",cljs.core.filter.call(null,(function (p1__3754_SHARP_){
var and__3822__auto__ = p1__3754_SHARP_;
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core.deref.call(null,(new cljs.core.Keyword("\uFDD0'flag")).call(null,p1__3754_SHARP_));
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
{var has_name_QMARK__3773 = (function (){var and__3822__auto__ = name;
if(cljs.core.truth_(and__3822__auto__))
{return true;
} else
{return and__3822__auto__;
}
})();
var name_3774__$1 = (function (){var or__3824__auto__ = name;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null);
}
})();
var mname_3775 = cljs.compiler.munge.call(null,name_3774__$1);
var maxparams_3776 = cljs.core.map.call(null,cljs.compiler.munge,cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,"\uFDD0'params",methods$)));
var mmap_3777 = cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.map.call(null,(function (method){
return cljs.core.PersistentVector.fromArray([cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str(mname_3775),cljs.core.str("__"),cljs.core.str(cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,method)))].join(''))),method], true);
}),methods$));
var ms_3778 = cljs.core.sort_by.call(null,(function (p1__3755_SHARP_){
return cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,cljs.core.second.call(null,p1__3755_SHARP_)));
}),cljs.core.seq.call(null,mmap_3777));
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emitln.call(null,"(function() {");
cljs.compiler.emitln.call(null,"var ",mname_3775," = null;");
var G__3766_3779 = cljs.core.seq.call(null,ms_3778);
while(true){
if(G__3766_3779)
{var vec__3767_3780 = cljs.core.first.call(null,G__3766_3779);
var n_3781 = cljs.core.nth.call(null,vec__3767_3780,0,null);
var meth_3782 = cljs.core.nth.call(null,vec__3767_3780,1,null);
cljs.compiler.emits.call(null,"var ",n_3781," = ");
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_3782)))
{cljs.compiler.emit_variadic_fn_method.call(null,meth_3782);
} else
{cljs.compiler.emit_fn_method.call(null,meth_3782);
}
cljs.compiler.emitln.call(null,";");
{
var G__3783 = cljs.core.next.call(null,G__3766_3779);
G__3766_3779 = G__3783;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,mname_3775," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_3776),cljs.core.PersistentVector.fromArray(["\uFDD1'var_args"], true)):maxparams_3776)),"){");
if(cljs.core.truth_(variadic))
{cljs.compiler.emitln.call(null,"var ",cljs.core.last.call(null,maxparams_3776)," = var_args;");
} else
{}
cljs.compiler.emitln.call(null,"switch(arguments.length){");
var G__3768_3784 = cljs.core.seq.call(null,ms_3778);
while(true){
if(G__3768_3784)
{var vec__3769_3785 = cljs.core.first.call(null,G__3768_3784);
var n_3786 = cljs.core.nth.call(null,vec__3769_3785,0,null);
var meth_3787 = cljs.core.nth.call(null,vec__3769_3785,1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_3787)))
{cljs.compiler.emitln.call(null,"default:");
cljs.compiler.emitln.call(null,"return ",n_3786,".cljs$lang$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_3776)),(((cljs.core.count.call(null,maxparams_3776) > 1))?", ":null),"cljs.core.array_seq(arguments, ",max_fixed_arity,"));");
} else
{var pcnt_3788 = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,meth_3787));
cljs.compiler.emitln.call(null,"case ",pcnt_3788,":");
cljs.compiler.emitln.call(null,"return ",n_3786,".call(this",(((pcnt_3788 === 0))?null:cljs.core.list.call(null,",",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_3788,maxparams_3776)))),");");
}
{
var G__3789 = cljs.core.next.call(null,G__3768_3784);
G__3768_3784 = G__3789;
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
{cljs.compiler.emitln.call(null,mname_3775,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");
cljs.compiler.emitln.call(null,mname_3775,".cljs$lang$applyTo = ",cljs.core.some.call(null,(function (p1__3756_SHARP_){
var vec__3770 = p1__3756_SHARP_;
var n = cljs.core.nth.call(null,vec__3770,0,null);
var m = cljs.core.nth.call(null,vec__3770,1,null);
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,m)))
{return n;
} else
{return null;
}
}),ms_3778),".cljs$lang$applyTo;");
} else
{}
if(cljs.core.truth_(has_name_QMARK__3773))
{var G__3771_3790 = cljs.core.seq.call(null,ms_3778);
while(true){
if(G__3771_3790)
{var vec__3772_3791 = cljs.core.first.call(null,G__3771_3790);
var n_3792 = cljs.core.nth.call(null,vec__3772_3791,0,null);
var meth_3793 = cljs.core.nth.call(null,vec__3772_3791,1,null);
var c_3794 = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'params")).call(null,meth_3793));
if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'variadic")).call(null,meth_3793)))
{cljs.compiler.emitln.call(null,mname_3775,".cljs$lang$arity$variadic = ",n_3792,".cljs$lang$arity$variadic;");
} else
{cljs.compiler.emitln.call(null,mname_3775,".cljs$lang$arity$",c_3794," = ",n_3792,";");
}
{
var G__3795 = cljs.core.next.call(null,G__3771_3790);
G__3771_3790 = G__3795;
continue;
}
} else
{}
break;
}
} else
{}
cljs.compiler.emitln.call(null,"return ",mname_3775,";");
cljs.compiler.emitln.call(null,"})()");
}
if(loop_locals)
{return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else
{return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'do",(function (p__3796){
var map__3797 = p__3796;
var map__3797__$1 = ((cljs.core.seq_QMARK_.call(null,map__3797))?cljs.core.apply.call(null,cljs.core.hash_map,map__3797):map__3797);
var env = cljs.core._lookup.call(null,map__3797__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__3797__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__3797__$1,"\uFDD0'statements",null);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'try*",(function (p__3799){
var map__3800 = p__3799;
var map__3800__$1 = ((cljs.core.seq_QMARK_.call(null,map__3800))?cljs.core.apply.call(null,cljs.core.hash_map,map__3800):map__3800);
var finally$ = cljs.core._lookup.call(null,map__3800__$1,"\uFDD0'finally",null);
var name = cljs.core._lookup.call(null,map__3800__$1,"\uFDD0'name",null);
var catch$ = cljs.core._lookup.call(null,map__3800__$1,"\uFDD0'catch",null);
var try$ = cljs.core._lookup.call(null,map__3800__$1,"\uFDD0'try",null);
var env = cljs.core._lookup.call(null,map__3800__$1,"\uFDD0'env",null);
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
var map__3801_3805 = try$;
var map__3801_3806__$1 = ((cljs.core.seq_QMARK_.call(null,map__3801_3805))?cljs.core.apply.call(null,cljs.core.hash_map,map__3801_3805):map__3801_3805);
var ret_3807 = cljs.core._lookup.call(null,map__3801_3806__$1,"\uFDD0'ret",null);
var statements_3808 = cljs.core._lookup.call(null,map__3801_3806__$1,"\uFDD0'statements",null);
cljs.compiler.emit_block.call(null,subcontext,statements_3808,ret_3807);
cljs.compiler.emits.call(null,"}");
if(cljs.core.truth_(name))
{cljs.compiler.emits.call(null,"catch (",cljs.compiler.munge.call(null,name),"){");
if(cljs.core.truth_(catch$))
{var map__3802_3809 = catch$;
var map__3802_3810__$1 = ((cljs.core.seq_QMARK_.call(null,map__3802_3809))?cljs.core.apply.call(null,cljs.core.hash_map,map__3802_3809):map__3802_3809);
var ret_3811 = cljs.core._lookup.call(null,map__3802_3810__$1,"\uFDD0'ret",null);
var statements_3812 = cljs.core._lookup.call(null,map__3802_3810__$1,"\uFDD0'statements",null);
cljs.compiler.emit_block.call(null,subcontext,statements_3812,ret_3811);
} else
{}
cljs.compiler.emits.call(null,"}");
} else
{}
if(cljs.core.truth_(finally$))
{var map__3803_3813 = finally$;
var map__3803_3814__$1 = ((cljs.core.seq_QMARK_.call(null,map__3803_3813))?cljs.core.apply.call(null,cljs.core.hash_map,map__3803_3813):map__3803_3813);
var ret_3815 = cljs.core._lookup.call(null,map__3803_3814__$1,"\uFDD0'ret",null);
var statements_3816 = cljs.core._lookup.call(null,map__3803_3814__$1,"\uFDD0'statements",null);
if(cljs.core.not_EQ_.call(null,"\uFDD0'constant",(new cljs.core.Keyword("\uFDD0'op")).call(null,ret_3815)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("finally block cannot contain constant"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not=","\uFDD0'constant",cljs.core.with_meta(cljs.core.list("\uFDD0'op","\uFDD1'ret"),cljs.core.hash_map("\uFDD0'line",578))),cljs.core.hash_map("\uFDD0'line",578))))].join('')));
}
cljs.compiler.emits.call(null,"finally {");
cljs.compiler.emit_block.call(null,subcontext,statements_3816,ret_3815);
cljs.compiler.emits.call(null,"}");
} else
{}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
} else
{var map__3804 = try$;
var map__3804__$1 = ((cljs.core.seq_QMARK_.call(null,map__3804))?cljs.core.apply.call(null,cljs.core.hash_map,map__3804):map__3804);
var ret = cljs.core._lookup.call(null,map__3804__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__3804__$1,"\uFDD0'statements",null);
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'let",(function (p__3817){
var map__3818 = p__3817;
var map__3818__$1 = ((cljs.core.seq_QMARK_.call(null,map__3818))?cljs.core.apply.call(null,cljs.core.hash_map,map__3818):map__3818);
var loop = cljs.core._lookup.call(null,map__3818__$1,"\uFDD0'loop",null);
var env = cljs.core._lookup.call(null,map__3818__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__3818__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__3818__$1,"\uFDD0'statements",null);
var bindings = cljs.core._lookup.call(null,map__3818__$1,"\uFDD0'bindings",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
var _STAR_lexical_renames_STAR_3819_3823 = cljs.compiler._STAR_lexical_renames_STAR_;
try{cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,"\uFDD0'statement",context))?cljs.core.map.call(null,(function (p1__3798_SHARP_){
return cljs.core.vector.call(null,cljs.core.hash.call(null,p1__3798_SHARP_),cljs.core.gensym.call(null,[cljs.core.str((new cljs.core.Keyword("\uFDD0'name")).call(null,p1__3798_SHARP_)),cljs.core.str("-")].join('')));
}),bindings):null));
var G__3821_3824 = cljs.core.seq.call(null,bindings);
while(true){
if(G__3821_3824)
{var map__3822_3825 = cljs.core.first.call(null,G__3821_3824);
var map__3822_3826__$1 = ((cljs.core.seq_QMARK_.call(null,map__3822_3825))?cljs.core.apply.call(null,cljs.core.hash_map,map__3822_3825):map__3822_3825);
var binding_3827 = map__3822_3826__$1;
var init_3828 = cljs.core._lookup.call(null,map__3822_3826__$1,"\uFDD0'init",null);
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_3827)," = ",init_3828,";");
{
var G__3829 = cljs.core.next.call(null,G__3821_3824);
G__3821_3824 = G__3829;
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
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_3819_3823;
}if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{return cljs.compiler.emits.call(null,"})()");
} else
{return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'recur",(function (p__3830){
var map__3831 = p__3830;
var map__3831__$1 = ((cljs.core.seq_QMARK_.call(null,map__3831))?cljs.core.apply.call(null,cljs.core.hash_map,map__3831):map__3831);
var env = cljs.core._lookup.call(null,map__3831__$1,"\uFDD0'env",null);
var exprs = cljs.core._lookup.call(null,map__3831__$1,"\uFDD0'exprs",null);
var frame = cljs.core._lookup.call(null,map__3831__$1,"\uFDD0'frame",null);
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = (new cljs.core.Keyword("\uFDD0'params")).call(null,frame);
cljs.compiler.emitln.call(null,"{");
var n__2166__auto___3832 = cljs.core.count.call(null,exprs);
var i_3833 = 0;
while(true){
if((i_3833 < n__2166__auto___3832))
{cljs.compiler.emitln.call(null,"var ",temps.call(null,i_3833)," = ",exprs.call(null,i_3833),";");
{
var G__3834 = (i_3833 + 1);
i_3833 = G__3834;
continue;
}
} else
{}
break;
}
var n__2166__auto___3835 = cljs.core.count.call(null,exprs);
var i_3836 = 0;
while(true){
if((i_3836 < n__2166__auto___3835))
{cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_3836))," = ",temps.call(null,i_3836),";");
{
var G__3837 = (i_3836 + 1);
i_3836 = G__3837;
continue;
}
} else
{}
break;
}
cljs.compiler.emitln.call(null,"continue;");
return cljs.compiler.emitln.call(null,"}");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'letfn",(function (p__3838){
var map__3839 = p__3838;
var map__3839__$1 = ((cljs.core.seq_QMARK_.call(null,map__3839))?cljs.core.apply.call(null,cljs.core.hash_map,map__3839):map__3839);
var env = cljs.core._lookup.call(null,map__3839__$1,"\uFDD0'env",null);
var ret = cljs.core._lookup.call(null,map__3839__$1,"\uFDD0'ret",null);
var statements = cljs.core._lookup.call(null,map__3839__$1,"\uFDD0'statements",null);
var bindings = cljs.core._lookup.call(null,map__3839__$1,"\uFDD0'bindings",null);
var context = (new cljs.core.Keyword("\uFDD0'context")).call(null,env);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",context))
{cljs.compiler.emits.call(null,"(function (){");
} else
{}
var G__3840_3842 = cljs.core.seq.call(null,bindings);
while(true){
if(G__3840_3842)
{var map__3841_3843 = cljs.core.first.call(null,G__3840_3842);
var map__3841_3844__$1 = ((cljs.core.seq_QMARK_.call(null,map__3841_3843))?cljs.core.apply.call(null,cljs.core.hash_map,map__3841_3843):map__3841_3843);
var binding_3845 = map__3841_3844__$1;
var init_3846 = cljs.core._lookup.call(null,map__3841_3844__$1,"\uFDD0'init",null);
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_3845)," = ",init_3846,";");
{
var G__3847 = cljs.core.next.call(null,G__3840_3842);
G__3840_3842 = G__3847;
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'invoke",(function (p__3848){
var map__3849 = p__3848;
var map__3849__$1 = ((cljs.core.seq_QMARK_.call(null,map__3849))?cljs.core.apply.call(null,cljs.core.hash_map,map__3849):map__3849);
var expr = map__3849__$1;
var env = cljs.core._lookup.call(null,map__3849__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__3849__$1,"\uFDD0'args",null);
var f = cljs.core._lookup.call(null,map__3849__$1,"\uFDD0'f",null);
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
var vec__3850 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
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
var f__$1 = cljs.core.nth.call(null,vec__3850,0,null);
var variadic_invoke = cljs.core.nth.call(null,vec__3850,1,null);
var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(opt_not_QMARK_))
{cljs.compiler.emits.call(null,"!(",cljs.core.first.call(null,args),")");
} else
{if(cljs.core.truth_(proto_QMARK_))
{var pimpl_3851 = [cljs.core.str(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str(cljs.compiler.munge.call(null,cljs.core.name.call(null,(new cljs.core.Keyword("\uFDD0'name")).call(null,info)))),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_3851,"(",cljs.compiler.comma_sep.call(null,args),")");
} else
{if(cljs.core.truth_(keyword_QMARK_))
{cljs.compiler.emits.call(null,"(new cljs.core.Keyword(",f__$1,")).call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
} else
{if(cljs.core.truth_(variadic_invoke))
{var mfa_3852 = (new cljs.core.Keyword("\uFDD0'max-fixed-arity")).call(null,variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_3852,args)),(((mfa_3852 === 0))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_3852,args)),"], 0))");
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
{var fprop_3853 = [cljs.core.str(".cljs$lang$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,"(",f__$1,fprop_3853," ? ",f__$1,fprop_3853,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
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
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'new",(function (p__3854){
var map__3855 = p__3854;
var map__3855__$1 = ((cljs.core.seq_QMARK_.call(null,map__3855))?cljs.core.apply.call(null,cljs.core.hash_map,map__3855):map__3855);
var env = cljs.core._lookup.call(null,map__3855__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__3855__$1,"\uFDD0'args",null);
var ctor = cljs.core._lookup.call(null,map__3855__$1,"\uFDD0'ctor",null);
var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'set!",(function (p__3856){
var map__3857 = p__3856;
var map__3857__$1 = ((cljs.core.seq_QMARK_.call(null,map__3857))?cljs.core.apply.call(null,cljs.core.hash_map,map__3857):map__3857);
var env = cljs.core._lookup.call(null,map__3857__$1,"\uFDD0'env",null);
var val = cljs.core._lookup.call(null,map__3857__$1,"\uFDD0'val",null);
var target = cljs.core._lookup.call(null,map__3857__$1,"\uFDD0'target",null);
var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
cljs.compiler.emits.call(null,target," = ",val);
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'ns",(function (p__3858){
var map__3859 = p__3858;
var map__3859__$1 = ((cljs.core.seq_QMARK_.call(null,map__3859))?cljs.core.apply.call(null,cljs.core.hash_map,map__3859):map__3859);
var env = cljs.core._lookup.call(null,map__3859__$1,"\uFDD0'env",null);
var requires_macros = cljs.core._lookup.call(null,map__3859__$1,"\uFDD0'requires-macros",null);
var uses = cljs.core._lookup.call(null,map__3859__$1,"\uFDD0'uses",null);
var requires = cljs.core._lookup.call(null,map__3859__$1,"\uFDD0'requires",null);
var name = cljs.core._lookup.call(null,map__3859__$1,"\uFDD0'name",null);
cljs.core.swap_BANG_.call(null,cljs.compiler.ns_first_segments,cljs.core.conj,cljs.core.first.call(null,clojure.string.split.call(null,[cljs.core.str(name)].join(''),/\./)));
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,name),"');");
if(cljs.core._EQ_.call(null,name,"\uFDD1'cljs.core"))
{} else
{cljs.compiler.emitln.call(null,"goog.require('cljs.core');");
}
var G__3860 = cljs.core.seq.call(null,cljs.core.into.call(null,cljs.core.vals.call(null,requires),cljs.core.distinct.call(null,cljs.core.vals.call(null,uses))));
while(true){
if(G__3860)
{var lib = cljs.core.first.call(null,G__3860);
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib),"');");
{
var G__3861 = cljs.core.next.call(null,G__3860);
G__3860 = G__3861;
continue;
}
} else
{return null;
}
break;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'deftype*",(function (p__3862){
var map__3863 = p__3862;
var map__3863__$1 = ((cljs.core.seq_QMARK_.call(null,map__3863))?cljs.core.apply.call(null,cljs.core.hash_map,map__3863):map__3863);
var pmasks = cljs.core._lookup.call(null,map__3863__$1,"\uFDD0'pmasks",null);
var fields = cljs.core._lookup.call(null,map__3863__$1,"\uFDD0'fields",null);
var t = cljs.core._lookup.call(null,map__3863__$1,"\uFDD0't",null);
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emit_provide.call(null,t);
cljs.compiler.emitln.call(null,"");
cljs.compiler.emitln.call(null,"/**");
cljs.compiler.emitln.call(null,"* @constructor");
cljs.compiler.emitln.call(null,"*/");
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");
var G__3864_3867 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__3864_3867)
{var fld_3868 = cljs.core.first.call(null,G__3864_3867);
cljs.compiler.emitln.call(null,"this.",fld_3868," = ",fld_3868,";");
{
var G__3869 = cljs.core.next.call(null,G__3864_3867);
G__3864_3867 = G__3869;
continue;
}
} else
{}
break;
}
var G__3865_3870 = cljs.core.seq.call(null,pmasks);
while(true){
if(G__3865_3870)
{var vec__3866_3871 = cljs.core.first.call(null,G__3865_3870);
var pno_3872 = cljs.core.nth.call(null,vec__3866_3871,0,null);
var pmask_3873 = cljs.core.nth.call(null,vec__3866_3871,1,null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_3872,"$ = ",pmask_3873,";");
{
var G__3874 = cljs.core.next.call(null,G__3865_3870);
G__3865_3870 = G__3874;
continue;
}
} else
{}
break;
}
return cljs.compiler.emitln.call(null,"})");
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'defrecord*",(function (p__3875){
var map__3876 = p__3875;
var map__3876__$1 = ((cljs.core.seq_QMARK_.call(null,map__3876))?cljs.core.apply.call(null,cljs.core.hash_map,map__3876):map__3876);
var pmasks = cljs.core._lookup.call(null,map__3876__$1,"\uFDD0'pmasks",null);
var fields = cljs.core._lookup.call(null,map__3876__$1,"\uFDD0'fields",null);
var t = cljs.core._lookup.call(null,map__3876__$1,"\uFDD0't",null);
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),cljs.core.vec(["\uFDD1'__meta","\uFDD1'__extmap"]));
cljs.compiler.emit_provide.call(null,t);
cljs.compiler.emitln.call(null,"");
cljs.compiler.emitln.call(null,"/**");
cljs.compiler.emitln.call(null,"* @constructor");
var G__3877_3881 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__3877_3881)
{var fld_3882 = cljs.core.first.call(null,G__3877_3881);
cljs.compiler.emitln.call(null,"* @param {*} ",fld_3882);
{
var G__3883 = cljs.core.next.call(null,G__3877_3881);
G__3877_3881 = G__3883;
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
var G__3878_3884 = cljs.core.seq.call(null,fields__$1);
while(true){
if(G__3878_3884)
{var fld_3885 = cljs.core.first.call(null,G__3878_3884);
cljs.compiler.emitln.call(null,"this.",fld_3885," = ",fld_3885,";");
{
var G__3886 = cljs.core.next.call(null,G__3878_3884);
G__3878_3884 = G__3886;
continue;
}
} else
{}
break;
}
var G__3879_3887 = cljs.core.seq.call(null,pmasks);
while(true){
if(G__3879_3887)
{var vec__3880_3888 = cljs.core.first.call(null,G__3879_3887);
var pno_3889 = cljs.core.nth.call(null,vec__3880_3888,0,null);
var pmask_3890 = cljs.core.nth.call(null,vec__3880_3888,1,null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_3889,"$ = ",pmask_3890,";");
{
var G__3891 = cljs.core.next.call(null,G__3879_3887);
G__3879_3887 = G__3891;
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
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'dot",(function (p__3892){
var map__3893 = p__3892;
var map__3893__$1 = ((cljs.core.seq_QMARK_.call(null,map__3893))?cljs.core.apply.call(null,cljs.core.hash_map,map__3893):map__3893);
var env = cljs.core._lookup.call(null,map__3893__$1,"\uFDD0'env",null);
var args = cljs.core._lookup.call(null,map__3893__$1,"\uFDD0'args",null);
var method = cljs.core._lookup.call(null,map__3893__$1,"\uFDD0'method",null);
var field = cljs.core._lookup.call(null,map__3893__$1,"\uFDD0'field",null);
var target = cljs.core._lookup.call(null,map__3893__$1,"\uFDD0'target",null);
var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(field))
{cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else
{cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit,"\uFDD0'js",(function (p__3894){
var map__3895 = p__3894;
var map__3895__$1 = ((cljs.core.seq_QMARK_.call(null,map__3895))?cljs.core.apply.call(null,cljs.core.hash_map,map__3895):map__3895);
var args = cljs.core._lookup.call(null,map__3895__$1,"\uFDD0'args",null);
var segs = cljs.core._lookup.call(null,map__3895__$1,"\uFDD0'segs",null);
var code = cljs.core._lookup.call(null,map__3895__$1,"\uFDD0'code",null);
var env = cljs.core._lookup.call(null,map__3895__$1,"\uFDD0'env",null);
var env__2659__auto__ = env;
if(cljs.core._EQ_.call(null,"\uFDD0'return",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{cljs.compiler.emits.call(null,"return ");
} else
{}
if(cljs.core.truth_(code))
{cljs.compiler.emits.call(null,code);
} else
{cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,cljs.core.PersistentVector.fromArray([null], true))));
}
if(cljs.core._EQ_.call(null,"\uFDD0'expr",(new cljs.core.Keyword("\uFDD0'context")).call(null,env__2659__auto__)))
{return null;
} else
{return cljs.compiler.emitln.call(null,";");
}
}));

// Analyzer namespace snapshot:
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.assoc,"\uFDD1'cljs.compiler",cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map("\uFDD1'cljs-reserved-file-names",cljs.core.hash_map("\uFDD0'line",40,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name","\uFDD1'cljs.compiler/cljs-reserved-file-names"),"\uFDD1'get-tag",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'e"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'e","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/get-tag","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",328,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-apply-to",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec(["\uFDD1'name","\uFDD1'params","\uFDD1'env"]))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'p__3727","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-apply-to","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",400,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'escape-char",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'c"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'c","\uFDD0'tag","\uFDD1'Character","\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/escape-char","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",103,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'*lexical-renames*",cljs.core.hash_map("\uFDD0'line",39,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name","\uFDD1'cljs.compiler/*lexical-renames*"),"\uFDD1'infer-tag",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'e"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'e","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/infer-tag","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",332,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-provide",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'sym"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'sym","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-provide","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",160,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-constant-set",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-constant-set","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",195,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'munge",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1's"]),cljs.core.vec(["\uFDD1's","\uFDD1'reserved"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'reserved","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/munge","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",72,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-meta-constant",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x","\uFDD1'&","\uFDD1'body"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'body","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-meta-constant","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",166,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'ns-first-segments",cljs.core.hash_map("\uFDD0'line",43,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name","\uFDD1'cljs.compiler/ns-first-segments"),"\uFDD1'js-reserved",cljs.core.hash_map("\uFDD0'line",23,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name","\uFDD1'cljs.compiler/js-reserved"),"\uFDD1'safe-test?",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'e"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'e","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/safe-test?","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",347,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emitln",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'&","\uFDD1'xs"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'xs","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emitln","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",145,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'array-map-threshold",cljs.core.hash_map("\uFDD0'line",274,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'private",true,"\uFDD0'name","\uFDD1'cljs.compiler/array-map-threshold"),"\uFDD1'escape-string",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1's"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag","\uFDD1'CharSequence","\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/escape-string","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",119,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-constant-keyword",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-constant-keyword","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",174,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-constant",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'protocol","\uFDD1'cljs.compiler/EmitConstant","\uFDD0'name","\uFDD1'cljs.compiler/emit-constant","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",201,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-block",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'context","\uFDD1'statements","\uFDD1'ret"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'context","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'statements","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'ret","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-block","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",246,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-variadic-fn-method",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec(["\uFDD1'type","\uFDD1'name","\uFDD1'variadic","\uFDD1'params","\uFDD1'statements","\uFDD1'ret","\uFDD1'env","\uFDD1'recurs","\uFDD1'max-fixed-arity"]),"\uFDD0'as","\uFDD1'f")]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'p__3757","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-variadic-fn-method","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",440,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'*emitted-provides*",cljs.core.hash_map("\uFDD0'line",38,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name","\uFDD1'cljs.compiler/*emitted-provides*"),"\uFDD1'emit-fn-method",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'keys",cljs.core.vec(["\uFDD1'type","\uFDD1'name","\uFDD1'variadic","\uFDD1'params","\uFDD1'statements","\uFDD1'ret","\uFDD1'env","\uFDD1'recurs","\uFDD1'max-fixed-arity"]))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'p__3751","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-fn-method","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",427,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'EmitConstant",cljs.core.hash_map("\uFDD0'line",201,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'protocol-symbol",true,"\uFDD0'name","\uFDD1'cljs.compiler/EmitConstant"),"\uFDD1'*position*",cljs.core.hash_map("\uFDD0'line",37,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'dynamic",true,"\uFDD0'name","\uFDD1'cljs.compiler/*position*"),"\uFDD1'emit-str",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'expr"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'expr","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-str","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",157,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'tag","\uFDD1'String"),"\uFDD1'comma-sep",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'xs"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'xs","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/comma-sep","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",100,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-constant-symbol",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-constant-symbol","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",181,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'protocol-prefix",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'psym"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'psym","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/protocol-prefix","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",628,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'obj-map-threshold",cljs.core.hash_map("\uFDD0'line",275,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'private",true,"\uFDD0'name","\uFDD1'cljs.compiler/obj-map-threshold"),"\uFDD1'emit-comment",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'doc","\uFDD1'jsdoc"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'doc","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'jsdoc","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-comment","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Emit a nicely formatted comment string.","\uFDD0'line",374,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emits",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'&","\uFDD1'xs"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'xs","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emits","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",0,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",127,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'emit-constant-map",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/emit-constant-map","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",188,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'wrap-in-double-quotes",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'x"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'x","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.compiler/wrap-in-double-quotes","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",122,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs"),"\uFDD1'CHAR_MAP",cljs.core.hash_map("\uFDD0'line",46,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name","\uFDD1'cljs.compiler/CHAR_MAP"),"\uFDD1'emit",cljs.core.hash_map("\uFDD0'line",125,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/compiler.cljs","\uFDD0'name","\uFDD1'cljs.compiler/emit")),"\uFDD0'imports",null,"\uFDD0'uses-macros",cljs.core.hash_map("\uFDD1'emit-wrap","\uFDD1'cljs.compiler-macros"),"\uFDD0'requires",cljs.core.hash_map("\uFDD1'ana","\uFDD1'cljs.analyzer","\uFDD1'string","\uFDD1'clojure.string"),"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set(["\uFDD1'munge","\uFDD1'macroexpand-1"]),"\uFDD0'doc",null,"\uFDD0'name","\uFDD1'cljs.compiler"));
