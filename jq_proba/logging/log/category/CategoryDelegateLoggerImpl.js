"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Delegate logger, delegates logging to given logger (constructor).
 */
var CategoryDelegateLoggerImpl = /** @class */ (function () {
    function CategoryDelegateLoggerImpl(delegate) {
        this._delegate = delegate;
    }
    Object.defineProperty(CategoryDelegateLoggerImpl.prototype, "delegate", {
        get: function () {
            return this._delegate;
        },
        set: function (value) {
            this._delegate = value;
        },
        enumerable: true,
        configurable: true
    });
    CategoryDelegateLoggerImpl.prototype.trace = function (msg) {
        var categories = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            categories[_i - 1] = arguments[_i];
        }
        (_a = this._delegate).trace.apply(_a, [msg].concat(categories));
        var _a;
    };
    CategoryDelegateLoggerImpl.prototype.debug = function (msg) {
        var categories = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            categories[_i - 1] = arguments[_i];
        }
        (_a = this._delegate).debug.apply(_a, [msg].concat(categories));
        var _a;
    };
    CategoryDelegateLoggerImpl.prototype.info = function (msg) {
        var categories = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            categories[_i - 1] = arguments[_i];
        }
        (_a = this._delegate).info.apply(_a, [msg].concat(categories));
        var _a;
    };
    CategoryDelegateLoggerImpl.prototype.warn = function (msg) {
        var categories = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            categories[_i - 1] = arguments[_i];
        }
        (_a = this._delegate).warn.apply(_a, [msg].concat(categories));
        var _a;
    };
    CategoryDelegateLoggerImpl.prototype.error = function (msg, error) {
        var categories = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            categories[_i - 2] = arguments[_i];
        }
        (_a = this._delegate).error.apply(_a, [msg, error].concat(categories));
        var _a;
    };
    CategoryDelegateLoggerImpl.prototype.fatal = function (msg, error) {
        var categories = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            categories[_i - 2] = arguments[_i];
        }
        (_a = this._delegate).fatal.apply(_a, [msg, error].concat(categories));
        var _a;
    };
    CategoryDelegateLoggerImpl.prototype.resolved = function (msg, error) {
        var categories = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            categories[_i - 2] = arguments[_i];
        }
        (_a = this._delegate).resolved.apply(_a, [msg, error].concat(categories));
        var _a;
    };
    CategoryDelegateLoggerImpl.prototype.log = function (level, msg, error) {
        var categories = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            categories[_i - 3] = arguments[_i];
        }
        (_a = this._delegate).log.apply(_a, [level, msg, error].concat(categories));
        var _a;
    };
    return CategoryDelegateLoggerImpl;
}());
exports.CategoryDelegateLoggerImpl = CategoryDelegateLoggerImpl;
