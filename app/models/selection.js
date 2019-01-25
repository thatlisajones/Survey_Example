// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Chirp" model that matches up with DB
var Selection = sequelize.define("selection", {
  user: Sequelize.STRING,
  selections: Sequelize.STRING,
  created_at: Sequelize.DATE
});

// Syncs with DB
Users.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = Selection;