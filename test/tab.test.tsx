import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import Tab from "../src/components/atoms/Tab";
import { createMockRouter } from "./utils/createMockRouter";

describe("Tab component", () => {
  it("renders a tab", () => {
    render(<Tab current={true} href={"/test"} title={"Current tab"} />);

    const tab = screen.getByText("Current tab");

    expect(tab).toBeInTheDocument();
  });

  it("renders a tab, click and check href", () => {
    const mockPush = jest.fn();
    const mockRouter = createMockRouter({ push: mockPush });

    render(
      <RouterContext.Provider value={mockRouter}>
        <Tab current={true} href={"/test"} title={"Current tab"} />
      </RouterContext.Provider>
    );

    const tab = screen.getByText("Current tab");

    tab.click();

    expect(mockPush).toHaveBeenCalledWith("/test", "/test", {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
  });
});
