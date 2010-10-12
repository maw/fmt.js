/*global exports: false */
/*jslint onevar: false */
var fmt = function (fmt_str, args) {
    // var debug = require("sys").debug;
    var debug = function (n) { };
    
    var SIGIL = '%',
        OPEN = '{',
        CLOSE = '}',
        BACKSLASH = "\\";
    var out = [];
    var first = 0;
    var l = fmt_str.length;
    
    for (var i = 0; i < l; i += 1) {
        var c0 = fmt_str[i],
            c1 = fmt_str[i + 1];
        switch (c0) {
        case SIGIL:
            // "%%" resolves to %
            if (c1 === '%') {
                out.push(fmt_str.substr(first, i + 1));
                i += 1;
                first = i;
                continue;
            }
            
            // % followed by anything other than '{' is not allowed
            if (c1 !== OPEN) {
                throw "% must be followed by either '%' or '{'";
            }

            var escaped = false;
            // scan for the closing '}'
            for (var j = i + 2; j < l; j += 1) {
                if (fmt_str[j] === CLOSE) {
                    // debug("current char: " + fmt_str[j]);
                    // debug("penultimate char: " + fmt_str[j - 1]);
                    if (fmt_str[j - 1] === BACKSLASH) {
                        //////// if (fmt_str[j - 1] === CLOSE) {
                        debug("current: " + fmt_str[j]);
                        debug("pencurrent: " + fmt_str[j - 1]);
                        escaped = true;
                        continue;
                    }
                    var key = fmt_str.substring(i + 2, j);
                    if (escaped === true) {
                        key = key.replace("\\}", "}");
                    }
                    debug("key: " + key);
                    
                    // record whatever was between the previous match, if any,
                    // and "%{"
                    var prev = fmt_str.substring(first, i);
                    debug("adding " + prev);
                    out.push(prev);
                    
                    // interpolate
                    debug("adding " + args[key]);
                    out.push(args[key]);
                                        
                    i = j + 1;
                    first = i;
                    
                    break;
                }
            }
            
            // if it isn't found, the format string was bogus:
            if (j === l) {
                throw "unterminated format string";
            }
            
            break;
        default:
            break;
        }
    }
    
    var last_fragment = fmt_str.substring(first, i);
    debug("adding " + last_fragment);
    out.push(last_fragment);
    
    return out.join("");
};

try {
    exports.fmt = fmt;
} catch (e) {
    switch (e.name) {
    case "ReferenceError":
        // nothing to do here
        break;
    default:
        throw e;
    }
}
