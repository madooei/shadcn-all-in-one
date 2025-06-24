import { defineConfig } from "tsup";

export default defineConfig([
  // Main bundle with all components
  {
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm"],
    sourcemap: true,
    clean: true,
    dts: true,
    splitting: true,
    treeshake: true,
    external: ["react", "react-dom"],
    esbuildOptions(options) {
      options.alias = {
        "@": "./src",
      };
      options.jsx = "automatic";
    },
  },
  // Individual component entries for optimal tree-shaking
  {
    entry: {
      // UI Components - direct from components/ui
      accordion: "src/components/ui/accordion.tsx",
      alert: "src/components/ui/alert.tsx",
      "alert-dialog": "src/components/ui/alert-dialog.tsx",
      "aspect-ratio": "src/components/ui/aspect-ratio.tsx",
      avatar: "src/components/ui/avatar.tsx",
      badge: "src/components/ui/badge.tsx",
      breadcrumb: "src/components/ui/breadcrumb.tsx",
      button: "src/components/ui/button.tsx",
      calendar: "src/components/ui/calendar.tsx",
      card: "src/components/ui/card.tsx",
      carousel: "src/components/ui/carousel.tsx",
      chart: "src/components/ui/chart.tsx",
      checkbox: "src/components/ui/checkbox.tsx",
      collapsible: "src/components/ui/collapsible.tsx",
      command: "src/components/ui/command.tsx",
      "context-menu": "src/components/ui/context-menu.tsx",
      dialog: "src/components/ui/dialog.tsx",
      drawer: "src/components/ui/drawer.tsx",
      "dropdown-menu": "src/components/ui/dropdown-menu.tsx",
      form: "src/components/ui/form.tsx",
      "hover-card": "src/components/ui/hover-card.tsx",
      input: "src/components/ui/input.tsx",
      "input-otp": "src/components/ui/input-otp.tsx",
      label: "src/components/ui/label.tsx",
      menubar: "src/components/ui/menubar.tsx",
      "navigation-menu": "src/components/ui/navigation-menu.tsx",
      pagination: "src/components/ui/pagination.tsx",
      popover: "src/components/ui/popover.tsx",
      progress: "src/components/ui/progress.tsx",
      "radio-group": "src/components/ui/radio-group.tsx",
      resizable: "src/components/ui/resizable.tsx",
      "scroll-area": "src/components/ui/scroll-area.tsx",
      select: "src/components/ui/select.tsx",
      separator: "src/components/ui/separator.tsx",
      sheet: "src/components/ui/sheet.tsx",
      sidebar: "src/components/ui/sidebar.tsx",
      skeleton: "src/components/ui/skeleton.tsx",
      slider: "src/components/ui/slider.tsx",
      sonner: "src/components/ui/sonner.tsx",
      switch: "src/components/ui/switch.tsx",
      table: "src/components/ui/table.tsx",
      tabs: "src/components/ui/tabs.tsx",
      textarea: "src/components/ui/textarea.tsx",
      toggle: "src/components/ui/toggle.tsx",
      "toggle-group": "src/components/ui/toggle-group.tsx",
      tooltip: "src/components/ui/tooltip.tsx",

      // Additional Components
      icons: "src/components/icons.tsx",
      "tooltip-button": "src/components/tooltip-button.tsx",

      // Category exports
      hooks: "src/hooks.ts",
      contexts: "src/contexts.ts",
      providers: "src/providers.ts",
      utils: "src/utils.ts",
    },
    outDir: "dist",
    format: ["esm"],
    sourcemap: true,
    dts: true,
    splitting: false,
    treeshake: true,
    external: ["react", "react-dom"],
    esbuildOptions(options) {
      options.alias = {
        "@": "./src",
      };
      options.jsx = "automatic";
    },
  },
  // CSS files - copy them to dist
  {
    entry: ["src/styles/shadcn.css"],
    outDir: "dist",
    esbuildOptions(options) {
      options.loader = { ".css": "file" };
    },
  },
]);
