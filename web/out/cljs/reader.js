goog.provide('cljs.reader');
goog.require('cljs.core');
goog.require('cljs.analyzer');
goog.require('goog.string');
/**
* Checks whether a given character is whitespace
*/
cljs.reader.whitespace_QMARK_ = (function whitespace_QMARK_(ch){
var or__3824__auto__ = goog.string.isBreakingWhitespace(ch);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return ("," === ch);
}
});
/**
* Checks whether a given character is numeric
*/
cljs.reader.numeric_QMARK_ = (function numeric_QMARK_(ch){
return goog.string.isNumeric(ch);
});
/**
* Checks whether the character begins a comment.
*/
cljs.reader.comment_prefix_QMARK_ = (function comment_prefix_QMARK_(ch){
return (";" === ch);
});
/**
* Checks whether the reader is at the start of a number literal
*/
cljs.reader.number_literal_QMARK_ = (function number_literal_QMARK_(reader,initch){
var or__3824__auto__ = cljs.reader.numeric_QMARK_.call(null,initch);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var and__3822__auto__ = (function (){var or__3824__auto____$1 = ("+" === initch);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{return ("-" === initch);
}
})();
if(cljs.core.truth_(and__3822__auto__))
{return cljs.reader.numeric_QMARK_.call(null,(function (){var next_ch = cljs.core.read_char.call(null,reader);
cljs.core.unread.call(null,reader,next_ch);
return next_ch;
})());
} else
{return and__3822__auto__;
}
}
});
/**
* @param {...*} var_args
*/
cljs.reader.reader_error = (function() { 
var reader_error__delegate = function (rdr,msg){
throw (new Error(cljs.core.apply.call(null,cljs.core.str,msg)));
};
var reader_error = function (rdr,var_args){
var msg = null;
if (goog.isDef(var_args)) {
  msg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return reader_error__delegate.call(this, rdr, msg);
};
reader_error.cljs$lang$maxFixedArity = 1;
reader_error.cljs$lang$applyTo = (function (arglist__3881){
var rdr = cljs.core.first(arglist__3881);
var msg = cljs.core.rest(arglist__3881);
return reader_error__delegate(rdr, msg);
});
reader_error.cljs$lang$arity$variadic = reader_error__delegate;
return reader_error;
})()
;
cljs.reader.macro_terminating_QMARK_ = (function macro_terminating_QMARK_(ch){
var and__3822__auto__ = !((ch === "#"));
if(and__3822__auto__)
{var and__3822__auto____$1 = !((ch === "'"));
if(and__3822__auto____$1)
{var and__3822__auto____$2 = !((ch === ":"));
if(and__3822__auto____$2)
{return cljs.reader.macros.call(null,ch);
} else
{return and__3822__auto____$2;
}
} else
{return and__3822__auto____$1;
}
} else
{return and__3822__auto__;
}
});
cljs.reader.read_token = (function read_token(rdr,initch){
var sb = (new goog.string.StringBuffer(initch));
var ch = cljs.core.read_char.call(null,rdr);
while(true){
if((function (){var or__3824__auto__ = (ch == null);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = cljs.reader.whitespace_QMARK_.call(null,ch);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{return cljs.reader.macro_terminating_QMARK_.call(null,ch);
}
}
})())
{cljs.core.unread.call(null,rdr,ch);
return sb.toString();
} else
{{
var G__3882 = (function (){sb.append(ch);
return sb;
})();
var G__3883 = cljs.core.read_char.call(null,rdr);
sb = G__3882;
ch = G__3883;
continue;
}
}
break;
}
});
/**
* Advances the reader to the end of a line. Returns the reader
*/
cljs.reader.skip_line = (function skip_line(reader,_){
while(true){
var ch = cljs.core.read_char.call(null,reader);
if((function (){var or__3824__auto__ = (ch === "\n");
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (ch === "\r");
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{return (ch == null);
}
}
})())
{return reader;
} else
{{
continue;
}
}
break;
}
});
cljs.reader.int_pattern = cljs.core.re_pattern.call(null,"([-+]?)(?:(0)|([1-9][0-9]*)|0[xX]([0-9A-Fa-f]+)|0([0-7]+)|([1-9][0-9]?)[rR]([0-9A-Za-z]+)|0[0-9]+)(N)?");
cljs.reader.ratio_pattern = cljs.core.re_pattern.call(null,"([-+]?[0-9]+)/([0-9]+)");
cljs.reader.float_pattern = cljs.core.re_pattern.call(null,"([-+]?[0-9]+(\\.[0-9]*)?([eE][-+]?[0-9]+)?)(M)?");
cljs.reader.symbol_pattern = cljs.core.re_pattern.call(null,"[:]?([^0-9/].*/)?([^0-9/][^/]*)");
cljs.reader.re_find_STAR_ = (function re_find_STAR_(re,s){
var matches = re.exec(s);
if((matches == null))
{return null;
} else
{if((matches.length === 1))
{return (matches[0]);
} else
{return matches;
}
}
});
cljs.reader.match_int = (function match_int(s){
var groups = cljs.reader.re_find_STAR_.call(null,cljs.reader.int_pattern,s);
var group3 = (groups[2]);
if(!((function (){var or__3824__auto__ = (group3 == null);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return (group3.length < 1);
}
})()))
{return 0;
} else
{var negate = ((("-" === (groups[1])))?-1:1);
var a = (cljs.core.truth_((groups[3]))?[(groups[3]),10]:(cljs.core.truth_((groups[4]))?[(groups[4]),16]:(cljs.core.truth_((groups[5]))?[(groups[5]),8]:(cljs.core.truth_((groups[7]))?[(groups[7]),parseInt((groups[7]))]:(("\uFDD0'default")?[null,null]:null)))));
var n = (a[0]);
var radix = (a[1]);
if((n == null))
{return null;
} else
{return (negate * parseInt(n,radix));
}
}
});
cljs.reader.match_ratio = (function match_ratio(s){
var groups = cljs.reader.re_find_STAR_.call(null,cljs.reader.ratio_pattern,s);
var numinator = (groups[1]);
var denominator = (groups[2]);
return (parseInt(numinator) / parseInt(denominator));
});
cljs.reader.match_float = (function match_float(s){
return parseFloat(s);
});
cljs.reader.re_matches_STAR_ = (function re_matches_STAR_(re,s){
var matches = re.exec(s);
if((function (){var and__3822__auto__ = !((matches == null));
if(and__3822__auto__)
{return ((matches[0]) === s);
} else
{return and__3822__auto__;
}
})())
{if((matches.length === 1))
{return (matches[0]);
} else
{return matches;
}
} else
{return null;
}
});
cljs.reader.match_number = (function match_number(s){
if(cljs.core.truth_(cljs.reader.re_matches_STAR_.call(null,cljs.reader.int_pattern,s)))
{return cljs.reader.match_int.call(null,s);
} else
{if(cljs.core.truth_(cljs.reader.re_matches_STAR_.call(null,cljs.reader.ratio_pattern,s)))
{return cljs.reader.match_ratio.call(null,s);
} else
{if(cljs.core.truth_(cljs.reader.re_matches_STAR_.call(null,cljs.reader.float_pattern,s)))
{return cljs.reader.match_float.call(null,s);
} else
{return null;
}
}
}
});
cljs.reader.escape_char_map = (function escape_char_map(c){
if((c === "t"))
{return "\t";
} else
{if((c === "r"))
{return "\r";
} else
{if((c === "n"))
{return "\n";
} else
{if((c === "\\"))
{return "\\";
} else
{if((c === "\""))
{return "\"";
} else
{if((c === "b"))
{return "\b";
} else
{if((c === "f"))
{return "\f";
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
}
}
}
});
cljs.reader.read_2_chars = (function read_2_chars(reader){
return (new goog.string.StringBuffer(cljs.core.read_char.call(null,reader),cljs.core.read_char.call(null,reader))).toString();
});
cljs.reader.read_4_chars = (function read_4_chars(reader){
return (new goog.string.StringBuffer(cljs.core.read_char.call(null,reader),cljs.core.read_char.call(null,reader),cljs.core.read_char.call(null,reader),cljs.core.read_char.call(null,reader))).toString();
});
cljs.reader.unicode_2_pattern = cljs.core.re_pattern.call(null,"[0-9A-Fa-f]{2}");
cljs.reader.unicode_4_pattern = cljs.core.re_pattern.call(null,"[0-9A-Fa-f]{4}");
cljs.reader.validate_unicode_escape = (function validate_unicode_escape(unicode_pattern,reader,escape_char,unicode_str){
if(cljs.core.truth_(cljs.core.re_matches.call(null,unicode_pattern,unicode_str)))
{return unicode_str;
} else
{return cljs.reader.reader_error.call(null,reader,"Unexpected unicode escape \\",escape_char,unicode_str);
}
});
cljs.reader.make_unicode_char = (function make_unicode_char(code_str){
var code = parseInt(code_str,16);
return String.fromCharCode(code);
});
cljs.reader.escape_char = (function escape_char(buffer,reader){
var ch = cljs.core.read_char.call(null,reader);
var mapresult = cljs.reader.escape_char_map.call(null,ch);
if(cljs.core.truth_(mapresult))
{return mapresult;
} else
{if((ch === "x"))
{return cljs.reader.make_unicode_char.call(null,cljs.reader.validate_unicode_escape.call(null,cljs.reader.unicode_2_pattern,reader,ch,cljs.reader.read_2_chars.call(null,reader)));
} else
{if((ch === "u"))
{return cljs.reader.make_unicode_char.call(null,cljs.reader.validate_unicode_escape.call(null,cljs.reader.unicode_4_pattern,reader,ch,cljs.reader.read_4_chars.call(null,reader)));
} else
{if(cljs.reader.numeric_QMARK_.call(null,ch))
{return String.fromCharCode(ch);
} else
{if("\uFDD0'else")
{return cljs.reader.reader_error.call(null,reader,"Unexpected unicode escape \\",ch);
} else
{return null;
}
}
}
}
}
});
/**
* Read until first character that doesn't match pred, returning
* char.
*/
cljs.reader.read_past = (function read_past(pred,rdr){
var ch = cljs.core.read_char.call(null,rdr);
while(true){
if(cljs.core.truth_(pred.call(null,ch)))
{{
var G__3884 = cljs.core.read_char.call(null,rdr);
ch = G__3884;
continue;
}
} else
{return ch;
}
break;
}
});
cljs.reader.read_delimited_list = (function read_delimited_list(delim,rdr,recursive_QMARK_){
var a = cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY);
while(true){
var ch = cljs.reader.read_past.call(null,cljs.reader.whitespace_QMARK_,rdr);
if(cljs.core.truth_(ch))
{} else
{cljs.reader.reader_error.call(null,rdr,"EOF while reading");
}
if((delim === ch))
{return cljs.core.persistent_BANG_.call(null,a);
} else
{var temp__3971__auto__ = cljs.reader.macros.call(null,ch);
if(cljs.core.truth_(temp__3971__auto__))
{var macrofn = temp__3971__auto__;
var mret = macrofn.call(null,rdr,ch);
{
var G__3885 = (((mret === rdr))?a:cljs.core.conj_BANG_.call(null,a,mret));
a = G__3885;
continue;
}
} else
{cljs.core.unread.call(null,rdr,ch);
var o = cljs.reader.read.call(null,rdr,true,null,recursive_QMARK_);
{
var G__3886 = (((o === rdr))?a:cljs.core.conj_BANG_.call(null,a,o));
a = G__3886;
continue;
}
}
}
break;
}
});
cljs.reader.not_implemented = (function not_implemented(rdr,ch){
return cljs.reader.reader_error.call(null,rdr,"Reader for ",ch," not implemented yet");
});
cljs.reader.read_dispatch = (function read_dispatch(rdr,_){
var ch = cljs.core.read_char.call(null,rdr);
var dm = cljs.reader.dispatch_macros.call(null,ch);
if(cljs.core.truth_(dm))
{return dm.call(null,rdr,_);
} else
{var temp__3971__auto__ = cljs.reader.maybe_read_tagged_type.call(null,rdr,ch);
if(cljs.core.truth_(temp__3971__auto__))
{var obj = temp__3971__auto__;
return obj;
} else
{return cljs.reader.reader_error.call(null,rdr,"No dispatch macro for ",ch);
}
}
});
cljs.reader.read_unmatched_delimiter = (function read_unmatched_delimiter(rdr,ch){
return cljs.reader.reader_error.call(null,rdr,"Unmatched delimiter ",ch);
});
cljs.reader.read_list = (function read_list(rdr,_){
return cljs.core.apply.call(null,cljs.core.list,cljs.reader.read_delimited_list.call(null,")",rdr,true));
});
cljs.reader.read_comment = cljs.reader.skip_line;
cljs.reader.read_vector = (function read_vector(rdr,_){
return cljs.reader.read_delimited_list.call(null,"]",rdr,true);
});
cljs.reader.read_map = (function read_map(rdr,_){
var l = cljs.reader.read_delimited_list.call(null,"}",rdr,true);
if(cljs.core.odd_QMARK_.call(null,cljs.core.count.call(null,l)))
{cljs.reader.reader_error.call(null,rdr,"Map literal must contain an even number of forms");
} else
{}
return cljs.core.apply.call(null,cljs.core.hash_map,l);
});
cljs.reader.read_number = (function read_number(reader,initch){
var buffer = (new goog.string.StringBuffer(initch));
var ch = cljs.core.read_char.call(null,reader);
while(true){
if(cljs.core.truth_((function (){var or__3824__auto__ = (ch == null);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = cljs.reader.whitespace_QMARK_.call(null,ch);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{return cljs.reader.macros.call(null,ch);
}
}
})()))
{cljs.core.unread.call(null,reader,ch);
var s = buffer.toString();
var or__3824__auto__ = cljs.reader.match_number.call(null,s);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.reader.reader_error.call(null,reader,"Invalid number format [",s,"]");
}
} else
{{
var G__3887 = (function (){buffer.append(ch);
return buffer;
})();
var G__3888 = cljs.core.read_char.call(null,reader);
buffer = G__3887;
ch = G__3888;
continue;
}
}
break;
}
});
cljs.reader.read_string_STAR_ = (function read_string_STAR_(reader,_){
var buffer = (new goog.string.StringBuffer());
var ch = cljs.core.read_char.call(null,reader);
while(true){
if((ch == null))
{return cljs.reader.reader_error.call(null,reader,"EOF while reading");
} else
{if(("\\" === ch))
{{
var G__3889 = (function (){buffer.append(cljs.reader.escape_char.call(null,buffer,reader));
return buffer;
})();
var G__3890 = cljs.core.read_char.call(null,reader);
buffer = G__3889;
ch = G__3890;
continue;
}
} else
{if(("\"" === ch))
{return buffer.toString();
} else
{if("\uFDD0'default")
{{
var G__3891 = (function (){buffer.append(ch);
return buffer;
})();
var G__3892 = cljs.core.read_char.call(null,reader);
buffer = G__3891;
ch = G__3892;
continue;
}
} else
{return null;
}
}
}
}
break;
}
});
cljs.reader.special_symbols = (function special_symbols(t,not_found){
if((t === "nil"))
{return null;
} else
{if((t === "true"))
{return true;
} else
{if((t === "false"))
{return false;
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
}
});
cljs.reader.read_symbol = (function read_symbol(reader,initch){
var token = cljs.reader.read_token.call(null,reader,initch);
if(cljs.core.truth_(goog.string.contains(token,"/")))
{return cljs.core.symbol.call(null,cljs.core.subs.call(null,token,0,token.indexOf("/")),cljs.core.subs.call(null,token,(token.indexOf("/") + 1),token.length));
} else
{return cljs.reader.special_symbols.call(null,token,cljs.core.symbol.call(null,token));
}
});
cljs.reader.read_keyword = (function read_keyword(reader,initch){
var token = cljs.reader.read_token.call(null,reader,cljs.core.read_char.call(null,reader));
var a = cljs.reader.re_matches_STAR_.call(null,cljs.reader.symbol_pattern,token);
var token__$1 = (a[0]);
var ns = (a[1]);
var name = (a[2]);
if(cljs.core.truth_((function (){var or__3824__auto__ = (function (){var and__3822__auto__ = !((void 0 === ns));
if(and__3822__auto__)
{return (ns.substring((ns.length - 2),ns.length) === ":/");
} else
{return and__3822__auto__;
}
})();
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = ((name[(name.length - 1)]) === ":");
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{return !((token__$1.indexOf("::",1) === -1));
}
}
})()))
{return cljs.reader.reader_error.call(null,reader,"Invalid token: ",token__$1);
} else
{if((function (){var and__3822__auto__ = !((ns == null));
if(and__3822__auto__)
{return (ns.length > 0);
} else
{return and__3822__auto__;
}
})())
{return cljs.core.keyword.call(null,ns.substring(0,ns.indexOf("/")),name);
} else
{return cljs.core.keyword.call(null,token__$1);
}
}
});
cljs.reader.desugar_meta = (function desugar_meta(f){
if(cljs.core.symbol_QMARK_.call(null,f))
{return cljs.core.ObjMap.fromObject(["\uFDD0'tag"],{"\uFDD0'tag":f});
} else
{if(cljs.core.string_QMARK_.call(null,f))
{return cljs.core.ObjMap.fromObject(["\uFDD0'tag"],{"\uFDD0'tag":f});
} else
{if(cljs.core.keyword_QMARK_.call(null,f))
{return cljs.core.PersistentArrayMap.fromArrays([f],[true]);
} else
{if("\uFDD0'else")
{return f;
} else
{return null;
}
}
}
}
});
cljs.reader.wrapping_reader = (function wrapping_reader(sym){
return (function (rdr,_){
return cljs.core.list.call(null,sym,cljs.reader.read.call(null,rdr,true,null,true));
});
});
cljs.reader.throwing_reader = (function throwing_reader(msg){
return (function (rdr,_){
return cljs.reader.reader_error.call(null,rdr,msg);
});
});
cljs.reader.read_meta = (function read_meta(rdr,_){
var m = cljs.reader.desugar_meta.call(null,cljs.reader.read.call(null,rdr,true,null,true));
if(cljs.core.map_QMARK_.call(null,m))
{} else
{cljs.reader.reader_error.call(null,rdr,"Metadata must be Symbol,Keyword,String or Map");
}
var o = cljs.reader.read.call(null,rdr,true,null,true);
if((function (){var G__3894 = o;
if(G__3894)
{if((function (){var or__3824__auto__ = (G__3894.cljs$lang$protocol_mask$partition0$ & 262144);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__3894.cljs$core$IWithMeta$;
}
})())
{return true;
} else
{if((!G__3894.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IWithMeta,G__3894);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IWithMeta,G__3894);
}
})())
{return cljs.core.with_meta.call(null,o,cljs.core.merge.call(null,cljs.core.meta.call(null,o),m));
} else
{return cljs.reader.reader_error.call(null,rdr,"Metadata can only be applied to IWithMetas");
}
});
cljs.reader.UNQUOTE = "\uFDD0'__thisInternalKeywordRepresentsUnquoteToTheReader__";
cljs.reader.UNQUOTE_SPLICING = "\uFDD0'__thisInternalKeywordRepresentsUnquoteSplicingToTheReader__";
cljs.reader._STAR_gensym_env_STAR_ = cljs.core.atom.call(null,null);
cljs.reader._STAR_arg_env_STAR_ = cljs.core.atom.call(null,null);
cljs.reader.isUnquote_QMARK_ = (function isUnquote_QMARK_(form){
var and__3822__auto__ = (function (){var G__3896 = form;
if(G__3896)
{if((function (){var or__3824__auto__ = (G__3896.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__3896.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__3896.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__3896);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__3896);
}
})();
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,cljs.core.first.call(null,form),cljs.reader.UNQUOTE);
} else
{return and__3822__auto__;
}
});
cljs.reader.isUnquoteSplicing_QMARK_ = (function isUnquoteSplicing_QMARK_(form){
var and__3822__auto__ = (function (){var G__3898 = form;
if(G__3898)
{if((function (){var or__3824__auto__ = (G__3898.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__3898.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__3898.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__3898);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__3898);
}
})();
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,cljs.core.first.call(null,form),cljs.reader.UNQUOTE_SPLICING);
} else
{return and__3822__auto__;
}
});
cljs.reader.sqExpandList = (function sqExpandList(sq){
return cljs.core.doall.call(null,(function (){var iter__2101__auto__ = (function iter__3901(s__3902){
return (new cljs.core.LazySeq(null,false,(function (){
var s__3902__$1 = s__3902;
while(true){
if(cljs.core.seq.call(null,s__3902__$1))
{var item = cljs.core.first.call(null,s__3902__$1);
return cljs.core.cons.call(null,(cljs.core.truth_(cljs.reader.isUnquote_QMARK_.call(null,item))?cljs.core.list.call(null,"\uFDD1'list",cljs.core.second.call(null,item)):(cljs.core.truth_(cljs.reader.isUnquoteSplicing_QMARK_.call(null,item))?cljs.core.second.call(null,item):(("\uFDD0'else")?cljs.core.list.call(null,"\uFDD1'list",cljs.reader.syntaxQuote.call(null,item)):null))),iter__3901.call(null,cljs.core.rest.call(null,s__3902__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2101__auto__.call(null,sq);
})());
});
cljs.reader.syntaxQuote = (function syntaxQuote(form){
if(cljs.core.truth_(cljs.core._lookup.call(null,cljs.analyzer.specials,form,null)))
{return cljs.core.list.call(null,"\uFDD1'quote",form);
} else
{if(cljs.core.symbol_QMARK_.call(null,form))
{var sym = form;
var name = cljs.core.name.call(null,sym);
var ns = cljs.core.namespace.call(null,sym);
var var$ = cljs.analyzer.resolve_existing_var.call(null,cljs.analyzer.empty_env.call(null),sym);
if((function (){var and__3822__auto__ = cljs.core.not.call(null,ns);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,"#",cljs.core.last.call(null,name));
} else
{return and__3822__auto__;
}
})())
{var new_name = cljs.core.subs.call(null,name,0,(cljs.core.count.call(null,name) - 1));
var gmap = cljs.core.deref.call(null,cljs.reader._STAR_gensym_env_STAR_);
if(cljs.core.not.call(null,gmap))
{cljs.reader.reader_error.call(null,null,"Gensym literal not in syntax-quote");
} else
{}
var gs = (function (){var or__3824__auto__ = cljs.core._lookup.call(null,gmap,sym,null);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.core.gensym.call(null,[cljs.core.str(new_name),cljs.core.str("__auto__")].join(''));
}
})();
cljs.core.swap_BANG_.call(null,cljs.reader._STAR_gensym_env_STAR_,cljs.core.assoc,sym,gs);
return cljs.core.list.call(null,"\uFDD1'quote",gs);
} else
{if((function (){var and__3822__auto__ = cljs.core.not.call(null,ns);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,".",cljs.core.last.call(null,name));
} else
{return and__3822__auto__;
}
})())
{var new_name = cljs.core.subs.call(null,name,0,(cljs.core.count.call(null,name) - 1));
var new_var = cljs.analyzer.resolve_existing_var.call(null,cljs.analyzer.empty_env.call(null),cljs.core.symbol.call(null,new_name));
return cljs.core.list.call(null,"\uFDD1'quote",(new cljs.core.Keyword("\uFDD0'name")).call(null,new_var));
} else
{if((function (){var and__3822__auto__ = cljs.core.not.call(null,ns);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,".",cljs.core.first.call(null,name));
} else
{return and__3822__auto__;
}
})())
{return cljs.core.list.call(null,"\uFDD1'quote",sym);
} else
{if("\uFDD0'else")
{return cljs.core.list.call(null,"\uFDD1'quote",(new cljs.core.Keyword("\uFDD0'name")).call(null,cljs.analyzer.resolve_existing_var.call(null,cljs.analyzer.empty_env.call(null),sym)));
} else
{return null;
}
}
}
}
} else
{if(cljs.core.truth_(cljs.reader.isUnquote_QMARK_.call(null,form)))
{return cljs.core.second.call(null,form);
} else
{if(cljs.core.truth_(cljs.reader.isUnquoteSplicing_QMARK_.call(null,form)))
{return cljs.reader.reader_error.call(null,cljs.reader.rdr,"Reader ~@ splice not in list");
} else
{if((form == null))
{return cljs.core.list.call(null,"\uFDD1'quote",form);
} else
{if((function (){var G__3910 = form;
if(G__3910)
{if((function (){var or__3824__auto__ = (G__3910.cljs$lang$protocol_mask$partition0$ & 8);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__3910.cljs$core$ICollection$;
}
})())
{return true;
} else
{if((!G__3910.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,G__3910);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,G__3910);
}
})())
{if((function (){var G__3911 = form;
if(G__3911)
{if((function (){var or__3824__auto__ = (G__3911.cljs$lang$protocol_mask$partition0$ & 67108864);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__3911.cljs$core$IRecord$;
}
})())
{return true;
} else
{if((!G__3911.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IRecord,G__3911);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IRecord,G__3911);
}
})())
{return form;
} else
{if((function (){var G__3912 = form;
if(G__3912)
{if((function (){var or__3824__auto__ = (G__3912.cljs$lang$protocol_mask$partition0$ & 1024);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__3912.cljs$core$IMap$;
}
})())
{return true;
} else
{if((!G__3912.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,G__3912);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,G__3912);
}
})())
{return cljs.core.list.call(null,"\uFDD1'apply","\uFDD1'hash-map",cljs.core.list.call(null,"\uFDD1'seq",cljs.core.cons.call(null,"\uFDD1'concat",cljs.reader.sqExpandList.call(null,cljs.core.apply.call(null,cljs.core.concat,cljs.core.seq.call(null,form))))));
} else
{if((function (){var G__3913 = form;
if(G__3913)
{if((function (){var or__3824__auto__ = (G__3913.cljs$lang$protocol_mask$partition0$ & 16384);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__3913.cljs$core$IVector$;
}
})())
{return true;
} else
{if((!G__3913.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,G__3913);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,G__3913);
}
})())
{return cljs.core.list.call(null,"\uFDD1'apply","\uFDD1'vector",cljs.core.list.call(null,"\uFDD1'seq",cljs.core.cons.call(null,"\uFDD1'concat",cljs.reader.sqExpandList.call(null,form))));
} else
{if((function (){var G__3914 = form;
if(G__3914)
{if((function (){var or__3824__auto__ = (G__3914.cljs$lang$protocol_mask$partition0$ & 4096);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__3914.cljs$core$ISet$;
}
})())
{return true;
} else
{if((!G__3914.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,G__3914);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,G__3914);
}
})())
{return cljs.core.list.call(null,"\uFDD1'apply","\uFDD1'hash-set",cljs.core.list.call(null,"\uFDD1'seq",cljs.core.cons.call(null,"\uFDD1'concat",cljs.reader.sqExpandList.call(null,cljs.core.seq.call(null,form)))));
} else
{if(cljs.core.truth_((function (){var or__3824__auto__ = (function (){var G__3915 = form;
if(G__3915)
{if((function (){var or__3824__auto__ = (G__3915.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__3915.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__3915.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__3915);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__3915);
}
})();
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{var G__3916 = form;
if(G__3916)
{if((function (){var or__3824__auto____$1 = (G__3916.cljs$lang$protocol_mask$partition0$ & 33554432);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{return G__3916.cljs$core$IList$;
}
})())
{return true;
} else
{if((!G__3916.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IList,G__3916);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IList,G__3916);
}
}
})()))
{var temp__3971__auto__ = cljs.core.seq.call(null,form);
if(temp__3971__auto__)
{var sq = temp__3971__auto__;
return cljs.core.list.call(null,"\uFDD1'seq",cljs.core.cons.call(null,"\uFDD1'concat",cljs.reader.sqExpandList.call(null,sq)));
} else
{return cljs.core.cons.call(null,"\uFDD1'list",null);
}
} else
{if("\uFDD0'else")
{return cljs.reader.reader_error.call(null,cljs.reader.rdr,"Unknown Collection type");
} else
{return null;
}
}
}
}
}
}
} else
{if((function (){var or__3824__auto__ = cljs.core.keyword_QMARK_.call(null,form);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = cljs.core.number_QMARK_.call(null,form);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{return cljs.core.string_QMARK_.call(null,form);
}
}
})())
{return form;
} else
{if("\uFDD0'else")
{return cljs.core.list.call(null,"\uFDD1'quote",form);
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
cljs.reader.read_syntax_quote = (function read_syntax_quote(rdr,_){
var _STAR_gensym_env_STAR_3919 = cljs.reader._STAR_gensym_env_STAR_;
try{cljs.reader._STAR_gensym_env_STAR_ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var form = cljs.reader.read.call(null,rdr,true,null,true);
return cljs.reader.syntaxQuote.call(null,form);
}finally {cljs.reader._STAR_gensym_env_STAR_ = _STAR_gensym_env_STAR_3919;
}});
cljs.reader.read_unquote = (function read_unquote(rdr,_){
var ch = cljs.core.read_char.call(null,rdr);
if(cljs.core._EQ_.call(null,null,ch))
{return cljs.reader.reader_error.call(null,rdr,"EOF while reading character");
} else
{if(cljs.core._EQ_.call(null,"@",ch))
{var o = cljs.reader.read.call(null,rdr,true,null,true);
return cljs.core.list.call(null,cljs.reader.UNQUOTE_SPLICING,o);
} else
{if("\uFDD0'else")
{cljs.core.unread.call(null,rdr,ch);
var o = cljs.reader.read.call(null,rdr,true,null,true);
return cljs.core.list.call(null,cljs.reader.UNQUOTE,o);
} else
{return null;
}
}
}
});
cljs.reader.garg = (function garg(n){
var pre = ((cljs.core._EQ_.call(null,n,-1))?"rest":[cljs.core.str("p"),cljs.core.str(n)].join(''));
return cljs.core.symbol.call(null,[cljs.core.str(cljs.core.gensym.call(null,pre)),cljs.core.str("#")].join(''));
});
cljs.reader.read_fn = (function read_fn(rdr,_){
if(cljs.core.truth_(cljs.core.deref.call(null,cljs.reader._STAR_arg_env_STAR_)))
{cljs.reader.reader_error.call(null,null,"nested #()s are not allowed");
} else
{}
var _STAR_arg_env_STAR_3925 = cljs.reader._STAR_arg_env_STAR_;
try{cljs.reader._STAR_arg_env_STAR_ = cljs.core.atom.call(null,cljs.core.sorted_map.call(null));
cljs.core.unread.call(null,rdr,"(");
var form = cljs.reader.read.call(null,rdr,true,null,true);
var argsyms = cljs.core.deref.call(null,cljs.reader._STAR_arg_env_STAR_);
var rargs = cljs.core.rseq.call(null,argsyms);
var highpair = cljs.core.first.call(null,rargs);
var higharg = (cljs.core.truth_(highpair)?cljs.core.key.call(null,highpair):0);
var args = (((higharg > 0))?cljs.core.doall.call(null,(function (){var iter__2101__auto__ = (function iter__3927(s__3928){
return (new cljs.core.LazySeq(null,false,(function (){
var s__3928__$1 = s__3928;
while(true){
if(cljs.core.seq.call(null,s__3928__$1))
{var i = cljs.core.first.call(null,s__3928__$1);
return cljs.core.cons.call(null,(function (){var or__3824__auto__ = cljs.core._lookup.call(null,argsyms,i,null);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.reader.garg.call(null,i);
}
})(),iter__3927.call(null,cljs.core.rest.call(null,s__3928__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2101__auto__.call(null,cljs.core.range.call(null,1,(1 + higharg)));
})()):cljs.reader.args);
var restsym = cljs.core._lookup.call(null,argsyms,-1,null);
var args__$1 = (cljs.core.truth_(restsym)?cljs.core.concat.call(null,args,cljs.core.PersistentVector.fromArray(["\uFDD1'&",restsym], true)):args);
return cljs.core.list.call(null,"\uFDD1'fn*",cljs.core.vec.call(null,args__$1),form);
}finally {cljs.reader._STAR_arg_env_STAR_ = _STAR_arg_env_STAR_3925;
}});
cljs.reader.registerArg = (function registerArg(n){
var argsyms = cljs.core.deref.call(null,cljs.reader._STAR_arg_env_STAR_);
if(cljs.core.truth_(argsyms))
{} else
{cljs.reader.reader_error.call(null,cljs.reader._,"arg literal not in #()");
}
var ret = cljs.core._lookup.call(null,argsyms,n,null);
if(cljs.core.truth_(ret))
{return ret;
} else
{var ret__$1 = cljs.reader.garg.call(null,n);
cljs.core.swap_BANG_.call(null,cljs.reader._STAR_arg_env_STAR_,cljs.core.assoc,n,ret__$1);
return ret__$1;
}
});
cljs.reader.read_arg = (function read_arg(rdr,pct){
if(cljs.core.not.call(null,cljs.core.deref.call(null,cljs.reader._STAR_arg_env_STAR_)))
{return cljs.reader.read_symbol.call(null,rdr,"%");
} else
{var ch = cljs.core.read_char.call(null,rdr);
cljs.core.unread.call(null,rdr,ch);
if((function (){var or__3824__auto__ = (ch == null);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = cljs.reader.whitespace_QMARK_.call(null,ch);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{return cljs.reader.macro_terminating_QMARK_.call(null,ch);
}
}
})())
{return cljs.reader.registerArg.call(null,1);
} else
{var n = cljs.reader.read.call(null,rdr,true,null,true);
if(cljs.core._EQ_.call(null,"\uFDD1'&",n))
{return cljs.reader.registerArg.call(null,-1);
} else
{if(!(cljs.core.number_QMARK_.call(null,n)))
{throw (new Error("arg literal must be %, %& or %integer"));
} else
{if("\uFDD0'else")
{return cljs.reader.registerArg.call(null,cljs.core.int$.call(null,n));
} else
{return null;
}
}
}
}
}
});
cljs.reader.read_set = (function read_set(rdr,_){
return cljs.core.set.call(null,cljs.reader.read_delimited_list.call(null,"}",rdr,true));
});
cljs.reader.read_regex = (function read_regex(rdr,ch){
return cljs.core.re_pattern.call(null,cljs.reader.read_string_STAR_.call(null,rdr,ch));
});
cljs.reader.read_discard = (function read_discard(rdr,_){
cljs.reader.read.call(null,rdr,true,null,true);
return rdr;
});
cljs.reader.macros = (function macros(c){
if((c === "\""))
{return cljs.reader.read_string_STAR_;
} else
{if((c === ":"))
{return cljs.reader.read_keyword;
} else
{if((c === ";"))
{return cljs.reader.read_comment;
} else
{if((c === "'"))
{return cljs.reader.wrapping_reader.call(null,"\uFDD1'quote");
} else
{if((c === "@"))
{return cljs.reader.wrapping_reader.call(null,"\uFDD1'deref");
} else
{if((c === "^"))
{return cljs.reader.read_meta;
} else
{if((c === "`"))
{return cljs.reader.read_syntax_quote;
} else
{if((c === "~"))
{return cljs.reader.read_unquote;
} else
{if((c === "("))
{return cljs.reader.read_list;
} else
{if((c === ")"))
{return cljs.reader.read_unmatched_delimiter;
} else
{if((c === "["))
{return cljs.reader.read_vector;
} else
{if((c === "]"))
{return cljs.reader.read_unmatched_delimiter;
} else
{if((c === "{"))
{return cljs.reader.read_map;
} else
{if((c === "}"))
{return cljs.reader.read_unmatched_delimiter;
} else
{if((c === "\\"))
{return cljs.core.read_char;
} else
{if((c === "%"))
{return cljs.reader.read_arg;
} else
{if((c === "#"))
{return cljs.reader.read_dispatch;
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
}
}
}
}
}
}
}
}
}
}
}
}
}
});
cljs.reader.dispatch_macros = (function dispatch_macros(s){
if((s === "{"))
{return cljs.reader.read_set;
} else
{if((s === "("))
{return cljs.reader.read_fn;
} else
{if((s === "<"))
{return cljs.reader.throwing_reader.call(null,"Unreadable form");
} else
{if((s === "\""))
{return cljs.reader.read_regex;
} else
{if((s === "!"))
{return cljs.reader.read_comment;
} else
{if((s === "_"))
{return cljs.reader.read_discard;
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
}
}
});
/**
* Reads the first object from a PushbackReader. Returns the object read.
* If EOF, throws if eof-is-error is true. Otherwise returns sentinel.
*/
cljs.reader.read = (function read(reader,eof_is_error,sentinel,is_recursive){
while(true){
var ch = cljs.core.read_char.call(null,reader);
if((ch == null))
{if(cljs.core.truth_(eof_is_error))
{return cljs.reader.reader_error.call(null,reader,"EOF while reading");
} else
{return sentinel;
}
} else
{if(cljs.reader.whitespace_QMARK_.call(null,ch))
{{
var G__3929 = reader;
var G__3930 = eof_is_error;
var G__3931 = sentinel;
var G__3932 = is_recursive;
reader = G__3929;
eof_is_error = G__3930;
sentinel = G__3931;
is_recursive = G__3932;
continue;
}
} else
{if(cljs.reader.comment_prefix_QMARK_.call(null,ch))
{{
var G__3933 = cljs.reader.read_comment.call(null,reader,ch);
var G__3934 = eof_is_error;
var G__3935 = sentinel;
var G__3936 = is_recursive;
reader = G__3933;
eof_is_error = G__3934;
sentinel = G__3935;
is_recursive = G__3936;
continue;
}
} else
{if("\uFDD0'else")
{var f = cljs.reader.macros.call(null,ch);
var res = (cljs.core.truth_(f)?f.call(null,reader,ch):((cljs.reader.number_literal_QMARK_.call(null,reader,ch))?cljs.reader.read_number.call(null,reader,ch):(("\uFDD0'else")?cljs.reader.read_symbol.call(null,reader,ch):null)));
if((res === reader))
{{
var G__3937 = reader;
var G__3938 = eof_is_error;
var G__3939 = sentinel;
var G__3940 = is_recursive;
reader = G__3937;
eof_is_error = G__3938;
sentinel = G__3939;
is_recursive = G__3940;
continue;
}
} else
{return res;
}
} else
{return null;
}
}
}
}
break;
}
});
/**
* Reads one object from the string s
*/
cljs.reader.read_string = (function read_string(s){
var r = cljs.core.push_back_reader.call(null,s);
return cljs.reader.read.call(null,r,true,null,false);
});
cljs.reader.zero_fill_right = (function zero_fill_right(s,width){
if(cljs.core._EQ_.call(null,width,cljs.core.count.call(null,s)))
{return s;
} else
{if((width < cljs.core.count.call(null,s)))
{return s.substring(0,width);
} else
{if("\uFDD0'else")
{var b = (new goog.string.StringBuffer(s));
while(true){
if((b.getLength() < width))
{{
var G__3941 = b.append("0");
b = G__3941;
continue;
}
} else
{return b.toString();
}
break;
}
} else
{return null;
}
}
}
});
cljs.reader.divisible_QMARK_ = (function divisible_QMARK_(num,div){
return ((num % div) === 0);
});
cljs.reader.indivisible_QMARK_ = (function indivisible_QMARK_(num,div){
return cljs.core.not.call(null,cljs.reader.divisible_QMARK_.call(null,num,div));
});
cljs.reader.leap_year_QMARK_ = (function leap_year_QMARK_(year){
var and__3822__auto__ = cljs.reader.divisible_QMARK_.call(null,year,4);
if(cljs.core.truth_(and__3822__auto__))
{var or__3824__auto__ = cljs.reader.indivisible_QMARK_.call(null,year,100);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.reader.divisible_QMARK_.call(null,year,400);
}
} else
{return and__3822__auto__;
}
});
cljs.reader.days_in_month = (function (){var dim_norm = cljs.core.PersistentVector.fromArray([null,31,28,31,30,31,30,31,31,30,31,30,31], true);
var dim_leap = cljs.core.PersistentVector.fromArray([null,31,29,31,30,31,30,31,31,30,31,30,31], true);
return (function (month,leap_year_QMARK_){
return cljs.core._lookup.call(null,(cljs.core.truth_(leap_year_QMARK_)?dim_leap:dim_norm),month,null);
});
})();
cljs.reader.parse_and_validate_timestamp = (function (){var timestamp = /(\d\d\d\d)(?:-(\d\d)(?:-(\d\d)(?:[T](\d\d)(?::(\d\d)(?::(\d\d)(?:[.](\d+))?)?)?)?)?)?(?:[Z]|([-+])(\d\d):(\d\d))?/;
var check = (function (low,n,high,msg){
if((function (){var and__3822__auto__ = (low <= n);
if(and__3822__auto__)
{return (n <= high);
} else
{return and__3822__auto__;
}
})())
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str(msg),cljs.core.str(" Failed:  "),cljs.core.str(low),cljs.core.str("<="),cljs.core.str(n),cljs.core.str("<="),cljs.core.str(high)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'<=","\uFDD1'low","\uFDD1'n","\uFDD1'high"),cljs.core.hash_map("\uFDD0'line",647))))].join('')));
}
return n;
});
return (function (ts){
var temp__3974__auto__ = cljs.core.map.call(null,cljs.core.vec,cljs.core.split_at.call(null,8,cljs.core.re_matches.call(null,timestamp,ts)));
if(cljs.core.truth_(temp__3974__auto__))
{var vec__3946 = temp__3974__auto__;
var vec__3947 = cljs.core.nth.call(null,vec__3946,0,null);
var _ = cljs.core.nth.call(null,vec__3947,0,null);
var years = cljs.core.nth.call(null,vec__3947,1,null);
var months = cljs.core.nth.call(null,vec__3947,2,null);
var days = cljs.core.nth.call(null,vec__3947,3,null);
var hours = cljs.core.nth.call(null,vec__3947,4,null);
var minutes = cljs.core.nth.call(null,vec__3947,5,null);
var seconds = cljs.core.nth.call(null,vec__3947,6,null);
var milliseconds = cljs.core.nth.call(null,vec__3947,7,null);
var vec__3948 = cljs.core.nth.call(null,vec__3946,1,null);
var ___$1 = cljs.core.nth.call(null,vec__3948,0,null);
var ___$2 = cljs.core.nth.call(null,vec__3948,1,null);
var ___$3 = cljs.core.nth.call(null,vec__3948,2,null);
var V = vec__3946;
var vec__3949 = cljs.core.map.call(null,(function (v){
return cljs.core.map.call(null,(function (p1__3945_SHARP_){
return parseInt(p1__3945_SHARP_,10);
}),v);
}),cljs.core.map.call(null,(function (p1__3943_SHARP_,p2__3942_SHARP_){
return cljs.core.update_in.call(null,p2__3942_SHARP_,cljs.core.PersistentVector.fromArray([0], true),p1__3943_SHARP_);
}),cljs.core.PersistentVector.fromArray([cljs.core.constantly.call(null,null),(function (p1__3944_SHARP_){
if(cljs.core._EQ_.call(null,p1__3944_SHARP_,"-"))
{return "-1";
} else
{return "1";
}
})], true),V));
var vec__3950 = cljs.core.nth.call(null,vec__3949,0,null);
var ___$4 = cljs.core.nth.call(null,vec__3950,0,null);
var y = cljs.core.nth.call(null,vec__3950,1,null);
var mo = cljs.core.nth.call(null,vec__3950,2,null);
var d = cljs.core.nth.call(null,vec__3950,3,null);
var h = cljs.core.nth.call(null,vec__3950,4,null);
var m = cljs.core.nth.call(null,vec__3950,5,null);
var s = cljs.core.nth.call(null,vec__3950,6,null);
var ms = cljs.core.nth.call(null,vec__3950,7,null);
var vec__3951 = cljs.core.nth.call(null,vec__3949,1,null);
var offset_sign = cljs.core.nth.call(null,vec__3951,0,null);
var offset_hours = cljs.core.nth.call(null,vec__3951,1,null);
var offset_minutes = cljs.core.nth.call(null,vec__3951,2,null);
var offset = (offset_sign * ((offset_hours * 60) + offset_minutes));
return cljs.core.PersistentVector.fromArray([((cljs.core.not.call(null,years))?1970:y),((cljs.core.not.call(null,months))?1:check.call(null,1,mo,12,"timestamp month field must be in range 1..12")),((cljs.core.not.call(null,days))?1:check.call(null,1,d,cljs.reader.days_in_month.call(null,mo,cljs.reader.leap_year_QMARK_.call(null,y)),"timestamp day field must be in range 1..last day in month")),((cljs.core.not.call(null,hours))?0:check.call(null,0,h,23,"timestamp hour field must be in range 0..23")),((cljs.core.not.call(null,minutes))?0:check.call(null,0,m,59,"timestamp minute field must be in range 0..59")),((cljs.core.not.call(null,seconds))?0:check.call(null,0,s,((cljs.core._EQ_.call(null,m,59))?60:59),"timestamp second field must be in range 0..60")),((cljs.core.not.call(null,milliseconds))?0:check.call(null,0,ms,999,"timestamp millisecond field must be in range 0..999")),offset], true);
} else
{return null;
}
});
})();
cljs.reader.parse_timestamp = (function parse_timestamp(ts){
var temp__3971__auto__ = cljs.reader.parse_and_validate_timestamp.call(null,ts);
if(cljs.core.truth_(temp__3971__auto__))
{var vec__3953 = temp__3971__auto__;
var years = cljs.core.nth.call(null,vec__3953,0,null);
var months = cljs.core.nth.call(null,vec__3953,1,null);
var days = cljs.core.nth.call(null,vec__3953,2,null);
var hours = cljs.core.nth.call(null,vec__3953,3,null);
var minutes = cljs.core.nth.call(null,vec__3953,4,null);
var seconds = cljs.core.nth.call(null,vec__3953,5,null);
var ms = cljs.core.nth.call(null,vec__3953,6,null);
var offset = cljs.core.nth.call(null,vec__3953,7,null);
return (new Date((Date.UTC(years,(months - 1),days,hours,minutes,seconds,ms) - ((offset * 60) * 1000))));
} else
{return cljs.reader.reader_error.call(null,null,[cljs.core.str("Unrecognized date/time syntax: "),cljs.core.str(ts)].join(''));
}
});
cljs.reader.read_date = (function read_date(s){
if(cljs.core.string_QMARK_.call(null,s))
{return cljs.reader.parse_timestamp.call(null,s);
} else
{return cljs.reader.reader_error.call(null,null,"Instance literal expects a string for its timestamp.");
}
});
cljs.reader.read_queue = (function read_queue(elems){
if(cljs.core.vector_QMARK_.call(null,elems))
{return cljs.core.into.call(null,cljs.core.PersistentQueue.EMPTY,elems);
} else
{return cljs.reader.reader_error.call(null,null,"Queue literal expects a vector for its elements.");
}
});
cljs.reader.read_uuid = (function read_uuid(uuid){
if(cljs.core.string_QMARK_.call(null,uuid))
{return (new cljs.core.UUID(uuid));
} else
{return cljs.reader.reader_error.call(null,null,"UUID literal expects a string as its representation.");
}
});
cljs.reader._STAR_tag_table_STAR_ = cljs.core.atom.call(null,cljs.core.ObjMap.fromObject(["inst","uuid","queue"],{"inst":cljs.reader.read_date,"uuid":cljs.reader.read_uuid,"queue":cljs.reader.read_queue}));
cljs.reader.maybe_read_tagged_type = (function maybe_read_tagged_type(rdr,initch){
var tag = cljs.reader.read_symbol.call(null,rdr,initch);
var temp__3971__auto__ = cljs.core._lookup.call(null,cljs.core.deref.call(null,cljs.reader._STAR_tag_table_STAR_),cljs.core.name.call(null,tag),null);
if(cljs.core.truth_(temp__3971__auto__))
{var pfn = temp__3971__auto__;
return pfn.call(null,cljs.reader.read.call(null,rdr,true,null,false));
} else
{return cljs.reader.reader_error.call(null,rdr,"Could not find tag parser for ",cljs.core.name.call(null,tag)," in ",cljs.core.pr_str.call(null,cljs.core.keys.call(null,cljs.core.deref.call(null,cljs.reader._STAR_tag_table_STAR_))));
}
});
cljs.reader.register_tag_parser_BANG_ = (function register_tag_parser_BANG_(tag,f){
var tag__$1 = cljs.core.name.call(null,tag);
var old_parser = cljs.core._lookup.call(null,cljs.core.deref.call(null,cljs.reader._STAR_tag_table_STAR_),tag__$1,null);
cljs.core.swap_BANG_.call(null,cljs.reader._STAR_tag_table_STAR_,cljs.core.assoc,tag__$1,f);
return old_parser;
});
cljs.reader.deregister_tag_parser_BANG_ = (function deregister_tag_parser_BANG_(tag){
var tag__$1 = cljs.core.name.call(null,tag);
var old_parser = cljs.core._lookup.call(null,cljs.core.deref.call(null,cljs.reader._STAR_tag_table_STAR_),tag__$1,null);
cljs.core.swap_BANG_.call(null,cljs.reader._STAR_tag_table_STAR_,cljs.core.dissoc,tag__$1);
return old_parser;
});

// Analyzer namespace snapshot:
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.assoc,"\uFDD1'cljs.reader",cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map("\uFDD1'read-2-chars",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'reader"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'reader","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-2-chars","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",154,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-unquote",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'_"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'_","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-unquote","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",467,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-4-chars",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'reader"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'reader","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-4-chars","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",160,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'indivisible?",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'num","\uFDD1'div"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'num","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'div","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/indivisible?","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",628,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1're-find*",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1're","\uFDD1's"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1're","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/re-find*","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",83,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'throwing-reader",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'msg"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'msg","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/throwing-reader","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",335,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'ratio-pattern",cljs.core.hash_map("\uFDD0'line",79,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name","\uFDD1'cljs.reader/ratio-pattern"),"\uFDD1'number-literal?",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'reader","\uFDD1'initch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'reader","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'initch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/number-literal?","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Checks whether the reader is at the start of a number literal","\uFDD0'line",32,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'tag","\uFDD1'boolean"),"\uFDD1'wrapping-reader",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'sym"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'sym","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/wrapping-reader","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",330,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'escape-char",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'buffer","\uFDD1'reader"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'buffer","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'reader","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/escape-char","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",180,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-list",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'_"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'_","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-list","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",251,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'parse-timestamp",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'ts"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'ts","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/parse-timestamp","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",670,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'desugar-meta",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'f"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'f","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/desugar-meta","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",322,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'macros",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'c"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'c","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/macros","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",556,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-queue",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'elems"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'elems","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-queue","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",686,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'leap-year?",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'year"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'year","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/leap-year?","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",632,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'reader-error",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'&","\uFDD1'msg"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'msg","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/reader-error","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",49,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'comment-prefix?",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'ch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'ch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/comment-prefix?","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Checks whether the character begins a comment.","\uFDD0'line",27,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'tag","\uFDD1'boolean"),"\uFDD1'read-map",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'_"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'_","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-map","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",261,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'reader","\uFDD1'eof-is-error","\uFDD1'sentinel","\uFDD1'is-recursive"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'reader","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'eof-is-error","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'sentinel","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'is-recursive","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",4,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Reads the first object from a PushbackReader. Returns the object read.\n   If EOF, throws if eof-is-error is true. Otherwise returns sentinel.","\uFDD0'line",588,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-set",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'_"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'_","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-set","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",543,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'isUnquoteSplicing?",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'form"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'form","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/isUnquoteSplicing?","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",360,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'zero-fill-right",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1's","\uFDD1'width"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'width","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/zero-fill-right","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",616,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-comment",cljs.core.hash_map("\uFDD0'line",255,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name","\uFDD1'cljs.reader/read-comment"),"\uFDD1'read-symbol",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'reader","\uFDD1'initch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'reader","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'initch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-symbol","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",298,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'parse-and-validate-timestamp",cljs.core.hash_map("\uFDD0'line",644,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'private",true,"\uFDD0'name","\uFDD1'cljs.reader/parse-and-validate-timestamp"),"\uFDD1'read-string",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1's"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-string","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Reads one object from the string s","\uFDD0'line",607,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-meta",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'_"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'_","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-meta","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",340,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'special-symbols",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1't","\uFDD1'not-found"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1't","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'not-found","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/special-symbols","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",291,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-fn",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'_"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'_","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-fn","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",488,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-uuid",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'uuid"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'uuid","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-uuid","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",693,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'divisible?",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'num","\uFDD1'div"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'num","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'div","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/divisible?","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",624,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'make-unicode-char",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'code-str"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'code-str","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/make-unicode-char","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",176,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-number",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'reader","\uFDD1'initch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'reader","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'initch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-number","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",268,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-delimited-list",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'delim","\uFDD1'rdr","\uFDD1'recursive?"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'delim","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'recursive?","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-delimited-list","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",212,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'UNQUOTE-SPLICING",cljs.core.hash_map("\uFDD0'line",351,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name","\uFDD1'cljs.reader/UNQUOTE-SPLICING"),"\uFDD1'UNQUOTE",cljs.core.hash_map("\uFDD0'line",350,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name","\uFDD1'cljs.reader/UNQUOTE"),"\uFDD1'maybe-read-tagged-type",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'initch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'initch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/maybe-read-tagged-type","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",703,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'*gensym-env*",cljs.core.hash_map("\uFDD0'line",354,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'dynamic",true,"\uFDD0'name","\uFDD1'cljs.reader/*gensym-env*"),"\uFDD1'days-in-month",cljs.core.hash_map("\uFDD0'line",638,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'private",true,"\uFDD0'name","\uFDD1'cljs.reader/days-in-month"),"\uFDD1'garg",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'n"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'n","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/garg","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",484,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'not-implemented",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'ch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'ch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/not-implemented","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",231,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'whitespace?",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'ch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'ch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/whitespace?","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Checks whether a given character is whitespace","\uFDD0'line",17,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'tag","\uFDD1'boolean"),"\uFDD1'validate-unicode-escape",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'unicode-pattern","\uFDD1'reader","\uFDD1'escape-char","\uFDD1'unicode-str"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'unicode-pattern","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'reader","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'escape-char","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'unicode-str","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/validate-unicode-escape","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",4,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",171,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'escape-char-map",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'c"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'c","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/escape-char-map","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",139,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'isUnquote?",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'form"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'form","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/isUnquote?","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",357,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1're-matches*",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1're","\uFDD1's"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1're","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/re-matches*","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",123,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'symbol-pattern",cljs.core.hash_map("\uFDD0'line",81,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name","\uFDD1'cljs.reader/symbol-pattern"),"\uFDD1'read-discard",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'_"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'_","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-discard","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",551,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'match-int",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1's"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/match-int","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",91,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-vector",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'_"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'_","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-vector","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",257,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'dispatch-macros",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1's"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/dispatch-macros","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",578,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'registerArg",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'n"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'n","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/registerArg","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",511,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'*tag-table*",cljs.core.hash_map("\uFDD0'line",699,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name","\uFDD1'cljs.reader/*tag-table*"),"\uFDD1'syntaxQuote",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'form"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'form","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/syntaxQuote","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",376,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'int-pattern",cljs.core.hash_map("\uFDD0'line",78,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name","\uFDD1'cljs.reader/int-pattern"),"\uFDD1'read-keyword",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'reader","\uFDD1'initch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'reader","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'initch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-keyword","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",306,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'sqExpandList",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'sq"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'sq","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/sqExpandList","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",363,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-unmatched-delimiter",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'ch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'ch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-unmatched-delimiter","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",247,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'match-float",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1's"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/match-float","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",119,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'match-ratio",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1's"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/match-ratio","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",112,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-syntax-quote",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'_"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'_","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-syntax-quote","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",461,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-past",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'pred","\uFDD1'rdr"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'pred","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-past","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Read until first character that doesn't match pred, returning\n   char.","\uFDD0'line",203,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'skip-line",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'reader","\uFDD1'_"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'reader","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'_","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/skip-line","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Advances the reader to the end of a line. Returns the reader","\uFDD0'line",69,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'macro-terminating?",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'ch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'ch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/macro-terminating?","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",53,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'tag","\uFDD1'boolean"),"\uFDD1'read-string*",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'reader","\uFDD1'_"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'reader","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'_","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-string*","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",280,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-token",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'initch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'initch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-token","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",59,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-dispatch",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'_"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'_","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-dispatch","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",237,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'deregister-tag-parser!",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'tag"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'tag","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/deregister-tag-parser!","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",719,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'match-number",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1's"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/match-number","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",132,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'unicode-4-pattern",cljs.core.hash_map("\uFDD0'line",169,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name","\uFDD1'cljs.reader/unicode-4-pattern"),"\uFDD1'read-regex",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'ch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'ch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-regex","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",547,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'*arg-env*",cljs.core.hash_map("\uFDD0'line",355,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'dynamic",true,"\uFDD0'name","\uFDD1'cljs.reader/*arg-env*"),"\uFDD1'register-tag-parser!",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'tag","\uFDD1'f"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'tag","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'f","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/register-tag-parser!","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",712,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'numeric?",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'ch"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'ch","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/numeric?","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Checks whether a given character is numeric","\uFDD0'line",22,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'tag","\uFDD1'boolean"),"\uFDD1'read-arg",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1'rdr","\uFDD1'pct"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1'rdr","\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name","\uFDD1'pct","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-arg","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",521,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'read-date",cljs.core.hash_map("\uFDD0'arglists",cljs.core.list("\uFDD1'quote",cljs.core.list(cljs.core.vec(["\uFDD1's"]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name","\uFDD1's","\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name","\uFDD1'cljs.reader/read-date","\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",679,"\uFDD0'fn-var",true,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs"),"\uFDD1'unicode-2-pattern",cljs.core.hash_map("\uFDD0'line",168,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name","\uFDD1'cljs.reader/unicode-2-pattern"),"\uFDD1'float-pattern",cljs.core.hash_map("\uFDD0'line",80,"\uFDD0'file","/home/joelm/scratch/sources/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name","\uFDD1'cljs.reader/float-pattern")),"\uFDD0'imports",null,"\uFDD0'uses-macros",null,"\uFDD0'requires",cljs.core.hash_map("\uFDD1'ana","\uFDD1'cljs.analyzer","\uFDD1'gstring","\uFDD1'goog.string"),"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set([]),"\uFDD0'doc",null,"\uFDD0'name","\uFDD1'cljs.reader"));
