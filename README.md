fmt.js - sprintf done right
===========================

Or so I hope.

fmt is a simple function that takes a format string, an object containing
key/value pairs, and does some interpolation.

A few examples:

    michaelwolf@fountain:~/devel/fmt.js <master> $ node
    Type '.help' for options.
    node> fmt = require("./fmt").fmt
    [Function]
    node> args = {w: "world", pi: 3.14159, "}": "closing brace"};
    { w: 'world', pi: 3.14159, '}': 'closing brace' }
    node> fmt("hello %{w}", args);
    'hello world'
    node> fmt("pumpkin %{pi}", args);
    'pumpkin 3.14159'
    node> fmt("c uses { and %{\}}; lisp uses ( and )", args);
    'c uses { and }; lisp uses ( and )'

Pretty convenient.  Anything that's a valid key in a javascript object
can go between `"%{"` and `"}"`, although as a matter of style and 
maintainability,  you would probably do well to limit yourself to keys
matching `/[a-zA-Z][a-zA-Z0-9_]*/`.

Issues:

* Some additional testing would not go astray.

* It's unclear whether `"%{}"` should "expand" into into `""`, throw an
  exception, or do something else entirely.  For now, it's undefined;
  don't do it.

* The error reporting isn't fantastic.
