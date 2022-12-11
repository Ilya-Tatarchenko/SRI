const express = require("express");
const cors = require("cors");

const app = express();

const cookieSession = require("cookie-session");

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Server is working"
  });
});

//rotes
require("./app/routes/auth.rotes")(app);
require("./app/routes/user.rotes")(app);
require("./app/routes/building.rotes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// connect to databse
const db = require("./app/models");
// const Role = db.role;

db.sequelize.sync()
  .then(() => {
    console.log("Succesfully connected to database");
  })
  .catch((err) => {
    console.log("Failed to connect to db: " + err.message);
  });

