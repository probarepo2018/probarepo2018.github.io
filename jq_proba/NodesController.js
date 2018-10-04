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
var DatabaseService_1 = require("./DatabaseService");
var ConfigLog4j_1 = require("./logging/ConfigLog4j");
var log = ConfigLog4j_1.factory.getLogger("NodesController");
var TreeNode = /** @class */ (function () {
    function TreeNode() {
    }
    return TreeNode;
}());
exports.TreeNode = TreeNode;
var TreeNodeState = /** @class */ (function () {
    function TreeNodeState() {
    }
    return TreeNodeState;
}());
exports.TreeNodeState = TreeNodeState;
var NodesController = /** @class */ (function () {
    function NodesController() {
    }
    NodesController.getNodesByParentId = function (parentId) {
        if (parentId === void 0) { parentId = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var treeNodeList, treeChildren, i, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log.debug('---getNodesByParentId   parentId===' + parentId);
                        return [4 /*yield*/, NodesController.getTreeChildren(parentId)];
                    case 1:
                        treeNodeList = _b.sent();
                        log.debug('treeNodeList===' + JSON.stringify(treeNodeList));
                        if (!(parentId == 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, NodesController.getTreeChildren(1)];
                    case 2:
                        treeChildren = _b.sent();
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < treeChildren.length)) return [3 /*break*/, 6];
                        _a = treeChildren[i];
                        return [4 /*yield*/, NodesController.getTreeChildren(treeChildren[i].uzelId)];
                    case 4:
                        _a.nodes = _b.sent();
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        if (treeNodeList.length > 0) {
                            treeNodeList[0].nodes = treeChildren;
                            treeNodeList[0].state = { expanded: true };
                        }
                        _b.label = 7;
                    case 7: 
                    // log.debug('treeNodeList===' + JSON.stringify(treeNodeList));
                    return [2 /*return*/, treeNodeList];
                }
            });
        });
    };
    NodesController.getTreeChildren = function (parentId) {
        return __awaiter(this, void 0, void 0, function () {
            var arrRows, arrIds, mapId2CountChildren, counts, arrTreeNodes, newObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.debug('---getTreeChildren   parentId===' + parentId);
                        return [4 /*yield*/, DatabaseService_1.DatabaseService.findByParentIds([parentId])];
                    case 1:
                        arrRows = _a.sent();
                        log.debug('arrRows===' + JSON.stringify(arrRows));
                        arrIds = [];
                        arrRows.forEach(function (obj) { return arrIds.push(obj.id); });
                        log.debug('arrIds===' + JSON.stringify(arrIds));
                        mapId2CountChildren = new Map();
                        return [4 /*yield*/, DatabaseService_1.DatabaseService.findByParentIds(arrIds)];
                    case 2:
                        counts = _a.sent();
                        counts.forEach(function (obj) {
                            if (!mapId2CountChildren.has(obj.parent_id))
                                mapId2CountChildren.set(obj.parent_id, 0);
                            mapId2CountChildren.set(obj.parent_id, mapId2CountChildren.get(obj.parent_id) + 1);
                        });
                        log.debug('counts===' + JSON.stringify(counts));
                        arrTreeNodes = [];
                        arrRows.forEach(function (node) {
                            newObj = {
                                uzelId: node.id,
                                parId: node.parent_id,
                                order: node.order,
                                text: node.name,
                                type: node.type,
                                image: "/org_html/icon/" + node.icon
                            };
                            if (mapId2CountChildren.get(node.id) > 0)
                                newObj.lazyLoad = true;
                            arrTreeNodes.push(newObj);
                        });
                        log.debug('arrTreeNodes===' + JSON.stringify(arrTreeNodes));
                        return [2 /*return*/, arrTreeNodes];
                }
            });
        });
    };
    NodesController.swapOrder = function (nodeId1, nodeId2) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DatabaseService_1.DatabaseService.swapOrder(nodeId1, nodeId2)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NodesController.updateMany = function (nodes) {
        return __awaiter(this, void 0, void 0, function () {
            var arrIds, dbNodes, mapId2DbNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrIds = [];
                        nodes.forEach(function (node) { return arrIds.push(node.uzelId); });
                        return [4 /*yield*/, DatabaseService_1.DatabaseService.queryWhereIdInSet(arrIds)];
                    case 1:
                        dbNodes = _a.sent();
                        mapId2DbNode = new Map();
                        dbNodes.forEach(function (dbNode) { return mapId2DbNode.set(dbNode.id, dbNode); });
                        nodes.forEach(function (node) {
                            mapId2DbNode.get(node.uzelId).parentId = node.parId;
                            mapId2DbNode.get(node.uzelId).order = node.order;
                            // mapId2DbNode.get(node.uzelId).name = node.text;
                            // mapId2DbNode.get(node.uzelId).type = node.type;
                        });
                        return [4 /*yield*/, DatabaseService_1.DatabaseService.updateMany(mapId2DbNode.values())];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NodesController.getNodeById = function (uzelId) {
        return __awaiter(this, void 0, void 0, function () {
            var node, children, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DatabaseService_1.DatabaseService.queryForId(uzelId)];
                    case 1:
                        node = _a.sent();
                        return [4 /*yield*/, DatabaseService_1.DatabaseService.findByParentIds([uzelId])];
                    case 2:
                        children = _a.sent();
                        result = {
                            uzelId: node.id,
                            parId: node.parent_id,
                            order: node.order,
                            text: node.name,
                            type: node.type,
                            image: "/icon/" + node.icon
                        };
                        if (children.length > 0)
                            result.lazyLoad = true;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return NodesController;
}());
exports.NodesController = NodesController;
