"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timeout = /** @class */ (function () {
    function Timeout() {
    }
    /**
     * Invoke function later with given delay (uses settimeout)
     * @param f Function
     * @param delay Delay
     */
    Timeout.invokeLater = function (f, delay) {
        setTimeout(f(), delay);
    };
    return Timeout;
}());
exports.Timeout = Timeout;
