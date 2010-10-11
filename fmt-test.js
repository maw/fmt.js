var sys = require("sys");

var fmt = require("./fmt").fmt;

var check = function (expected, got) {
    var out = "expected:\t>>>" + expected + "<<<\n" +
        "       got:\t\t>>>" + got + "<<<\n" +
        "       success:\t\t" + (expected === got);
    sys.debug(out);

};

var e, g;

var args = {
    " ": "space",
    bob: "bob",
    dobalina: "dobalina",
    f: "friends",
    "false": false,
    o: "ok",
    quote: '"',
    '"': "quote",
    pi: 3.14159,
    "several words": "a few words",
    "true": true,
    "{": "{",
    "}": "}"
};

e = "an unchanged string";
g = fmt("an unchanged string", {});
check(e, g);

e = "an unchanged string";
g = fmt("an unchanged string", null);
check(e, g);

e = "an unchanged string";
g = fmt("an unchanged string", args);
check(e, g);

// sys.debug("real simple");
e = "ok";
g = fmt("%{o}", args);
check(e, g);

e = "ok1";
g = fmt("%{o}1", args);
check(e, g);
// sys.debug(e);
// sys.debug(g);
// sys.debug("====");


e = "hello my friends";
g = fmt("hello my %{f}", args);
check(e, g);

e = "mr bob dobalina";
g = fmt("mr %{bob} %{dobalina}", args);
check(e, g);

e = "abc123 %%{whatever!}";
g = fmt("abc123 %%{whatever!}", args);
check(e, g);

e = "pi is roughly 3.14159";
g = fmt("pi is roughly %{pi}", args);
check(e, g);

e = "if what i tell you isn't false then it must be true";
g = fmt("if what i tell you isn't %{false} then it must be %{true}", args);
check(e, g);

e = "please allow me to say a few words";
g = fmt("please allow me to say %{several words}", args);
check(e, g);

e = "don't quote me on that";
g = fmt("don't %{\"} me on that", args);
check(e, g);

e = "don't \" me on that";
g = fmt("don't %{quote} me on that", args);
check(e, g);

// This fails; we could just define it away, but shouldn't
e = "c uses { and } and lisp uses ( and )";
g = fmt("c uses %{{} and %{\}} and lisp uses ( and )", args);
check(e, g);

e = "aliens from outer space";
g = fmt("aliens from outer %{ }", args);
check(e, g);

// What should this return?
fmt("%{}", {});

try {
    var g4 = fmt("abc123 %{nt", {nt: "shouldn't be printed"});
} catch (e) {
    check(e, "unterminated format string");
}

try {
    var g5 = fmt("give it 110%!", {});
} catch (e) {
    check(e, "% must be followed by either '%' or '{'");
}
