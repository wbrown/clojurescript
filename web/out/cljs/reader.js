goog.provide('cljs.reader');
goog.require('cljs.core');
goog.require('cljs.analyzer');
goog.require('goog.string');
cljs.reader.PushbackReader = {};
cljs.reader.read_char = (function read_char(reader){
if((function (){var and__3822__auto__ = reader;
if(and__3822__auto__)
{return reader.cljs$reader$PushbackReader$read_char$arity$1;
} else
{return and__3822__auto__;
}
})())
{return reader.cljs$reader$PushbackReader$read_char$arity$1(reader);
} else
{var x__2006__auto__ = (((reader == null))?null:reader);
return (function (){var or__3824__auto__ = (cljs.reader.read_char[goog.typeOf(x__2006__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.reader.read_char["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"PushbackReader.read-char",reader);
}
}
})().call(null,reader);
}
});
cljs.reader.unread = (function unread(reader,ch){
if((function (){var and__3822__auto__ = reader;
if(and__3822__auto__)
{return reader.cljs$reader$PushbackReader$unread$arity$2;
} else
{return and__3822__auto__;
}
})())
{return reader.cljs$reader$PushbackReader$unread$arity$2(reader,ch);
} else
{var x__2006__auto__ = (((reader == null))?null:reader);
return (function (){var or__3824__auto__ = (cljs.reader.unread[goog.typeOf(x__2006__auto__)]);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var or__3824__auto____$1 = (cljs.reader.unread["_"]);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"PushbackReader.unread",reader);
}
}
})().call(null,reader,ch);
}
});
goog.provide('cljs.reader.StringPushbackReader');

/**
* @constructor
*/
cljs.reader.StringPushbackReader = (function (s,index_atom,buffer_atom){
this.s = s;
this.index_atom = index_atom;
this.buffer_atom = buffer_atom;
})
cljs.reader.StringPushbackReader.cljs$lang$type = true;
cljs.reader.StringPushbackReader.cljs$lang$ctorPrSeq = (function (this__1946__auto__){
return cljs.core.list.call(null,"cljs.reader/StringPushbackReader");
});
cljs.reader.StringPushbackReader.cljs$lang$ctorPrWriter = (function (this__1946__auto__,writer__1947__auto__,opt__1948__auto__){
return cljs.core._write.call(null,writer__1947__auto__,"cljs.reader/StringPushbackReader");
});
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$ = true;
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$read_char$arity$1 = (function (reader){
var self__ = this;
if(cljs.core.empty_QMARK_.call(null,cljs.core.deref.call(null,self__.buffer_atom)))
{var idx = cljs.core.deref.call(null,self__.index_atom);
cljs.core.swap_BANG_.call(null,self__.index_atom,cljs.core.inc);
return (self__.s[idx]);
} else
{var buf = cljs.core.deref.call(null,self__.buffer_atom);
cljs.core.swap_BANG_.call(null,self__.buffer_atom,cljs.core.rest);
return cljs.core.first.call(null,buf);
}
});
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$unread$arity$2 = (function (reader,ch){
var self__ = this;
return cljs.core.swap_BANG_.call(null,self__.buffer_atom,(function (p1__4172_SHARP_){
return cljs.core.cons.call(null,ch,p1__4172_SHARP_);
}));
});
cljs.reader.push_back_reader = (function push_back_reader(s){
return (new cljs.reader.StringPushbackReader(s,cljs.core.atom.call(null,0),cljs.core.atom.call(null,null)));
});
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
{return cljs.reader.numeric_QMARK_.call(null,(function (){var next_ch = cljs.reader.read_char.call(null,reader);
cljs.reader.unread.call(null,reader,next_ch);
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
reader_error.cljs$lang$applyTo = (function (arglist__4173){
var rdr = cljs.core.first(arglist__4173);
var msg = cljs.core.rest(arglist__4173);
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
var ch = cljs.reader.read_char.call(null,rdr);
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
{cljs.reader.unread.call(null,rdr,ch);
return sb.toString();
} else
{{
var G__4174 = (function (){sb.append(ch);
return sb;
})();
var G__4175 = cljs.reader.read_char.call(null,rdr);
sb = G__4174;
ch = G__4175;
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
var ch = cljs.reader.read_char.call(null,reader);
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
return (new goog.string.StringBuffer(cljs.reader.read_char.call(null,reader),cljs.reader.read_char.call(null,reader))).toString();
});
cljs.reader.read_4_chars = (function read_4_chars(reader){
return (new goog.string.StringBuffer(cljs.reader.read_char.call(null,reader),cljs.reader.read_char.call(null,reader),cljs.reader.read_char.call(null,reader),cljs.reader.read_char.call(null,reader))).toString();
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
var ch = cljs.reader.read_char.call(null,reader);
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
var ch = cljs.reader.read_char.call(null,rdr);
while(true){
if(cljs.core.truth_(pred.call(null,ch)))
{{
var G__4176 = cljs.reader.read_char.call(null,rdr);
ch = G__4176;
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
var G__4177 = (((mret === rdr))?a:cljs.core.conj_BANG_.call(null,a,mret));
a = G__4177;
continue;
}
} else
{cljs.reader.unread.call(null,rdr,ch);
var o = cljs.reader.read.call(null,rdr,true,null,recursive_QMARK_);
{
var G__4178 = (((o === rdr))?a:cljs.core.conj_BANG_.call(null,a,o));
a = G__4178;
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
var ch = cljs.reader.read_char.call(null,rdr);
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
var ch = cljs.reader.read_char.call(null,reader);
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
{cljs.reader.unread.call(null,reader,ch);
var s = buffer.toString();
var or__3824__auto__ = cljs.reader.match_number.call(null,s);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.reader.reader_error.call(null,reader,"Invalid number format [",s,"]");
}
} else
{{
var G__4179 = (function (){buffer.append(ch);
return buffer;
})();
var G__4180 = cljs.reader.read_char.call(null,reader);
buffer = G__4179;
ch = G__4180;
continue;
}
}
break;
}
});
cljs.reader.read_string_STAR_ = (function read_string_STAR_(reader,_){
var buffer = (new goog.string.StringBuffer());
var ch = cljs.reader.read_char.call(null,reader);
while(true){
if((ch == null))
{return cljs.reader.reader_error.call(null,reader,"EOF while reading");
} else
{if(("\\" === ch))
{{
var G__4181 = (function (){buffer.append(cljs.reader.escape_char.call(null,buffer,reader));
return buffer;
})();
var G__4182 = cljs.reader.read_char.call(null,reader);
buffer = G__4181;
ch = G__4182;
continue;
}
} else
{if(("\"" === ch))
{return buffer.toString();
} else
{if("\uFDD0'default")
{{
var G__4183 = (function (){buffer.append(ch);
return buffer;
})();
var G__4184 = cljs.reader.read_char.call(null,reader);
buffer = G__4183;
ch = G__4184;
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
var token = cljs.reader.read_token.call(null,reader,cljs.reader.read_char.call(null,reader));
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
{if((":" === cljs.core.first.call(null,token__$1)))
{return cljs.core.keyword.call(null,cljs.core._STAR_ns_sym_STAR_,name);
} else
{return cljs.core.keyword.call(null,token__$1);
}
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
if((function (){var G__4186 = o;
if(G__4186)
{if((function (){var or__3824__auto__ = (G__4186.cljs$lang$protocol_mask$partition0$ & 262144);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__4186.cljs$core$IWithMeta$;
}
})())
{return true;
} else
{if((!G__4186.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IWithMeta,G__4186);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IWithMeta,G__4186);
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
var and__3822__auto__ = (function (){var G__4188 = form;
if(G__4188)
{if((function (){var or__3824__auto__ = (G__4188.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__4188.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__4188.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__4188);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__4188);
}
})();
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,cljs.core.first.call(null,form),cljs.reader.UNQUOTE);
} else
{return and__3822__auto__;
}
});
cljs.reader.isUnquoteSplicing_QMARK_ = (function isUnquoteSplicing_QMARK_(form){
var and__3822__auto__ = (function (){var G__4190 = form;
if(G__4190)
{if((function (){var or__3824__auto__ = (G__4190.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__4190.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__4190.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__4190);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__4190);
}
})();
if(cljs.core.truth_(and__3822__auto__))
{return cljs.core._EQ_.call(null,cljs.core.first.call(null,form),cljs.reader.UNQUOTE_SPLICING);
} else
{return and__3822__auto__;
}
});
cljs.reader.sqExpandList = (function sqExpandList(sq){
return cljs.core.doall.call(null,(function (){var iter__2103__auto__ = (function iter__4193(s__4194){
return (new cljs.core.LazySeq(null,false,(function (){
var s__4194__$1 = s__4194;
while(true){
if(cljs.core.seq.call(null,s__4194__$1))
{var item = cljs.core.first.call(null,s__4194__$1);
return cljs.core.cons.call(null,(cljs.core.truth_(cljs.reader.isUnquote_QMARK_.call(null,item))?cljs.core.list.call(null,(new cljs.core.Symbol(null,"list")),cljs.core.second.call(null,item)):(cljs.core.truth_(cljs.reader.isUnquoteSplicing_QMARK_.call(null,item))?cljs.core.second.call(null,item):(("\uFDD0'else")?cljs.core.list.call(null,(new cljs.core.Symbol(null,"list")),cljs.reader.syntaxQuote.call(null,item)):null))),iter__4193.call(null,cljs.core.rest.call(null,s__4194__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2103__auto__.call(null,sq);
})());
});
cljs.reader.syntaxQuote = (function syntaxQuote(form){
if(cljs.core.truth_(cljs.core._lookup.call(null,cljs.analyzer.specials,form,null)))
{return cljs.core.list.call(null,(new cljs.core.Symbol(null,"quote")),form);
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
return cljs.core.list.call(null,(new cljs.core.Symbol(null,"quote")),gs);
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
return cljs.core.list.call(null,(new cljs.core.Symbol(null,"quote")),(new cljs.core.Keyword("\uFDD0'name")).call(null,new_var));
} else
{if((function (){var and__3822__auto__ = cljs.core.not.call(null,ns);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,".",cljs.core.first.call(null,name));
} else
{return and__3822__auto__;
}
})())
{return cljs.core.list.call(null,(new cljs.core.Symbol(null,"quote")),sym);
} else
{if("\uFDD0'else")
{return cljs.core.list.call(null,(new cljs.core.Symbol(null,"quote")),(new cljs.core.Keyword("\uFDD0'name")).call(null,cljs.analyzer.resolve_existing_var.call(null,cljs.analyzer.empty_env.call(null),sym)));
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
{return cljs.core.list.call(null,(new cljs.core.Symbol(null,"quote")),form);
} else
{if((function (){var G__4202 = form;
if(G__4202)
{if((function (){var or__3824__auto__ = (G__4202.cljs$lang$protocol_mask$partition0$ & 8);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__4202.cljs$core$ICollection$;
}
})())
{return true;
} else
{if((!G__4202.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,G__4202);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,G__4202);
}
})())
{if((function (){var G__4203 = form;
if(G__4203)
{if((function (){var or__3824__auto__ = (G__4203.cljs$lang$protocol_mask$partition0$ & 67108864);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__4203.cljs$core$IRecord$;
}
})())
{return true;
} else
{if((!G__4203.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IRecord,G__4203);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IRecord,G__4203);
}
})())
{return form;
} else
{if((function (){var G__4204 = form;
if(G__4204)
{if((function (){var or__3824__auto__ = (G__4204.cljs$lang$protocol_mask$partition0$ & 1024);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__4204.cljs$core$IMap$;
}
})())
{return true;
} else
{if((!G__4204.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,G__4204);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,G__4204);
}
})())
{return cljs.core.list.call(null,(new cljs.core.Symbol(null,"apply")),(new cljs.core.Symbol(null,"hash-map")),cljs.core.list.call(null,(new cljs.core.Symbol(null,"seq")),cljs.core.cons.call(null,(new cljs.core.Symbol(null,"concat")),cljs.reader.sqExpandList.call(null,cljs.core.apply.call(null,cljs.core.concat,cljs.core.seq.call(null,form))))));
} else
{if((function (){var G__4205 = form;
if(G__4205)
{if((function (){var or__3824__auto__ = (G__4205.cljs$lang$protocol_mask$partition0$ & 16384);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__4205.cljs$core$IVector$;
}
})())
{return true;
} else
{if((!G__4205.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,G__4205);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,G__4205);
}
})())
{return cljs.core.list.call(null,(new cljs.core.Symbol(null,"apply")),(new cljs.core.Symbol(null,"vector")),cljs.core.list.call(null,(new cljs.core.Symbol(null,"seq")),cljs.core.cons.call(null,(new cljs.core.Symbol(null,"concat")),cljs.reader.sqExpandList.call(null,form))));
} else
{if((function (){var G__4206 = form;
if(G__4206)
{if((function (){var or__3824__auto__ = (G__4206.cljs$lang$protocol_mask$partition0$ & 4096);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__4206.cljs$core$ISet$;
}
})())
{return true;
} else
{if((!G__4206.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,G__4206);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,G__4206);
}
})())
{return cljs.core.list.call(null,(new cljs.core.Symbol(null,"apply")),(new cljs.core.Symbol(null,"hash-set")),cljs.core.list.call(null,(new cljs.core.Symbol(null,"seq")),cljs.core.cons.call(null,(new cljs.core.Symbol(null,"concat")),cljs.reader.sqExpandList.call(null,cljs.core.seq.call(null,form)))));
} else
{if(cljs.core.truth_((function (){var or__3824__auto__ = (function (){var G__4207 = form;
if(G__4207)
{if((function (){var or__3824__auto__ = (G__4207.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return G__4207.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__4207.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__4207);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__4207);
}
})();
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{var G__4208 = form;
if(G__4208)
{if((function (){var or__3824__auto____$1 = (G__4208.cljs$lang$protocol_mask$partition0$ & 33554432);
if(or__3824__auto____$1)
{return or__3824__auto____$1;
} else
{return G__4208.cljs$core$IList$;
}
})())
{return true;
} else
{if((!G__4208.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IList,G__4208);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IList,G__4208);
}
}
})()))
{var temp__3971__auto__ = cljs.core.seq.call(null,form);
if(temp__3971__auto__)
{var sq = temp__3971__auto__;
return cljs.core.list.call(null,(new cljs.core.Symbol(null,"seq")),cljs.core.cons.call(null,(new cljs.core.Symbol(null,"concat")),cljs.reader.sqExpandList.call(null,sq)));
} else
{return cljs.core.cons.call(null,(new cljs.core.Symbol(null,"list")),null);
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
{return cljs.core.list.call(null,(new cljs.core.Symbol(null,"quote")),form);
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
var _STAR_gensym_env_STAR_4211 = cljs.reader._STAR_gensym_env_STAR_;
try{cljs.reader._STAR_gensym_env_STAR_ = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
var form = cljs.reader.read.call(null,rdr,true,null,true);
return cljs.reader.syntaxQuote.call(null,form);
}finally {cljs.reader._STAR_gensym_env_STAR_ = _STAR_gensym_env_STAR_4211;
}});
cljs.reader.read_unquote = (function read_unquote(rdr,_){
var ch = cljs.reader.read_char.call(null,rdr);
if(cljs.core._EQ_.call(null,null,ch))
{return cljs.reader.reader_error.call(null,rdr,"EOF while reading character");
} else
{if(cljs.core._EQ_.call(null,"@",ch))
{var o = cljs.reader.read.call(null,rdr,true,null,true);
return cljs.core.list.call(null,cljs.reader.UNQUOTE_SPLICING,o);
} else
{if("\uFDD0'else")
{cljs.reader.unread.call(null,rdr,ch);
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
var _STAR_arg_env_STAR_4217 = cljs.reader._STAR_arg_env_STAR_;
try{cljs.reader._STAR_arg_env_STAR_ = cljs.core.atom.call(null,cljs.core.sorted_map.call(null));
cljs.reader.unread.call(null,rdr,"(");
var form = cljs.reader.read.call(null,rdr,true,null,true);
var argsyms = cljs.core.deref.call(null,cljs.reader._STAR_arg_env_STAR_);
var rargs = cljs.core.rseq.call(null,argsyms);
var highpair = cljs.core.first.call(null,rargs);
var higharg = (cljs.core.truth_(highpair)?cljs.core.key.call(null,highpair):0);
var args = (((higharg > 0))?cljs.core.doall.call(null,(function (){var iter__2103__auto__ = (function iter__4219(s__4220){
return (new cljs.core.LazySeq(null,false,(function (){
var s__4220__$1 = s__4220;
while(true){
if(cljs.core.seq.call(null,s__4220__$1))
{var i = cljs.core.first.call(null,s__4220__$1);
return cljs.core.cons.call(null,(function (){var or__3824__auto__ = cljs.core._lookup.call(null,argsyms,i,null);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return cljs.reader.garg.call(null,i);
}
})(),iter__4219.call(null,cljs.core.rest.call(null,s__4220__$1)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2103__auto__.call(null,cljs.core.range.call(null,1,(1 + higharg)));
})()):cljs.reader.args);
var restsym = cljs.core._lookup.call(null,argsyms,-1,null);
var args__$1 = (cljs.core.truth_(restsym)?cljs.core.concat.call(null,args,cljs.core.PersistentVector.fromArray([(new cljs.core.Symbol(null,"&")),restsym], true)):args);
return cljs.core.list.call(null,(new cljs.core.Symbol(null,"fn*")),cljs.core.vec.call(null,args__$1),form);
}finally {cljs.reader._STAR_arg_env_STAR_ = _STAR_arg_env_STAR_4217;
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
{var ch = cljs.reader.read_char.call(null,rdr);
cljs.reader.unread.call(null,rdr,ch);
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
if(cljs.core._EQ_.call(null,(new cljs.core.Symbol(null,"&")),n))
{return cljs.reader.registerArg.call(null,-1);
} else
{if(!(cljs.core.number_QMARK_.call(null,n)))
{return cljs.reader.reader_error.call(null,rdr,"arg literal must be %, %& or %integer");
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
cljs.reader.read_regex = (function read_regex(reader){
var buffer = "";
var ch = cljs.reader.read_char.call(null,reader);
while(true){
if((ch == null))
{return cljs.reader.reader_error.call(null,reader,"EOF while reading regex");
} else
{if(("\\" === ch))
{{
var G__4221 = [cljs.core.str(buffer),cljs.core.str(ch),cljs.core.str(cljs.reader.read_char.call(null,reader))].join('');
var G__4222 = cljs.reader.read_char.call(null,reader);
buffer = G__4221;
ch = G__4222;
continue;
}
} else
{if(("\"" === ch))
{return cljs.core.re_pattern.call(null,buffer);
} else
{if("\uFDD0'default")
{{
var G__4223 = [cljs.core.str(buffer),cljs.core.str(ch)].join('');
var G__4224 = cljs.reader.read_char.call(null,reader);
buffer = G__4223;
ch = G__4224;
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
{return cljs.reader.wrapping_reader.call(null,(new cljs.core.Symbol(null,"quote")));
} else
{if((c === "@"))
{return cljs.reader.wrapping_reader.call(null,(new cljs.core.Symbol(null,"deref")));
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
{return cljs.reader.read_char;
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
cljs.reader.read = (function() {
var read = null;
var read__1 = (function (reader){
return read.call(null,reader,true,null);
});
var read__3 = (function (reader,eof_is_error,sentinel){
return read.call(null,reader,eof_is_error,sentinel,false);
});
var read__4 = (function (reader,eof_is_error,sentinel,is_recursive){
while(true){
var ch = cljs.reader.read_char.call(null,reader);
if((ch == null))
{if(cljs.core.truth_(eof_is_error))
{return cljs.reader.reader_error.call(null,reader,"EOF while reading");
} else
{return sentinel;
}
} else
{if(cljs.reader.whitespace_QMARK_.call(null,ch))
{{
var G__4225 = reader;
var G__4226 = eof_is_error;
var G__4227 = sentinel;
var G__4228 = is_recursive;
reader = G__4225;
eof_is_error = G__4226;
sentinel = G__4227;
is_recursive = G__4228;
continue;
}
} else
{if(cljs.reader.comment_prefix_QMARK_.call(null,ch))
{{
var G__4229 = cljs.reader.read_comment.call(null,reader,ch);
var G__4230 = eof_is_error;
var G__4231 = sentinel;
var G__4232 = is_recursive;
reader = G__4229;
eof_is_error = G__4230;
sentinel = G__4231;
is_recursive = G__4232;
continue;
}
} else
{if("\uFDD0'else")
{var f = cljs.reader.macros.call(null,ch);
var res = (cljs.core.truth_(f)?f.call(null,reader,ch):((cljs.reader.number_literal_QMARK_.call(null,reader,ch))?cljs.reader.read_number.call(null,reader,ch):(("\uFDD0'else")?cljs.reader.read_symbol.call(null,reader,ch):null)));
if((res === reader))
{{
var G__4233 = reader;
var G__4234 = eof_is_error;
var G__4235 = sentinel;
var G__4236 = is_recursive;
reader = G__4233;
eof_is_error = G__4234;
sentinel = G__4235;
is_recursive = G__4236;
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
read = function(reader,eof_is_error,sentinel,is_recursive){
switch(arguments.length){
case 1:
return read__1.call(this,reader);
case 3:
return read__3.call(this,reader,eof_is_error,sentinel);
case 4:
return read__4.call(this,reader,eof_is_error,sentinel,is_recursive);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
read.cljs$lang$arity$1 = read__1;
read.cljs$lang$arity$3 = read__3;
read.cljs$lang$arity$4 = read__4;
return read;
})()
;
/**
* Reads one object from the string s
*/
cljs.reader.read_string = (function read_string(s){
var r = cljs.reader.push_back_reader.call(null,s);
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
var G__4237 = b.append("0");
b = G__4237;
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
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str(msg),cljs.core.str(" Failed:  "),cljs.core.str(low),cljs.core.str("<="),cljs.core.str(n),cljs.core.str("<="),cljs.core.str(high)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list((new cljs.core.Symbol(null,"<=")),(new cljs.core.Symbol(null,"low")),(new cljs.core.Symbol(null,"n")),(new cljs.core.Symbol(null,"high"))),cljs.core.hash_map("\uFDD0'line",688))))].join('')));
}
return n;
});
return (function (ts){
var temp__3974__auto__ = cljs.core.map.call(null,cljs.core.vec,cljs.core.split_at.call(null,8,cljs.core.re_matches.call(null,timestamp,ts)));
if(cljs.core.truth_(temp__3974__auto__))
{var vec__4242 = temp__3974__auto__;
var vec__4243 = cljs.core.nth.call(null,vec__4242,0,null);
var _ = cljs.core.nth.call(null,vec__4243,0,null);
var years = cljs.core.nth.call(null,vec__4243,1,null);
var months = cljs.core.nth.call(null,vec__4243,2,null);
var days = cljs.core.nth.call(null,vec__4243,3,null);
var hours = cljs.core.nth.call(null,vec__4243,4,null);
var minutes = cljs.core.nth.call(null,vec__4243,5,null);
var seconds = cljs.core.nth.call(null,vec__4243,6,null);
var milliseconds = cljs.core.nth.call(null,vec__4243,7,null);
var vec__4244 = cljs.core.nth.call(null,vec__4242,1,null);
var ___$1 = cljs.core.nth.call(null,vec__4244,0,null);
var ___$2 = cljs.core.nth.call(null,vec__4244,1,null);
var ___$3 = cljs.core.nth.call(null,vec__4244,2,null);
var V = vec__4242;
var vec__4245 = cljs.core.map.call(null,(function (v){
return cljs.core.map.call(null,(function (p1__4241_SHARP_){
return parseInt(p1__4241_SHARP_,10);
}),v);
}),cljs.core.map.call(null,(function (p1__4239_SHARP_,p2__4238_SHARP_){
return cljs.core.update_in.call(null,p2__4238_SHARP_,cljs.core.PersistentVector.fromArray([0], true),p1__4239_SHARP_);
}),cljs.core.PersistentVector.fromArray([cljs.core.constantly.call(null,null),(function (p1__4240_SHARP_){
if(cljs.core._EQ_.call(null,p1__4240_SHARP_,"-"))
{return "-1";
} else
{return "1";
}
})], true),V));
var vec__4246 = cljs.core.nth.call(null,vec__4245,0,null);
var ___$4 = cljs.core.nth.call(null,vec__4246,0,null);
var y = cljs.core.nth.call(null,vec__4246,1,null);
var mo = cljs.core.nth.call(null,vec__4246,2,null);
var d = cljs.core.nth.call(null,vec__4246,3,null);
var h = cljs.core.nth.call(null,vec__4246,4,null);
var m = cljs.core.nth.call(null,vec__4246,5,null);
var s = cljs.core.nth.call(null,vec__4246,6,null);
var ms = cljs.core.nth.call(null,vec__4246,7,null);
var vec__4247 = cljs.core.nth.call(null,vec__4245,1,null);
var offset_sign = cljs.core.nth.call(null,vec__4247,0,null);
var offset_hours = cljs.core.nth.call(null,vec__4247,1,null);
var offset_minutes = cljs.core.nth.call(null,vec__4247,2,null);
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
{var vec__4249 = temp__3971__auto__;
var years = cljs.core.nth.call(null,vec__4249,0,null);
var months = cljs.core.nth.call(null,vec__4249,1,null);
var days = cljs.core.nth.call(null,vec__4249,2,null);
var hours = cljs.core.nth.call(null,vec__4249,3,null);
var minutes = cljs.core.nth.call(null,vec__4249,4,null);
var seconds = cljs.core.nth.call(null,vec__4249,5,null);
var ms = cljs.core.nth.call(null,vec__4249,6,null);
var offset = cljs.core.nth.call(null,vec__4249,7,null);
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
cljs.core.swap_BANG_.call(null,cljs.core.namespaces,cljs.core.assoc,(new cljs.core.Symbol(null,"cljs.reader")),cljs.core.hash_map("\uFDD0'defs",cljs.core.hash_map((new cljs.core.Symbol(null,"read-2-chars")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"reader"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-2-chars")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",176,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-unquote")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"_"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"_")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-unquote")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",492,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-4-chars")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"reader"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-4-chars")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",182,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"indivisible?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"num")),(new cljs.core.Symbol(null,"div"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"num")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"div")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/indivisible?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",669,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"re-find*")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"re")),(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"re")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/re-find*")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",105,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"throwing-reader")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"msg"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"msg")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/throwing-reader")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",360,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"ratio-pattern")),cljs.core.hash_map("\uFDD0'line",101,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/ratio-pattern"))),(new cljs.core.Symbol(null,"number-literal?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"initch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"initch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/number-literal?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Checks whether the reader is at the start of a number literal","\uFDD0'line",54,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'tag",(new cljs.core.Symbol(null,"boolean"))),(new cljs.core.Symbol(null,"wrapping-reader")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"sym"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sym")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/wrapping-reader")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",355,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"escape-char")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"buffer")),(new cljs.core.Symbol(null,"reader"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"buffer")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/escape-char")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",202,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-list")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"_"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"_")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-list")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",273,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"parse-timestamp")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"ts"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ts")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/parse-timestamp")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",711,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"desugar-meta")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"f"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"f")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/desugar-meta")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",347,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"macros")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"c"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"c")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/macros")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",593,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-queue")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"elems"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"elems")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-queue")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",727,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"leap-year?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"year"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"year")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/leap-year?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",673,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"reader-error")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"&")),(new cljs.core.Symbol(null,"msg"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"msg")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/reader-error")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",true,"\uFDD0'line",71,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"comment-prefix?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"ch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/comment-prefix?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Checks whether the character begins a comment.","\uFDD0'line",49,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'tag",(new cljs.core.Symbol(null,"boolean"))),(new cljs.core.Symbol(null,"read-map")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"_"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"_")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-map")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",283,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"reader"))]),cljs.core.vec([(new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"eof-is-error")),(new cljs.core.Symbol(null,"sentinel"))]),cljs.core.vec([(new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"eof-is-error")),(new cljs.core.Symbol(null,"sentinel")),(new cljs.core.Symbol(null,"is-recursive"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"eof-is-error")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sentinel")),"\uFDD0'tag",null,"\uFDD0'shadow",null)]),cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"eof-is-error")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sentinel")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"is-recursive")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",4,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Reads the first object from a PushbackReader. Returns the object read.\n   If EOF, throws if eof-is-error is true. Otherwise returns sentinel.","\uFDD0'line",625,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-set")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"_"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"_")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-set")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",568,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"isUnquoteSplicing?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"form"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"form")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/isUnquoteSplicing?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",385,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"zero-fill-right")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s")),(new cljs.core.Symbol(null,"width"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"width")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/zero-fill-right")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",657,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-char")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"reader"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'protocol",(new cljs.core.Symbol(null,"cljs.reader/PushbackReader")),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-char")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",13,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-comment")),cljs.core.hash_map("\uFDD0'line",277,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-comment"))),(new cljs.core.Symbol(null,"read-symbol")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"initch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"initch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-symbol")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",320,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"/")),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"cljs.core//"))),(new cljs.core.Symbol(null,"unread")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"ch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'protocol",(new cljs.core.Symbol(null,"cljs.reader/PushbackReader")),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/unread")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",13,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"parse-and-validate-timestamp")),cljs.core.hash_map("\uFDD0'line",685,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'private",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/parse-and-validate-timestamp"))),(new cljs.core.Symbol(null,"read-string")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-string")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Reads one object from the string s","\uFDD0'line",648,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-meta")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"_"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"_")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-meta")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",365,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"special-symbols")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"t")),(new cljs.core.Symbol(null,"not-found"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"t")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"not-found")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/special-symbols")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",313,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"PushbackReader")),cljs.core.hash_map("\uFDD0'line",13,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'protocol-symbol",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/PushbackReader"))),(new cljs.core.Symbol(null,"read-fn")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"_"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"_")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-fn")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",513,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-uuid")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"uuid"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"uuid")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-uuid")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",734,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"divisible?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"num")),(new cljs.core.Symbol(null,"div"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"num")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"div")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/divisible?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",665,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"make-unicode-char")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"code-str"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"code-str")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/make-unicode-char")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",198,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"push-back-reader")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/push-back-reader")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",31,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-number")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"initch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"initch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-number")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",290,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-delimited-list")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"delim")),(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"recursive?"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"delim")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"recursive?")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-delimited-list")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",3,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",234,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"UNQUOTE-SPLICING")),cljs.core.hash_map("\uFDD0'line",376,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/UNQUOTE-SPLICING"))),(new cljs.core.Symbol(null,"UNQUOTE")),cljs.core.hash_map("\uFDD0'line",375,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/UNQUOTE"))),(new cljs.core.Symbol(null,"maybe-read-tagged-type")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"initch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"initch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/maybe-read-tagged-type")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",744,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"*gensym-env*")),cljs.core.hash_map("\uFDD0'line",379,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/*gensym-env*"))),(new cljs.core.Symbol(null,"days-in-month")),cljs.core.hash_map("\uFDD0'line",679,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'private",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/days-in-month"))),(new cljs.core.Symbol(null,"garg")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"n"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"n")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/garg")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",509,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"StringPushbackReader")),cljs.core.hash_map("\uFDD0'line",19,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'protocols",cljs.core.set([(new cljs.core.Symbol(null,"cljs.reader/PushbackReader"))]),"\uFDD0'num-fields",3,"\uFDD0'type",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/StringPushbackReader"))),(new cljs.core.Symbol(null,"not-implemented")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"ch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/not-implemented")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",253,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"whitespace?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"ch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/whitespace?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Checks whether a given character is whitespace","\uFDD0'line",39,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'tag",(new cljs.core.Symbol(null,"boolean"))),(new cljs.core.Symbol(null,"validate-unicode-escape")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"unicode-pattern")),(new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"escape-char")),(new cljs.core.Symbol(null,"unicode-str"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"unicode-pattern")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"escape-char")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"unicode-str")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/validate-unicode-escape")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",4,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",193,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"escape-char-map")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"c"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"c")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/escape-char-map")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",161,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"isUnquote?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"form"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"form")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/isUnquote?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",382,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"re-matches*")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"re")),(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"re")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/re-matches*")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",145,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"symbol-pattern")),cljs.core.hash_map("\uFDD0'line",103,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/symbol-pattern"))),(new cljs.core.Symbol(null,"read-discard")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"_"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"_")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-discard")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",588,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"match-int")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/match-int")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",113,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-vector")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"_"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"_")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-vector")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",279,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"dispatch-macros")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/dispatch-macros")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",615,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"registerArg")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"n"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"n")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/registerArg")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",536,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"*tag-table*")),cljs.core.hash_map("\uFDD0'line",740,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/*tag-table*"))),(new cljs.core.Symbol(null,"syntaxQuote")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"form"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"form")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/syntaxQuote")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",401,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"int-pattern")),cljs.core.hash_map("\uFDD0'line",100,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/int-pattern"))),(new cljs.core.Symbol(null,"read-keyword")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"initch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"initch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-keyword")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",329,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"sqExpandList")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"sq"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"sq")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/sqExpandList")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",388,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-unmatched-delimiter")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"ch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-unmatched-delimiter")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",269,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"match-float")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/match-float")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",141,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"match-ratio")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/match-ratio")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",134,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-syntax-quote")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"_"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"_")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-syntax-quote")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",486,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-past")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"pred")),(new cljs.core.Symbol(null,"rdr"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"pred")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-past")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Read until first character that doesn't match pred, returning\n   char.","\uFDD0'line",225,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"skip-line")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"_"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"_")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/skip-line")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Advances the reader to the end of a line. Returns the reader","\uFDD0'line",91,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"macro-terminating?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"ch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/macro-terminating?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",75,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'tag",(new cljs.core.Symbol(null,"boolean"))),(new cljs.core.Symbol(null,"read-string*")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"reader")),(new cljs.core.Symbol(null,"_"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"_")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-string*")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",302,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-token")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"initch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"initch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-token")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",81,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-dispatch")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"_"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"_")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-dispatch")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",259,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"deregister-tag-parser!")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"tag"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"tag")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/deregister-tag-parser!")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",760,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"match-number")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/match-number")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",154,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"unicode-4-pattern")),cljs.core.hash_map("\uFDD0'line",191,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/unicode-4-pattern"))),(new cljs.core.Symbol(null,"read-regex")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"reader"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"reader")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-regex")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",572,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"*arg-env*")),cljs.core.hash_map("\uFDD0'line",380,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'dynamic",true,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/*arg-env*"))),(new cljs.core.Symbol(null,"register-tag-parser!")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"tag")),(new cljs.core.Symbol(null,"f"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"tag")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"f")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/register-tag-parser!")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",753,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"numeric?")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"ch"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"ch")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/numeric?")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'doc","Checks whether a given character is numeric","\uFDD0'line",44,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'tag",(new cljs.core.Symbol(null,"boolean"))),(new cljs.core.Symbol(null,"read-arg")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"rdr")),(new cljs.core.Symbol(null,"pct"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"rdr")),"\uFDD0'tag",null,"\uFDD0'shadow",null),cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"pct")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-arg")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",2,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",546,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"read-date")),cljs.core.hash_map("\uFDD0'arglists",cljs.core.list((new cljs.core.Symbol(null,"quote")),cljs.core.list(cljs.core.vec([(new cljs.core.Symbol(null,"s"))]))),"\uFDD0'method-params",cljs.core.list(cljs.core.vec([cljs.core.hash_map("\uFDD0'name",(new cljs.core.Symbol(null,"s")),"\uFDD0'tag",null,"\uFDD0'shadow",null)])),"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/read-date")),"\uFDD0'protocol-impl",null,"\uFDD0'max-fixed-arity",1,"\uFDD0'private",true,"\uFDD0'protocol-inline",null,"\uFDD0'variadic",false,"\uFDD0'line",720,"\uFDD0'fn-var",true,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs"),(new cljs.core.Symbol(null,"unicode-2-pattern")),cljs.core.hash_map("\uFDD0'line",190,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/unicode-2-pattern"))),(new cljs.core.Symbol(null,"float-pattern")),cljs.core.hash_map("\uFDD0'line",102,"\uFDD0'file","/data2/joelm/personal/clj/clojurescript/src/cljs/cljs/reader.cljs","\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader/float-pattern")))),"\uFDD0'imports",null,"\uFDD0'uses-macros",null,"\uFDD0'requires",cljs.core.hash_map((new cljs.core.Symbol(null,"ana")),(new cljs.core.Symbol(null,"cljs.analyzer")),(new cljs.core.Symbol(null,"gstring")),(new cljs.core.Symbol(null,"goog.string"))),"\uFDD0'uses",null,"\uFDD0'excludes",cljs.core.set([]),"\uFDD0'doc",null,"\uFDD0'name",(new cljs.core.Symbol(null,"cljs.reader"))));
