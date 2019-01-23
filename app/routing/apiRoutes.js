// var feelingsData = require("../data/feelings");
// //GET route for url /api/feelings -- displays a JSON of all possible feelings

// module.exports = function(app) {
//     app.get("/api/feelings", function(req, res) {
//         return res.json(feelingsData);
//     });
//     //POST route /api/feelings -- handles incoming survey results and compatibility logic
//     app.post("/api/feelings", function(req, res) {
//         var newfeeling = req.body;

//         console.log(newfeeling);

//         //add code for the feeling matching based on new feeling details
//         newfeeling.routeName = newfeeling.name.replace(/\s+/g, "").toLowerCase();
//         console.log(`${newfeeling.name} has been added to Fakefeeling Finder.`);
//         feelings.push(newfeeling);
//         res.json(newfeeling);
//     })};
var feelings = require("../data/feelings");

module.exports = function(app) {
  // Return all feelings found in feelings.js as JSON
  app.get("/api/feelings", function(req, res) {
    res.json(feelings);
  });

  app.post("/api/feelings", function(req, res) {
    console.log("req.body: ", req.body);
    console.log("body of post questions: ",req.body.questions);

    // Receive user details (name, photo, questions)
    var user = req.body;

    // parseInt for questions
    for(var i = 0; i < user.questions.length; i++) {
      user.questions[i] = parseInt(user.questions[i]);
    }

    // default feeling match is the first feeling but result will be whoever has the minimum difference in questions
    var compatibilityValue = 0;
    var minimumDifference = 40;

    // in this for-loop, start off with a zero difference and compare the user and the ith feeling questions, one set at a time
    //  whatever the difference is, add to the total difference
    for(var i = 0; i < feelings.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < feelings[i].questions.length; j++) {
        var difference = Math.abs(user.questions[j] - feelings[i].questions[j]);
        totalDifference += difference;
      }

      // if there is a new minimum, change the best feeling index and set the new minimum for next iteration comparisons
      if(totalDifference < minimumDifference) {
        compatibilityValue = i;
        minimumDifference = totalDifference;
      }
    }

    // after finding match, add user to feeling array
    feelings.push(user);

    // send back to browser the best feeling match
    res.json(feelings[compatibilityValue]);
  });
};