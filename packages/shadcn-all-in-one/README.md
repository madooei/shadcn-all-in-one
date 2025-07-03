# Shadcn All In One

A comprehensive React component library that consolidates all [shadcn UI components](https://ui.shadcn.com/) into a single, easy-to-use package.

> [!IMPORTANT]
> This package is for convenience and personal use. It consolidates shadcn UI components but you can also use shadcn UI directly by following their installation guide.

**Features:**

- **Complete shadcn UI Collection**: All shadcn UI components in one package
- **Tree-shaking Optimized**: Import only what you need for optimal bundle sizes
- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Individual Component Imports**: Each component is a separate bundle for maximum efficiency
- **Modern Build System**: ES modules only support
- **Tailwind CSS Integration**: Seamless integration with Tailwind CSS
- **Additional Components**: Icons collection and enhanced components like TooltipButton

## Installation

```bash
npm install @madooei/shadcn-all-in-one
```

**Peer Dependencies**: This package requires React, React DOM, and Tailwind CSS as peer dependencies:

```bash
npm install react react-dom tailwindcss
```

## Styling Requirements

This package **requires Tailwind CSS** for styling. Components use Tailwind utility classes and will not display correctly without Tailwind CSS properly configured in your project.

### CSS Import Options

This package works with Tailwind CSS v4.

```js
// src/main.tsx
import "./index.css"; // or your main CSS file where you import Tailwind CSS
import "@madooei/shadcn-all-in-one/shadcn.css"; // add this after your main CSS file
```

Alternatively, you can import the `@madooei/shadcn-all-in-one/shadcn.css` file directly in your `index.css` file:

```css
/* src/index.css */
@import "tailwindcss";
@import "@madooei/shadcn-all-in-one/shadcn.css";
```

### Tailwind Configuration

Configure your `tailwind.config.js` to include the component library:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add this line to scan the component library:
    "./node_modules/@madooei/shadcn-all-in-one/dist/**/*.{js,cjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Then update your `index.css` (or your main CSS file) file to use this configuration:

```css
/* src/index.css */
@import "tailwindcss";
@import "@madooei/shadcn-all-in-one/shadcn.css";
@config "../tailwind.config.js"; // path to your Tailwind config file
```

> [!TIP]
> Make note of the semicolon at the end of the `@import` and `@config` lines. This is required for Tailwind CSS to process these statements correctly.

## Migration from shadcn UI

After you've completed the above setup, take the following steps to migrate from shadcn UI to `@madooei/shadcn-all-in-one`:

- Update your imports from shadcn UI to individual component imports. For example, change all `"@/components/ui/button"` to `"@madooei/shadcn-all-in-one/button"`.
- Update `"@/lib/utils"` to `"@madooei/shadcn-all-in-one/utils"` for utility functions.
- Update `"@/hooks/use-mobile"` to `"@madooei/shadcn-all-in-one/hooks"` for mobile detection hooks.
- Delete `@/components/ui` directory if it exists, as all components are now included in the package.
- Delete `@/lib/utils` directory if it exists, as all utility functions are now included in the package.
- Delete shadcn's `./components.json` configuration file if it exists, as this package does not require it.
- Remove any `@radix-ui/*` dependencies from `package.json` as this package already includes all necessary Radix UI components.
- Likewise, remove `class-variance-authority`, `clsx`, `tw-animate-css`, `tailwind-merge`, `vaul`, `react-resizable-panels`, `react-day-picker`, `embla-carousel-react`, and `input-otp`.
- However, keep `cmdk`, `date-fns`, `lucid-react`, `react-hook-form`, `recharts`, and `sonner` as these are peer dependencies and are still required for some components. (Of course, you will need `react`, `react-dom`, and `tailwindcss` as well.)
- If you are using `sonner`, you will need to pass the `theme` prop to it, as the original version has a dependency on `next-themes`. This package removes that dependency. See the [Sonner Toast Notifications](#updated-sonner-toast-notifications) section below for more details.
- Remove `node_modules` and `package-lock.json` (or `yarn.lock`, `pnpm-lock.yaml`, etc.) to ensure a clean installation of dependencies.
- Reinstall dependencies and run your application to ensure everything works correctly with the new package.

## Usage

Import components individually for optimal bundle optimization and tree-shaking:

### Individual Component Imports (Recommended)

Import each component individually for the smallest possible bundle size:

```tsx
import React from "react";
import { Button } from "@madooei/shadcn-all-in-one/button";
import { Card } from "@madooei/shadcn-all-in-one/card";
import { Input } from "@madooei/shadcn-all-in-one/input";
import { Dialog } from "@madooei/shadcn-all-in-one/dialog";
import { Icons } from "@madooei/shadcn-all-in-one/icons";
import { TooltipButton } from "@madooei/shadcn-all-in-one/tooltip-button";

function App() {
  return (
    <div>
      <Card>
        <h2>Welcome to shadcn-all-in-one</h2>
        <Input placeholder="Enter your name" />
        <Button>Click me!</Button>
        <TooltipButton tooltipContent="This is a tooltip button">
          Hover me
        </TooltipButton>
        <Icons.react className="w-6 h-6" />
      </Card>
    </div>
  );
}
```

### Category Imports

Import related functionality by category:

```tsx
import * as hooks from "@madooei/shadcn-all-in-one/hooks";
import * as utils from "@madooei/shadcn-all-in-one/utils";
```

## Available Components

### Core UI Components

All standard shadcn UI components are available:

- **Layout**: Accordion, Aspect Ratio, Card, Collapsible, Separator, Sheet, Sidebar
- **Navigation**: Breadcrumb, Command, Menubar, Navigation Menu, Pagination, Tabs
- **Forms**: Button, Checkbox, Form, Input, Input OTP, Label, Radio Group, Select, Slider, Switch, Textarea, Toggle, Toggle Group
- **Overlays**: Alert Dialog, Dialog, Drawer, Dropdown Menu, Hover Card, Popover, Tooltip
- **Data Display**: Alert, Avatar, Badge, Calendar, Carousel, Chart, Progress, Skeleton, Sonner, Table
- **Feedback**: Progress, Skeleton, Sonner

### Modified UI Components

#### Updated Sonner Toast Notifications

The original version has a dependency on `next-themes`. I removed this dependency and now when you use it, you must pass the `theme` prop to it.

```tsx
import { Toaster } from "@madooei/shadcn-all-in-one/sonner";
import { Button } from "@madooei/shadcn-all-in-one/button";
import { toast } from "sonner";

function App() {
  const { theme } = useTheme(); // Use your preferred theme management solution

  return (
    <div>
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Default
      </Button>
      <Toaster
        theme={theme} // Pass the theme prop
        richColors
        position="bottom-right"
      />
    </div>
  );
}
```

### Additional Components

#### Icons

A comprehensive collection of popular icons:

```tsx
import { Icons } from "@madooei/shadcn-all-in-one/icons";

// Available icons
<Icons.twitter />
<Icons.gitHub />
<Icons.react />
<Icons.tailwind />
<Icons.npm />
<Icons.yarn />
<Icons.pnpm />
<Icons.google />
<Icons.apple />
<Icons.paypal />
<Icons.spinner />
<Icons.radix />
<Icons.aria />
```

#### TooltipButton

An enhanced button component with built-in tooltip functionality:

```tsx
import { TooltipButton } from "@madooei/shadcn-all-in-one/tooltip-button";

<TooltipButton
  tooltipContent="This button has a tooltip"
  variant="outline"
  size="sm"
>
  Hover me
</TooltipButton>;
```

**Props:**

- `tooltipContent` (ReactNode) - Content to display in the tooltip
- `asChild?` (boolean) - Whether to render as a child component
- All standard Button props (variant, size, disabled, etc.)

### Hooks, Contexts, and Utilities

```tsx
import { useMobile } from "@madooei/shadcn-all-in-one/hooks";
import { cn } from "@madooei/shadcn-all-in-one/utils";
```

## Cloning the Repository

To make your workflow more organized, it's a good idea to clone this repository into a directory named `shadcn-all-in-one-workspace`. This helps differentiate the workspace from the `shadcn-all-in-one` located in the `packages` directory.

```bash
git clone https://github.com/madooei/shadcn-all-in-one shadcn-all-in-one-workspace

cd shadcn-all-in-one-workspace
```

## Repository Structure

- `packages` — Contains the primary package(s) for this repository (e.g., `shadcn-all-in-one`). Each package is self-contained and can be copied out and used independently.
- `examples` — Contains examples of how to use the packages. Each example is a minimal, standalone project.
- `playgrounds` — Contains demos of the dependencies of the primary package(s). Each playground is a minimal, standalone project.
- `scripts` — Contains scripts for the project to help with development and publishing.
- `docs` — Contains various documentation for users and developers.
- `.github` — Contains GitHub-specific files, such as workflows and issue templates.

## How to Use This Repo

- To work on a package, go to `packages/<package-name>` and follow its README.
- To try an example, go to `examples/<example-name>` and follow its README.
- To run the playground, go to `playground/<package-name>` and follow its README.
- For documentation, see the `docs` folder.

### Using a VSCode Multi-root Workspace

With Visual Studio Code, you can enhance your development experience by using a multi-root workspace to access packages, examples, and playgrounds simultaneously. This approach is more efficient than opening the root directory, or each package or example separately.

To set up a multi-root workspace:

1. Open Visual Studio Code.
2. Navigate to `File > Open Workspace from File...`.
3. Select the `shadcn-all-in-one.code-workspace` file located at the root of the repository. This action will open all specified folders in one workspace.

The `shadcn-all-in-one.code-workspace` file can be customized to include different folders or settings. Here's a typical configuration:

```json
{
  "folders": [
    {
      "path": "packages/shadcn-all-in-one"
    },
    {
      "path": "examples/with-tailwind4"
    },
    {
      "path": "playgrounds/vite"
    }
  ],
  "settings": {
    // Add any workspace-specific settings here, for example:
    "git.openRepositoryInParentFolders": "always"
  }
}
```

## Developing the Package

Change to the package directory and install dependencies:

```bash
cd packages/shadcn-all-in-one
npm install
```

- Read the [Project Roadmap](../../docs/ROADMAP.md) for project goals, status, evolution, and development guidelines.
- Read the [Development Guide](DEVELOPMENT.md) for detailed information on the package architecture, build configuration, and implementation patterns.
- Follow the [Contributing Guide](../../docs/CONTRIBUTING.md) for contribution guidelines, coding standards, and best practices.

## Package Management

When you are ready to publish your package:

```bash
npm run release
```

This single command will:

- Validate your code with the full validation pipeline
- Analyze commits to determine version bump
- Update package.json version and changelog
- Build the package
- Create and push git tag
- Create GitHub release
- Publish to NPM

> [!TIP]
> For detailed information about package publishing, versioning, and local development workflows, see the [NPM Package Management Guide](../../docs/guides/npm-package.md).
