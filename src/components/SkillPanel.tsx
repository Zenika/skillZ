import React from "react";
import Image from "next/image";
import LevelBar from "./LevelBar";
import { Skill } from "../pages/skills/[context]/[category]";

const SkillPanel = ({
  skill,
  onEditClick,
}: {
  skill: Skill;
  onEditClick: (skill: Skill) => void;
}) => {
  const { id, name, level, desire, certif } = skill;
  return (
    <div className="flex flex-row dark:bg-dark-light px-4 py-4 mx-2 my-1 rounded-lg">
      <div className="flex flex-col w-5/6">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl">{name}</h2>
          <div className="pr-14">
            {certif ? (
              <Image src="/icons/certifs.svg" height="30" width="30" />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col">
            <p className="text-xs text-center my-2">Desire level</p>
            <LevelBar color="red" level={desire} />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-center my-2">Skill level</p>
            <LevelBar color="yellow" level={level} />
          </div>
        </div>
      </div>
      <div
        className="flex w-1/6 justify-end"
        onClick={() => onEditClick(skill)}
      >
        <Image src="/icons/more.svg" width="24" height="24" />
      </div>
    </div>
  );
};

export default SkillPanel;
