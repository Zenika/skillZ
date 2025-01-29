<p align="center">
    <img src="../public/logo/skillz-light.png">
</p>

# Skillz Slack bot

Slack bot for Skillz App - Keep updated about the new releases of the app, and your activity.

This bot in only available in the Slack Zenika workspace.

## Quick start

The usage of the bot is only available on the Zenika's Slack. So, click on your channels settings in side bar, the on "
Apps" such as the screenshot below :

![1](https://zupimages.net/up/23/03/lsdk.png)

Then, search "Skillz-bot" on the search bar. It will purpose you the bot. Just click on it to install it to your
workspace.

![2](https://zupimages.net/up/23/03/81bk.png)

It's done ! You can now use the bot. Go on the bot's section "About" to know how use the commands.

## Documentation

All the informations about this bot (configuration, etc) are
in [this file](https://docs.google.com/document/d/1VNHepiCHvmf6mLz2AZmaUNJzSKHFuQS4N2nUNNzKepY).

Architecture schéma is in [this file](https://docs.google.com/drawings/d/19-DK9jNgzQbMpmeW5tOe-XJ6Q1VFPw1HawUwxJXSqzA).

## Development

### Configuration

1/ Start by running : `npm i`
2/ Create an file named `.env`, then find variables thanks to the
documentation : https://docs.google.com/document/d/1VNHepiCHvmf6mLz2AZmaUNJzSKHFuQS4N2nUNNzKepY/edit#
3/ Launch the app : `npm run dev`

### Testing

🚧 Tests are in progress. 🚧

The test library used is [Jest](https://jestjs.io/fr/). You can use tests with this command : `npm run test`.

The [`coverage`](https://www.npmjs.com/package/coverage) library is installed on this project. You can check the
coverage of this project with this command : `npm run coverage`.

### Versioning <a name="versioning"></a>

_Check the actual version of the bots thanks to /skillz-version-{ENV}_. If you want to update it, change the "version"
field from the package.json