// ⚠️ VERY IMPORTANT NOTE ⚠️

// - Binary search only works if data is sorted.
// - bankData.users MUST always be sorted alphabetically by username.

export const bankData = {
  users: [
    {
      username: "astro1",
      pin: "1111",
      secret: "nebula",
      sector: "Mars",
      currency: "Credits",
      balance: 5000,
      status: "ACTIVE",
      history: [],
    },
    {
      username: "belt1",
      pin: "2222",
      secret: "asteroid",
      sector: "Belt",
      currency: "Oxygen",
      balance: 800,
      status: "ACTIVE",
      history: [],
    },
    {
      username: "goldie",
      pin: "3333",
      secret: "comet",
      sector: "Mars",
      currency: "Gold",
      balance: 1500,
      status: "PENDING",
      history: [],
    },
    {
      username: "nova",
      pin: "4444",
      secret: "supernova",
      sector: "Earth",
      currency: "Scrip",
      balance: 200,
      status: "ACTIVE",
      history: [],
    },
    {
      username: "terra1",
      pin: "5555",
      secret: "orbit",
      sector: "Earth",
      currency: "Gold",
      balance: 3000,
      status: "ACTIVE",
      history: [],
    },
    {
      username: "zenith",
      pin: "6666",
      secret: "quasar",
      sector: "Belt",
      currency: "Scrip",
      balance: 400,
      status: "PENDING",
      history: [],
    },
  ],
};
