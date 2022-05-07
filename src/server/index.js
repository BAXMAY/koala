const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const passport = require("koa-passport");
const RedisStore = require("koa-redis");

const indexRoutes = require("./routes/index");
const movieRoutes = require("./routes/movies");
const authRoutes = require("./routes/auth");

const app = new Koa();
const PORT = process.env.PORT || 1337;

// session
app.keys = ["to\x84\x87\x90\xfcN\xc4&\x89\xdd\x9b3'\xa6d5\xab\xd1\x9eWEI]"];
app.use(session({ store: new RedisStore({}) }, app));
// app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
require("./auth");
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(indexRoutes.routes());
app.use(movieRoutes.routes());
app.use(authRoutes.routes());

// server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
