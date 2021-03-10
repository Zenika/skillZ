const SkillPanel = ({
  name,
  level,
  desire,
  certif,
}: {
  name: string;
  level: number;
  desire: number;
  certif: boolean;
}) => {
  return (
    <div className="flex flex-col dark:bg-dark-light px-8 py-4 mx-2 my-1 rounded-lg">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl">{name}</h2>
        <p>certif: {certif ? "oui" : "non"}</p>
      </div>
      <div className="flex flex-row justify-around">
        <div className="flex flex-col">
          <p className="text-xs text-center">Desire level</p>
          <p>{desire}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-center">Skill level</p>
          <p>{level}</p>
        </div>
      </div>
    </div>
  );
};

export default SkillPanel;
