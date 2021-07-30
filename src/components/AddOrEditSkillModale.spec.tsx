import React from "react";
import { render, screen } from "@testing-library/react";
import AddOrEditSkillModale from "./AddOrEditSkillModale";

describe("AddOrEditSkillModale", () => {
  const skill = {
    id: "bonjour",
    name: "SKILLZ",
    level: 999,
    desire: 111,
  };
  it("should display the correct skill name", () => {
    render(
      <AddOrEditSkillModale
        skill={skill}
        cancel={() => jest.fn()}
        callback={() => jest.fn()}
      />
    );
    screen.debug();
  });
});
