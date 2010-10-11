var fmt = function (fmt_str, args) {
    // var debug = require("sys").debug;
    var debug = function (n) { };
    
    var SIGIL = '%',
        OPEN = '{',
        CLOSE = '}';
    
    var out = [];
    var first = 0;

    var l = fmt_str.length;
    for (var i = 0; i < l; ++i) {
        var c0 = fmt_str[i],
            c1 = fmt_str[i + 1];
        switch (c0) {
        case SIGIL:
            // "%%" resolves to %
            if (c1 === '%') {
                out.push(fmt_str.substr(first, i + 1));
                ++i;
                first = i;
                continue;
            }

            // % followed by anything other than '{' is not allowed
            if (c1 !== OPEN) {
                throw "% must be followed by either '%' or '{'";
            }

            // scan for the closing '}'
            for (var j = i; j < l; ++j) {
                if (fmt_str[j] === CLOSE) {
                    if (fmt_str[j - 1] === '\\') {
                        continue;
                    }
                    var key = fmt_str.substring(i + 2, j);
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
                    first = i ;
                    
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
    var last = fmt_str.substring(first, i);
    debug("adding " + last);
    out.push(last);
    
    return out.join("");
};

exports.fmt = fmt;