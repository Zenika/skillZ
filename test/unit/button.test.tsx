import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button, { buttonClasses } from "../../src/components/atoms/Button";

describe("Button component", () => {
  it("renders a primary button with text", () => {
    render(<Button type={"primary"}>{"Click !"}</Button>);

    const button = screen.getByRole("button", {
      name: /Click !/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click !");
    expect(button).toHaveClass(
      `${buttonClasses.base} ${buttonClasses.disabled} ${buttonClasses.uppercase} ${buttonClasses.variant["primary"]}`
    );
  });

  it("renders a secondary button with text", () => {
    render(<Button type={"secondary"}>{"Click !"}</Button>);

    const button = screen.getByRole("button", {
      name: /Click !/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click !");
    expect(button).toHaveClass(
      `${buttonClasses.base} ${buttonClasses.disabled} ${buttonClasses.uppercase} ${buttonClasses.variant["secondary"]}`
    );
  });

  it("renders a tertiary button with text", () => {
    render(<Button type={"tertiary"}>{"Click !"}</Button>);

    const button = screen.getByRole("button", {
      name: /Click !/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click !");
    expect(button).toHaveClass(
      `${buttonClasses.base} ${buttonClasses.disabled} ${buttonClasses.uppercase} ${buttonClasses.variant["tertiary"]}`
    );
  });

  it("renders a faded button with text", () => {
    render(<Button type={"faded"}>{"Click !"}</Button>);

    const button = screen.getByRole("button", {
      name: /Click !/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click !");
    expect(button).toHaveClass(
      `${buttonClasses.base} ${buttonClasses.disabled} ${buttonClasses.uppercase} ${buttonClasses.variant["faded"]}`
    );
  });

  it("renders a primary button with text", () => {
    render(<Button type={"primary"}>{"Click !"}</Button>);

    const button = screen.getByRole("button", {
      name: /Click !/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("renders a primary button and click one time", () => {
    const mockCallBack = jest.fn();

    render(
      <Button type={"primary"} callback={mockCallBack}>
        {"Click !"}
      </Button>
    );

    const button = screen.getByRole("button", {
      name: /Click !/i,
    });

    expect(button).toBeInTheDocument();
    button.click();
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it("renders a primary disabled button with text", () => {
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

  it("renders a primary disabled button and try to click", () => {
    const mockCallBack = jest.fn();

    render(
      <Button type={"primary"} disabled={true} callback={mockCallBack}>
        {"Click !"}
      </Button>
    );

    const button = screen.getByRole("button", {
      name: /Click !/i,
    });

    expect(button).toBeInTheDocument();
    button.click();
    expect(mockCallBack.mock.calls.length).toEqual(0);
  });
});
