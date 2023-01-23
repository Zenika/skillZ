import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import CustomSelect, {
  customSelectClasses,
} from "../src/components/atoms/CustomSelect/CustomSelect";
import { DarkModeProvider } from "../src/utils/darkMode";

describe("CustomSelect component", () => {
  it("renders a simple CustomSelect", () => {
    const keyFn = jest.fn((item) => item);
    const labelFn = jest.fn((item) => item);
    let value = null;
    const onChange = jest.fn((val) => {
      value = val;
    });

    render(
      <DarkModeProvider
        value={{ darkMode: false, changeDarkMode: jest.fn(() => false) }}
      >
        <CustomSelect
          choices={["Choice 1", "Choice2"]}
          keyFn={keyFn}
          labelFn={labelFn}
          placeholder="This is a placeholder"
          onChange={onChange}
        ></CustomSelect>
      </DarkModeProvider>
    );

    const customSelect = screen.getByText("This is a placeholder");

    expect(customSelect).toBeInTheDocument();

    // Expect the dropdown to be closed
    expect(screen.queryByText("Choice 1")).not.toBeInTheDocument();

    // Expect classes to be correct
    expect(customSelect.parentNode).toHaveClass(
      `${customSelectClasses.placeholder.parent.base} ${customSelectClasses.placeholder.parent.dark} ${customSelectClasses.placeholder.parent.hover} ${customSelectClasses.placeholder.parent.readonly}`
    );

    // Expect base classes to be correct
    expect(customSelect.parentNode.parentNode).toHaveClass(
      `${customSelectClasses.base}`
    );

    // Expect closed dropdown classes to be correct
    expect(customSelect.parentNode.parentNode.lastChild).toHaveClass(
      `${customSelectClasses.dropdown.base}`
    );
  });

  it("renders a simple readonly CustomSelect", () => {
    const keyFn = jest.fn((item) => item);
    const labelFn = jest.fn((item) => item);
    let value = null;
    const onChange = jest.fn((val) => {
      value = val;
    });

    const { rerender } = render(
      <DarkModeProvider
        value={{ darkMode: false, changeDarkMode: jest.fn(() => false) }}
      >
        <CustomSelect
          choices={["Choice 1", "Choice2"]}
          keyFn={keyFn}
          labelFn={labelFn}
          placeholder="This is a placeholder"
          onChange={onChange}
          readOnly={true}
        ></CustomSelect>
      </DarkModeProvider>
    );

    const customSelect = screen.getByText("This is a placeholder");

    expect(customSelect).toBeInTheDocument();

    // Expect the dropdown to be closed
    expect(screen.queryByText("Choice 1")).not.toBeInTheDocument();

    // Expect classes to be correct
    expect(customSelect.parentNode).toHaveClass(
      `${customSelectClasses.placeholder.parent.base} ${customSelectClasses.placeholder.parent.dark} ${customSelectClasses.placeholder.parent.hover}`
    );

    // Expect base classes to be correct
    expect(customSelect.parentNode.parentNode).toHaveClass(
      `${customSelectClasses.base}`
    );

    // Expect closed dropdown classes to be correct
    expect(customSelect.parentNode.parentNode.lastChild).toHaveClass(
      `${customSelectClasses.dropdown.base}`
    );
  });

  it("renders CustomSelect with readonly and selected choice", () => {
    const keyFn = jest.fn((item) => item);
    const labelFn = jest.fn((item) => item);
    let value = null;
    const onChange = jest.fn((val) => {
      value = val;
    });

    const { rerender } = render(
      <DarkModeProvider
        value={{ darkMode: false, changeDarkMode: jest.fn(() => false) }}
      >
        <CustomSelect
          choices={["Choice 1", "Choice2"]}
          keyFn={keyFn}
          labelFn={labelFn}
          placeholder="This is a placeholder"
          onChange={onChange}
          readOnly={true}
          selectedChoice={"Choice 1"}
        ></CustomSelect>
      </DarkModeProvider>
    );

    const customSelect = screen.getByText("Choice 1");

    expect(customSelect).toBeInTheDocument();

    // Expect classes to be correct
    expect(customSelect.parentNode).toHaveClass(
      `${customSelectClasses.placeholder.parent.base} ${customSelectClasses.placeholder.parent.dark} ${customSelectClasses.placeholder.parent.hover}`
    );

    // Expect base classes to be correct
    expect(customSelect.parentNode.parentNode).toHaveClass(
      `${customSelectClasses.base}`
    );

    // Expect closed dropdown classes to be correct
    expect(customSelect.parentNode.parentNode.lastChild).toHaveClass(
      `${customSelectClasses.dropdown.base}`
    );
  });

  it("renders a CustomSelect with simple choices, open and close", () => {
    const keyFn = jest.fn((item) => item);
    const labelFn = jest.fn((item) => item);
    let value = null;
    const onChange = jest.fn((val) => {
      value = val;
    });

    const { rerender } = render(
      <DarkModeProvider
        value={{ darkMode: false, changeDarkMode: jest.fn(() => false) }}
      >
        <CustomSelect
          choices={["Choice 1", "Choice2"]}
          keyFn={keyFn}
          labelFn={labelFn}
          placeholder="This is a placeholder"
          onChange={onChange}
        ></CustomSelect>
      </DarkModeProvider>
    );

    const customSelect = screen.getByText("This is a placeholder");

    expect(customSelect).toBeInTheDocument();

    // Expect the dropdown to be closed
    expect(screen.queryByText("Choice 1")).not.toBeInTheDocument();

    // Click on the placeholder
    act(() => {
      fireEvent.click(customSelect.closest("div"));
    });

    // Expect the dropdown to be open
    expect(screen.getByText("Choice 1")).toBeInTheDocument();

    // Expect child classes to be correct
    expect(screen.getByText("Choice 1")).toHaveClass(
      `${customSelectClasses.dropdown.children.child.base} ${customSelectClasses.dropdown.children.child.hover}`
    );

    // Expect children parent classes to be correct
    expect(screen.getByText("Choice 1").parentNode).toHaveClass(
      `${customSelectClasses.dropdown.children.parent.base} ${customSelectClasses.dropdown.children.parent.dark}`
    );

    // Close the dropdown
    act(() => customSelect.closest("div").click());

    // Expect the dropdown to be closed
    expect(screen.queryByText("Choice 1")).not.toBeInTheDocument();
  });

  it("renders a CustomSelect with complex choices, open and close", () => {
    const keyFn = jest.fn((item) => item.id);
    const labelFn = jest.fn((item) => item.name);
    let value = null;
    const onChange = jest.fn((val) => {
      value = val;
    });
    const choices = [
      { id: 1, name: "Choice 1" },
      { id: 2, name: "Choice 2" },
      { id: 3, name: "Choice 3" },
      { id: 4, name: "Choice 4" },
    ];

    const { rerender } = render(
      <DarkModeProvider
        value={{ darkMode: false, changeDarkMode: jest.fn(() => false) }}
      >
        <CustomSelect
          choices={choices}
          keyFn={keyFn}
          labelFn={labelFn}
          placeholder="This is a placeholder"
          onChange={onChange}
        ></CustomSelect>
      </DarkModeProvider>
    );

    const customSelect = screen.getByText("This is a placeholder");

    expect(customSelect).toBeInTheDocument();

    // Expect the dropdown to be closed
    expect(screen.queryByText("Choice 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 4")).not.toBeInTheDocument();

    // Click on the placeholder
    act(() => customSelect.closest("div").click());

    // Expect the dropdown to be open
    expect(screen.getByText("Choice 1")).toBeInTheDocument();
    expect(screen.getByText("Choice 2")).toBeInTheDocument();
    expect(screen.getByText("Choice 3")).toBeInTheDocument();
    expect(screen.getByText("Choice 4")).toBeInTheDocument();

    // Close the dropdown
    act(() => customSelect.closest("div").click());

    // Expect the dropdown to be closed
    expect(screen.queryByText("Choice 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 4")).not.toBeInTheDocument();
  });

  it("renders a CustomSelect with simple choices, open and select a choice", () => {
    const keyFn = jest.fn((item) => item);
    const labelFn = jest.fn((item) => item);
    let value = null;
    const onChange = jest.fn((val) => {
      value = val;
    });
    const choices = ["Choice 1", "Choice 2", "Choice 3", "Choice 4"];

    const { rerender } = render(
      <DarkModeProvider
        value={{ darkMode: false, changeDarkMode: jest.fn(() => false) }}
      >
        <CustomSelect
          choices={choices}
          keyFn={keyFn}
          labelFn={labelFn}
          placeholder="This is a placeholder"
          onChange={onChange}
        ></CustomSelect>
      </DarkModeProvider>
    );

    const customSelect = screen.getByText("This is a placeholder");

    expect(customSelect).toBeInTheDocument();

    // Expect the dropdown to be closed
    expect(screen.queryByText("Choice 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 4")).not.toBeInTheDocument();

    // Click on the placeholder
    act(() => customSelect.closest("div").click());

    // Expect the dropdown to be open
    expect(screen.getByText("Choice 1")).toBeInTheDocument();

    // Click on a choice
    act(() => screen.getByText("Choice 1").click());

    // Expect the dropdown to be closed
    expect(screen.queryByText("Choice 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 4")).not.toBeInTheDocument();

    // Expect the placeholder to be updated
    expect(screen.getByText("Choice 1")).toBeInTheDocument();

    // Expect the value to be updated
    expect(value).toEqual("Choice 1");

    // Expect the onChange to be called
    expect(onChange).toHaveBeenCalledTimes(1);

    // Expect the onChange to be called with the correct value
    expect(onChange).toHaveBeenCalledWith("Choice 1");

    // Expect the keyFn to be called
    expect(keyFn).toHaveBeenCalledTimes(8);

    // Expect the keyFn to be called with the correct value
    expect(keyFn).toHaveBeenCalledWith("Choice 1");
    expect(keyFn).toHaveBeenCalledWith("Choice 2");
    expect(keyFn).toHaveBeenCalledWith("Choice 3");
    expect(keyFn).toHaveBeenCalledWith("Choice 4");

    // Expect the labelFn to be called
    expect(labelFn).toHaveBeenCalledTimes(9);

    // Expect the labelFn to be called with the correct value
    expect(labelFn).toHaveBeenCalledWith("Choice 1");
    expect(labelFn).toHaveBeenCalledWith("Choice 2");
    expect(labelFn).toHaveBeenCalledWith("Choice 3");
    expect(labelFn).toHaveBeenCalledWith("Choice 4");
  });

  it("renders a CustomSelect with complex choices, open and select a choice", () => {
    const keyFn = jest.fn((item) => item.id);
    const labelFn = jest.fn((item) => item.name);
    let value = null;
    const onChange = jest.fn((val) => {
      value = val;
    });
    const choices = [
      { id: 1, name: "Choice 1" },
      { id: 2, name: "Choice 2" },
      { id: 3, name: "Choice 3" },
      { id: 4, name: "Choice 4" },
    ];

    const { rerender } = render(
      <DarkModeProvider
        value={{ darkMode: false, changeDarkMode: jest.fn(() => false) }}
      >
        <CustomSelect
          choices={choices}
          keyFn={keyFn}
          labelFn={labelFn}
          placeholder="This is a placeholder"
          onChange={onChange}
        ></CustomSelect>
      </DarkModeProvider>
    );

    const customSelect = screen.getByText("This is a placeholder");

    expect(customSelect).toBeInTheDocument();

    // Expect the dropdown to be closed
    expect(screen.queryByText("Choice 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 4")).not.toBeInTheDocument();

    // Click on the placeholder
    act(() => customSelect.closest("div").click());

    // Expect the dropdown to be open
    expect(screen.getByText("Choice 1")).toBeInTheDocument();

    // Click on a choice
    act(() => screen.getByText("Choice 1").click());

    // Expect the dropdown to be closed
    expect(screen.queryByText("Choice 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Choice 4")).not.toBeInTheDocument();

    // Expect the placeholder to be updated
    expect(screen.getByText("Choice 1")).toBeInTheDocument();

    // Expect the value to be updated
    expect(value).toEqual({ id: 1, name: "Choice 1" });

    // Expect the onChange to be called
    expect(onChange).toHaveBeenCalledTimes(1);

    // Expect the onChange to be called with the correct value
    expect(onChange).toHaveBeenCalledWith({ id: 1, name: "Choice 1" });

    // Expect the keyFn to be called
    expect(keyFn).toHaveBeenCalledTimes(8);

    // Expect the keyFn to be called with the correct value
    expect(keyFn).toHaveBeenCalledWith({ id: 1, name: "Choice 1" });
    expect(keyFn).toHaveBeenCalledWith({ id: 2, name: "Choice 2" });
    expect(keyFn).toHaveBeenCalledWith({ id: 3, name: "Choice 3" });
    expect(keyFn).toHaveBeenCalledWith({ id: 4, name: "Choice 4" });

    // Expect the labelFn to be called
    expect(labelFn).toHaveBeenCalledTimes(9);

    // Expect the labelFn to be called with the correct value
    expect(labelFn).toHaveBeenCalledWith({ id: 1, name: "Choice 1" });
    expect(labelFn).toHaveBeenCalledWith({ id: 2, name: "Choice 2" });
    expect(labelFn).toHaveBeenCalledWith({ id: 3, name: "Choice 3" });
    expect(labelFn).toHaveBeenCalledWith({ id: 4, name: "Choice 4" });
  });
});
