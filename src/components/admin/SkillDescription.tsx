import { FetchedSkill } from "../../utils/types";
import React, { useState, useEffect } from "react";

type SkillDescription = {
  skill: FetchedSkill;
  title: string;
};

const SkillDescription = ({ skill, title }: SkillDescription) => {
  return (
    <div
      className={`flex flex-col rounded-lg dark:bg-dark-dark bg-light-dark my-2 p-2`}
    >
      <p className="text-xl p-2">{title}</p>
      <input
        className={`bg-light-light dark:bg-dark-light p-3 appearance-none rounded-lg border border-solid border-light-dark`}
        type="text"
        value={""}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        placeholder={"Modifier la description"}
      ></input>
    </div>
  );
};

export default SkillDescription;
