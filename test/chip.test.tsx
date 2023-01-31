import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Chip, { chipClasses } from "../src/components/atoms/Chip";

describe("Chip component", () => {
  it("renders a primary chip", () => {
    render(
      <Chip type={"primary"} callback={() => {}}>
        {"Test"}
      </Chip>
    );

    const chip = screen.getByText("Test");

    expect(chip).toBeInTheDocument();

    expect(chip.parentNode).toHaveClass(
      `${chipClasses.base} ${chipClasses.uppercase} ${chipClasses.variant["primary"]}`
    );

    // Correct number of children
    expect(chip.parentNode.childNodes.length).toEqual(2);

    // Correct class of button
    expect(chip.parentNode.childNodes[1]).toHaveClass(chipClasses.button);

    // Expect icon in button
    expect(chip.parentNode.childNodes[1].childNodes[0].nodeName).toEqual("svg");
  });

  it("renders a secondary chip", () => {
    render(
      <Chip type={"secondary"} callback={() => {}}>
        {"Test"}
      </Chip>
    );

    const chip = screen.getByText("Test");

    expect(chip).toBeInTheDocument();

    expect(chip.parentNode).toHaveClass(
      `${chipClasses.base} ${chipClasses.uppercase} ${chipClasses.variant["secondary"]}`
    );

    // Correct number of children
    expect(chip.parentNode.childNodes.length).toEqual(2);

    // Correct class of button
    expect(chip.parentNode.childNodes[1]).toHaveClass(chipClasses.button);

    // Expect icon in button
    expect(chip.parentNode.childNodes[1].childNodes[0].nodeName).toEqual("svg");
  });

  it("renders a tertiary chip", () => {
    render(
      <Chip type={"tertiary"} callback={() => {}}>
        {"Test"}
      </Chip>
    );

    const chip = screen.getByText("Test");

    expect(chip).toBeInTheDocument();

    expect(chip.parentNode).toHaveClass(
      `${chipClasses.base} ${chipClasses.uppercase} ${chipClasses.variant["tertiary"]}`
    );

    // Correct number of children
    expect(chip.parentNode.childNodes.length).toEqual(2);

    // Correct class of button
    expect(chip.parentNode.childNodes[1]).toHaveClass(chipClasses.button);

    // Expect icon in button
    expect(chip.parentNode.childNodes[1].childNodes[0].nodeName).toEqual("svg");
  });

  it("renders a primary chip and click", () => {
    const callback = jest.fn();

    render(
      <Chip type={"primary"} callback={() => callback("click!")}>
        {"Test"}
      </Chip>
    );

    const button = screen.getByRole("button");

    button.click();

    expect(callback).toHaveBeenCalledWith("click!");
  });
});
