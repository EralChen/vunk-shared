import e from"./chunk-BhsLqr-4.js";import n from"./chunk-DCB2-bta.js";import t from"./chunk-BIAh0u_K.js";import a from"./chunk-Begb3drz.js";import i from"./chunk-g_GSZ1hr.js";import m from"./chunk-DM5OZKwu.js";import r from"./chunk-CNXuF1yM.js";import"./chunk-BN40hmum.js";const o=Object.freeze(JSON.parse(`{"displayName":"Nim","fileTypes":["nim"],"name":"nim","patterns":[{"begin":"[ \\\\t]*##\\\\[","contentName":"comment.block.doc-comment.content.nim","end":"\\\\]##","name":"comment.block.doc-comment.nim","patterns":[{"include":"#multilinedoccomment","name":"comment.block.doc-comment.nested.nim"}]},{"begin":"[ \\\\t]*#\\\\[","contentName":"comment.block.content.nim","end":"\\\\]#","name":"comment.block.nim","patterns":[{"include":"#multilinecomment","name":"comment.block.nested.nim"}]},{"begin":"(^[ \\\\t]+)?(?=##)","beginCaptures":{"1":{"name":"punctuation.whitespace.comment.leading.nim"}},"end":"(?!\\\\G)","patterns":[{"begin":"##","beginCaptures":{"0":{"name":"punctuation.definition.comment.nim"}},"end":"\\\\n","name":"comment.line.number-sign.doc-comment.nim"}]},{"begin":"(^[ \\\\t]+)?(?=#[^\\\\[])","beginCaptures":{"1":{"name":"punctuation.whitespace.comment.leading.nim"}},"end":"(?!\\\\G)","patterns":[{"begin":"#","beginCaptures":{"0":{"name":"punctuation.definition.comment.nim"}},"end":"\\\\n","name":"comment.line.number-sign.nim"}]},{"comment":"A nim procedure or method","name":"meta.proc.nim","patterns":[{"begin":"\\\\b(proc|method|template|macro|iterator|converter|func)\\\\s+\\\\\`?([^:{\\\\s\\\\\`\\\\*(]*)\\\\\`?(\\\\s*\\\\*)?\\\\s*(?=\\\\(|=|:|\\\\[|\\\\n|\\\\{)","captures":{"1":{"name":"keyword.other"},"2":{"name":"entity.name.function.nim"},"3":{"name":"keyword.control.export"}},"end":"\\\\)","patterns":[{"include":"source.nim"}]}]},{"begin":"discard \\"\\"\\"","comment":"A discarded triple string literal comment","end":"\\"\\"\\"(?!\\")","name":"comment.line.discarded.nim"},{"include":"#float_literal"},{"include":"#integer_literal"},{"comment":"Operator as function name","match":"(?<=\\\\\`)[^\\\\\` ]+(?=\\\\\`)","name":"entity.name.function.nim"},{"captures":{"1":{"name":"keyword.control.export"}},"comment":"Export qualifier.","match":"\\\\b\\\\s*(\\\\*)(?:\\\\s*(?=[,:])|\\\\s+(?=[=]))"},{"captures":{"1":{"name":"support.type.nim"},"2":{"name":"keyword.control.export"}},"comment":"Export qualifier following a type def.","match":"\\\\b([A-Z]\\\\w+)(\\\\*)"},{"include":"#string_literal"},{"comment":"Language Constants.","match":"\\\\b(true|false|Inf|NegInf|NaN|nil)\\\\b","name":"constant.language.nim"},{"comment":"Keywords that affect program control flow or scope.","match":"\\\\b(block|break|case|continue|do|elif|else|end|except|finally|for|if|raise|return|try|when|while|yield)\\\\b","name":"keyword.control.nim"},{"comment":"Keyword boolean operators for expressions.","match":"(\\\\b(and|in|is|isnot|not|notin|or|xor)\\\\b)","name":"keyword.boolean.nim"},{"comment":"Generic operators for expressions.","match":"(=|\\\\+|-|\\\\*|/|<|>|@|\\\\$|~|&|%|!|\\\\?|\\\\^|\\\\.|:|\\\\\\\\)+","name":"keyword.operator.nim"},{"comment":"Other keywords.","match":"(\\\\b(addr|as|asm|atomic|bind|cast|const|converter|concept|defer|discard|distinct|div|enum|export|from|import|include|let|mod|mixin|object|of|ptr|ref|shl|shr|static|type|using|var|tuple|iterator|macro|func|method|proc|template)\\\\b)","name":"keyword.other.nim"},{"comment":"Invalid and unused keywords.","match":"(\\\\b(generic|interface|lambda|out|shared)\\\\b)","name":"invalid.illegal.invalid-keyword.nim"},{"comment":"Common functions","match":"\\\\b(new|await|assert|echo|defined|declared|newException|countup|countdown|high|low)\\\\b","name":"keyword.other.common.function.nim"},{"comment":"Built-in, concrete types.","match":"\\\\b(((uint|int)(8|16|32|64)?)|float(32|64)?|bool|string|auto|cstring|char|byte|tobject|typedesc|stmt|expr|any|untyped|typed)\\\\b","name":"storage.type.concrete.nim"},{"comment":"Built-in, generic types.","match":"\\\\b(range|array|seq|set|pointer)\\\\b","name":"storage.type.generic.nim"},{"comment":"Special types.","match":"\\\\b(openarray|varargs|void)\\\\b","name":"storage.type.generic.nim"},{"comment":"Other constants.","match":"\\\\b[A-Z][A-Z0-9_]+\\\\b","name":"support.constant.nim"},{"comment":"Other types.","match":"\\\\b[A-Z]\\\\w+\\\\b","name":"support.type.nim"},{"comment":"Function call.","match":"\\\\b\\\\w+\\\\b(?=(\\\\[([a-zA-Z0-9_,]|\\\\s)+\\\\])?\\\\()","name":"support.function.any-method.nim"},{"comment":"Function call (no parenthesis).","match":"(?!(openarray|varargs|void|range|array|seq|set|pointer|new|await|assert|echo|defined|declared|newException|countup|countdown|high|low|((uint|int)(8|16|32|64)?)|float(32|64)?|bool|string|auto|cstring|char|byte|tobject|typedesc|stmt|expr|any|untyped|typed|addr|as|asm|atomic|bind|cast|const|converter|concept|defer|discard|distinct|div|enum|export|from|import|include|let|mod|mixin|object|of|ptr|ref|shl|shr|static|type|using|var|tuple|iterator|macro|func|method|proc|template|and|in|is|isnot|not|notin|or|xor|proc|method|template|macro|iterator|converter|func|true|false|Inf|NegInf|NaN|nil|block|break|case|continue|do|elif|else|end|except|finally|for|if|raise|return|try|when|while|yield)\\\\b)\\\\w+\\\\s+(?!(and|in|is|isnot|not|notin|or|xor|[^a-zA-Z0-9_\\"'\`(-+]+)\\\\b)(?=[a-zA-Z0-9_\\"'\`(-+])","name":"support.function.any-method.nim"},{"begin":"(^\\\\s*)?(?=\\\\{\\\\.emit: ?\\"\\"\\")","beginCaptures":{"0":{"name":"punctuation.whitespace.embedded.leading.nim"}},"end":"(?!\\\\G)(\\\\s*$\\\\n?)?","endCaptures":{"0":{"name":"punctuation.whitespace.embedded.trailing.nim"}},"patterns":[{"begin":"\\\\{\\\\.(emit:) ?(\\"\\"\\")","captures":{"1":{"name":"keyword.other.nim"},"2":{"name":"punctuation.section.embedded.begin.nim"}},"contentName":"source.c","end":"(\\")\\"\\"(?!\\")(\\\\.{0,1}\\\\})?","endCaptures":{"0":{"name":"punctuation.section.embedded.end.nim"},"1":{"name":"source.c"}},"name":"meta.embedded.block.c","patterns":[{"begin":"\\\\\`","end":"\\\\\`","name":"keyword.operator.nim"},{"include":"source.c"}]}]},{"begin":"\\\\{\\\\.","beginCaptures":{"0":{"name":"punctuation.pragma.start.nim"}},"end":"\\\\.?\\\\}","endCaptures":{"0":{"name":"punctuation.pragma.end.nim"}},"patterns":[{"begin":"\\\\b([A-Za-z]\\\\w*)(?:\\\\s|\\\\s*:)","beginCaptures":{"1":{"name":"meta.preprocessor.pragma.nim"}},"end":"(?=\\\\.?\\\\}|,)","patterns":[{"include":"source.nim"}]},{"begin":"\\\\b([A-Za-z]\\\\w*)\\\\(","beginCaptures":{"1":{"name":"meta.preprocessor.pragma.nim"}},"end":"\\\\)","patterns":[{"include":"source.nim"}]},{"captures":{"1":{"name":"meta.preprocessor.pragma.nim"}},"match":"\\\\b([A-Za-z]\\\\w*)(?=\\\\.?\\\\}|,)"},{"begin":"\\\\b([A-Za-z]\\\\w*)(\\"\\"\\")","beginCaptures":{"1":{"name":"meta.preprocessor.pragma.nim"},"2":{"name":"punctuation.definition.string.begin.nim"}},"end":"\\"\\"\\"(?!\\")","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.triple.raw.nim"},{"begin":"\\\\b([A-Za-z]\\\\w*)(\\")","beginCaptures":{"1":{"name":"meta.preprocessor.pragma.nim"},"2":{"name":"punctuation.definition.string.begin.nim"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.double.raw.nim"},{"begin":"\\\\b(hint\\\\[\\\\w+\\\\]):","beginCaptures":{"1":{"name":"meta.preprocessor.pragma.nim"}},"end":"(?=\\\\.?\\\\}|,)","patterns":[{"include":"source.nim"}]},{"match":",","name":"punctuation.separator.comma.nim"}]},{"begin":"(^\\\\s*)?(?=asm \\"\\"\\")","beginCaptures":{"0":{"name":"punctuation.whitespace.embedded.leading.nim"}},"end":"(?!\\\\G)(\\\\s*$\\\\n?)?","endCaptures":{"0":{"name":"punctuation.whitespace.embedded.trailing.nim"}},"patterns":[{"begin":"(asm) (\\"\\"\\")","captures":{"1":{"name":"keyword.other.nim"},"2":{"name":"punctuation.section.embedded.begin.nim"}},"contentName":"source.asm","end":"(\\")\\"\\"(?!\\")","endCaptures":{"0":{"name":"punctuation.section.embedded.end.nim"},"1":{"name":"source.asm"}},"name":"meta.embedded.block.asm","patterns":[{"begin":"\\\\\`","end":"\\\\\`","name":"keyword.operator.nim"},{"include":"source.asm"}]}]},{"captures":{"1":{"name":"storage.type.function.nim"},"2":{"name":"keyword.operator.nim"}},"comment":"tmpl specifier","match":"(tmpl(i)?)(?=( (html|xml|js|css|glsl|md))?\\"\\"\\")"},{"begin":"(^\\\\s*)?(?=html\\"\\"\\")","beginCaptures":{"0":{"name":"punctuation.whitespace.embedded.leading.nim"}},"end":"(?!\\\\G)(\\\\s*$\\\\n?)?","endCaptures":{"0":{"name":"punctuation.whitespace.embedded.trailing.nim"}},"patterns":[{"begin":"(html)(\\"\\"\\")","captures":{"1":{"name":"keyword.other.nim"},"2":{"name":"punctuation.section.embedded.begin.nim"}},"contentName":"text.html","end":"(\\")\\"\\"(?!\\")","endCaptures":{"0":{"name":"punctuation.section.embedded.end.nim"},"1":{"name":"text.html"}},"name":"meta.embedded.block.html","patterns":[{"begin":"(?<!\\\\$)(\\\\$)\\\\(","captures":{"1":{"name":"keyword.operator.nim"}},"end":"\\\\)","patterns":[{"include":"source.nim"}]},{"begin":"(?<!\\\\$)(\\\\$)\\\\{","captures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"keyword.operator.nim"}},"end":"\\\\}","patterns":[{"include":"source.nim"}]},{"begin":"(?<!\\\\$)(\\\\$)(for|while|case|of|when|if|else|elif)( )","captures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"keyword.operator.nim"}},"end":"(\\\\{|\\\\n)","endCaptures":{"1":{"name":"plain"}},"patterns":[{"include":"source.nim"}]},{"match":"(?<!\\\\$)(\\\\$\\\\w+)","name":"keyword.operator.nim"},{"include":"text.html.basic"}]}]},{"begin":"(^\\\\s*)?(?=xml\\"\\"\\")","beginCaptures":{"0":{"name":"punctuation.whitespace.embedded.leading.nim"}},"end":"(?!\\\\G)(\\\\s*$\\\\n?)?","endCaptures":{"0":{"name":"punctuation.whitespace.embedded.trailing.nim"}},"patterns":[{"begin":"(xml)(\\"\\"\\")","captures":{"1":{"name":"keyword.other.nim"},"2":{"name":"punctuation.section.embedded.begin.nim"}},"contentName":"text.xml","end":"(\\")\\"\\"(?!\\")","endCaptures":{"0":{"name":"punctuation.section.embedded.end.nim"},"1":{"name":"text.xml"}},"name":"meta.embedded.block.xml","patterns":[{"begin":"(?<!\\\\$)(\\\\$)\\\\(","captures":{"1":{"name":"keyword.operator.nim"}},"end":"\\\\)","patterns":[{"include":"source.nim"}]},{"begin":"(?<!\\\\$)(\\\\$)\\\\{","captures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"keyword.operator.nim"}},"end":"\\\\}","patterns":[{"include":"source.nim"}]},{"begin":"(?<!\\\\$)(\\\\$)(for|while|case|of|when|if|else|elif)( )","captures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"keyword.operator.nim"}},"end":"(\\\\{|\\\\n)","endCaptures":{"1":{"name":"plain"}},"patterns":[{"include":"source.nim"}]},{"match":"(?<!\\\\$)(\\\\$\\\\w+)","name":"keyword.operator.nim"},{"include":"text.xml"}]}]},{"begin":"(^\\\\s*)?(?=js\\"\\"\\")","beginCaptures":{"0":{"name":"punctuation.whitespace.embedded.leading.nim"}},"end":"(?!\\\\G)(\\\\s*$\\\\n?)?","endCaptures":{"0":{"name":"punctuation.whitespace.embedded.trailing.nim"}},"patterns":[{"begin":"(js)(\\"\\"\\")","captures":{"1":{"name":"keyword.other.nim"},"2":{"name":"punctuation.section.embedded.begin.nim"}},"contentName":"source.js","end":"(\\")\\"\\"(?!\\")","endCaptures":{"0":{"name":"punctuation.section.embedded.end.nim"},"1":{"name":"source.js"}},"name":"meta.embedded.block.js","patterns":[{"begin":"(?<!\\\\$)(\\\\$)\\\\(","captures":{"1":{"name":"keyword.operator.nim"}},"end":"\\\\)","patterns":[{"include":"source.nim"}]},{"begin":"(?<!\\\\$)(\\\\$)\\\\{","captures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"keyword.operator.nim"}},"end":"\\\\}","patterns":[{"include":"source.nim"}]},{"begin":"(?<!\\\\$)(\\\\$)(for|while|case|of|when|if|else|elif)( )","captures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"keyword.operator.nim"}},"end":"(\\\\{|\\\\n)","endCaptures":{"1":{"name":"plain"}},"patterns":[{"include":"source.nim"}]},{"match":"(?<!\\\\$)(\\\\$\\\\w+)","name":"keyword.operator.nim"},{"include":"source.js"}]}]},{"begin":"(^\\\\s*)?(?=css\\"\\"\\")","beginCaptures":{"0":{"name":"punctuation.whitespace.embedded.leading.nim"}},"end":"(?!\\\\G)(\\\\s*$\\\\n?)?","endCaptures":{"0":{"name":"punctuation.whitespace.embedded.trailing.nim"}},"patterns":[{"begin":"(css)(\\"\\"\\")","captures":{"1":{"name":"keyword.other.nim"},"2":{"name":"punctuation.section.embedded.begin.nim"}},"contentName":"source.css","end":"(\\")\\"\\"(?!\\")","endCaptures":{"0":{"name":"punctuation.section.embedded.end.nim"},"1":{"name":"source.css"}},"name":"meta.embedded.block.css","patterns":[{"begin":"(?<!\\\\$)(\\\\$)\\\\(","captures":{"1":{"name":"keyword.operator.nim"}},"end":"\\\\)","patterns":[{"include":"source.nim"}]},{"begin":"(?<!\\\\$)(\\\\$)\\\\{","captures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"keyword.operator.nim"}},"end":"\\\\}","patterns":[{"include":"source.nim"}]},{"begin":"(?<!\\\\$)(\\\\$)(for|while|case|of|when|if|else|elif)( )","captures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"keyword.operator.nim"}},"end":"(\\\\{|\\\\n)","endCaptures":{"1":{"name":"plain"}},"patterns":[{"include":"source.nim"}]},{"match":"(?<!\\\\$)(\\\\$\\\\w+)","name":"keyword.operator.nim"},{"include":"source.css"}]}]},{"begin":"(^\\\\s*)?(?=glsl\\"\\"\\")","beginCaptures":{"0":{"name":"punctuation.whitespace.embedded.leading.nim"}},"end":"(?!\\\\G)(\\\\s*$\\\\n?)?","endCaptures":{"0":{"name":"punctuation.whitespace.embedded.trailing.nim"}},"patterns":[{"begin":"(glsl)(\\"\\"\\")","captures":{"1":{"name":"keyword.other.nim"},"2":{"name":"punctuation.section.embedded.begin.nim"}},"contentName":"source.glsl","end":"(\\")\\"\\"(?!\\")","endCaptures":{"0":{"name":"punctuation.section.embedded.end.nim"},"1":{"name":"source.glsl"}},"name":"meta.embedded.block.glsl","patterns":[{"begin":"(?<!\\\\$)(\\\\$)\\\\(","captures":{"1":{"name":"keyword.operator.nim"}},"end":"\\\\)","patterns":[{"include":"source.nim"}]},{"begin":"(?<!\\\\$)(\\\\$)\\\\{","captures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"keyword.operator.nim"}},"end":"\\\\}","patterns":[{"include":"source.nim"}]},{"begin":"(?<!\\\\$)(\\\\$)(for|while|case|of|when|if|else|elif)( )","captures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"keyword.operator.nim"}},"end":"(\\\\{|\\\\n)","endCaptures":{"1":{"name":"plain"}},"patterns":[{"include":"source.nim"}]},{"match":"(?<!\\\\$)(\\\\$\\\\w+)","name":"keyword.operator.nim"},{"include":"source.glsl"}]}]},{"begin":"(^\\\\s*)?(?=md\\"\\"\\")","beginCaptures":{"0":{"name":"punctuation.whitespace.embedded.leading.nim"}},"end":"(?!\\\\G)(\\\\s*$\\\\n?)?","endCaptures":{"0":{"name":"punctuation.whitespace.embedded.trailing.nim"}},"patterns":[{"begin":"(md)(\\"\\"\\")","captures":{"1":{"name":"keyword.other.nim"},"2":{"name":"punctuation.section.embedded.begin.nim"}},"contentName":"text.html.markdown","end":"(\\")\\"\\"(?!\\")","endCaptures":{"0":{"name":"punctuation.section.embedded.end.nim"},"1":{"name":"text.html.markdown"}},"name":"meta.embedded.block.html.markdown","patterns":[{"begin":"(?<!\\\\$)(\\\\$)\\\\(","captures":{"1":{"name":"keyword.operator.nim"}},"end":"\\\\)","patterns":[{"include":"source.nim"}]},{"begin":"(?<!\\\\$)(\\\\$)\\\\{","captures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"keyword.operator.nim"}},"end":"\\\\}","patterns":[{"include":"source.nim"}]},{"begin":"(?<!\\\\$)(\\\\$)(for|while|case|of|when|if|else|elif)( )","captures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"keyword.operator.nim"}},"end":"(\\\\{|\\\\n)","endCaptures":{"1":{"name":"plain"}},"patterns":[{"include":"source.nim"}]},{"match":"(?<!\\\\$)(\\\\$\\\\w+)","name":"keyword.operator.nim"},{"include":"text.html.markdown"}]}]}],"repository":{"char_escapes":{"patterns":[{"match":"\\\\\\\\[cC]|\\\\\\\\[rR]","name":"constant.character.escape.carriagereturn.nim"},{"match":"\\\\\\\\[lL]|\\\\\\\\[nN]","name":"constant.character.escape.linefeed.nim"},{"match":"\\\\\\\\[fF]","name":"constant.character.escape.formfeed.nim"},{"match":"\\\\\\\\[tT]","name":"constant.character.escape.tabulator.nim"},{"match":"\\\\\\\\[vV]","name":"constant.character.escape.verticaltabulator.nim"},{"match":"\\\\\\\\\\\\\\"","name":"constant.character.escape.double-quote.nim"},{"match":"\\\\\\\\'","name":"constant.character.escape.single-quote.nim"},{"match":"\\\\\\\\\\\\d+","name":"constant.character.escape.chardecimalvalue.nim"},{"match":"\\\\\\\\[aA]","name":"constant.character.escape.alert.nim"},{"match":"\\\\\\\\[bB]","name":"constant.character.escape.backspace.nim"},{"match":"\\\\\\\\[eE]","name":"constant.character.escape.escape.nim"},{"match":"\\\\\\\\[xX]\\\\h\\\\h","name":"constant.character.escape.hex.nim"},{"match":"\\\\\\\\\\\\\\\\","name":"constant.character.escape.backslash.nim"}]},"extended_string_quoted_double_raw":{"begin":"\\\\b(\\\\w+)(\\")","beginCaptures":{"1":{"name":"support.function.any-method.nim"},"2":{"name":"punctuation.definition.string.begin.nim"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.double.raw.nim","patterns":[{"include":"#raw_string_escapes"}]},"extended_string_quoted_triple_raw":{"begin":"\\\\b(\\\\w+)(\\"\\"\\")","beginCaptures":{"1":{"name":"support.function.any-method.nim"},"2":{"name":"punctuation.definition.string.begin.nim"}},"end":"\\"\\"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.triple.raw.nim"},"float_literal":{"patterns":[{"match":"\\\\b\\\\d[_\\\\d]*((\\\\.\\\\d[_\\\\d]*([eE][+\\\\-]?\\\\d[_\\\\d]*)?)|([eE][+\\\\-]?\\\\d[_\\\\d]*))('([fF](32|64|128)|[fFdD]))?","name":"constant.numeric.float.decimal.nim"},{"match":"\\\\b0[xX]\\\\h[_\\\\h]*'([fF](32|64|128)|[fFdD])","name":"constant.numeric.float.hexadecimal.nim"},{"match":"\\\\b0o[0-7][_0-7]*'([fF](32|64|128)|[fFdD])","name":"constant.numeric.float.octal.nim"},{"match":"\\\\b0(b|B)[01][_01]*'([fF](32|64|128)|[fFdD])","name":"constant.numeric.float.binary.nim"},{"match":"\\\\b(\\\\d[_\\\\d]*)'([fF](32|64|128)|[fFdD])","name":"constant.numeric.float.decimal.nim"}]},"fmt_interpolation":{"begin":"\\\\{","beginCaptures":{"0":{"name":"punctuation.definition.template-expression.begin.nim"}},"end":"\\\\}","endCaptures":{"0":{"name":"punctuation.definition.template-expression.end.nim"}},"name":"meta.template.expression.nim","patterns":[{"begin":":","end":"(?=\\\\})","name":"meta.template.format-specifier.nim"},{"include":"source.nim"}]},"fmt_string":{"begin":"\\\\b(fmt)(\\")","beginCaptures":{"1":{"name":"support.function.any-method.nim"},"2":{"name":"punctuation.definition.string.begin.nim"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.double.raw.nim","patterns":[{"match":"(?<!\\")\\"(?!\\")","name":"invalid.illegal.nim"},{"include":"#raw_string_escapes"},{"include":"#fmt_interpolation"}]},"fmt_string_call":{"begin":"(fmt)\\\\((?=\\")","beginCaptures":{"1":{"name":"support.function.any-method.nim"}},"end":"\\\\)","patterns":[{"begin":"\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.nim"}},"end":"\\"(?=\\\\))","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.double.nim","patterns":[{"match":"\\"","name":"invalid.illegal.nim"},{"include":"#string_escapes"},{"include":"#fmt_interpolation"}]}]},"fmt_string_operator":{"begin":"(&)(\\")","beginCaptures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"punctuation.definition.string.begin.nim"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.double.nim","patterns":[{"match":"\\"","name":"invalid.illegal.nim"},{"include":"#string_escapes"},{"include":"#fmt_interpolation"}]},"fmt_string_triple":{"begin":"\\\\b(fmt)(\\"\\"\\")","beginCaptures":{"1":{"name":"support.function.any-method.nim"},"2":{"name":"punctuation.definition.string.begin.nim"}},"end":"\\"\\"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.triple.raw.nim","patterns":[{"include":"#fmt_interpolation"}]},"fmt_string_triple_operator":{"begin":"(&)(\\"\\"\\")","beginCaptures":{"1":{"name":"keyword.operator.nim"},"2":{"name":"punctuation.definition.string.begin.nim"}},"end":"\\"\\"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.triple.raw.nim","patterns":[{"include":"#fmt_interpolation"}]},"integer_literal":{"patterns":[{"match":"\\\\b(0[xX]\\\\h[_\\\\h]*)('(([iIuU](8|16|32|64))|[uU]))?","name":"constant.numeric.integer.hexadecimal.nim"},{"match":"\\\\b(0o[0-7][_0-7]*)('(([iIuU](8|16|32|64))|[uU]))?","name":"constant.numeric.integer.octal.nim"},{"match":"\\\\b(0(b|B)[01][_01]*)('(([iIuU](8|16|32|64))|[uU]))?","name":"constant.numeric.integer.binary.nim"},{"match":"\\\\b(\\\\d[_\\\\d]*)('(([iIuU](8|16|32|64))|[uU]))?","name":"constant.numeric.integer.decimal.nim"}]},"multilinecomment":{"begin":"#\\\\[","end":"\\\\]#","patterns":[{"include":"#multilinecomment"}]},"multilinedoccomment":{"begin":"##\\\\[","end":"\\\\]##","patterns":[{"include":"#multilinedoccomment"}]},"raw_string_escapes":{"captures":{"1":{"name":"constant.character.escape.double-quote.nim"}},"match":"[^\\"](\\"\\")"},"string_escapes":{"patterns":[{"match":"\\\\\\\\[pP]","name":"constant.character.escape.newline.nim"},{"match":"\\\\\\\\[uU]\\\\h\\\\h\\\\h\\\\h","name":"constant.character.escape.hex.nim"},{"match":"\\\\\\\\[uU]\\\\{\\\\h+\\\\}","name":"constant.character.escape.hex.nim"},{"include":"#char_escapes"}]},"string_literal":{"patterns":[{"include":"#fmt_string_triple"},{"include":"#fmt_string_triple_operator"},{"include":"#extended_string_quoted_triple_raw"},{"include":"#string_quoted_triple_raw"},{"include":"#fmt_string_operator"},{"include":"#fmt_string"},{"include":"#fmt_string_call"},{"include":"#string_quoted_double_raw"},{"include":"#extended_string_quoted_double_raw"},{"include":"#string_quoted_single"},{"include":"#string_quoted_triple"},{"include":"#string_quoted_double"}]},"string_quoted_double":{"begin":"\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.nim"}},"comment":"Double Quoted String","end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.double.nim","patterns":[{"include":"#string_escapes"}]},"string_quoted_double_raw":{"begin":"\\\\br\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.nim"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.double.raw.nim","patterns":[{"include":"#raw_string_escapes"}]},"string_quoted_single":{"begin":"'","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.nim"}},"comment":"Single quoted character literal","end":"'","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.single.nim","patterns":[{"include":"#char_escapes"},{"match":"([^']{2,}?)","name":"invalid.illegal.character.nim"}]},"string_quoted_triple":{"begin":"\\"\\"\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.nim"}},"comment":"Triple Quoted String","end":"\\"\\"\\"(?!\\")","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.triple.nim"},"string_quoted_triple_raw":{"begin":"r\\"\\"\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.nim"}},"comment":"Raw Triple Quoted String","end":"\\"\\"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.nim"}},"name":"string.quoted.triple.raw.nim"}},"scopeName":"source.nim","embeddedLangs":["c","html","xml","javascript","css","glsl","markdown"]}`)),h=[...e,...n,...t,...a,...i,...m,...r,o];export{h as default};
