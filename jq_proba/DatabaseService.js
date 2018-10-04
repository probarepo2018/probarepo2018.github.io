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
/// <reference path="./../@types/es6-promise/index.d.ts" />
/// <reference path="./../@types/lovefield/index.d.ts" />
/// <reference path="./../@types/papaparse/index.d.ts" />
var lf = require("./../js/lovefield.min");
var Papa = require("./../js/papaparse.min");
var ConfigLog4j_1 = require("./logging/ConfigLog4j");
var log = ConfigLog4j_1.factory.getLogger("DatabaseService");
var Node = /** @class */ (function () {
    function Node(id, parent_id, order, name, type, icon, params, file) {
        this.id = id;
        this.parent_id = parent_id;
        this.order = order;
        this.name = name;
        this.type = type;
        this.icon = icon;
        this.params = params;
        this.file = file;
    }
    return Node;
}());
exports.Node = Node;
var DatabaseService = /** @class */ (function () {
    function DatabaseService() {
    }
    DatabaseService.init = function (sCsv) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---DatabaseService.init');
                        return [4 /*yield*/, DatabaseService.deleteDatabase()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, DatabaseService.createDatabaseWithTableNodes()];
                    case 2:
                        _a.sent();
                        // let tableNodes = await DatabaseService.db.getSchema().table('nodes');
                        // await DatabaseService.db.delete().from(tableNodes).exec();
                        return [4 /*yield*/, DatabaseService.insertCsvToDatabase(sCsv)];
                    case 3:
                        // let tableNodes = await DatabaseService.db.getSchema().table('nodes');
                        // await DatabaseService.db.delete().from(tableNodes).exec();
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseService.selectAllToCsv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sCsv, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---selectAllToCsv');
                        sCsv = '';
                        return [4 /*yield*/, DatabaseService.db.select().from(DatabaseService.tableNodes)
                                .orderBy(DatabaseService.tableNodes.id, lf.Order.ASC).exec()];
                    case 1:
                        results = _a.sent();
                        log.debug('results===' + JSON.stringify(results));
                        results.forEach(function (row) {
                            sCsv += row.id + ',' + row.parent_id + ',' + row.order + ',"' + row.name + '","' + row.type + '","' + row.icon + '","' + row.params + '","' + row.file + '"\n';
                        });
                        return [2 /*return*/, sCsv];
                }
            });
        });
    };
    DatabaseService.createDatabaseWithTableNodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = DatabaseService;
                        return [4 /*yield*/, lf.schema.create('db', 1)];
                    case 1:
                        _a.schemaBuilder = _d.sent();
                        return [4 /*yield*/, DatabaseService.schemaBuilder.createTable('nodes')
                                .addColumn('id', lf.Type.INTEGER)
                                .addColumn('parent_id', lf.Type.INTEGER)
                                .addColumn('order', lf.Type.INTEGER)
                                .addColumn('name', lf.Type.STRING)
                                .addColumn('type', lf.Type.STRING)
                                .addColumn('icon', lf.Type.STRING)
                                .addColumn('params', lf.Type.STRING)
                                .addColumn('file', lf.Type.STRING)
                                .addPrimaryKey(['id'], true)];
                    case 2:
                        _d.sent();
                        // .addIndex('idxDeadline', ['deadline'], false, lf.Order.DESC);
                        DatabaseService.connectOptions = {
                            storeType: lf.schema.DataStoreType.INDEXED_DB
                        };
                        _b = DatabaseService;
                        return [4 /*yield*/, DatabaseService.schemaBuilder.connect(DatabaseService.connectOptions)];
                    case 3:
                        _b.db = _d.sent();
                        _c = DatabaseService;
                        return [4 /*yield*/, DatabaseService.db.getSchema().table('nodes')];
                    case 4:
                        _c.tableNodes = _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseService.deleteDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        DatabaseService.db.close();
                        return [4 /*yield*/, indexedDB.deleteDatabase('db')];
                    case 1:
                        req = _a.sent();
                        req.onsuccess = function () {
                            log.debug("Database deleted successfully");
                        };
                        req.onerror = function () {
                            log.error("Couldn't delete database");
                        };
                        req.onblocked = function (event) {
                            log.error("Couldn't delete database due to the operation being blocked");
                            log.debug('event===' + JSON.stringify(event));
                            // (event.target as any).result.close();
                            this.result.close();
                            console.log("blocked");
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseService.insertCsvToDatabase = function (sCsv) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedCsv, currentNode, curRow, arrNodes, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---insertCsvToDatabase');
                        log.trace('sCsv===' + sCsv);
                        parsedCsv = Papa.parse(sCsv);
                        log.trace('parsedCsv===', parsedCsv);
                        arrNodes = [];
                        for (i = 0; i < parsedCsv.data.length; i++) {
                            curRow = parsedCsv.data[i];
                            currentNode = new Node(Number(curRow[0]), Number(curRow[1]), Number(curRow[2]), curRow[3], curRow[4], curRow[5], curRow[6], curRow[7]);
                            arrNodes.push(currentNode);
                        }
                        log.trace('arrNodes===' + JSON.stringify(arrNodes));
                        return [4 /*yield*/, DatabaseService.insert(arrNodes, true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseService.insert = function (arrNodes, flagUseId) {
        if (flagUseId === void 0) { flagUseId = false; }
        return __awaiter(this, void 0, void 0, function () {
            var currentNode, arrRows, curObj, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---DatabaseService.insert');
                        arrRows = [];
                        for (i = 0; i < arrNodes.length; i++) {
                            currentNode = arrNodes[i];
                            curObj = {
                                //id: currentNode.id,
                                parent_id: currentNode.parent_id,
                                order: currentNode.order,
                                name: currentNode.name,
                                type: currentNode.type,
                                icon: currentNode.icon,
                                params: currentNode.params,
                                file: currentNode.file
                            };
                            if (flagUseId)
                                curObj.id = currentNode.id;
                            arrRows.push(DatabaseService.tableNodes.createRow(curObj));
                        }
                        return [4 /*yield*/, DatabaseService.db
                                .insertOrReplace()
                                .into(DatabaseService.tableNodes)
                                .values(arrRows).exec()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseService.findByParentIds = function (parentIds) {
        return __awaiter(this, void 0, void 0, function () {
            var tableNodes, columnParentId, columnOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---findByParentIds   parentIds===' + JSON.stringify(parentIds));
                        tableNodes = DatabaseService.tableNodes;
                        columnParentId = tableNodes.parent_id;
                        columnOrder = tableNodes.order;
                        return [4 /*yield*/, DatabaseService.db
                                .select().from(tableNodes)
                                .where(columnParentId.in(parentIds))
                                .orderBy(columnOrder, lf.Order.ASC).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.queryForId = function (nodeId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DatabaseService.db.select().from(DatabaseService.tableNodes)
                            .where(DatabaseService.tableNodes.id.eq(nodeId)).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.updateMany = function (nodes) {
        return __awaiter(this, void 0, void 0, function () {
            var tableNodes, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tableNodes = DatabaseService.tableNodes;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < nodes.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, DatabaseService.db.update(tableNodes)
                                .set(tableNodes.parent_id, nodes[i].parent_id)
                                .set(tableNodes.order, nodes[i].order)
                                .set(tableNodes.name, nodes[i].name)
                                .set(tableNodes.type, nodes[i].type)
                                .set(tableNodes.icon, nodes[i].icon)
                                .set(tableNodes.params, nodes[i].params)
                                .set(tableNodes.file, nodes[i].file)
                                .where(tableNodes.id.eq(nodes[i].id)).exec()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DatabaseService.swapOrder = function (nodeId1, nodeId2) {
        return __awaiter(this, void 0, void 0, function () {
            var node1, node2, tmp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DatabaseService.queryForId(nodeId1)];
                    case 1:
                        node1 = _a.sent();
                        return [4 /*yield*/, DatabaseService.queryForId(nodeId2)];
                    case 2:
                        node2 = _a.sent();
                        tmp = node1.order;
                        node1.order = node2.order;
                        node2.order = tmp;
                        return [4 /*yield*/, DatabaseService.updateMany([node1, node2])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseService.queryWhereIdInSet = function (arrIds) {
        return __awaiter(this, void 0, void 0, function () {
            var tableNodes, columnId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tableNodes = DatabaseService.tableNodes;
                        columnId = tableNodes.id;
                        return [4 /*yield*/, DatabaseService.db
                                .select().from(tableNodes)
                                .where(columnId.in(arrIds)).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
