import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Button from "../src/components/atoms/Button";

describe("Button component", () => {
  it("renders a primary button with text", () => {
    render(<Button type={"primary"}>{"Click !"}</Button>);

    const button = screen.getByRole("button", {
      name: /Click !/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click !");
    expect(button).toHaveClass(
      "text-light-ultrawhite gradient-red hover:drop-shadow-xl hover:dark:shadow-lg hover:dark:shadow-dark-radargrid"
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
      "text-dark-red bg-transparent border border-dark-red dark:border-dark-red hover:bg-light-red hover:text-light-light"
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
      "bg-light-graybutton hover:bg-light-radargrid dark:bg-dark-graybutton dark:hover:bg-dark-radargrid"
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
      "gradient-red-faded text-light-ultrawhite hover:shadow-xl hover:shadow-light-graybutton hover:dark:shadow-lg hover:dark:shadow-dark-radargrid"
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

  it("renders a primary button with icon", () => {
    render(
      <Button type={"primary"} icon={<AiOutlineArrowLeft color="white" />}>
        {"Click !"}
      </Button>
    );

    const button = screen.getByRole("button", {
      name: /Click !/i,
    });

    expect(button).toBeInTheDocument();
    expect(button.firstChild).toContain(<AiOutlineArrowLeft color="white" />);
  });
});
