const { Octokit } = require("@octokit/rest");

try {
  const octokit = new Octokit({
    auth: process.env.OCTOKIT_TOKEN,
  });

  console.log(
    "request",
    await octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
      owner: "MailyLehoux",
      repo: "testAction",
    })
  );
} catch (e) {
  console.error(e);
}
