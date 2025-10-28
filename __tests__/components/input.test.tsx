import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui/input";

describe("Input Component", () => {
  it("should render input field", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("should handle text input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);

    const input = screen.getByPlaceholderText("Type here");
    await user.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Input disabled placeholder="Disabled input" />);
    expect(screen.getByPlaceholderText("Disabled input")).toBeDisabled();
  });

  it("should apply custom className", () => {
    render(<Input className="custom-input" placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toHaveClass("custom-input");
  });

  it("should handle onChange event", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} placeholder="Test" />);

    await user.type(screen.getByPlaceholderText("Test"), "a");

    expect(handleChange).toHaveBeenCalled();
  });

  it("should render with different types", () => {
    const { rerender } = render(<Input type="text" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("type", "text");

    rerender(<Input type="password" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("type", "password");

    rerender(<Input type="email" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("type", "email");
  });

  it("should handle value prop", () => {
    render(
      <Input value="Controlled value" onChange={() => {}} data-testid="input" />
    );
    expect(screen.getByTestId("input")).toHaveValue("Controlled value");
  });
});
