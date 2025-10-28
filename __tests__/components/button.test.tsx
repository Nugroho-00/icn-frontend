import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  it("should render button with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("should handle click events", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should apply variant classes", () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>);
    let button = screen.getByRole("button");
    expect(button).toHaveClass("bg-destructive");

    rerender(<Button variant="outline">Cancel</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("border");
  });

  it("should apply size classes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByRole("button");
    expect(button).toHaveClass("h-8");

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("h-10");
  });

  it("should apply custom className", () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("should render as child when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test");
  });
});
