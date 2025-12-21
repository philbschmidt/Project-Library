# Changelog

All notable changes to the "Project Library" extension will be documented in this file.

## [1.1.4] - 2025-12-21

- Changed sidebar icon
- Added automated publish script (`npm run deploy`) for easier release management
- Updated build configuration

## [1.1.3] - 2025-11-22

- Improved project validation and error handling
    - Projects now check if their paths exist
    - Invalid projects are marked with error icon and different context value
    - Added "Delete Invalid Project" command for projects with non-existent paths
    - Enhanced tooltips to show path validation status
- Refactored icon handling
    - Created centralized icon service for consistent icon management
    - Added `pathExists` utility function for path validation
    - Improved project icon state management (workspace, active, invalid states)
- Updated TreeItem implementation
    - Added path validation on TreeItem creation
    - Changed default collapsibleState for categories to Collapsed

## [1.1.2] - 2025-11-16

- Updated videos and screenshots

## [1.1.1] - 2025-11-15

- Replaced sidebar icon with .spg file
- Changed extension logo

## [1.1.0] - 2025-11-11

- Added Expand All button to toolbar
- Added Project Search functionality with keyboard shortcut (Ctrl+F / Cmd+F)
- Updated [README.md](README.md)
    - Fixed description for "Open in New Window" feature

## [1.0.5] - 2025-11-09

- Updated image

## [1.0.4] - 2025-11-08

- Increased resolution of icon images

## [1.0.3] - 2025-11-08

- Changed [README.md](README.md)
    - Removed project library icon
    - Updated .gifs to include new sidebar icon

## [1.0.2] - 2025-11-08

- Changed project library icon

## [1.0.1] - 2025-11-08

- Changed [README.md](README.md)
    - Fixed URLs
- Changed package.json
    - Fixed URLs

## [1.0.0] - 2025-11-08

Initial release of Project Library:
- Project and workspace management
- Hierarchical category organization
- Tree view with visual indicators
- Robust error handling and data backup
- Support for single folders and multi-root workspaces
