const { App, ExpressReceiver, LogLevel } = require("@slack/bolt");
const { homePage } = require("./src/home");
const { commandsHandler } = require("./src/commands/commandsHandler");
const { actionsHandler } = require("./src/actions/actionsHandler");
const { viewHandler } = require("./src/views/viewHandler");
const { monthlyCron } = require("./src/cron/monthlyCron");
const { getAllTopics } = require("./src/lib/requestsHasura/getAllTopics");

const receiver = new ExpressReceiver({
  signingSecret: process.env.BOT_SLACK_SIGNING_SECRET,
  logLevel: LogLevel.INFO,
});

// Create the Bolt App, using the receiver
const app = new App({
  token: process.env.BOT_SLACK_BOT_TOKEN,
  logLevel: LogLevel.INFO,
  receiver,
});

(async () => {
  homePage(app);
  actionsHandler(app);
  commandsHandler(app);
  viewHandler(app);
  getAllTopics();
  await app.start({ port: process.env.BOT_PORT });
  await monthlyCron(app);
  console.log("⚡️ Skillz-Bot started");
})();
