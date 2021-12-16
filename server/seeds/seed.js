const db = require('../config/connection');
const { User } = require('../models');

const users = require('./userData.json');

db.once('open', async () => {
  await User.deleteMany({});

  const userInfo = await User.insertMany(users);

  console.log('Users seeded!');
  process.exit(0);
});