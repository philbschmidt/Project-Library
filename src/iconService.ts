import * as vscode from 'vscode';

export enum IconKind {
    Project,
    ProjectWorkspace,
    ProjectActive,
    ProjectInvalid,
    CategoryExpanded,
    CategoryCollapsed
}

export function getIcon(kind: IconKind): vscode.ThemeIcon {
    switch (kind) {
        case IconKind.ProjectWorkspace:
            return new vscode.ThemeIcon('folder-library');
        case IconKind.ProjectActive:
            return new vscode.ThemeIcon('folder-active');
        case IconKind.ProjectInvalid:
            return new vscode.ThemeIcon('error');
        case IconKind.CategoryExpanded:
            return new vscode.ThemeIcon('folder-opened');
        case IconKind.CategoryCollapsed:
            return new vscode.ThemeIcon('folder');
        case IconKind.Project:
        default:
            return new vscode.ThemeIcon('project');
    }
}

export interface ProjectIconState {
    workspace: boolean;
    active: boolean;
    invalid: boolean;
}

export function getProjectIcon(state: ProjectIconState): vscode.ThemeIcon {
    if (state.invalid) {
        return new vscode.ThemeIcon('error', new vscode.ThemeColor('errorForeground'));
    }
    if (state.active) {
        return new vscode.ThemeIcon('folder-active', new vscode.ThemeColor('terminal.ansiGreen'));
    }
    if (state.workspace) {
        return getIcon(IconKind.ProjectWorkspace);
    }
    return getIcon(IconKind.Project);
}

export function getCategoryIcon(expanded: boolean): vscode.ThemeIcon {
    return expanded ? getIcon(IconKind.CategoryExpanded) : getIcon(IconKind.CategoryCollapsed);
}
