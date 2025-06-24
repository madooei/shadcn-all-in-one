import { Toaster as Sonner, type ToasterProps } from "sonner";

export interface SonnerProps extends ToasterProps {
  theme: ToasterProps["theme"];
}

const Toaster = ({ theme, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
