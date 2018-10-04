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
/// <reference path="./../@types/gapi/index.d.ts" />
var ConfigLog4j_1 = require("./logging/ConfigLog4j");
var log = ConfigLog4j_1.factory.getLogger("GoogleDriveService");
var GoogleDriveService = /** @class */ (function () {
    function GoogleDriveService() {
    }
    GoogleDriveService.init = function (callback) {
        log.debug('---init');
        gapi.load('client:auth2', function () {
            gapi.client.init({
                //apiKey: API_KEY, //THIS IS OPTIONAL AND WE DONT ACTUALLY NEED THIS, BUT I INCLUDE THIS AS EXAMPLE
                clientId: GoogleDriveService.CLIENT_ID,
                scope: GoogleDriveService.SCOPES.join(' ')
            }).then(function () {
                GoogleDriveService.ACCESS_TOKEN = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
                localStorage.setItem("t", GoogleDriveService.ACCESS_TOKEN);
                gapi.client.load('drive', 'v3', callback);
            });
        });
    };
    GoogleDriveService.ajaxErrorHandler = function (error) {
        log.error('Error: ' + JSON.stringify(error));
    };
    GoogleDriveService.createFile = function (folderId, filename, mimeType) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---createFile');
                        data = {
                            name: filename,
                            mimeType: mimeType
                        };
                        if (folderId) {
                            data = {
                                parents: [folderId],
                                name: filename,
                                mimeType: mimeType
                            };
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, $.ajax({
                                method: 'POST',
                                url: 'https://www.googleapis.com/drive/v3/files',
                                headers: { "Authorization": "Bearer " + GoogleDriveService.ACCESS_TOKEN },
                                dataType: 'json',
                                data: JSON.stringify(data),
                                contentType: 'application/json; charset=utf-8' // When sending data to the server, use this content type.
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        GoogleDriveService.ajaxErrorHandler(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GoogleDriveService.uploadFileContent = function (fileId, content) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---uploadFileContent');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, $.ajax({
                                method: 'PATCH',
                                url: 'https://www.googleapis.com/upload/drive/v3/files/' + fileId,
                                headers: { "Authorization": "Bearer " + GoogleDriveService.ACCESS_TOKEN },
                                dataType: 'json',
                                data: content,
                                contentType: 'text/plain; charset=utf-8',
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_2 = _a.sent();
                        GoogleDriveService.ajaxErrorHandler(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GoogleDriveService.createAndUploadFile = function (folderId, filename, content) {
        return __awaiter(this, void 0, void 0, function () {
            var createdFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---createAndUploadFile');
                        return [4 /*yield*/, GoogleDriveService.createFile(folderId, filename, "text/plain; charset=utf-8")];
                    case 1:
                        createdFile = _a.sent();
                        log.debug('createdFile===' + JSON.stringify(createdFile));
                        return [4 /*yield*/, GoogleDriveService.uploadFileContent(createdFile.id, content)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GoogleDriveService.renameFile = function (fileId, newFilename) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---renameFile');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, $.ajax({
                                method: 'PATCH',
                                url: 'https://www.googleapis.com/drive/v3/files/' + fileId,
                                headers: { "Authorization": "Bearer " + GoogleDriveService.ACCESS_TOKEN },
                                dataType: 'json',
                                data: JSON.stringify({ name: newFilename }),
                                contentType: 'application/json; charset=utf-8',
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_3 = _a.sent();
                        GoogleDriveService.ajaxErrorHandler(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GoogleDriveService.deleteFile = function (fileId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---deleteFile');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, $.ajax({
                                method: 'DELETE',
                                url: 'https://www.googleapis.com/drive/v3/files/' + fileId,
                                headers: { "Authorization": "Bearer " + GoogleDriveService.ACCESS_TOKEN },
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_4 = _a.sent();
                        GoogleDriveService.ajaxErrorHandler(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GoogleDriveService.readFile = function (fileId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---readFile');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, $.ajax({
                                method: 'GET',
                                url: 'https://www.googleapis.com/drive/v3/files/' + fileId + '?alt=media',
                                headers: { "Authorization": "Bearer " + GoogleDriveService.ACCESS_TOKEN },
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_5 = _a.sent();
                        GoogleDriveService.ajaxErrorHandler(error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GoogleDriveService.copyFile = function (fileId, newFilename) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---copyFile');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, $.ajax({
                                method: 'POST',
                                url: 'https://www.googleapis.com/drive/v3/files/' + fileId + '/copy',
                                headers: { "Authorization": "Bearer " + GoogleDriveService.ACCESS_TOKEN },
                                data: JSON.stringify({ name: newFilename }),
                                contentType: 'application/json; charset=utf-8',
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_6 = _a.sent();
                        GoogleDriveService.ajaxErrorHandler(error_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GoogleDriveService.searchFile = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---searchFile');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, $.ajax({
                                method: 'GET',
                                url: 'https://www.googleapis.com/drive/v3/files?q=' + query,
                                headers: { "Authorization": "Bearer " + GoogleDriveService.ACCESS_TOKEN },
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_7 = _a.sent();
                        GoogleDriveService.ajaxErrorHandler(error_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GoogleDriveService.SCOPES = ['https://www.googleapis.com/auth/drive', 'profile'];
    GoogleDriveService.CLIENT_ID = '955915951176-v9nvs56thkpg7l51palu1g751cacmkhf.apps.googleusercontent.com';
    return GoogleDriveService;
}());
exports.GoogleDriveService = GoogleDriveService;
