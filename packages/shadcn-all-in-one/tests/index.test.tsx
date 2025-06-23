import { render, screen } from "@testing-library/react";
import { Button } from "../src/components/ui/button";

describe("Hello world test", () => {
  it("renders Button without crashing", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });
});
