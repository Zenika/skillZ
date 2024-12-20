import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import TextArea, { textAreaClasses } from "../../src/components/atoms/TextArea";

describe("TextArea component", () => {
  it("renders a textarea component", () => {
    render(
      <TextArea
        error={false}
        value={"This is a test"}
        errorMessage={""}
        rows={1}
        name={"test"}
      />
    );

    const textarea = screen.getByText("This is a test");

    // Expect topic to exist
    expect(textarea).toBeInTheDocument();

    // Expect textarea to have correct classes
    expect(textarea).toHaveClass(
      `${textAreaClasses.textarea.base} ${textAreaClasses.textarea.dark} ${textAreaClasses.textarea.noError}`
    );

    // Expect textarea to have correct value
    expect(textarea).toHaveValue("This is a test");

    // Expect textarea parent to have correct classes
    expect(textarea.parentElement).toHaveClass(textAreaClasses.parent.base);

    // Expect textarea parent to have one child
    expect(textarea.parentElement?.children.length).toBe(1);
  });

  it("renders a textarea component with error", () => {
    render(
      <TextArea
        error={true}
        value={"This is a test"}
        errorMessage={"This is an error"}
        rows={1}
        name={"test"}
      />
    );

    const textarea = screen.getByText("This is a test");
    const textareaError = screen.getByText("This is an error");

    // Expect topic to exist
    expect(textarea).toBeInTheDocument();
    expect(textareaError).toBeInTheDocument();

    // Expect textareaError to have correct classes
    expect(textareaError).toHaveClass(`${textAreaClasses.error.base}`);

    // Expect textareaErrorParent to have correct classes
    expect(textareaError.parentElement).toHaveClass(
      `${textAreaClasses.error.parent}`
    );

    // Expect textareaError to have two children
    expect(textareaError.parentElement?.children.length).toBe(2);

    // Expect parent to have two children
    expect(textarea.parentElement?.children.length).toBe(2);
  });

  it("renders a textarea component with callback", () => {
    const callback = jest.fn();
    let value = "This is a test";

    render(
      <TextArea
        error={false}
        value={value}
        errorMessage={""}
        rows={10}
        name={"test"}
        callback={(e) => {
          callback(e);
          value = e;
        }}
      />
    );

    const textarea = screen.getByText("This is a test");

    // Expect topic to exist
    expect(textarea).toBeInTheDocument();

    // Change textarea value
    fireEvent.change(textarea, { target: { value: "This is a new test" } });

    // Expect callback to have been called
    expect(callback).toHaveBeenCalledTimes(1);

    // Expect callback to have been called with correct value
    expect(callback).toHaveBeenCalledWith("This is a new test");

    // Expect textarea to have correct value
    expect(value).toBe("This is a new test");
  });
});
