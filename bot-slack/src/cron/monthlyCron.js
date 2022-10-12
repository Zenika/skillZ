var cron = require("node-cron");
const { arrayOfDelayedSkillsByAllUsers } = require("./arraysOfDelayedSkills");

async function monthlyCron(app) {
  if (process.env.ENV === "DEV") {
    cron.schedule(
      "* * * * *",
      () => {
        arrayOfDelayedSkillsByAllUsers(app);
      },
      {
        scheduled: true,
        timezone: "Europe/Paris",
      }
    );
  } else if (process.env.BETA_TESTS) {
    cron.schedule(
      "45 16 * * *",
      () => {
        arrayOfDelayedSkillsByAllUsers(app);
      },
      {
        scheduled: true,
        timezone: "Europe/Paris",
      }
    );
  } else {
    cron.schedule(
      "0 14 1 * *",
      () => {
        arrayOfDelayedSkillsByAllUsers(app);
      },
      {
        scheduled: true,
        timezone: "Europe/Paris",
      }
    );
  }
}

module.exports.monthlyCron = monthlyCron;
