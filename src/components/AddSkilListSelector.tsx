import React from "react";
import { Skill } from "../pages/skills/[context]/[category]/add";

const AddSkillListSelector = ({ skills }: { skills: Skill[] }) => {
  return (
    <div className="flex flex-col my-4">
      {skills && skills.length > 0 ? (
        skills?.map((skill) => (
          <div
            key={skill.id}
            className="flex flex-row justify-between dark:bg-dark-light p-4 my-2 rounded-lg"
          >
            <span className="text-l">{skill.name}</span>
            <button className="rounded-full border px-2 dark:text-dark-red">
              ADD
            </button>
          </div>
        ))
      ) : (
        <div>There is no skill in this category yet</div>
      )}
    </div>
  );
};

export default AddSkillListSelector;
