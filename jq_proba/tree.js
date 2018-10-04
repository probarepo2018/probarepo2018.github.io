"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="NodesController.ts"/>
// import {TreePage} from "./TreePage";
var NodesController_1 = require("./NodesController");
var ConfigLog4j_1 = require("./logging/ConfigLog4j");
var log = ConfigLog4j_1.factory.getLogger("Tree");
/**
 * The Tree class represents Bootstrap Treeview (from patternfly)
 * in typescript version.
 */
var Tree = /** @class */ (function () {
    function Tree() {
    }
    // private static previousSelectedNode;
    Tree.init = function (data) {
        Tree.tree.treeview({
            data: data,
            showImage: true,
            onNodeSelected: function (event, node) {
                // if(Tree.previousSelectedNode && Tree.previousSelectedNode.uzelId == node.uzelId) {
                //     window.open('/opennode?id=' + node.uzelId, '_blank');
                // }
                if (node.nodes && node.nodes.length == 1 && node.nodes[0].text == 'Loading...') {
                    log.debug('Loading...');
                }
                else {
                }
                if (node.text != 'Loading...') {
                    window.open('opentxt.html?id=' + node.uzelId, '_blank');
                }
                // Tree.previousSelectedNode = node;
            },
            lazyLoad: function (node, fn) {
                NodesController_1.NodesController.getNodesByParentId(node.uzelId).then(fn());
            },
            onLoading: function (event) {
                log.debug('---onLoading');
                log.trace('---onLoading===' + JSON.stringify(event));
            }
        });
    };
    /**
     * Get root node.
     * @returns {BootstrapTreeViewNodeData} The root node.
     */
    Tree.getRootNode = function () {
        var rootNodes = Tree.tree.treeview('findNodes', ['^1$', 'uzelId']);
        return rootNodes[0];
    };
    /**
     * Collapse given node/nodes.
     * @param nodes The given node/nodes.
     */
    Tree.collapseNodes = function (nodes) {
        Tree.tree.treeview('collapseNode', [nodes, { silent: true }]);
    };
    /**
     * Remove given node/nodes.
     * @param node The given node/nodes.
     */
    Tree.removeNode = function (node) {
        Tree.tree.treeview('removeNode', [node, { silent: true }]);
    };
    /**
     * Add node/nodes to the parent in given index.
     * @param nodes The given node/nodes.
     * @param parentNode The parent node.
     * @param index The given index.
     */
    Tree.addNode = function (nodes, parentNode, index) {
        Tree.tree.treeview('addNode', [nodes, parentNode, index, { silent: true }]);
    };
    /**
     * Get selected node/nodes.
     * @returns {BootstrapTreeViewNodeData} The selected node/nodes.
     */
    Tree.getSelectedNode = function () {
        var selectedNodes = Tree.tree.treeview('getSelected');
        var selectedNode = null;
        if (selectedNodes.length > 0) {
            selectedNode = selectedNodes[0];
        }
        return selectedNode;
    };
    /**
     * Select given node/nodes.
     * @param node The given node/nodes.
     */
    Tree.selectNode = function (node) {
        Tree.tree.treeview('selectNode', [node, { silent: true }]);
    };
    /**
     * Get parent/parents of given node/nodes.
     * @param node Given node/nodes.
     * @returns {BootstrapTreeViewNodeData[]} The array of parent/parents.
     */
    Tree.getParents = function (node) {
        return Tree.tree.treeview('getParents', node);
    };
    /**
     * Move selected node to the up.
     */
    Tree.moveUp = function () {
        Tree.moveVertically(-1);
    };
    /**
     * Move selected node to the down.
     */
    Tree.moveDown = function () {
        Tree.moveVertically(1);
    };
    /**
     * Get position index of selNode among parent nodes
     * @param selNode The needed node.
     * @param parent_nodes The array of child nodes of parent.
     * @returns {number} The index.
     */
    Tree.getIndexOfChild = function (selNode, parent_nodes) {
        log.debug('selNode===' + JSON.stringify(selNode));
        // get index of the child
        var node_index;
        for (var i = 0; i < parent_nodes.length; i++) {
            if (parent_nodes[i].uzelId == selNode.uzelId) {
                node_index = i;
                break;
            }
        }
        log.debug('node_index===' + node_index);
        return node_index;
    };
    /**
     * Move selected node up or down depends on indexOf.
     * @param indexOf The index: +1 for down and -1 for up.
     */
    Tree.moveVertically = function (indexOf) {
        var selNode = Tree.getSelectedNode();
        if (selNode != null && selNode.uzelId > 1) {
            var parents_1 = Tree.getParents(selNode);
            if (parents_1 == null || parents_1.length == 0)
                return;
            // TreePage.disableArrowButtons();
            var parent_nodes = parents_1[0].nodes;
            // get index of the child
            var node_index_1 = Tree.getIndexOfChild(selNode, parent_nodes);
            var conditionDown = node_index_1 < (parent_nodes.length - 1);
            var conditionUp = node_index_1 > 0;
            var flagDo = false;
            if (indexOf > 0) {
                if (conditionDown)
                    flagDo = true;
            }
            else {
                if (conditionUp)
                    flagDo = true;
            }
            if (flagDo) {
                var oldNode1_1 = parents_1[0].nodes[node_index_1];
                var oldNode2_1 = parents_1[0].nodes[node_index_1 + indexOf];
                log.trace('oldNode1===' + JSON.stringify(oldNode1_1) + ' ' + oldNode1_1.order);
                log.trace('oldNode2===' + JSON.stringify(oldNode2_1) + ' ' + oldNode2_1.order);
                NodesController_1.NodesController.swapOrder(oldNode1_1.uzelId, oldNode2_1.uzelId).then(function (data) {
                    // log.debug('data===', data)
                    var newNode1 = data[0];
                    var newNode2 = data[1];
                    log.trace('newNode1===' + JSON.stringify(newNode1) + ' ' + newNode1.order);
                    log.trace('newNode2===' + JSON.stringify(newNode2) + ' ' + newNode2.order);
                    var flagChangeOrders = false;
                    if (oldNode1_1.order == newNode2.order && oldNode2_1.order == newNode1.order) {
                        flagChangeOrders = true;
                    }
                    log.debug("flagChangeOrders===" + flagChangeOrders);
                    if (flagChangeOrders) {
                        NodesController_1.NodesController.getNodeById(selNode.uzelId).then(function (data) {
                            Tree.removeNode(selNode);
                            Tree.addNode(data, parents_1, node_index_1 + indexOf);
                            Tree.selectNode(data);
                            oldNode2_1.order = newNode2.order;
                            // TreePage.enableArrowButtons();
                        });
                    }
                    // TreePage.enableArrowButtons();
                });
            }
            else {
                // TreePage.enableArrowButtons();
            }
        }
    };
    /**
     * Expand given node/nodes.
     * @param node The given node/nodes.
     */
    Tree.expandNode = function (node) {
        Tree.tree.treeview('expandNode', [node, { levels: 2, silent: true }]);
    };
    /**
     * Move selected node to the left.
     */
    Tree.moveLeft = function () {
        var selNode = Tree.getSelectedNode();
        if (selNode != null && selNode.uzelId > 1) {
            var parents = Tree.getParents(selNode);
            if (parents == null || parents.length == 0)
                return;
            var parent_parents_1 = Tree.getParents(parents[0]);
            if (parent_parents_1 == null || parent_parents_1.length == 0)
                return;
            // TreePage.disableArrowButtons();
            var parent_nodes = parents[0].nodes;
            var node_index = Tree.getIndexOfChild(selNode, parent_nodes);
            var parent_parent_nodes_1 = parent_parents_1[0].nodes;
            var parent_node_index_1 = Tree.getIndexOfChild(parents[0], parent_parent_nodes_1);
            var removedNode = parent_nodes[node_index];
            Tree.removeNode(removedNode);
            NodesController_1.NodesController.getNodeById(removedNode.uzelId).then(function (data) {
                data.parId = parent_parents_1[0].uzelId;
                Tree.addNode(data, parent_parents_1[0], parent_node_index_1 + 1);
                Tree.selectNode(data);
                log.trace('parent_parent_nodes===' + JSON.stringify(parent_parent_nodes_1));
                Tree.updateOrders(parent_parents_1[0], function () { } /*TreePage.enableArrowButtons*/);
            });
        }
    };
    /**
     * Move selected node to the right.
     */
    Tree.moveRight = function () {
        var selNode = Tree.getSelectedNode();
        if (selNode != null && selNode.uzelId > 1) {
            var parents = Tree.getParents(selNode);
            if (parents == null || parents.length == 0)
                return;
            // TreePage.disableArrowButtons();
            var parent_nodes = parents[0].nodes;
            // get index of the child
            var node_index = Tree.getIndexOfChild(selNode, parent_nodes);
            // log.debug('Tree.tree.nodeExpanded===', Tree.tree.nodeExpanded)
            if (node_index > 0) {
                var removedNode_1 = parent_nodes[node_index];
                Tree.removeNode(removedNode_1);
                var nextParent_1 = parent_nodes[node_index - 1];
                // log.debug('Tree.tree.onNodeSelected===', Tree.tree.nodeSelected)
                log.trace('nextParent.expanded===' + nextParent_1.state.expanded + '   -   ' + JSON.stringify(nextParent_1.nodes) + '   -   ' + nextParent_1.lazyLoad);
                if (nextParent_1.lazyLoad == false) {
                    Tree.addFirstNodeAndUpdateOrders(removedNode_1, nextParent_1, function () { } /*TreePage.enableArrowButtons*/);
                }
                else {
                    if (nextParent_1.state.expanded == true) {
                        Tree.addFirstNodeAndUpdateOrders(removedNode_1, nextParent_1, function () { } /*TreePage.enableArrowButtons*/);
                    }
                    else {
                        Tree.tree.on('nodeExpanded', function (event, node) {
                            // log.debug('---onNodeExpanded===', event, node, node.nodes)
                            Tree.addFirstNodeAndUpdateOrders(removedNode_1, nextParent_1, function () { } /*TreePage.enableArrowButtons*/);
                            Tree.tree.off('nodeExpanded', '**');
                        });
                        Tree.expandNode(nextParent_1);
                    }
                }
            }
            else {
                // TreePage.enableArrowButtons();
            }
        }
    };
    Tree.addFirstNodeAndUpdateOrders = function (removedNode, nextParent, callback) {
        NodesController_1.NodesController.getNodeById(removedNode.uzelId).then(function (data) {
            data.parId = nextParent.uzelId;
            Tree.addNode(data, nextParent, 0);
            Tree.selectNode(data);
            log.trace('nextParent.nodes===' + JSON.stringify(nextParent.nodes));
            Tree.updateOrders(nextParent, callback);
        });
    };
    Tree.updateOrders = function (parent, callback) {
        for (var i = 0; i < parent.nodes.length; i++) {
            parent.nodes[i].order = i;
        }
        NodesController_1.NodesController.updateMany(parent.nodes).then(callback());
    };
    Tree.movePageUp = function () {
        var selNode = Tree.getSelectedNode();
        if (selNode != null && selNode.uzelId > 1) {
            var parents_2 = Tree.getParents(selNode);
            if (parents_2 == null || parents_2.length == 0)
                return;
            var node_index = Tree.getIndexOfChild(selNode, parents_2[0].nodes);
            if (node_index > 0) {
                // TreePage.disableArrowButtons();
                NodesController_1.NodesController.getNodeById(selNode.uzelId).then(function (data) {
                    Tree.removeNode(selNode);
                    Tree.addNode(data, parents_2[0], 0);
                    Tree.selectNode(data);
                    Tree.updateOrders(parents_2[0], function (data) {
                        // TreePage.enableArrowButtons();
                    });
                });
            }
        }
    };
    Tree.movePageDown = function () {
        var selNode = Tree.getSelectedNode();
        if (selNode != null && selNode.uzelId > 1) {
            var parents_3 = Tree.getParents(selNode);
            if (parents_3 == null || parents_3.length == 0)
                return;
            var node_index = Tree.getIndexOfChild(selNode, parents_3[0].nodes);
            if (node_index < (parents_3[0].nodes.length - 1)) {
                // if (node_index > 0) {
                //     TreePage.disableArrowButtons();
                NodesController_1.NodesController.getNodeById(selNode.uzelId).then(function (data) {
                    Tree.removeNode(selNode);
                    Tree.addNode(data, parents_3[0], false);
                    Tree.selectNode(data);
                    Tree.updateOrders(parents_3[0], function (data) {
                        // TreePage.enableArrowButtons();
                    });
                });
            }
        }
    };
    Tree.tree = $('#treeview');
    return Tree;
}());
exports.Tree = Tree;
