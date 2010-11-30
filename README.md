fmt.js - sprintf done right
===========================

Or so I hope.

`fmt` is a simple function that takes a format string and an object containing
key/value pairs and does some interpolation.

Examples speak louder than words, so here's a few:

    michaelwolf@fountain:~/devel/fmt.js <master> $ node
    Type '.help' for options.
    node> fmt = require("./fmt").fmt
    [Function]
    node> args = {w: "world", pi: 3.14159, "}": "closing brace"};
    { w: 'world', pi: 3.14159, '}': 'closing brace' }
    node> fmt("hello %{w}", args);
    'hello world'
    node> fmt("one pumpkin %{pi} and one gillies meat %{pi} please", args);
    'one pumpkin 3.14159 and one gillies meat 3.14159 please'
    node> fmt("c uses opening and closing %{\\}}s; lisp uses parenthesis", args);
    'c uses opening and closing closing braces; lisp uses parenthesis'

Pretty convenient.  Anything, with one exception, that's a valid key in a
javascript object can go between `"%{"` and `"}"`.  The exception is `,`, which
is used to separate additional formatting directives from keys.  However, as a
matter of style and maintainability, you would probably do well to limit
yourself to keys matching `/[a-zA-Z][a-zA-Z0-9_]*/`.  In particular, it gets
ugly when you use keys containing `}`.

Issues:

* Some additional testing would not go astray.

* It's unclear whether `"%{}"` should "expand" into into `""`, throw an
  exception, or do something else entirely.  For now, it's undefined;
  don't do it.
  
  (One idea: use %{} for one-off substitutions:
    fmt("hello %{}", "world"); => "hello world")
  
* The error reporting isn't fantastic.

* I'm told a number of the tests fail on IE (not sure which version, and
  I don't have the means to easily test this in any case).

* Maybe it would be a win to cache the results of parsing format strings.

* Maybe some extra magic added to the placeholders would be useful