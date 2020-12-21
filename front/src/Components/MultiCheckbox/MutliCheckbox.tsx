import React from "react";
import { useTranslation } from "react-i18next";
import { SkillInput } from "../../types";
import "./MultiCheckbox.css";

const MultiCheckbox = ({
  i18nPath,
  skill,
  setSkillLevel,
  count
}: {
  i18nPath: string;
  skill: SkillInput;
  setSkillLevel: (i: number) => void;
  count: number;
}) => {
  const { t } = useTranslation();

  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push(
      <li key={`skill-${skill.id}-${i}`} onClick={() => setSkillLevel(i)}>
        <input type="checkbox" checked={skill.level == i} onChange={() => {}} />{" "}
        {t(`${i18nPath}.${i}`)}
      </li>
    );
  }
  return <ul className="multicheckbox">{items.map((item) => item)}</ul>;
};

export default MultiCheckbox;
