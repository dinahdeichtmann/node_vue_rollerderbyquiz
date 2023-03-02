//Express - Feathers
const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const cors = require("cors");
const app = express(feathers());
app.configure(express.rest());

//knex
const knexService = require("feathers-knex");
const knex = require("knex");
const config = require("./knexfile.js");
const database = knex(config.development);

const path = require("path");

app.use(express.json());
app.use(cors());

app.use("/api/themes", knexService({ Model: database, name: "theme" }));
app.use("/api/questions", knexService({ Model: database, name: "question" }));
app.use("/api/choices", knexService({ Model: database, name: "choice" }));
app.use("/api/themes", knexService({ Model: database, name: "theme" }));
app.use("/api/users", knexService({ Model: database, name: "users" }));

// app.get("/api/theme", async function (request, response) {
//   const theme = await database.select("*").from("theme");
//   response.send(theme);
// });

module.exports = app;
