function switchCommands(command) {
  switch (command) {
    case "/bytopic":
      switch (process.env.ENV) {
        case "PRODUCTION":
          return "/skillz-by-topic";
        default:
          return `/skillz-by-topic_${process.env.ENV}`;
      }
    case "/activate":
      switch (process.env.ENV) {
        case "PRODUCTION":
          return "/skillz-activate";
        default:
          return `/skillz-activate_${process.env.ENV}`;
      }
    case "/desactivate":
      switch (process.env.ENV) {
        case "PRODUCTION":
          return "/skillz-desactivate";
        default:
          return `/skillz-desactivate_${process.env.ENV}`;
      }
    case "/noteSkill":
      switch (process.env.ENV) {
        case "PRODUCTION":
          return "/skillz-note-skill";
        default:
          return `/skillz-note-skill_${process.env.ENV}`;
      }
    case "/oldSkills":
      switch (process.env.ENV) {
        case "PRODUCTION":
          return "/skillz-reminder-message";
        default:
          return `/skillz-reminder-message_${process.env.ENV}`;
      }
    case "/version":
      switch (process.env.ENV) {
        case "PRODUCTION":
          return "/skillz-version";
        default:
          return `/skillz-version_${process.env.ENV}`;
      }
    default:
      console.log("not recognized command");
      return "not recognized command";
  }
}

module.exports.switchCommands = switchCommands;
