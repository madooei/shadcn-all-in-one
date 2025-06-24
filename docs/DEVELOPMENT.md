# Development Guide

This document provides technical details for developers working on the Shadcn All In One package, including build architecture, development workflows, and React-specific implementation patterns for a comprehensive shadcn UI component library.

## Build Architecture

### TypeScript Configuration

**Multiple TypeScript Configurations:**

- `tsconfig.json` - Development configuration with all files included
- `tsconfig.build.json` - Build-specific configuration for production
- React JSX support with `"jsx": "react-jsx"` for modern JSX transform

**Key Settings:**

- Target: `ESNext` for modern JavaScript features
- Module: `ESNext` for ES modules
- JSX: `react-jsx` for automatic JSX runtime
- Strict mode enabled for type safety
- React types included

> [!TIP]
> For detailed information about TypeScript setup, see the [TypeScript Setup Guide](../../docs/guides/typescript.md).

### Build System (tsup)

**Why tsup for shadcn UI components:**

- Fast builds with esbuild under the hood
- ESM module output without complex configuration
- React JSX preservation for optimal compatibility
- Automatic declaration file generation
- Built-in code splitting and tree-shaking
- Deep entry points for optimal tree-shaking

**Configuration (`tsup.config.ts`):**

```typescript
export default defineConfig([
  // Main bundle with all components
  {
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm"],
    sourcemap: true,
    clean: true,
    dts: true,
    splitting: false,
    treeshake: true,
    external: ["react", "react-dom"],
  },
  // Individual component entries for optimal tree-shaking
  {
    entry: {
      // UI Components - direct from components/ui
      accordion: "src/components/ui/accordion.tsx",
      alert: "src/components/ui/alert.tsx",
      button: "src/components/ui/button.tsx",
      card: "src/components/ui/card.tsx",
      // ... all other shadcn UI components

      // Additional Components
      icons: "src/components/icons.tsx",
      "tooltip-button": "src/components/tooltip-button.tsx",

      // Category exports
      hooks: "src/hooks.ts",
      utils: "src/utils.ts",
    },
    outDir: "dist",
    format: ["esm"],
    sourcemap: true,
    dts: true,
    splitting: false,
    treeshake: true,
    external: ["react", "react-dom"],
  },
]);
```

### Module Format Strategy

- Modern bundlers use ESM (`module` field)
- Deep entry points for optimal tree-shaking

**package.json Configuration:**

```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      }
    },
    "./button": {
      "import": {
        "types": "./dist/button.d.ts",
        "default": "./dist/button.js"
      }
    },
    "./icons": {
      "import": {
        "types": "./dist/icons.d.ts",
        "default": "./dist/icons.js"
      }
    },
    "./shadcn.css": "./dist/shadcn.css"
  }
}
```

## Shadcn UI Component Architecture

### Component Structure

**shadcn UI Component Pattern:**

```typescript
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Additional props
}

export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Component.displayName = "Component";
```

### Deep Entry Points Strategy

**Why Deep Entry Points:**

- Eliminates redundant export files
- Reduces maintenance overhead
- Preserves tree-shaking benefits
- Direct exposure of component files

**File Structure:**

```plaintext
src/
├── index.ts                    # Main barrel export
├── hooks.ts                    # Category export for hooks
├── components/
│   ├── ui/                     # All shadcn UI components
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ... (all shadcn components)
│   ├── icons.tsx               # Icons collection
│   └── tooltip-button.tsx      # Enhanced components
├── hooks/                      # Individual hook files
└── lib/
    ├── peer-deps-check.ts      # Peer dependency validation
    └── utils.ts                # Utility functions

```

### Peer Dependencies Strategy

**Why Peer Dependencies for React:**

- Prevents React version conflicts
- Allows host app to control React version
- Reduces bundle size by not duplicating React
- Enables version flexibility for shadcn UI dependencies

**Current Peer Dependencies:**

```json
{
  "peerDependencies": {
    "react": ">=19.0.0",
    "react-dom": ">=19.0.0",
    "tailwindcss": ">=4.0.0"
  }
}
```

### Tree-Shaking Optimization

**Deep Entry Points for Tree-Shaking:**

- Each component exposed directly from its source file
- Consumers can import specific components: `import { Button } from '@package/button'`
- Category exports for related functionality: `import { hooks } from '@package/hooks'`
- Reduces bundle size for apps using only some components

## Component Categories

### Core shadcn UI Components

**Layout Components:**

- Accordion, Aspect Ratio, Card, Collapsible, Separator, Sheet, Sidebar

**Navigation Components:**

- Breadcrumb, Command, Menubar, Navigation Menu, Pagination, Tabs

**Form Components:**

- Button, Checkbox, Form, Input, Input OTP, Label, Radio Group, Select, Slider, Switch, Textarea, Toggle, Toggle Group

**Overlay Components:**

- Alert Dialog, Dialog, Drawer, Dropdown Menu, Hover Card, Popover, Tooltip

**Data Display Components:**

- Alert, Avatar, Badge, Calendar, Carousel, Chart, Progress, Skeleton, Sonner, Table

### Additional Components

**Icons Collection:**

```typescript
// src/components/icons.tsx
export const Icons = {
  twitter: (props: IconProps) => <svg {...props}>...</svg>,
  gitHub: (props: IconProps) => <svg {...props}>...</svg>,
  react: (props: IconProps) => <svg {...props}>...</svg>,
  // ... comprehensive icon collection
};
```

**Enhanced Components:**

```typescript
// src/components/tooltip-button.tsx
export const TooltipButton = React.forwardRef<
  HTMLButtonElement,
  TooltipButtonProps
>(({ tooltipContent, ...props }, ref) => {
  // Enhanced button with built-in tooltip
});
```

## Testing Strategy

### React Testing Library Configuration

**Why React Testing Library:**

- Focuses on testing user interactions rather than implementation details
- Better integration with React components
- Simulates real user behavior

**Current Testing Approach:**

- Minimal "hello world" test for setup validation
- Focus on ensuring build and import systems work correctly
- Ready for comprehensive testing expansion

**Test Setup:**

```typescript
// tests/index.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "../src/components/ui/button";

describe("Hello world test", () => {
  it("renders Button without crashing", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });
});
```

### Testing Setup

**Vitest Configuration for React:**

```typescript
// vitest.config.ts
export default defineConfig({
  environment: "jsdom", // DOM simulation for React
  setupFiles: ["./tests/setup.ts"], // React Testing Library setup
  test: {
    globals: true, // No need to import test functions
  },
});
```

## Development Workflow

### React Development Mode

**The `npm run dev` Command:**

- Runs tsx in watch mode
- Hot reloads React components
- TypeScript compilation on save
- Instant feedback for component changes

### Validation Pipeline for React

**The `npm run validate` Command:**

1. **Type checking** - `tsc --noEmit` (includes React JSX validation)
2. **Linting with auto-fix** - `eslint --fix` (includes React rules)
3. **Formatting with auto-fix** - `prettier --write .`
4. **Testing** - `vitest run` (includes React component tests)

### React-Specific Scripts

**Component Development:**

- `npm run dev` - Watch mode for component development
- `npm run build` - Build components for distribution
- `npm run test` - Run React component tests
- `npm run test:watch` - Watch mode for test development
- `npm run validate` - Run full validation pipeline

## Key React Implementation Patterns

### shadcn UI Component Pattern

**TypeScript Interface with React Props:**

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

### Runtime Validation for React Components

**Peer Dependency Validation:**

```typescript
// src/lib/peer-deps-check.ts
export const checkPeerDependencies = () => {
  if (typeof React === "undefined") {
    throw new Error(
      "React is required but not found. Please install react as a peer dependency."
    );
  }
};
```

### Styling with Tailwind CSS

**Component Styling Pattern:**

```typescript
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

## Code Quality Setup

### ESLint Configuration for React

**Rules Applied:**

- TypeScript ESLint recommended rules
- React ESLint plugin for React-specific rules
- React Hooks rules for proper hooks usage
- JSX accessibility rules
- Prettier integration to avoid conflicts

### React Testing Patterns

**Component Testing Strategy:**

```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  it("renders without crashing", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });
});
```

## File Organization

### Shadcn UI Component Structure

```plaintext
src/
├── index.ts                    # Main barrel export
├── hooks.ts                    # Category export for hooks
├── utils.ts                    # Category export for utilities
├── components/
│   ├── ui/                     # All shadcn UI components
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ... (all shadcn components)
│   ├── icons.tsx               # Icons collection
│   └── tooltip-button.tsx      # Enhanced components
├── hooks/                      # Individual hook files
│   └── use-mobile.ts
└── lib/
    ├── peer-deps-check.ts      # Peer dependency validation
    └── utils.ts                # Utility functions
```

### Test Structure

```plaintext
tests/
├── setup.ts                    # React Testing Library setup
└── index.test.tsx              # Component tests
```

## Technical Decisions

### Why These Tools for shadcn UI?

**tsup over webpack/rollup:** Simpler configuration, faster builds, better TypeScript integration

**Deep Entry Points:** Eliminates redundant files while preserving tree-shaking

**React Testing Library:** Modern testing approach, better accessibility testing

**Tailwind CSS:** Utility-first styling, excellent tree-shaking, design system consistency

**Peer Dependencies:** Prevents React version conflicts, reduces bundle size

### Shadcn UI Development Philosophy

1. **Component Completeness:** Provide all shadcn UI components in one package
2. **Tree-Shaking First:** Optimize for minimal bundle impact
3. **Accessibility First:** Ensure components work with screen readers and keyboard navigation
4. **Bundle Optimization:** Minimize impact on host application bundle size
5. **TypeScript Safety:** Leverage TypeScript for better developer experience
6. **Testing User Behavior:** Test what users actually do, not implementation details

### Shadcn UI-Specific Considerations

**JSX Preservation:** Components are built with JSX preserved, allowing consuming applications to handle JSX transformation based on their React version and configuration.

**Peer Dependency Range:** Support React 16.8+ (hooks introduction) while allowing newer versions for host applications.

**Styling Strategy:** Tailwind CSS provides consistent styling while allowing customization through className props and Tailwind configuration.

**Component Variants:** Use class-variance-authority for consistent variant patterns across all components.

**Additional Components:** Extend beyond shadcn UI with useful additions like Icons and TooltipButton.
