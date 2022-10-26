const { getChannelID, getUserID } = require("./getSlackInformations");

const myAppClientConversationIsOk = {
  client: {
    conversations: {
      open: jest.fn().mockResolvedValue({
        ok: true,
        channel: {
          id: "result",
        },
      }),
    },
  },
};

const myAppClientConversationIsNotOk = {
  client: {
    conversations: {
      open: jest.fn().mockResolvedValue({
        ok: false,
      }),
    },
  },
};

const myAppClientUsersIsOk = {
  client: {
    users: {
      lookupByEmail: jest.fn().mockResolvedValue({
        ok: true,
        user: "result",
      }),
    },
  },
};

const myAppClientUsersIsNotOk = {
  client: {
    users: {
      lookupByEmail: jest.fn().mockResolvedValue({
        ok: false,
      }),
    },
  },
};

it("test GetChannelID return value success", async () => {
  const result = await getChannelID(
    "testID",
    myAppClientConversationIsOk,
    "testToken"
  );
  expect(result).toBe("result");
});

it("test GetChannelID return value fail", async () => {
  const result = await getChannelID(
    "testID",
    myAppClientConversationIsNotOk,
    "testToken"
  );
  expect(result).toBe("");
});

it("test Informations myAppClientConversationIsOk", async () => {
  expect(
    (await myAppClientConversationIsOk.client.conversations.open()).ok
  ).toBe(true);
});

it("test Informations myAppClientConversationIsNotOk", async () => {
  expect(
    (await myAppClientConversationIsNotOk.client.conversations.open()).ok
  ).toBe(false);
});

it("the GetChannelID fetch fails with an error", async () => {
  try {
    await getChannelID("testID", myAppClientConversationIsNotOk, "testToken");
  } catch (e) {
    expect(e).toMatch("error");
  }
});

it("the getUserID fetch fails with an error", async () => {
  try {
    await getUserID("testID", myAppClientUsersIsNotOk, "testToken");
  } catch (e) {
    expect(e).toMatch("error");
  }
});

// it("test getUserID return value success", async () => {
//   const result = await getUserID("testID", myAppClientUsersIsOk, "testToken");
//   expect(result).toBe("result");
// });

it("the getUserID return fails", async () => {
  const result = await getUserID(
    "testID",
    myAppClientUsersIsNotOk,
    "testToken"
  );
  expect(result).toBe("");
});
