const {
  getBotNotifications,
} = require("../lib/requestsHasura/getBotNotifications");
const { getAllEmails } = require("../lib/requestsHasura/getAllEmails");
const {
  getSkillsDatesUpdates,
} = require("../lib/requestsHasura/getSkillsDatesUpdates");
const { fillSkillsByCategory } = require("./fillSkillsByCategory");
const {
  getLastUpdateOnSkill,
} = require("../lib/requestsHasura/getLastUpdateOnSkill");

Date.prototype.subDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};

async function arrayOfDelayedSkillsByUsers(app, email) {
  var todayDate = new Date();
  const response = await getSkillsDatesUpdates(email);
  let lastSkillsUpdated = [];

  for (let i = 0; i < response.length; i++) {
    if (new Date(response[i].created_at) < todayDate.subDays(30)) {
      lastSkillsUpdated = lastSkillsUpdated.concat(response[i].skillId);
    }
  }
  await fillSkillsByCategory(email, lastSkillsUpdated, app, false);
}

function dateToCompare(todayDate) {
  if (process.env.BETA_TESTS) {
    return todayDate.subDays(1);
  } else {
    return todayDate.subDays(30);
  }
}

async function getDatasToFillInCategories(email, app) {
  let notificationsUser = [];
  var todayDate = new Date();

  notificationsUser = await getBotNotifications(email);
  if (
    notificationsUser &&
    notificationsUser.User &&
    notificationsUser.User[0].botNotifications === false
  )
    return -1;
  const response = await getSkillsDatesUpdates(email);
  let lastSkillsUpdated = [];

  for (let i = 0; i < response.length; i++) {
    if (new Date(response[i].created_at) < todayDate.subDays(30)) {
      lastSkillsUpdated = lastSkillsUpdated.concat(response[i].skillId);
    }
  }
  await fillSkillsByCategory(email, lastSkillsUpdated, app, true);
}

async function arrayOfDelayedSkillsByAllUsers(app) {
  var todayDate = new Date();
  const usersAllEmails = await getAllEmails();
  let beta_user = false;
  let lastUpdateOnASkill = "";

  for (let i = 0; i < usersAllEmails.User.length; i++) {
    lastUpdateOnASkill = await getLastUpdateOnSkill(
      usersAllEmails.User[i].email
    );
    if (
      lastUpdateOnASkill.length === 0 ||
      (lastUpdateOnASkill.length > 0 &&
        new Date(lastUpdateOnASkill[0].created_at) > dateToCompare(todayDate))
    ) {
      continue;
    }
    if (!process.env.BETA_TESTS) {
      getDatasToFillInCategories(usersAllEmails.User[i].email, app);
    }
    if (process.env.BETA_TESTS) {
      //send reminder to beta testers only
      const beta_emails = process.env.BETA_TESTS.split(";");
      for (let j = 0; j < beta_emails.length; j++) {
        if (usersAllEmails.User[i].email === beta_emails[j]) {
          beta_user = true;
          break;
        }
      }
    }
    if (beta_user) {
      beta_user = false;
      getDatasToFillInCategories(usersAllEmails.User[i].email, app);
    }
  }
}

module.exports.arrayOfDelayedSkillsByAllUsers = arrayOfDelayedSkillsByAllUsers;
module.exports.arrayOfDelayedSkillsByUsers = arrayOfDelayedSkillsByUsers;
