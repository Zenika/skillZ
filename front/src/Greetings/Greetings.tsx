import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import { of } from "await-of";
import "./Greetings.css";
import { appStateContext } from "../AppContext";
import {
  fetchAgencies,
  fetchSearchTopics,
  fetchSearchSkills,
  fetchCreateUser
} from "../api/fetchers";
import AutoCompleteInputField from "../Components/AutoCompleteInputField/AutoCompleteInputField";
import Tag from "../Components/Tag/Tag";
import MultiCheckbox from "../Components/MultiCheckbox/MutliCheckbox";
import { SkillInput, StoredSkill, StoredTopic } from "../types";

const Greetings: React.FC = () => {
  const { appState, setAppState } = useContext(appStateContext);
  const [agencies, setAgencies] = useState<string[]>([]);
  const [topics, setTopics] = useState<StoredTopic[]>([]);
  const [skills, setSkills] = useState<SkillInput[]>([]);
  const [technicalAppetiteList, setTechnicalAppetiteList] = useState<
    SkillInput[]
  >([]);
  const { t } = useTranslation();
  const { user } = useAuth0();
  const [selectedAgency, setSelectedAgency] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (!appState.token) {
        return;
      }
      const [agencies, err] = await of(fetchAgencies(appState.token || ""));
      if (err) {
        console.error(err);
        return;
      }
      setAgencies(agencies?.map((agencyObject) => agencyObject.name) || []);
    })();
  }, [appState.token]);

  const searchTopics = async (searchInput: string): Promise<StoredTopic[]> => {
    if (!appState.token || searchInput === "") {
      return [];
    }
    const [storedTopics, err] = await of(
      fetchSearchTopics(appState.token, searchInput)
    );
    if (err) {
      console.error(err);
      return [];
    }
    return storedTopics ?? [];
  };

  const onSelectTopic = (topic: StoredTopic) => {
    if (topics.includes(topic)) {
      return;
    }
    setTopics([...topics, topic]);
  };
  const onClickTopicTag = (topic: StoredTopic) =>
    setTopics(topics.filter((t) => t.id !== topic.id));

  const searchSkills = async (searchInput: string) => {
    if (!appState.token || searchInput === "") {
      return [];
    }
    const [storedSkills, err] = await of(
      fetchSearchSkills(appState.token, searchInput)
    );
    if (err) {
      console.error(err);
      return [];
    }
    return storedSkills ?? [];
  };

  const onSelectSkill = (skill: StoredSkill) => {
    if (skills.map((s) => s.name).includes(skill.name)) {
      return;
    }
    setSkills([...skills, { id: skill.id, name: skill.name, level: 0 }]);
  };

  const onClickSkillTag = (skill: string) =>
    setSkills(skills.filter((s) => s.name !== skill));

  const onSelectTechnicalAppetite = (skill: StoredSkill) => {
    if (technicalAppetiteList.map((s) => s.name).includes(skill.name)) {
      return;
    }
    setTechnicalAppetiteList([
      ...technicalAppetiteList,
      { id: skill.id, name: skill.name, level: 0 }
    ]);
  };

  const onClickTechnicalAppetitelTag = (skill: string) =>
    setTechnicalAppetiteList(
      technicalAppetiteList.filter((s) => s.name !== skill)
    );

  const onSelectLevelSkill = (skill: StoredSkill, level: number) =>
    setSkills([
      ...skills.filter((s) => s.name !== skill.name),
      { ...skill, level }
    ]);

  const onSelectLevelTechnicalAppetite = (skill: StoredSkill, level: number) =>
    setTechnicalAppetiteList([
      ...technicalAppetiteList.filter((s) => s.name !== skill.name),
      { ...skill, level }
    ]);

  const onSubmitClick = async () => {
    if (!appState.token || !user || !selectedAgency) {
      console.log("token", appState.token);
      console.log("user", user);
      console.log("selectedAgency", selectedAgency);
      console.error("Something went wrong, re-login please");
      return;
    }
    const [_, err] = await of(
      fetchCreateUser(appState.token, user.email, selectedAgency)
    );
    if (err) {
      console.error("ERROR CREATING USER: ", err);
    }
  };

  return (
    <>
      <h1>{t("greetings.title", { firstName: user.given_name })}</h1>
      <p>{t("greetings.description")}</p>
      <div className="agency-selection">
        <label>{t("greetings.agency")}</label>
        <select onChange={(e: any) => setSelectedAgency(e.target.value)}>
          {agencies?.map((agency) => (
            <option key={agency} value={agency}>
              {t(`agencies.${agency}`)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>{t("greetings.topics")}</label>
        <AutoCompleteInputField
          searchFunction={searchTopics}
          onSelect={onSelectTopic}
          onSelectClearInput={true}
        />
        <ul className="tag-list">
          {topics.map((topic) => (
            <li className="tag-item" key={`topic-${topic.id}`}>
              <Tag name={topic.name} onClick={() => onClickTopicTag(topic)} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label>{t("greetings.skills")}</label>
        <AutoCompleteInputField
          searchFunction={searchSkills}
          onSelect={onSelectSkill}
          onSelectClearInput={true}
        />
        <ul className="tag-list">
          {skills.map((skill) => (
            <li className="tag-item" key={`skill-${skill.id}`}>
              <Tag
                name={skill.name}
                onClick={() => onClickSkillTag(skill.name)}
              />
            </li>
          ))}
        </ul>
      </div>
      {skills.map((skill) => (
        <div>
          <p>{t("greetings.skillLevelQuestion", { skill: skill.name })}</p>
          <MultiCheckbox
            i18nPath={"levels"}
            count={5}
            skill={skill}
            setSkillLevel={(level) => onSelectLevelSkill(skill, level)}
          />
        </div>
      ))}

      <div>
        <label>{t("greetings.technicalAppetite")}</label>
        <AutoCompleteInputField
          searchFunction={searchSkills}
          onSelect={onSelectTechnicalAppetite}
          onSelectClearInput={true}
        />
        <ul className="tag-list">
          {technicalAppetiteList.map((skill) => (
            <li className="tag-item" key={`ta-${skill.id}`}>
              <Tag
                name={skill.name}
                onClick={() => onClickTechnicalAppetitelTag(skill.name)}
              />
            </li>
          ))}
        </ul>
      </div>
      {technicalAppetiteList.map((skill) => (
        <div>
          <p>
            {t("greetings.technicalAppetiteLevelQuestion", {
              skill: skill.name
            })}
          </p>
          <MultiCheckbox
            i18nPath={"levels"}
            count={5}
            skill={skill}
            setSkillLevel={(level) =>
              onSelectLevelTechnicalAppetite(skill, level)
            }
          />
        </div>
      ))}
      <button onClick={onSubmitClick}>{t("greetings.submit")}</button>
    </>
  );
};

export default Greetings;
