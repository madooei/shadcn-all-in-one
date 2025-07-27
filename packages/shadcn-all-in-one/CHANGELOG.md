# Changelog

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.



* chore: update release script to use dotenv for environment variable management (75665cd)
* chore: update devDependencies in package.json (8261f7c)
* chore: update package.json to improve metadata and dependencies organization (d65279c)
* chore: remove available examples and playgrounds sections from README files (fdbddf4)
* refactor: simplify release configuration to use keep-a-changelog plugin (c86b45e)

# Changelog

## [Unreleased]

### ⚙️ Miscellaneous Tasks

- Update ESLint configuration and package dependencies, remove peer-deps-check utility
- Add @release-it/keep-a-changelog plugin and update package dependencies in package.json and package-lock.json
- Add unreleased section to CHANGELOG.md

## [0.2.1] - 2025-07-03

### 🚜 Refactor

- Remove barrel exports and index file for individual component imports, update README for clarity on usage and optimization

### 📚 Documentation

- Enhance README with detailed Tailwind CSS setup and migration instructions

### ⚙️ Miscellaneous Tasks

- Clean up package.json by removing unused scripts and updating dependency version constraints
- Release v0.2.1

## [0.2.0] - 2025-06-24

### 🚀 Features

- Initialize shadcn-all-in-one package with essential configurations
- Add VSCode configuration files for extensions and launch settings
- Add SidebarContextProps interface for sidebar state management
- Add Tailwind CSS configuration for styling and theming
- Add custom hooks for form field, mobile detection, sidebar, and theme management
- Add FormFieldContext and FormItemContext for form state management
- Add Sheet component and related subcomponents for UI layout
- Add peer dependency check for React and Tailwind CSS
- Implement SidebarProvider and TooltipProvider components for UI state management
- Add global CSS variables and dark mode styles for improved theming
- Add context, hooks, providers, and utility exports for improved modularity
- Add initial tests for Button component and setup for testing library
- Refactor components to use "use client" directive and improve context management

### 🚜 Refactor

- Remove unused Tailwind configuration file
- Add new global styles for Tailwind integration
- Remove CommonJS require fields from package.json and update peer dependencies for React
- Update tsup configuration to use ESM format only and streamline CSS entry points
- Update README and package.json for Tailwind CSS v4 compatibility
- Update peer dependency installation instructions for improved clarity
- Update dependencies and peer dependencies for compatibility with latest versions
- Simplify component definitions in Calendar for improved readability
- Update README and package files for React 19 compatibility and improve peer dependency checks
- Enhance Toaster component to accept theme prop and remove useTheme dependency
- Update README to reflect changes in sonner component and remove next-themes dependency
- Update sonner component to remove next-themes dependency and require theme prop

### ⚙️ Miscellaneous Tasks

- Release v0.2.0
