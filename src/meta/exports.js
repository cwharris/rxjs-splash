    // Check for AMD
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        window.sx = sx;
        return define(function () {
            return sx;
        });
    } else if (freeExports) {
        if (typeof module == 'object' && module && module.exports == freeExports) {
            module.exports = sx;
        } else {
            freeExports = sx;
        }
    } else {
        window.sx = sx;
    }
