"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeDataProvider = void 0;
const vscode = require("vscode");
const category_1 = require("./category");
class TreeDataProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.data = [];
        this.data = category_1.Category.getTreeItemsWithProjects();
    }
    refresh() {
        this.data = category_1.Category.getTreeItemsWithProjects();
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            return this.data;
        }
        if ('children' in element) {
            return element.children;
        }
        return undefined;
    }
    getParent(element) {
        return this.findParent(element, this.data);
    }
    async expandAllNodes(treeView) {
        try {
            await vscode.commands.executeCommand('projectLibraryTreeView.focus');
        }
        catch { }
        const roots = this.data;
        for (const root of roots) {
            await this.expandRecursively(root, treeView, 50);
        }
    }
    async expandRecursively(item, treeView, depth) {
        if (depth <= 0)
            return;
        try {
            await treeView.reveal(item, { expand: true, focus: false, select: false });
        }
        catch { }
        const children = item.children;
        if (!children || children.length === 0)
            return;
        for (const child of children) {
            await this.expandRecursively(child, treeView, depth - 1);
        }
    }
    findParent(target, nodes) {
        for (const node of nodes) {
            const children = node.children ?? [];
            if (children.includes(target))
                return node;
            const fromDesc = this.findParent(target, children);
            if (fromDesc)
                return fromDesc;
        }
        return undefined;
    }
}
exports.TreeDataProvider = TreeDataProvider;
//# sourceMappingURL=treeDataProvider.js.map