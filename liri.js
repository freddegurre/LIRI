require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var command = process.argv[2];
var search = process.argv[3] 

for (var i = 4; i < process.argv.length; i++) {
        search += "+" +process.argv[i]; 
    }

//---TWITTER
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
//-----SPOTIFY
if (command === "spotify-this-song") {
    
    spotify.search ({ type: "track", search: song, limit: 1}, function(error, data){
        if (error) {console.log(error);}

        else if (song === "") {
            song = "The sign"
        }
        console.log(data.tracks.items); 
        
    })
   
}
//-----Movie
if (command === "movie-this") {
    var apiKey = "trilogy"
    var movieURL = "http://www.omdbapi.com/?apikey="+ apiKey+ "&s=batman"
    request(movieURL, function(error, response, body){
        if(error) {console.log("you have error" + error)}
        console.log(body); 
        
    })
}
