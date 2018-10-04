"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var GoogleDriveService_1 = require("./GoogleDriveService");
var ConfigLog4j_1 = require("./logging/ConfigLog4j");
var DatabaseService_1 = require("./DatabaseService");
var NodesController_1 = require("./NodesController");
var tree_1 = require("./tree");
var log = ConfigLog4j_1.factory.getLogger("GoogleDriveInit");
var GoogleDriveInit = /** @class */ (function () {
    function GoogleDriveInit() {
    }
    GoogleDriveInit.preVerify = function () {
        return __awaiter(this, void 0, void 0, function () {
            var searchFolder, searchFiles, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---preVerify');
                        return [4 /*yield*/, GoogleDriveService_1.GoogleDriveService.searchFile("name = '" + GoogleDriveInit.appFolderName + "' and trashed = false")];
                    case 1:
                        searchFolder = _a.sent();
                        log.trace('searchFolder===' + JSON.stringify(searchFolder));
                        if (searchFolder.files.length > 0)
                            GoogleDriveInit.appFolderId = searchFolder.files[0].id;
                        log.debug('GoogleDriveInit.appFolderId===' + GoogleDriveInit.appFolderId);
                        return [4 /*yield*/, GoogleDriveService_1.GoogleDriveService.searchFile("(name = '0' or name = '1' or name = '2' or name = '3') and trashed = false and '" + GoogleDriveInit.appFolderId + "' in parents")];
                    case 2:
                        searchFiles = _a.sent();
                        log.trace('searchFiles===' + JSON.stringify(searchFiles));
                        for (i = 0; i < searchFiles.files.length; i++) {
                            if (searchFiles.files[i].name == '0')
                                GoogleDriveInit.databaseFileId = searchFiles.files[i].id;
                            if (searchFiles.files[i].name == '1')
                                GoogleDriveInit.desktopFileId = searchFiles.files[i].id;
                            if (searchFiles.files[i].name == '2')
                                GoogleDriveInit.settingsFileId = searchFiles.files[i].id;
                            if (searchFiles.files[i].name == '3')
                                GoogleDriveInit.recycleBinFileId = searchFiles.files[i].id;
                        }
                        log.debug('GoogleDriveInit.databaseFileId===' + GoogleDriveInit.databaseFileId);
                        log.debug('GoogleDriveInit.desktopFileId===' + GoogleDriveInit.desktopFileId);
                        log.debug('GoogleDriveInit.settingsFileId===' + GoogleDriveInit.settingsFileId);
                        log.debug('GoogleDriveInit.recycleBinFileId===' + GoogleDriveInit.recycleBinFileId);
                        return [2 /*return*/];
                }
            });
        });
    };
    GoogleDriveInit.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var createdFolder, createdFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GoogleDriveInit.preVerify()];
                    case 1:
                        _a.sent();
                        if (!!GoogleDriveInit.appFolderId) return [3 /*break*/, 3];
                        return [4 /*yield*/, GoogleDriveService_1.GoogleDriveService.createFile(null, GoogleDriveInit.appFolderName, 'application/vnd.google-apps.folder')];
                    case 2:
                        createdFolder = _a.sent();
                        GoogleDriveInit.appFolderId = createdFolder.id;
                        _a.label = 3;
                    case 3:
                        log.debug('GoogleDriveInit.appFolderId===' + GoogleDriveInit.appFolderId);
                        if (!!GoogleDriveInit.desktopFileId) return [3 /*break*/, 5];
                        return [4 /*yield*/, GoogleDriveService_1.GoogleDriveService.createAndUploadFile(GoogleDriveInit.appFolderId, '1', 'Desktop => content')
                                .then(function (file) { return GoogleDriveInit.desktopFileId = file.id; })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!!GoogleDriveInit.settingsFileId) return [3 /*break*/, 7];
                        return [4 /*yield*/, GoogleDriveService_1.GoogleDriveService.createAndUploadFile(GoogleDriveInit.appFolderId, '2', 'Settings => content')
                                .then(function (file) { return GoogleDriveInit.settingsFileId = file.id; })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        if (!!GoogleDriveInit.recycleBinFileId) return [3 /*break*/, 9];
                        return [4 /*yield*/, GoogleDriveService_1.GoogleDriveService.createAndUploadFile(GoogleDriveInit.appFolderId, '3', 'Recycle Bin => content')
                                .then(function (file) { return GoogleDriveInit.recycleBinFileId = file.id; })];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        if (!!GoogleDriveInit.databaseFileId) return [3 /*break*/, 11];
                        return [4 /*yield*/, GoogleDriveService_1.GoogleDriveService.createAndUploadFile(GoogleDriveInit.appFolderId, "0", GoogleDriveInit.getInitDatabaseCsv())];
                    case 10:
                        createdFile = _a.sent();
                        GoogleDriveInit.databaseFileId = createdFile.id;
                        _a.label = 11;
                    case 11:
                        GoogleDriveInit.get();
                        return [2 /*return*/];
                }
            });
        });
    };
    GoogleDriveInit.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var csv;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GoogleDriveInit.preVerify()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, GoogleDriveService_1.GoogleDriveService.readFile(GoogleDriveInit.databaseFileId)];
                    case 2:
                        csv = _a.sent();
                        log.trace('csv===\n' + csv);
                        return [4 /*yield*/, DatabaseService_1.DatabaseService.init(csv)];
                    case 3:
                        _a.sent();
                        NodesController_1.NodesController.getNodesByParentId().then(function (data) { return tree_1.Tree.init(data); });
                        return [2 /*return*/];
                }
            });
        });
    };
    GoogleDriveInit.getInitDatabaseCsv = function () {
        var sResult = ''; // '"id","parent_id","order","name","type","icon","params","file"\n';
        sResult += '1,0,0,"Desktop","txt","_default/1354318755_icons.png","","' + GoogleDriveInit.desktopFileId + '"\n';
        sResult += '2,1,0,"Settings","txt","_default/settings-5.png","","' + GoogleDriveInit.settingsFileId + '"\n';
        sResult += '3,1,1,"Recycle Bin","txt","_default/trash-icon.png","","' + GoogleDriveInit.recycleBinFileId + '"';
        return sResult;
    };
    GoogleDriveInit.appFolderName = 'Org ::::: Documents';
    GoogleDriveInit.desktopFileId = null;
    GoogleDriveInit.settingsFileId = null;
    GoogleDriveInit.recycleBinFileId = null;
    return GoogleDriveInit;
}());
exports.GoogleDriveInit = GoogleDriveInit;
