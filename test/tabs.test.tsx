import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Tab from "../src/components/atoms/Tab";
import Tabs, { tabsClasses } from "../src/components/atoms/Tabs";

describe("Tabs component", () => {
  it("renders a tabs", () => {
    render(
      <Tabs>
        <Tab current={false} href={"/test"} title={"Tab"} />
      </Tabs>
    );

    const tabs = screen.getByTestId("tabs");

    expect(tabs).toBeInTheDocument();

    expect(tabs).toHaveClass(tabsClasses.base);
    expect(tabs).toHaveClass(tabsClasses.dark);
  });

  it("renders a tabs with multiple tab", () => {
    render(
      <Tabs>
        <Tab current={false} href={"/test"} title={"Tab"} />
        <Tab current={false} href={"/test2"} title={"Tab2"} />
        <Tab current={false} href={"/test3"} title={"Tab3"} />
      </Tabs>
    );

    const tabs = screen.getByTestId("tabs");
    const tab1 = screen.getByText("Tab");
    const tab2 = screen.getByText("Tab2");
    const tab3 = screen.getByText("Tab3");

    console.log(tabs.children);

    expect(tabs.children).toHaveLength(1);

    expect(tabs).toBeInTheDocument();
    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).toBeInTheDocument();
  });

  // it("renders a tabs, with multiple tabs", () => {
  //   const mockPush = jest.fn();
  //   const mockRouter = createMockRouter({ push: mockPush });
  //
  //   render(
  //     <RouterContext.Provider value={mockRouter}>
  //       <Tab current={true} href={"/test"} title={"Current tab"} />
  //     </RouterContext.Provider>
  //   );
  //
  //   const tab = screen.getByText("Current tab");
  //
  //   tab.click();
  //
  //   expect(mockPush).toHaveBeenCalledWith("/test", "/test", {
  //     locale: undefined,
  //     scroll: undefined,
  //     shallow: undefined,
  //   });
  // });
  //
  // it("renders a current tab", () => {
  //   render(<Tab current={true} href={"/test"} title={"Current tab"} />);
  //
  //   const tab = screen.getByText("Current tab");
  //
  //   expect(tab).toBeInTheDocument();
  //
  //   expect(tab).toHaveClass(tabClasses.border);
  // });
});
