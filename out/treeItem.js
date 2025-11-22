"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeItem = void 0;
const vscode = require("vscode");
const utils_1 = require("./utils");
const iconService_1 = require("./iconService");
class TreeItem extends vscode.TreeItem {
    constructor(label, children, project, category) {
        const collapsibleState = children === undefined
            ? vscode.TreeItemCollapsibleState.None
            : vscode.TreeItemCollapsibleState.Expanded;
        super(label, collapsibleState);
        this.children = children;
        this.project = project;
        this.category = category;
        if (this.project) {
            const isCurrent = this.isCurrentProject();
            const pathToCheck = this.project._workspacePath ?? this.project._path;
            const isValid = (0, utils_1.pathExists)(pathToCheck);
            if (this.project._workspacePath) {
                this.label = `${label} (Workspace)`;
            }
            const icon = (0, iconService_1.getProjectIcon)({
                workspace: !!this.project._workspacePath,
                active: isCurrent,
                invalid: !isValid
            });
            this.iconPath = icon;
            this.contextValue = isValid ? 'project' : 'project-invalid';
            this.command = {
                command: 'project-library.openInCurrentWindow',
                title: 'Open Project',
                arguments: [this]
            };
            const pathInfo = this.project._workspacePath ?? this.project._path;
            let tooltipText = `${label}\n${pathInfo}`;
            if (isCurrent) {
                tooltipText += '\n\n🟢 Currently Active';
            }
            if (!isValid) {
                tooltipText += '\n\n🔴 Path not found';
            }
            this.tooltip = tooltipText;
        }
        else {
            this.iconPath = new vscode.ThemeIcon('folder');
            this.contextValue = 'category';
            this.tooltip = label;
        }
    }
    isCurrentProject() {
        if (!this.project) {
            return false;
        }
        if (this.project._workspacePath && vscode.workspace.workspaceFile) {
            return this.project._workspacePath === vscode.workspace.workspaceFile.fsPath;
        }
        if (this.project._path && vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            return this.project._path === vscode.workspace.workspaceFolders[0].uri.fsPath;
        }
        return false;
    }
}
exports.TreeItem = TreeItem;
//# sourceMappingURL=treeItem.js.map