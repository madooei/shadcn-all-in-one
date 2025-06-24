import React from "react";

let hasCheckedPeerDeps = false;

export function checkPeerDependencies(): void {
  // Only check once to avoid performance impact
  if (hasCheckedPeerDeps) return;
  hasCheckedPeerDeps = true;

  const missingDeps: string[] = [];
  const errorMessages: string[] = [];

  // Check for React
  if (!React || typeof React.createElement !== "function") {
    missingDeps.push("react");
    errorMessages.push("React is not available");
  }

  // Check React version (basic check)
  if (React.version && React.version.split(".")[0] < "16") {
    errorMessages.push(
      `React version ${React.version} is too old. Requires React >=16.8.0`,
    );
  }

  if (missingDeps.length > 0 || errorMessages.length > 0) {
    const error = new Error(
      `@madooei/shadcn-all-in-one peer dependency issues:\n\n` +
        (errorMessages.length > 0
          ? `Issues:\n${errorMessages.map((msg) => `- ${msg}`).join("\n")}\n\n`
          : "") +
        (missingDeps.length > 0
          ? `Missing dependencies: ${missingDeps.join(", ")}\n\n`
          : "") +
        `Please install the required dependencies:\n` +
        `npm install react react-dom tailwindcss date-fns react-hook-form cmdk\n\n` +
        `Optional dependencies (install if using related components):\n` +
        `npm install lucide-react recharts @tanstack/react-table sonner\n\n` +
        `Also ensure Tailwind CSS is configured in your project for proper styling.`,
    );
    error.name = "PeerDependencyError";
    throw error;
  }

  // Warn about Tailwind CSS (non-blocking)
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    // Only check in browser environment
    setTimeout(() => {
      const hasMetaTailwind = document.querySelector('meta[name="tailwind"]');
      const hasTailwindClasses =
        document.querySelector('[class*="bg-blue-"]') ||
        document.querySelector('[class*="shadow-"]') ||
        document.querySelector('[class*="rounded-"]');

      if (!hasMetaTailwind && !hasTailwindClasses) {
        console.warn(
          "⚠️  @madooei/shadcn-all-in-one: Tailwind CSS not detected.\n" +
            "Components may not display correctly without Tailwind CSS.\n" +
            "Please ensure Tailwind CSS is installed and configured.\n" +
            "See: https://tailwindcss.com/docs/installation",
        );
      }
    }, 100); // Small delay to let components render
  }
}
