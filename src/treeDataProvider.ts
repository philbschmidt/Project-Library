import * as vscode from 'vscode';
import { TreeItem } from './treeItem';
import { Category } from './category';

export class TreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

    private _onDidChangeTreeData = new vscode.EventEmitter<TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

    private data: TreeItem[] = [];

    constructor() {
        this.data = Category.getTreeItemsWithProjects();
    }

    refresh(): void {
        this.data = Category.getTreeItemsWithProjects();
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
        if (!element) {
            return this.data;
        }

        if ('children' in element) {
            return (element as TreeItem).children;
        }

        return undefined;
    }

    getParent?(element: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem> {
        return this.findParent(element as TreeItem, this.data);
    }

    async expandAllNodes(treeView: vscode.TreeView<any>): Promise<void> {
        try {
            await vscode.commands.executeCommand('projectLibraryTreeView.focus');
        } catch { }

        const roots = this.data;
        for (const root of roots) {
            await this.expandRecursively(root, treeView, 50);
        }
    }

    private async expandRecursively(item: TreeItem, treeView: vscode.TreeView<any>, depth: number): Promise<void> {
        if (depth <= 0)
            return;

        try {
            await treeView.reveal(item, { expand: true, focus: false, select: false });
        } catch { }

        const children = item.children;
        if (!children || children.length === 0)
            return;

        for (const child of children) {
            await this.expandRecursively(child, treeView, depth - 1);
        }
    }

    private findParent(target: TreeItem, nodes: TreeItem[]): TreeItem | undefined {
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
