const {
  postThreeLinesMessageReminder,
  postTwoLinesMessageReminder,
  postOneLineMessageReminder,
  postFourLinesMessageReminder,
} = require("./postMessages");

async function postMessageSkillReminder(
  channelID,
  app,
  arrayLanguagesAndFrameworks,
  arrayTools,
  arrayPlatforms,
  arrayTechnicsAndMethods,
  reminder
) {
  if (
    arrayLanguagesAndFrameworks.length > 0 &&
    arrayTools.length > 0 &&
    arrayPlatforms.length > 0 &&
    arrayTechnicsAndMethods.length > 0
  ) {
    try {
      await postFourLinesMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Practices*",
        arrayLanguagesAndFrameworks,
        "*Activities*",
        arrayTools,
        "*Behaviors*",
        arrayTechnicsAndMethods,
        "*Knowledge*",
        arrayPlatforms,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (
    arrayLanguagesAndFrameworks.length > 0 &&
    arrayTools.length > 0 &&
    arrayTechnicsAndMethods.length > 0
  ) {
    try {
      await postThreeLinesMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Practices*",
        arrayLanguagesAndFrameworks,
        "*Activities*",
        arrayTools,
        "*Behaviors*",
        arrayTechnicsAndMethods,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (
    arrayLanguagesAndFrameworks.length > 0 &&
    arrayPlatforms.length > 0 &&
    arrayTechnicsAndMethods.length > 0
  ) {
    try {
      await postThreeLinesMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Practices*",
        arrayLanguagesAndFrameworks,
        "*Knowledge*",
        arrayPlatforms,
        "*Behaviors*",
        arrayTechnicsAndMethods,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (
    arrayTools.length > 0 &&
    arrayPlatforms.length > 0 &&
    arrayTechnicsAndMethods.length > 0
  ) {
    try {
      await postThreeLinesMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Activities*",
        arrayTools,
        "*Knowledge*",
        arrayPlatforms,
        "*Behaviors*",
        arrayTechnicsAndMethods,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (
    arrayLanguagesAndFrameworks.length > 0 &&
    arrayTools.length > 0 &&
    arrayPlatforms.length > 0
  ) {
    try {
      await postThreeLinesMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Practices*",
        arrayLanguagesAndFrameworks,
        "*Activities*",
        arrayTools,
        "*Knowledge*",
        arrayPlatforms,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (arrayLanguagesAndFrameworks.length > 0 && arrayTools.length > 0) {
    try {
      await postTwoLinesMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Practices*",
        arrayLanguagesAndFrameworks,
        "*Activities*",
        arrayTools,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (
    arrayLanguagesAndFrameworks.length > 0 &&
    arrayPlatforms.length > 0
  ) {
    try {
      await postTwoLinesMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Practices*",
        arrayLanguagesAndFrameworks,
        "*Knowledge*",
        arrayPlatforms,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (
    arrayLanguagesAndFrameworks.length > 0 &&
    arrayTechnicsAndMethods.length > 0
  ) {
    try {
      await postTwoLinesMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Practices*",
        arrayLanguagesAndFrameworks,
        "*Behaviors*",
        arrayTechnicsAndMethods,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (arrayTools.length > 0 && arrayPlatforms.length > 0) {
    try {
      await postTwoLinesMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Activities*",
        arrayTools,
        "*Knowledge*",
        arrayPlatforms,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (arrayTools.length > 0 && arrayTechnicsAndMethods.length > 0) {
    try {
      await postTwoLinesMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Activities*",
        arrayTools,
        "*Behaviors*",
        arrayTechnicsAndMethods,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (arrayPlatforms.length > 0 && arrayTechnicsAndMethods.length > 0) {
    try {
      await postTwoLinesMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Knowledge*",
        arrayPlatforms,
        "*Behaviors*",
        arrayTechnicsAndMethods,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (arrayPlatforms.length > 0) {
    try {
      await postOneLineMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Knowledge*",
        arrayPlatforms,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (arrayLanguagesAndFrameworks.length > 0) {
    try {
      await postOneLineMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Practices*",
        arrayLanguagesAndFrameworks,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (arrayTools.length > 0) {
    try {
      await postOneLineMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Activities*",
        arrayTools,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  } else if (arrayTechnicsAndMethods.length > 0) {
    try {
      await postOneLineMessageReminder(
        channelID,
        reminder
          ? "*:alarm_clock: You haven't noted any skills since more than 1 month ! So I purpose you to note some old skills below : *"
          : "*You have these skills below that hasn't been noted since more than 1 month* :blush:",
        "*Behaviors*",
        arrayTechnicsAndMethods,
        app,
        app.botToken,
        "Skillz Reminder",
        reminder
      );
    } catch (e) {
      console.error("error", e);
    }
  }
  //*************** */
  else {
    if (reminder) return;
    try {
      await app.client.chat.postMessage({
        token: app.botToken,
        channel: channelID,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*:alarm_clock: You are up to date with all your skills !*",
            },
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: ":bulb: You've learned something else since the last time ? *Let us know*. To update your profile, note some skills via <https://skillz.zenika.com/|Skillz app>",
            },
          },
        ],
        text: "Skillz reminder",
      });
    } catch (e) {
      console.error("error", e);
    }
  }
}
module.exports.postMessageSkillReminder = postMessageSkillReminder;
