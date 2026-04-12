export const userWithShortUsername = {
  name: "Short User",
  username: "ed", 
  password: "validpassword"
};

export const userWithShortPassword = {
  name: "Weak Pass",
  username: "weakuser",
  password: "12"
};

const users = [
  {
    name: "Arto Hellas",
    username: "hellas",
    password: "secretpassword"
  },
  {
    name: "Matti Luukkainen",
    username: "mluukkai",
    password: "anotherpassword"
  },
  {
    name: "Lucrezia Borgia",
    username: "lborgia",
    password: "poisonpassword"
  },
  {
    name: "Kalle Ilves",
    username: "kilves",
    password: "kallesecret"
  },
  {
    name: "Dan Abramov",
    username: "gaearon",
    password: "reduxforever"
  },
  {
    name: "Reeta Repo",
    username: "rrepo",
    password: "reetapass"
  },
  {
    name: "Tuukka Ahola",
    username: "tahola",
    password: "tuukkapass"
  },
  {
    name: "Jakob Tesfaye",
    username: "jtesfaye",
    password: "jakobsecret"
  }
];

export const usersWithoutPasswords = users.map(({ password, ...user }) => user);

export default users;