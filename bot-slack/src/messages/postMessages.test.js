const { postSingleLineMessage } = require("./postMessages");

const myAppClientChat = {
  client: {
    chat: {
      postMessage: jest.fn().mockResolvedValue({
        channel: {
          id: "result",
        },
      }),
    },
  },
};

it("the postMessage fetch fails with an error", async () => {
  try {
    await postSingleLineMessage(
      "testID",
      "message",
      myAppClientChat,
      "testToken",
      "notification"
    );
  } catch (e) {
    expect(e).toMatch("error");
  }
});
