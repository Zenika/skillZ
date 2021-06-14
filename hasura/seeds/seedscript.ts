import { writeFile } from "fs/promises";
import { datatype, date, image, name, random } from "faker";
// @ts-ignore
const jsonSql = require("json-sql")();
jsonSql.configure({
  dialect: "postgresql",
  wrappedIdentifiers: true,
  separatedValues: false,
});

type Agency = { name: string };
type Skill = { id: string; name: string; categoryId: string };

const agencies: Agency[] = require("./Agency.json");
const categories = require("./Category.json");
const skills: Skill[] = require("./Skill.json");
const topics = require("./Topic.json");

type User = {
  email: string;
  name: string;
  picture: string;
};

type UserAgency = {
  userEmail: string;
  agency: string;
  created_at: string;
};

type UserSkill = {
  userEmail: string;
  skillId: string;
  level: number;
  created_at: string;
};

const config = {
  nbUser: 500,
  nbSkillEntriesPerUser: 30,
  dateStart: "2020/01/01",
  dateEnd: "2021/12/30",
};

const users: User[] = [];
const userSkills: UserSkill[] = [];
const userTechnicalAppetites: UserSkill[] = [];
const userAgencies: UserAgency[] = [];

const generateUniqueDate = (
  source: UserSkill[],
  userEmail: string,
  skillid: string
) => {
  let proposedDate = "";
  do {
    proposedDate = date
      .between(config.dateStart, config.dateEnd)
      .toISOString()
      .split("T")[0];
  } while (
    source.find(
      (row) =>
        row.userEmail === userEmail &&
        row.skillId === skillid &&
        row.created_at === proposedDate
    )
  );
  return proposedDate;
};

const generateUser = (): User => {
  const firstName = name.firstName().replace("'", "");
  const lastName = name.lastName().replace("'", "");
  return {
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@zenika.com`,
    name: `${firstName} ${lastName}`,
    picture: image.avatar(),
  };
};

const generateUserAgency = (userEmail: string): UserAgency => {
  return {
    userEmail,
    agency: random.arrayElement(agencies).name,
    created_at: "2020/01/01",
  };
};

const generateUserSkillOrDesire = (
  skillOrDesire: "skill" | "desire",
  userEmail: string
): UserSkill => {
  const skillId =
    skills[datatype.number({ min: 0, max: skills.length - 1 })].id;
  return {
    userEmail,
    skillId,
    level: datatype.number({ min: 1, max: 5 }),
    created_at: generateUniqueDate(
      skillOrDesire === "skill" ? userSkills : userTechnicalAppetites,
      userEmail,
      skillId
    ),
  };
};

for (let i = 0; i < config.nbUser; ++i) {
  const user = generateUser();
  users.push(user);
  userAgencies.push(generateUserAgency(user.email));
  for (let k = 0; k < config.nbSkillEntriesPerUser; ++k) {
    userSkills.push(generateUserSkillOrDesire("skill", user.email));
    userTechnicalAppetites.push(
      generateUserSkillOrDesire("desire", user.email)
    );
  }
}

const userInsertQuery = jsonSql.build({
  type: "insert",
  table: "User",
  values: users,
});

const userAgenciesInsertQuery = jsonSql.build({
  type: "insert",
  table: "UserAgency",
  values: userAgencies,
});

const userSkillsInsertQuery = jsonSql.build({
  type: "insert",
  table: "UserSkill",
  values: userSkills,
});

const userTechnicalAppetitesInsertQuery = jsonSql.build({
  type: "insert",
  table: "TechnicalAppetite",
  values: userTechnicalAppetites,
});

const result = `${userInsertQuery.query}
${userAgenciesInsertQuery.query}
${userSkillsInsertQuery.query}
${userTechnicalAppetitesInsertQuery.query}`;

(async () => {
  await writeFile("seeds.sql", result);
  console.log("Seeds succesfully generated into seeds.sql file");
})();
