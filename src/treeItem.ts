import * as vscode from 'vscode';
import { Project } from './project';
import { Category } from './category';
import { pathExists } from './utils';
import { getProjectIcon } from './iconService';

export class TreeItem extends vscode.TreeItem {
    children: TreeItem[] | undefined;
    project?: Project;
    category?: Category;

    constructor(label: string, children?: TreeItem[], project?: Project, category?: Category) {
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
            const isValid = pathExists(pathToCheck);

            if (this.project._workspacePath) {
                this.label = `${label} (Workspace)`;
            }

            const icon = getProjectIcon({
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
        } else {
            this.iconPath = new vscode.ThemeIcon('folder');
            this.contextValue = 'category';
            this.tooltip = label;
        }
    }

    private isCurrentProject(): boolean {
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
