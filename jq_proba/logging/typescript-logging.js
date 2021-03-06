"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var LogGroupControl_1 = require("./control/LogGroupControl");
var CategoryServiceControl_1 = require("./control/CategoryServiceControl");
var ExtensionHelper_1 = require("./extension/ExtensionHelper");
exports.ExtensionHelper = ExtensionHelper_1.ExtensionHelper;
// Category related
var AbstractCategoryLogger_1 = require("./log/category/AbstractCategoryLogger");
exports.AbstractCategoryLogger = AbstractCategoryLogger_1.AbstractCategoryLogger;
var CategoryConsoleLoggerImpl_1 = require("./log/category/CategoryConsoleLoggerImpl");
exports.CategoryConsoleLoggerImpl = CategoryConsoleLoggerImpl_1.CategoryConsoleLoggerImpl;
var CategoryDelegateLoggerImpl_1 = require("./log/category/CategoryDelegateLoggerImpl");
exports.CategoryDelegateLoggerImpl = CategoryDelegateLoggerImpl_1.CategoryDelegateLoggerImpl;
var Category_1 = require("./log/category/Category");
exports.Category = Category_1.Category;
var CategoryRuntimeSettings_1 = require("./log/category/CategoryRuntimeSettings");
exports.CategoryRuntimeSettings = CategoryRuntimeSettings_1.CategoryRuntimeSettings;
var CategoryConfiguration_1 = require("./log/category/CategoryConfiguration");
exports.CategoryConfiguration = CategoryConfiguration_1.CategoryConfiguration;
var CategoryMessageBufferImpl_1 = require("./log/category/CategoryMessageBufferImpl");
exports.CategoryMessageBufferLoggerImpl = CategoryMessageBufferImpl_1.CategoryMessageBufferLoggerImpl;
var CategoryServiceFactory_1 = require("./log/category/CategoryServiceFactory");
exports.CategoryServiceFactory = CategoryServiceFactory_1.CategoryServiceFactory;
var LoggerFactoryOptions_1 = require("./log/standard/LoggerFactoryOptions");
exports.LoggerFactoryOptions = LoggerFactoryOptions_1.LoggerFactoryOptions;
var LogGroupRule_1 = require("./log/standard/LogGroupRule");
exports.LogGroupRule = LogGroupRule_1.LogGroupRule;
var LFService_1 = require("./log/standard/LFService");
exports.LFService = LFService_1.LFService;
var AbstractLogger_1 = require("./log/standard/AbstractLogger");
exports.AbstractLogger = AbstractLogger_1.AbstractLogger;
var ConsoleLoggerImpl_1 = require("./log/standard/ConsoleLoggerImpl");
exports.ConsoleLoggerImpl = ConsoleLoggerImpl_1.ConsoleLoggerImpl;
var MessageBufferLoggerImpl_1 = require("./log/standard/MessageBufferLoggerImpl");
exports.MessageBufferLoggerImpl = MessageBufferLoggerImpl_1.MessageBufferLoggerImpl;
var LoggerOptions_1 = require("./log/LoggerOptions");
exports.CategoryLogFormat = LoggerOptions_1.CategoryLogFormat;
exports.DateFormat = LoggerOptions_1.DateFormat;
exports.DateFormatEnum = LoggerOptions_1.DateFormatEnum;
exports.LogFormat = LoggerOptions_1.LogFormat;
exports.LoggerType = LoggerOptions_1.LoggerType;
exports.LogLevel = LoggerOptions_1.LogLevel;
// Utilities
var DataStructures_1 = require("./utils/DataStructures");
exports.SimpleMap = DataStructures_1.SimpleMap;
exports.LinkedList = DataStructures_1.LinkedList;
__export(require("./utils/JSONHelper"));
var MessageUtils_1 = require("./utils/MessageUtils");
exports.MessageFormatUtils = MessageUtils_1.MessageFormatUtils;
/*
 Functions to export on TSL libarary var.
*/
// Export help function
function help() {
    /* tslint:disable:no-console */
    console.log("help()\n   ** Shows this help\n\n getLogControl(): LoggerControl\n   ** Returns LoggerControl Object, use to dynamically change loglevels for log4j logging.\n   ** Call .help() on LoggerControl object for available options.\n\n getCategoryControl(): CategoryServiceControl\n   ** Returns CategoryServiceControl Object, use to dynamically change loglevels for category logging.\n   ** Call .help() on CategoryServiceControl object for available options.\n");
    /* tslint:enable:no-console */
}
exports.help = help;
// Export LogControl function (log4j)
function getLogControl() {
    return new LogGroupControl_1.LoggerControlImpl();
}
exports.getLogControl = getLogControl;
// Export CategoryControl function
function getCategoryControl() {
    return new CategoryServiceControl_1.CategoryServiceControlImpl();
}
exports.getCategoryControl = getCategoryControl;
