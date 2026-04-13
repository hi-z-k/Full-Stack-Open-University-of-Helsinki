export const userWithShortUsername = {
  _id: "69dd5cf8445c64bbacc15a2e",
  name: "Short User",
  username: "ed", 
  password: "validpassword",
  blogs: []
};

export const userWithShortPassword = {
  _id: "69dd5cf8445c64bbacc15a30",
  name: "Weak Pass",
  username: "weakuser",
  password: "12",
  blogs: []
};

const users = [
  {
    _id: "69dd5cf4445c64bbacc15a1e",
    name: "Arto Hellas",
    username: "hellas",
    password: "secretpassword",
    blogs: ["69dd6234d5fdb4688dd4c685"]
  },
  {
    _id: "69dd5cf4445c64bbacc15a20",
    name: "Matti Luukkainen",
    username: "mluukkai",
    password: "anotherpassword",
    blogs: ["69dd6234d5fdb4688dd4c686"]
  },
  {
    _id: "69dd5cf5445c64bbacc15a22",
    name: "Lucrezia Borgia",
    username: "lborgia",
    password: "poisonpassword",
    blogs: ["69dd6234d5fdb4688dd4c687"]
  },
  {
    _id: "69dd5cf5445c64bbacc15a24",
    name: "Kalle Ilves",
    username: "kilves",
    password: "kallesecret",
    blogs: ["69dd6234d5fdb4688dd4c688"]
  },
  {
    _id: "69dd5cf5445c64bbacc15a26",
    name: "Dan Abramov",
    username: "gaearon",
    password: "reduxforever",
    blogs: []
  },
  {
    _id: "69dd5cf6445c64bbacc15a28",
    name: "Reeta Repo",
    username: "rrepo",
    password: "reetapass",
    blogs: []
  },
  {
    _id: "69dd5cf6445c64bbacc15a2a",
    name: "Tuukka Ahola",
    username: "tahola",
    password: "tuukkapass",
    blogs: []
  },
  {
    _id: "69dd5cf7445c64bbacc15a2c",
    name: "Jakob Tesfaye",
    username: "jtesfaye",
    password: "jakobsecret",
    blogs: []
  }
];

export const usersWithoutPasswords = users.map(({ password, ...user }) => user);

export default users;