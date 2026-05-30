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
    _id: "69df776a5e9d7cd2cecf240b",
    name: "Arto Hellas",
    username: "hellas",
    password: "secretpassword",
    passwordHash: "$2b$10$1w4CY.wS5fpbUjpmAKIagesU/rhxyIth6HLnqwhowdzWfUyIcwgHq",
    blogs: ["69dd6234d5fdb4688dd4c685"]
  },
  {
    _id: "69df77715e9d7cd2cecf240d",
    name: "Matti Luukkainen",
    username: "mluukkai",
    password: "anotherpassword",
    passwordHash: "$2b$10$myPXgXwQm4Sk.N/eWtmqN.egnzAhWWArvdDGMoMJN3BzvKoZ6WrPS",
    blogs: ["69dd6234d5fdb4688dd4c686"]
  },
  {
    _id: "69df777b5e9d7cd2cecf240f",
    name: "Lucrezia Borgia",
    username: "lborgia",
    password: "poisonpassword",
    passwordHash: "$2b$10$Y6IEqIOFergS.3/Gn4WqQO9lVwd9UJ.P7ETgaBOp9mfMe/yEMiKbm",
    blogs: ["69dd6234d5fdb4688dd4c687"]
  },
  {
    _id: "69df77805e9d7cd2cecf2411",
    name: "Kalle Ilves",
    username: "kilves",
    password: "kallesecret",
    passwordHash: "$2b$10$Cfgkz8.wSIyjTUFV6ne71uba3cTP5k2Fwr9j2sjun5Q7Z2KP7D2L6",
    blogs: ["69dd6234d5fdb4688dd4c688"]
  },
  {
    _id: "69df77845e9d7cd2cecf2413",
    name: "Dan Abramov",
    username: "gaearon",
    password: "reduxforever",
    passwordHash: "$2b$10$FwUMGRiTH.espxpIq2Ugv.IgcIzjHJLFXWBdfF6Oqe6AwkEYeBub2",
    blogs: []
  },
  {
    _id: "69df77885e9d7cd2cecf2415",
    name: "Reeta Repo",
    username: "rrepo",
    password: "reetapass",
    passwordHash: "$2b$10$KX6j.6Tdr2z/ypDxH3/ZxOAlq6/xD7M9eD.nRrai8hkuGgR/C9cYS",
    blogs: []
  },
  {
    _id: "69df778c5e9d7cd2cecf2417",
    name: "Tuukka Ahola",
    username: "tahola",
    password: "tuukkapass",
    passwordHash: "$2b$10$Ct2g/jhjUjzG2PseJX0io.0xRm.NVzXosvvwtZrxGU9JNgiwhf1Si",
    blogs: []
  },
  {
    _id: "69df778f5e9d7cd2cecf2419",
    name: "Jakob Tesfaye",
    username: "jtesfaye",
    password: "jakobsecret",
    passwordHash: "$2b$10$Lcha7cJJkqFlK8JeYtrxJeObfXf.ZEhPIgyzAMW2Tkz9nmdUvFTRa",
    blogs: []
  }
];

export const usersWithoutPasswords = users.map(({ password, passwordHash, ...user }) => user)

export default users