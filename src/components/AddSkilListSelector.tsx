import React from "react";

export type Skill = {
  id: string;
  name: string;
  level?: number;
  desire?: number;
};

const AddSkillListSelector = ({
  skills,
  action,
}: {
  skills: Skill[];
  action: (skill: Skill) => void;
}) => {
  return (
    <div className="flex flex-col my-4">
      {skills && skills.length > 0 ? (
        skills?.map((skill) => (
          <div
            key={skill.id}
            className="flex flex-row justify-between dark:bg-dark-light p-4 my-2 rounded-lg"
          >
            <span className="text-l">{skill.name}</span>
            <button
              onClick={() => action(skill)}
              className="rounded-full border px-2 dark:text-dark-red"
            >
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
