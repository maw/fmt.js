fmt.js - sprintf done right
===========================

Or so I hope.

`fmt` is a simple function that takes a format string and an object containing
key/value pairs and does some interpolation.

A few examples:

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

Pretty convenient.  Anything that's a valid key in a javascript object
can go between `"%{"` and `"}"`, although as a matter of style and 
maintainability,  you would probably do well to limit yourself to keys
matching `/[a-zA-Z][a-zA-Z0-9_]*/`.  In particular, it gets ugly when you
use keys containing `}`.

Issues:

* Some additional testing would not go astray.

* It's unclear whether `"%{}"` should "expand" into into `""`, throw an
  exception, or do something else entirely.  For now, it's undefined;
  don't do it.

* The error reporting isn't fantastic.
