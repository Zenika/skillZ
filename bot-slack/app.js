const { App, ExpressReceiver, LogLevel } = require("@slack/bolt");
const { homePage } = require("./src/home");
const { commandsHandler } = require("./src/commands/commandsHandler");
const { actionsHandler } = require("./src/actions/actionsHandler");
const { viewHandler } = require("./src/views/viewHandler");
const { monthlyCron } = require("./src/cron/monthlyCron");
const { getAllTopics } = require("./src/lib/requestsHasura/getAllTopics");
const { postingWebhooks } = require("./src/postingWebhooks");

const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.INFO,
});

// Create the Bolt App, using the receiver
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: LogLevel.INFO,
  receiver,
});

// Slack interactions are methods on app
app.event("message", async ({ event, client }) => {
  // Do some slack-specific stuff here
  await client.chat.postMessage("test");
});

// this is how to create custom routes
// receiver.router.post("/secret-page", (req, res) => {
//   // You're working with an express req and res now.
//   res.send("yay!");
// });

(async () => {
  homePage(app);
  //postingWebhooks();
  actionsHandler(app);
  commandsHandler(app);
  viewHandler(app);
  //getAllAgencies()
  getAllTopics();
  await app.start({ port: process.env.PORT });
  await monthlyCron(app);
  //arrayOfDelayedSkillsByUsers(app, "mai-ly.lehoux@zenika.com")
  console.log("⚡️ Skillz-Bot started");
})();
