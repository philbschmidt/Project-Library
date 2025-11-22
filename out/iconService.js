"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconKind = void 0;
exports.getIcon = getIcon;
exports.getProjectIcon = getProjectIcon;
exports.getCategoryIcon = getCategoryIcon;
const vscode = require("vscode");
var IconKind;
(function (IconKind) {
    IconKind[IconKind["Project"] = 0] = "Project";
    IconKind[IconKind["ProjectWorkspace"] = 1] = "ProjectWorkspace";
    IconKind[IconKind["ProjectActive"] = 2] = "ProjectActive";
    IconKind[IconKind["ProjectInvalid"] = 3] = "ProjectInvalid";
    IconKind[IconKind["CategoryExpanded"] = 4] = "CategoryExpanded";
    IconKind[IconKind["CategoryCollapsed"] = 5] = "CategoryCollapsed";
})(IconKind || (exports.IconKind = IconKind = {}));
function getIcon(kind) {
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
function getProjectIcon(state) {
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
function getCategoryIcon(expanded) {
    return expanded ? getIcon(IconKind.CategoryExpanded) : getIcon(IconKind.CategoryCollapsed);
}
//# sourceMappingURL=iconService.js.map