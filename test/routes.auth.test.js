process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const server = require("../src/server/index");
const knex = require("../src/server/db/connection");

describe("routes : auth", () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => {
        return knex.migrate.latest();
      })
      .then(() => {
        return knex.seed.run();
      });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe("GET /auth/register", () => {
    it("should render register view", (done) => {
      chai
        .request(server)
        .get("/auth/register")
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql("text/html");
          res.text.should.contain("<h1>Register</h1>");
          res.text.should.contain(
            '<p><button type="submit">Register</button></p>'
          );
          done();
        });
    });
  });

  describe("POST /auth/register", () => {
    it("should register a new user", (done) => {
      chai
        .request(server)
        .post("/auth/register")
        .send({
          username: "beerana",
          password: "eiei",
        })
        .end((err, res) => {
          should.not.exist(err);
          console.log(res.status);
          res.redirects[0].should.contain("/auth/status");
          done();
        });
    });
  });

  describe("GET /auth/login", () => {
    it("should render the login view", (done) => {
      chai
        .request(server)
        .get("/auth/login")
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql("text/html");
          res.text.should.contain("<h1>Login</h1>");
          res.text.should.contain(
            '<p><button type="submit">Log In</button></p>'
          );
          done();
        });
    });
  });

  describe("POST /auth/login", () => {
    it("should login a user", (done) => {
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "baramee",
          password: "admin",
        })
        .end((err, res) => {
          res.redirects[0].should.contain("/auth/status");
          done();
        });
    });
  });

  // describe("GET /auth/status", () => {
  //   it("should render status view", (done) => {
  //     chai
  //       .request(server)
  //       .get("/auth/status")
  //       .end((err, res) => {
  //         should.not.exist(err);
  //         res.redirects.length.should.eql(0);
  //         res.status.should.eql(200);
  //         res.type.should.eql("text/html");
  //         res.text.should.contain("<p>You are authenticated.</p>");
  //         done();
  //       });
  //   });
  // });

  // describe("GET /auth/logout", () => {
  //   it("should render register view", (done) => {
  //     chai
  //       .request(server)
  //       .get("/auth/register")
  //       .end((err, res) => {
  //         should.not.exist(err);
  //         res.redirects.length.should.eql(0);
  //         res.status.should.eql(200);
  //         res.type.should.eql("text/html");
  //         res.text.should.contain("<h1>Register</h1>");
  //         res.text.should.contain(
  //           '<p><button type="submit">Register</button></p>'
  //         );
  //         done();
  //       });
  //   });
  // });
});
