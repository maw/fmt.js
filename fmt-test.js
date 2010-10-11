var fmt = require("./fmt").fmt;

var check = function (expected, got) {
    var out = fmt("expected: %{e}; got %{g}; success: %{s}",
                  {e: expected, g: got, s: (expected === got)});
    console.log(out);
};

var e, g;

e = "an unchanged string";
g = fmt("an unchanged string", {});
check(e, g);

e = "an unchanged string";
g = fmt("an unchanged string", null);
check(e, g);

e = "hello my friends";
g = fmt("hello my %{f}", {f: "friends"});
check(e, g);

e = "mr bob dobalina";
g = fmt("mr %{bob} %{dobalina}", {bob: "bob", dobalina: "dobalina"});
check(e, g);

e = "abc123 %%{whatever!}";
g = fmt("abc123 %%{whatever!}", {whatever: "shouldn't be printed"});
check(e, g);


try {
    var g4 = fmt("abc123 %{nt", {nt: "shouldn't be printed"});
    check(e, g);
} catch (e) {
    // that was expected
}

try {
    var g5 = fmt("give it 110%!", {});
    check(e, g);
} catch (e) {
    // also expected
}
