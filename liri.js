require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var command = process.argv[2];
var song = process.argv[3];



if (command === "my-tweets") {
    var params = {screen_name: 'freddegurre'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text + " | tweeted on | " + tweets[i].created_at); 
            }   

        }
    });


}
if (command === "spotify-this-song") {
    spotify.search ({ type: "track", query: song, limit: 1}, function(error, data){
        if (error) {
            console.log(error); 
        }
        console.log(data.tracks.items); 
        
        
    })
   
}
