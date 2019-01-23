// //two routes 
// var path = require("path");

// //GET route to survey which displays the survey page
// module.exports = function(app) {
// app.get("/survey", function(req, res) {
//     res.sendFile(path.join(__dirname, "public", "survey.html")); //absolute path to the directory and absolute path for a url
//   });
  
// //default route that leads to home.html
//   app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "public", "home.html"));
//   });
// };


var path = require("path");

module.exports = function(app) {
  app.get("/survey.html", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

};


// var path = require("path");

// //GET route to survey page
// module.exports = function(app) {
// app.get("/survey", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/survey.html")); //absolute path to the directory and absolute path for a url
//   });
  
// //default route to home.html
//   app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/home.html"));
//   });
// };