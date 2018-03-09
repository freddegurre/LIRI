require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var command = process.argv[2];
var query = process.argv[3] 

for (var i = 4; i < process.argv.length; i++) {
        query += "+" +process.argv[i]; 
    }

//---TWITTER
if (command === "my-tweets") {
    var user = {screen_name: 'freddegurre'};
    client.get('statuses/user_timeline', user, function(error, tweets, response) {
      if (!error) {
          for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text + " | tweeted on | " + tweets[i].created_at); 
            }   

        }
    });

}
//-----SPOTIFY
if (command === "spotify-this-song") {
    spotify.search({ type: "track", query: query, limit: 1}, function(error, data){
        if (error) {console.log(error);}
        
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Songs Name: " + data.tracks.items[0].name);
        console.log("Song URL : " + data.tracks.items[0].external_urls.spotify);
        console.log("Album : " + data.tracks.items[0].album.name);
    }); 
}
//-----Movie
if (command === "movie-this") {
    var apiKey = "trilogy"
    var movieURL = "http://www.omdbapi.com/?apikey="+ apiKey+ "&t=" + query
    request(movieURL, function(error, response, body){
        if(error) {console.log("you have error" + error)}
        var movie = JSON.parse(body); 
        console.log("Title: " + movie.Title);    
        console.log("Released: " + movie.Released);
        console.log("IMDB:  " + movie.imdbRating);
        console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
        console.log("Produced:  " +  movie.Country);
        console.log("Language:  " +  movie.Language);
        console.log("Actors:  " +  movie.Actors);
        console.log("Plot:  " +  movie.Plot);
    })
}

