import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "../src/components/atoms/Button";

describe("Button component", () => {
  it("1. Renders a primary button with text", () => {
    render(<Button type={"primary"}>{"Click !"}</Button>);

    const button = screen.getByRole("button", {
      name: /Click !/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("2. Renders a primary disabled button with text", () => {
    render(
      <Button type={"primary"} disabled={true}>
        {"Click !"}
      </Button>
    );

    const button = screen.getByRole("button", {
      name: /Click !/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");
  });
});
