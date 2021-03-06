"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCategoryLogger_1 = require("./AbstractCategoryLogger");
/**
 * Logger which buffers all messages, use with care due to possible high memory footprint.
 * Can be convenient in some cases. Call toString() for full output, or cast to this class
 * and call getMessages() to do something with it yourself.
 */
var CategoryMessageBufferLoggerImpl = /** @class */ (function (_super) {
    __extends(CategoryMessageBufferLoggerImpl, _super);
    function CategoryMessageBufferLoggerImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.messages = [];
        return _this;
    }
    CategoryMessageBufferLoggerImpl.prototype.getMessages = function () {
        return this.messages;
    };
    CategoryMessageBufferLoggerImpl.prototype.toString = function () {
        return this.messages.map(function (msg) {
            return msg;
        }).join("\n");
    };
    CategoryMessageBufferLoggerImpl.prototype.doLog = function (msg) {
        var messageFormatter = this._getMessageFormatter();
        var fullMsg;
        if (messageFormatter === null) {
            fullMsg = this.createDefaultLogMessage(msg);
        }
        else {
            fullMsg = messageFormatter(msg);
        }
        this.messages.push(fullMsg);
    };
    return CategoryMessageBufferLoggerImpl;
}(AbstractCategoryLogger_1.AbstractCategoryLogger));
exports.CategoryMessageBufferLoggerImpl = CategoryMessageBufferLoggerImpl;
