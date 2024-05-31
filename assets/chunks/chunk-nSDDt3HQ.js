import e from"./chunk-RCJZWN-0.js";const a=Object.freeze({displayName:"Lua",name:"lua",patterns:[{begin:"\\b(?:(local)\\s+)?(function)\\b(?![,:])",beginCaptures:{1:{name:"keyword.local.lua"},2:{name:"keyword.control.lua"}},end:`(?<=[\\)\\-{}\\[\\]"'])`,name:"meta.function.lua",patterns:[{include:"#comment"},{begin:"(\\()",beginCaptures:{1:{name:"punctuation.definition.parameters.begin.lua"}},end:`(\\))|(?=[\\-\\.{}\\[\\]"'])`,endCaptures:{1:{name:"punctuation.definition.parameters.finish.lua"}},name:"meta.parameter.lua",patterns:[{include:"#comment"},{match:"[a-zA-Z_][a-zA-Z0-9_]*",name:"variable.parameter.function.lua"},{match:",",name:"punctuation.separator.arguments.lua"},{begin:":",beginCaptures:{0:{name:"punctuation.separator.arguments.lua"}},end:"(?=[\\),])",patterns:[{include:"#emmydoc.type"}]}]},{match:"\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b\\s*(?=:)",name:"entity.name.class.lua"},{match:"\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b",name:"entity.name.function.lua"}]},{match:"(?<![\\w\\d.])0[xX][0-9A-Fa-f]+(\\.[0-9A-Fa-f]*)?([eE]-?\\d*)?([pP][-+]\\d+)?",name:"constant.numeric.float.hexadecimal.lua"},{match:"(?<![\\w\\d.])0[xX]\\.[0-9A-Fa-f]+([eE]-?\\d*)?([pP][-+]\\d+)?",name:"constant.numeric.float.hexadecimal.lua"},{match:"(?<![\\w\\d.])0[xX][0-9A-Fa-f]+(?![pPeE.0-9])",name:"constant.numeric.integer.hexadecimal.lua"},{match:"(?<![\\w\\d.])\\d+(\\.\\d*)?([eE]-?\\d*)?",name:"constant.numeric.float.lua"},{match:"(?<![\\w\\d.])\\.\\d+([eE]-?\\d*)?",name:"constant.numeric.float.lua"},{match:"(?<![\\w\\d.])\\d+(?![pPeE.0-9])",name:"constant.numeric.integer.lua"},{include:"#string"},{captures:{1:{name:"punctuation.definition.comment.lua"}},match:"\\A(#!).*$\\n?",name:"comment.line.shebang.lua"},{include:"#comment"},{captures:{1:{name:"keyword.control.goto.lua"},2:{name:"string.tag.lua"}},match:"\\b(goto)\\s+([a-zA-Z_][a-zA-Z0-9_]*)"},{captures:{1:{name:"punctuation.section.embedded.begin.lua"},2:{name:"punctuation.section.embedded.end.lua"}},match:"(::)\\s*[a-zA-Z_][a-zA-Z0-9_]*\\s*(::)",name:"string.tag.lua"},{captures:{0:{name:"storage.type.attribute.lua"}},match:"<\\s*(const|close)\\s*>"},{match:"\\<[a-zA-Z_\\*][a-zA-Z0-9_\\.\\*\\-]*\\>",name:"storage.type.generic.lua"},{match:"\\b(break|do|else|for|if|elseif|goto|return|then|repeat|while|until|end|in)\\b",name:"keyword.control.lua"},{match:"\\b(local)\\b",name:"keyword.local.lua"},{match:"\\b(function)\\b(?![,:])",name:"keyword.control.lua"},{match:"(?<![^.]\\.|:)\\b(false|nil(?!:)|true|_ENV|_G|_VERSION|math\\.(pi|huge|maxinteger|mininteger)|utf8\\.charpattern|io\\.(stdin|stdout|stderr)|package\\.(config|cpath|loaded|loaders|path|preload|searchers))\\b|(?<![.])\\.{3}(?!\\.)",name:"constant.language.lua"},{match:"(?<![^.]\\.|:)\\b(self)\\b",name:"variable.language.self.lua"},{match:"(?<![^.]\\.|:)\\b(assert|collectgarbage|dofile|error|getfenv|getmetatable|ipairs|load|loadfile|loadstring|module|next|pairs|pcall|print|rawequal|rawget|rawlen|rawset|require|select|setfenv|setmetatable|tonumber|tostring|type|unpack|xpcall)\\b(?!\\s*=(?!=))",name:"support.function.lua"},{match:"(?<![^.]\\.|:)\\b(async)\\b(?!\\s*=(?!=))",name:"entity.name.tag.lua"},{match:"(?<![^.]\\.|:)\\b(coroutine\\.(create|isyieldable|close|resume|running|status|wrap|yield)|string\\.(byte|char|dump|find|format|gmatch|gsub|len|lower|match|pack|packsize|rep|reverse|sub|unpack|upper)|table\\.(concat|insert|maxn|move|pack|remove|sort|unpack)|math\\.(abs|acos|asin|atan2?|ceil|cosh?|deg|exp|floor|fmod|frexp|ldexp|log|log10|max|min|modf|pow|rad|random|randomseed|sinh?|sqrt|tanh?|tointeger|type)|io\\.(close|flush|input|lines|open|output|popen|read|tmpfile|type|write)|os\\.(clock|date|difftime|execute|exit|getenv|remove|rename|setlocale|time|tmpname)|package\\.(loadlib|seeall|searchpath)|debug\\.(debug|[gs]etfenv|[gs]ethook|getinfo|[gs]etlocal|[gs]etmetatable|getregistry|[gs]etupvalue|[gs]etuservalue|set[Cc]stacklimit|traceback|upvalueid|upvaluejoin)|bit32\\.(arshift|band|bnot|bor|btest|bxor|extract|replace|lrotate|lshift|rrotate|rshift)|utf8\\.(char|codes|codepoint|len|offset))\\b(?!\\s*=(?!=))",name:"support.function.library.lua"},{match:"\\b(and|or|not|\\|\\||\\&\\&|\\!)\\b",name:"keyword.operator.lua"},{match:`\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b(?=\\s*(?:[({"']|\\[\\[))`,name:"support.function.any-method.lua"},{match:"\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b(?=\\s*\\??:)",name:"entity.name.class.lua"},{match:"(?<=[^.]\\.|:)\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b(?!\\s*=\\s*\\b(function)\\b)",name:"entity.other.attribute.lua"},{match:"\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b(?!\\s*=\\s*\\b(function)\\b)",name:"variable.other.lua"},{match:"\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b(?=\\s*=\\s*\\b(function)\\b)",name:"entity.name.function.lua"},{match:"\\+|-|%|#|\\*|\\/|\\^|==?|~=|!=|<=?|>=?|(?<!\\.)\\.{2}(?!\\.)",name:"keyword.operator.lua"}],repository:{comment:{patterns:[{begin:"(^[ \\t]+)?(?=--)",beginCaptures:{1:{name:"punctuation.whitespace.comment.leading.lua"}},end:"(?!\\G)((?!^)[ \\t]+\\n)?",endCaptures:{1:{name:"punctuation.whitespace.comment.trailing.lua"}},patterns:[{begin:"--\\[(=*)\\[@@@",beginCaptures:{0:{name:"punctuation.definition.comment.begin.lua"}},end:"(--)?\\]\\1\\]",endCaptures:{0:{name:"punctuation.definition.comment.end.lua"}},name:"",patterns:[{include:"source.lua"}]},{begin:"--\\[(=*)\\[",beginCaptures:{0:{name:"punctuation.definition.comment.begin.lua"}},end:"(--)?\\]\\1\\]",endCaptures:{0:{name:"punctuation.definition.comment.end.lua"}},name:"comment.block.lua",patterns:[{include:"#emmydoc"},{include:"#ldoc_tag"}]},{begin:"----",beginCaptures:{0:{name:"punctuation.definition.comment.lua"}},end:"\\n",name:"comment.line.double-dash.lua"},{begin:"---",beginCaptures:{0:{name:"punctuation.definition.comment.lua"}},end:"\\n",name:"comment.line.double-dash.documentation.lua",patterns:[{include:"#emmydoc"},{include:"#ldoc_tag"}]},{begin:"--",beginCaptures:{0:{name:"punctuation.definition.comment.lua"}},end:"\\n",name:"comment.line.double-dash.lua",patterns:[{include:"#ldoc_tag"}]}]},{begin:"\\/\\*",beginCaptures:{0:{name:"punctuation.definition.comment.begin.lua"}},end:"\\*\\/",endCaptures:{0:{name:"punctuation.definition.comment.end.lua"}},name:"comment.block.lua",patterns:[{include:"#emmydoc"},{include:"#ldoc_tag"}]}]},emmydoc:{patterns:[{begin:"(?<=---)[ \\t]*@class",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{match:"\\b([a-zA-Z_\\*][a-zA-Z0-9_\\.\\*\\-]*)",name:"support.class.lua"},{match:":|,",name:"keyword.operator.lua"}]},{begin:"(?<=---)[ \\t]*@enum",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{begin:"\\b([a-zA-Z_\\*][a-zA-Z0-9_\\.\\*\\-]*)",beginCaptures:{0:{name:"variable.lua"}},end:"(?=\\n)"}]},{begin:"(?<=---)[ \\t]*@type",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{include:"#emmydoc.type"}]},{begin:"(?<=---)[ \\t]*@alias",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{begin:"\\b([a-zA-Z_\\*][a-zA-Z0-9_\\.\\*\\-]*)",beginCaptures:{0:{name:"variable.lua"}},end:"(?=[\\n#])",patterns:[{include:"#emmydoc.type"}]}]},{begin:"(?<=---)[ \\t]*(@operator)\\s*(\\b[a-z]+)?",beginCaptures:{1:{name:"storage.type.annotation.lua"},2:{name:"support.function.library.lua"}},end:"(?=[\\n@#])",patterns:[{include:"#emmydoc.type"}]},{begin:"(?<=---)[ \\t]*@cast",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{begin:"\\b([a-zA-Z_\\*][a-zA-Z0-9_\\.\\*\\-]*)",beginCaptures:{0:{name:"variable.other.lua"}},end:"(?=\\n)",patterns:[{include:"#emmydoc.type"},{match:"([+-|])",name:"keyword.operator.lua"}]}]},{begin:"(?<=---)[ \\t]*@param",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{begin:"\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b(\\??)",beginCaptures:{1:{name:"entity.name.variable.lua"},2:{name:"keyword.operator.lua"}},end:"(?=[\\n#])",patterns:[{include:"#emmydoc.type"}]}]},{begin:"(?<=---)[ \\t]*@return",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{match:"\\?",name:"keyword.operator.lua"},{include:"#emmydoc.type"}]},{begin:"(?<=---)[ \\t]*@field",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{begin:"(\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b|(\\[))(\\??)",beginCaptures:{2:{name:"entity.name.variable.lua"},3:{name:"keyword.operator.lua"}},end:"(?=[\\n#])",patterns:[{include:"#string"},{include:"#emmydoc.type"},{match:"\\]",name:"keyword.operator.lua"}]}]},{begin:"(?<=---)[ \\t]*@generic",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{begin:"\\b([a-zA-Z_][a-zA-Z0-9_]*)\\b",beginCaptures:{0:{name:"storage.type.generic.lua"}},end:"(?=\\n)|(,)",endCaptures:{0:{name:"keyword.operator.lua"}},patterns:[{match:":",name:"keyword.operator.lua"},{include:"#emmydoc.type"}]}]},{begin:"(?<=---)[ \\t]*@vararg",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{include:"#emmydoc.type"}]},{begin:"(?<=---)[ \\t]*@overload",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{include:"#emmydoc.type"}]},{begin:"(?<=---)[ \\t]*@deprecated",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])"},{begin:"(?<=---)[ \\t]*@meta",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])"},{begin:"(?<=---)[ \\t]*@private",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])"},{begin:"(?<=---)[ \\t]*@protected",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])"},{begin:"(?<=---)[ \\t]*@package",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])"},{begin:"(?<=---)[ \\t]*@version",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{match:"\\b(5\\.1|5\\.2|5\\.3|5\\.4|JIT)\\b",name:"support.class.lua"},{match:",|\\>|\\<",name:"keyword.operator.lua"}]},{begin:"(?<=---)[ \\t]*@see",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{match:"\\b([a-zA-Z_\\*][a-zA-Z0-9_\\.\\*\\-]*)",name:"support.class.lua"},{match:"#",name:"keyword.operator.lua"}]},{begin:"(?<=---)[ \\t]*@diagnostic",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{begin:"([a-zA-Z_\\-0-9]+)[ \\t]*(:)?",beginCaptures:{1:{name:"keyword.other.unit"},2:{name:"keyword.operator.unit"}},end:"(?=\\n)",patterns:[{match:"\\b([a-zA-Z_\\*][a-zA-Z0-9_\\-]*)",name:"support.class.lua"},{match:",",name:"keyword.operator.lua"}]}]},{begin:"(?<=---)[ \\t]*@module",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{include:"#string"}]},{match:"(?<=---)[ \\t]*@(async|nodiscard)",name:"storage.type.annotation.lua"},{begin:"(?<=---)\\|\\s*[\\>\\+]?",beginCaptures:{0:{name:"storage.type.annotation.lua"}},end:"(?=[\\n@#])",patterns:[{include:"#string"}]}]},"emmydoc.type":{patterns:[{begin:"\\bfun\\b",beginCaptures:{0:{name:"keyword.control.lua"}},end:"(?=[\\s#])",patterns:[{match:"[\\(\\),:\\?][ \\t]*",name:"keyword.operator.lua"},{match:"([a-zA-Z_][a-zA-Z0-9_\\.\\*\\[\\]\\<\\>\\,\\-]*)(?<!,)[ \\t]*(?=\\??:)",name:"entity.name.variable.lua"},{include:"#emmydoc.type"},{include:"#string"}]},{match:"\\<[a-zA-Z_\\*][a-zA-Z0-9_\\.\\*\\-]*\\>",name:"storage.type.generic.lua"},{match:"\\basync\\b",name:"entity.name.tag.lua"},{match:"[\\{\\}\\:\\,\\?\\|\\`][ \\t]*",name:"keyword.operator.lua"},{begin:`(?=[a-zA-Z_\\.\\*"'\\[])`,end:"(?=[\\s\\)\\,\\?\\:\\}\\|#])",patterns:[{match:"([a-zA-Z0-9_\\.\\*\\[\\]\\<\\>\\,\\-]+)(?<!,)[ \\t]*",name:"support.type.lua"},{match:"(\\.\\.\\.)[ \\t]*",name:"constant.language.lua"},{include:"#string"}]}]},escaped_char:{patterns:[{match:`\\\\[abfnrtv\\\\"'\\n]`,name:"constant.character.escape.lua"},{match:"\\\\z[\\n\\t ]*",name:"constant.character.escape.lua"},{match:"\\\\\\d{1,3}",name:"constant.character.escape.byte.lua"},{match:"\\\\x[0-9A-Fa-f][0-9A-Fa-f]",name:"constant.character.escape.byte.lua"},{match:"\\\\u\\{[0-9A-Fa-f]+\\}",name:"constant.character.escape.unicode.lua"},{match:"\\\\.",name:"invalid.illegal.character.escape.lua"}]},ldoc_tag:{captures:{1:{name:"punctuation.definition.block.tag.ldoc"},2:{name:"storage.type.class.ldoc"}},match:"\\G[ \\t]*(@)(alias|annotation|author|charset|class|classmod|comment|constructor|copyright|description|example|export|factory|field|file|fixme|function|include|lfunction|license|local|module|name|param|pragma|private|raise|release|return|script|section|see|set|static|submodule|summary|tfield|thread|tparam|treturn|todo|topic|type|usage|warning|within)\\b"},string:{patterns:[{begin:"'",beginCaptures:{0:{name:"punctuation.definition.string.begin.lua"}},end:"'[ \\t]*|(?=\\n)",endCaptures:{0:{name:"punctuation.definition.string.end.lua"}},name:"string.quoted.single.lua",patterns:[{include:"#escaped_char"}]},{begin:'"',beginCaptures:{0:{name:"punctuation.definition.string.begin.lua"}},end:'"[ \\t]*|(?=\\n)',endCaptures:{0:{name:"punctuation.definition.string.end.lua"}},name:"string.quoted.double.lua",patterns:[{include:"#escaped_char"}]},{begin:"`",beginCaptures:{0:{name:"punctuation.definition.string.begin.lua"}},end:"`[ \\t]*|(?=\\n)",endCaptures:{0:{name:"punctuation.definition.string.end.lua"}},name:"string.quoted.double.lua"},{begin:"(?<=\\.cdef)\\s*(\\[(=*)\\[)",beginCaptures:{0:{name:"string.quoted.other.multiline.lua"},1:{name:"punctuation.definition.string.begin.lua"}},contentName:"meta.embedded.lua",end:"(\\]\\2\\])[ \\t]*",endCaptures:{0:{name:"string.quoted.other.multiline.lua"},1:{name:"punctuation.definition.string.end.lua"}},patterns:[{include:"source.c"}]},{begin:"(?<!--)\\[(=*)\\[",beginCaptures:{0:{name:"punctuation.definition.string.begin.lua"}},end:"\\]\\1\\][ \\t]*",endCaptures:{0:{name:"punctuation.definition.string.end.lua"}},name:"string.quoted.other.multiline.lua"}]}},scopeName:"source.lua",embeddedLangs:["c"]});var t=[...e,a];export{t as default};
