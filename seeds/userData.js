const { User } = require('../models');

const userData =
[
    {
      "name": "Yemi",
      "email": "yemi@hotmail.com",
      "password": "easyas123"
    },
    {
      "name": "John",
      "email": "john@gmail.com",
      "password": "easyas123"
    },
    {
      "name": "Joe",
      "email": "joe@aol.com",
      "password": "easyas123"
    }
  ];

  const seedUser = () => User.bulkCreate(userData, {individualHooks: true});

  module.exports = seedUser;