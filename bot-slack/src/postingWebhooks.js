const { request } = require("./lib/utils/requestsSlack");
const { Octokit } = require("@octokit/rest");

async function postingWebhooks() {
  //     try {
  //   const octokit = new Octokit({
  //     auth: process.env.OCTOKIT_TOKEN,
  //   });
  //   console.log("request", await octokit.request("GET /repos/{owner}/{repo}/releases/latest", {
  //     owner: "MailyLehoux",
  //     repo: "testAction",
  //   }))
  //   //console.log("octokit", octokit)
  // //   const variables = {
  // //     text: "Hello je suis une release",
  // //   };
  // //   try {
  // //     const response = await request(process.env.WEBHOOK_GITHUB, variables);
  // //     console.log("responssss", response);
  // //     return response;
  //   } catch (e) {
  //     console.error(e);
  //   }
}

module.exports.postingWebhooks = postingWebhooks;

// tag_name: 'testeste',
// target_commitish: 'main',
// name: 'TItre',
// draft: false,
// prerelease: false,
// created_at: '2022-10-12T08:20:13Z',
// published_at: '2022-10-12T08:20:37Z',
// assets: [],
// tarball_url: 'https://api.github.com/repos/MailyLehoux/testAction/tarball/testeste',
// zipball_url: 'https://api.github.com/repos/MailyLehoux/testAction/zipball/testeste',
// body: 'desc'
