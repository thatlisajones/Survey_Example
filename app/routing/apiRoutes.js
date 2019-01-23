// var friendsData = require("../data/friends");
// //GET route for url /api/friends -- displays a JSON of all possible friends

// module.exports = function(app) {
//     app.get("/api/friends", function(req, res) {
//         return res.json(friendsData);
//     });
//     //POST route /api/friends -- handles incoming survey results and compatibility logic
//     app.post("/api/friends", function(req, res) {
//         var newFriend = req.body;

//         console.log(newFriend);

//         //add code for the friend matching based on new friend details
//         newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
//         console.log(`${newFriend.name} has been added to FakeFriend Finder.`);
//         friends.push(newFriend);
//         res.json(newFriend);
//     })};
var friends = require("../data/friends");

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log("req.body: ", req.body);
    console.log("body of post questions: ",req.body.questions);

    // Receive user details (name, photo, questions)
    var user = req.body;

    // parseInt for questions
    for(var i = 0; i < user.questions.length; i++) {
      user.questions[i] = parseInt(user.questions[i]);
    }

    // default friend match is the first friend but result will be whoever has the minimum difference in questions
    var compatibilityValue = 0;
    var minimumDifference = 40;

    // in this for-loop, start off with a zero difference and compare the user and the ith friend questions, one set at a time
    //  whatever the difference is, add to the total difference
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].questions.length; j++) {
        var difference = Math.abs(user.questions[j] - friends[i].questions[j]);
        totalDifference += difference;
      }

      // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
      if(totalDifference < minimumDifference) {
        compatibilityValue = i;
        minimumDifference = totalDifference;
      }
    }

    // after finding match, add user to friend array
    friends.push(user);

    // send back to browser the best friend match
    res.json(friends[compatibilityValue]);
  });
};