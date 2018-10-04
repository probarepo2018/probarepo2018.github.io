"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./../@types/jquery/index.d.ts" />
var GoogleDriveService_1 = require("./GoogleDriveService");
var DatabaseService_1 = require("./DatabaseService");
var NodesController_1 = require("./NodesController");
var ConfigLog4j_1 = require("./logging/ConfigLog4j");
var tree_1 = require("./tree");
var GoogleDriveInit_1 = require("./GoogleDriveInit");
var log = ConfigLog4j_1.factory.getLogger("Application");
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.init = function () {
        log.debug('---init');
        GoogleDriveService_1.GoogleDriveService.init(Application.runApp);
    };
    Application.runApp = function () {
        DatabaseService_1.DatabaseService.createDatabaseWithTableNodes().then(function () {
            NodesController_1.NodesController.getNodesByParentId().then(function (data) { return tree_1.Tree.init(data); });
        });
        $('#buttonInitApp').on('click', GoogleDriveInit_1.GoogleDriveInit.init).css("display", "initial");
        $('#buttonGetFiles').on('click', GoogleDriveInit_1.GoogleDriveInit.get).css("display", "initial");
        $('#buttonCreate').on('click', function () {
            GoogleDriveService_1.GoogleDriveService.createAndUploadFile(null, 'proba.txt', 'привет!!!').then(function (file) {
                Application.currentFileId = file.id;
                console.log(file);
            });
        }).css("display", "initial");
        $('#buttonRename').on('click', function () {
            GoogleDriveService_1.GoogleDriveService.renameFile(Application.currentFileId, 'proba123.txt')
                .then(function (msg) { return console.log(msg); });
        }).css("display", "initial");
        $('#buttonDelete').on('click', function () {
            GoogleDriveService_1.GoogleDriveService.deleteFile(Application.currentFileId)
                .then(function (msg) { return console.log(msg); });
        }).css("display", "initial");
        $('#buttonRead').on('click', function () {
            GoogleDriveService_1.GoogleDriveService.readFile(Application.currentFileId)
                .then(function (msg) { return console.log(msg); });
        }).css("display", "initial");
        $('#buttonSearch').on('click', function () {
            GoogleDriveService_1.GoogleDriveService.searchFile("name = '00 - Links' and trashed = false")
                .then(function (msg) { return console.log(msg); });
        }).css("display", "initial");
        $('#buttonCopy').on('click', function () {
            GoogleDriveService_1.GoogleDriveService.copyFile(Application.currentFileId, 'new-file.txt')
                .then(function (msg) { return console.log(msg); });
        }).css("display", "initial");
        $('#linkDownload').attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('приветик!'))
            .css("display", "initial");
        // https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
        $('#buttonDownload').on('click', function () {
            var el = document.createElement('a');
            el.setAttribute('download', 'db_nodes.csv');
            el.style.display = 'none';
            document.body.appendChild(el);
            DatabaseService_1.DatabaseService.selectAllToCsv().then(function (text) {
                el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                el.click();
                document.body.removeChild(el);
            });
        }).css("display", "initial");
        // GoogleDriveService.searchFile("name = '00 - Links' and trashed = false").then((msg) => {
        //
        // })
        gapi.client.drive.about.get({ fields: 'storageQuota, user' })
            .then(function (resp) { return log.debug('User: ' + resp.result.user.displayName); });
        // request.execute(function(resp) {
        //     console.log('resp===', resp)
        // });
    };
    return Application;
}());
exports.Application = Application;
