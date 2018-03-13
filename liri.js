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
                        fs.appendFile("log.txt", "\n" + "Title: " + tweets[i].text + " | tweeted on | " + tweets[i].created_at + "\n", function() {});
                    }

                }
            });

        }

        //-----SPOTIFY
        if (command === "spotify-this-song") {
            if (query === "") {
                query = "Hello"
            }
            spotify.search({ type: "track", query: query, limit: 1 }, function (error, data) {
                if (error) { console.log(error); }

                console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                fs.appendFile("log.txt", "\n" + "Artist: " + data.tracks.items[0].album.artists[0].name + "\n", function() {});

                console.log("Songs Name: " + data.tracks.items[0].name);
                fs.appendFile("log.txt", "\n" + "Songs Name: " + data.tracks.items[0].name + "\n", function() {});

                console.log("Song URL : " + data.tracks.items[0].external_urls.spotify);
                fs.appendFile("log.txt", "\n" + "Song URL : " + data.tracks.items[0].external_urls.spotify + "\n", function() {});
                
                console.log("Album : " + data.tracks.items[0].album.name);
                fs.appendFile("log.txt", "\n" + "Album : " + data.tracks.items[0].album.name + "\n", function() {});
            });
        }

        //-----Movie
        if (command === "movie-this") {
            if (query === ""){
                query = "Mr Nobody"
            }
            var apiKey = "trilogy"
            var movieURL = "http://www.omdbapi.com/?apikey=" + apiKey + "&t=" + query
            request(movieURL, function (error, response, body) {
                if (error) { console.log("you have error" + error) }
                var movie = JSON.parse(body);
                console.log("Title: " + movie.Title);
                fs.appendFile("log.txt", "\n" + "Title: " + movie.Title + "\n", function() {});

                console.log("Released: " + movie.Released);
                fs.appendFile("log.txt", "\n" + "Released: " + movie.Released + "\n", function() {});

                console.log("IMDB:  " + movie.imdbRating);
                fs.appendFile("log.txt", "\n" + "IMDB:  " + movie.imdbRating + "\n", function() {});

                console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
                fs.appendFile("log.txt", "\n" + "Rotten Tomatoes: " + movie.Ratings[1].Value + "\n", function() {});

                console.log("Produced:  " + movie.Country);
                fs.appendFile("log.txt", "\n" + "Produced:  " + movie.Country + "\n", function() {});

                console.log("Language:  " + movie.Language);
                fs.appendFile("log.txt",  + "Language:  " + movie.Language + "\n", function() {});

                console.log("Actors:  " + movie.Actors);
                fs.appendFile("log.txt", "\n" + "Actors:  " + movie.Actors + "\n", function() {});

                console.log("Plot:  " + movie.Plot);
                fs.appendFile("log.txt", "\n" + "Plot:  " + movie.Plot + "\n", function() {});
            })
        }
        //----Read from random.txt
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





