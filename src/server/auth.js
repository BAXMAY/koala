const bcrypt = require("bcrypt");
const passport = require("koa-passport");
const { password } = require("pg/lib/defaults");
const LocalStrategy = require("passport-local").Strategy;

const knex = require("./db/connection");

const options = {};

//  serialize user get its id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//  use id to get(deserialize) user
//  return null on fail
passport.deserializeUser((id, done) => {
  return knex("users")
    .where({ id })
    .first()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(
  //  Check user exist and password match
  //  return false if user not exist or password not match
  new LocalStrategy(options, (username, password, done) => {
    knex("users")
      .where({ username })
      .first()
      .then(async (user) => {
        if (!user) return done(null, false);
        if (comparePass(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        return done(err);
      });
  })
);

async function comparePass(userPassword, databasePassword) {
  const match = await bcrypt.compare(userPassword, databasePassword);
  return match;
}
