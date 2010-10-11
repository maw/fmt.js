$(document).ready(function () {
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
        "{": "opening brace",
        "}": "closing brace"
    };
    
    var check = equals;
    var e, g;
    
    test("unchanged string", function () {
        e = "an unchanged string";
        g = fmt("an unchanged string", {});
        
        equals(e, g, "strings with no format directives are not changed");
        
        g = fmt("an unchanged string", null);
        equals(e, g, "strings with no format directives are not changed");
        
        g = fmt("an unchanged string", args);
        equals(e, g, "strings with no format directives are not changed");
    });
    
    test("very basic substitution", function () {
        e = "ok";
        g = fmt("%{o}", args);
        check(e, g);

        e = "ok1";
        g = fmt("%{o}1", args);
        check(e, g);
        
        e = "hello my friends";
        g = fmt("hello my %{f}", args);
        check(e, g);
    });
    
    test("multiple substitutions", function () {
        e = "mr bob dobalina";
        g = fmt("mr %{bob} %{dobalina}", args);
        check(e, g);
    });

    test("%%{whatever} is not interpolated", function () {
        e = "abc123 %%{whatever!}";
        g = fmt("abc123 %%{whatever!}", args);
        check(e, g);
    });

    test("nonstring values", function () {
        e = "pi is roughly 3.14159";
        g = fmt("pi is roughly %{pi}", args);
        check(e, g);

        e = "if what i tell you isn't false then it must be true";
        g = fmt("if what i tell you isn't %{false} then it must be %{true}", args);
        check(e, g);
    });
    
    test("multiword keys", function () {
        e = "please allow me to say a few words";
        g = fmt("please allow me to say %{several words}", args);
        check(e, g);
    });
    
    test("keys you definitely shouldn't use", function () {
        
        e = "don't quote me on that";
        g = fmt("don't %{\"} me on that", args);
        check(e, g);

        e = "don't \" me on that";
        g = fmt("don't %{quote} me on that", args);
        check(e, g);

        e = "closing brace";
        g = fmt("%{\\}}", args);
        check(e, g);

        e = "c uses opening braces and closing braces; lisp uses parenthesis";
        g = fmt("c uses %{{}s and %{\\}}s; lisp uses parenthesis", args);
        check(e, g);

        e = "aliens from outer space";
        g = fmt("aliens from outer %{ }", args);
        check(e, g);

    });
    
    // This is undefined for now, so we don't test it.
    /* test("this is undefined", function () {
        e = "no idea";
        g = fmt("%{}", {});
        check(e, g);
    });  */
    
    test("unterminated specifier", function () {
        try {
            var g4 = fmt("abc123 %{nt", {nt: "shouldn't be printed"});
        } catch (e) {
            check(e, "unterminated format string");
        }
    });

    test("invalid format string", function () {
        try {
            var g5 = fmt("give it 110%!", {});
        } catch (e) {
            check(e, "% must be followed by either '%' or '{'");
        }
    });
});