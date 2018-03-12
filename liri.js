require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var inquirer = require("inquirer");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

inquirer.prompt([
    //commant question
    {
        type: "list",
        message: "Choose command",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "command"
    },
    //what are you searching for. 
    {
        type: "input",
        message: "What are you searching for? ps. you dont have to search for anything :)",
        name: "query"
    }


]).then(function (input) {

    var command = input.command;

    var query = input.query;

    function liriApp(command, query) {

        //---TWITTER
        if (command === "my-tweets") {
            var user = { screen_name: 'freddegurre' };
            client.get('statuses/user_timeline', user, function (error, tweets, response) {
                if (!error) {
                    for (var i = 0; i < tweets.length; i++) {
                        console.log(tweets[i].text + " | tweeted on | " + tweets[i].created_at);
                    }

                }
            });

        }

        //-----SPOTIFY
        if (command === "spotify-this-song") {
            spotify.search({ type: "track", query: query, limit: 1 }, function (error, data) {
                if (error) { console.log(error); }

                console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                console.log("Songs Name: " + data.tracks.items[0].name);
                console.log("Song URL : " + data.tracks.items[0].external_urls.spotify);
                console.log("Album : " + data.tracks.items[0].album.name);
            });
        }

        //-----Movie
        if (command === "movie-this") {
            var apiKey = "trilogy"
            var movieURL = "http://www.omdbapi.com/?apikey=" + apiKey + "&t=" + query
            request(movieURL, function (error, response, body) {
                if (error) { console.log("you have error" + error) }
                var movie = JSON.parse(body);
                console.log("Title: " + movie.Title);
                console.log("Released: " + movie.Released);
                console.log("IMDB:  " + movie.imdbRating);
                console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
                console.log("Produced:  " + movie.Country);
                console.log("Language:  " + movie.Language);
                console.log("Actors:  " + movie.Actors);
                console.log("Plot:  " + movie.Plot);
            })
        }

        if (command === "do-what-it-says") {
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) { console.log("you have error" + error) }
                var data = (data.split(","));
                command = data[0];
                query = data[1];



                liriApp(command, query);

            });
        }

    }
    liriApp(command, query);


});





