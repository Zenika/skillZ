const { getUserEmail } = require("./lib/bolt/getSlackInformations");
const { getBotUsers } = require("./lib/requestsHasura/getBotUsers");
module.exports = {
  homePage(app) {
    app.event("app_home_opened", async ({ event, client, body }) => {
      try {
        const user = body["event"]["user"];
        const collaborators = process.env.COLLABORATORS.split(";");
        let itsACollaborator = false;
        const botUsers = await getBotUsers();
        const email = await getUserEmail(user, app, app.token);

        for (let i = 0; i < collaborators.length; i++) {
          if (email == collaborators[i]) {
            itsACollaborator = true;
          }
        }

        if (itsACollaborator) {
          await client.views.publish({
            user_id: event.user,
            view: {
              type: "home",
              callback_id: "home_view",
              /* body of the view */
              blocks: [
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "*Welcome to your _Skillz-bot Home_* :tada:",
                  },
                },
                {
                  type: "divider",
                },
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "*You can see what Skillz is and the Skillz bot in the about section of this bot*\n",
                  },
                },
                {
                  type: "image",
                  title: {
                    type: "plain_text",
                    text: 'Section "About" in English version',
                    emoji: true,
                  },
                  image_url:
                    "https://media.discordapp.net/attachments/1022081920735129601/1022081958253182996/imageedit_2_2417669140.gif",
                  alt_text: "marg",
                },
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "*Our channel :open_file_folder:*",
                  },
                },
                {
                  type: "divider",
                },
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "*#project-skillz*\nPlease post your feedbacks, questions, comments, and your issues that you encountered on the bot and on the Skillz app. And we also will post the project updates in this Slack channel.",
                  },
                },

                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "*Skillz App :z:*",
                  },
                },
                {
                  type: "divider",
                },

                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "\n\nSee your Skillz profile thanks to this link : <https://skillz.zenika.com/profile|Skillz> :chart_with_upwards_trend: \n\n ",
                  },
                },
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: `*Collaborator section :technologist:*\n`,
                  },
                },

                {
                  type: "divider",
                },
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: `Actually, *${botUsers.length}* people have activated the bot notifications.`,
                  },
                },

                {
                  type: "image",
                  title: {
                    type: "plain_text",
                    text: "They have this button as activated",
                    emoji: true,
                  },
                  image_url:
                    "https://media.discordapp.net/attachments/1022081920735129601/1022143014010892349/imageedit_4_9226554227.png",
                  alt_text: "marg",
                },
              ],
            },
          });
        } else {
          await client.views.publish({
            user_id: event.user,
            view: {
              type: "home",
              callback_id: "home_view",
              /* body of the view */
              blocks: [
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "*Welcome to your _Skillz-bot Home_* :tada:",
                  },
                },
                {
                  type: "divider",
                },
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "*You can see what Skillz is and the Skillz bot in the about section of this bot*\n",
                  },
                },
                {
                  type: "image",
                  title: {
                    type: "plain_text",
                    text: 'Section "About" in English version',
                    emoji: true,
                  },
                  image_url:
                    "https://media.discordapp.net/attachments/1022081920735129601/1022081958253182996/imageedit_2_2417669140.gif",
                  alt_text: "marg",
                },
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "*Our channel :open_file_folder:*",
                  },
                },
                {
                  type: "divider",
                },
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "*#project-skillz*\nPlease post your feedbacks, questions, comments, and your issues that you encountered on the bot and on the Skillz app. And we also will post the project updates in this Slack channel.",
                  },
                },

                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "*Skillz App :z:*",
                  },
                },
                {
                  type: "divider",
                },

                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "\n\nSee your Skillz profile thanks to this link : <https://skillz.zenika.com/profile|Skillz> :chart_with_upwards_trend: \n\n ",
                  },
                },
              ],
            },
          });
        }
      } catch (error) {
        console.error("error", error);
      }
    });
  },
};
