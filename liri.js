//Import necessary files and modules
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

//Import API keys stored in the .env file
var bit_key = keys.bandsintown;
var spotify = new Spotify(
    keys.spotify
);
var omdb = (keys.omdb);

//Store arguments from command line to use in the runCommands() function
var commFirst = (process.argv[2].toString());
// console.log("command1= "+commFirst);
var commSecond = (process.argv.splice(3).join(" "));
// console.log("command2= "+commSecond);

//Display user's command
console.log("\nYour command was " + commFirst +".\n***************************\n");

//runCommands() function uses the switch statement to house 4 possible commands & code sequences:
function runCommands(command1, command2){
switch(command1){
    
    //If command is "concert-this" make a call to the Bands In Town API 
    case "concert-this":
        let artist = command2;
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id="+bit_key.key).then(
            function(response){
                let c_venue=response.data[0].venue.name;
                let c_city = response.data[0].venue.city;
                let c_state = response.data[0].venue.region;
                let c_date = response.data[0].datetime;
                let date_format = moment(c_date).format("MM/DD/YYYY");
                console.log("The artist " + artist + " will be playing at "+c_venue + " in " + c_city + " " + c_state + " on "+ date_format+ ".");
                console.log("\n================\n");
            });
        break;
    
    //If command is "spotify-this-song" make a call to the Spotify API
    case "spotify-this-song":
        let song = command2;
    
        spotify
            .search({type:"track", query: song, limit: 1})
            .then(function(response) {
                let artist_name= response.tracks.items[0].album.artists[0].name;
                let song_preview = response.tracks.items[0].album.external_urls.spotify;
                let album = response.tracks.items[0].album.name;
                console.log("The song, \""+song+"\", is by "+ artist_name + ". \nYou can get a preview at " + song_preview + " . \nIt is from the album, \"" + album +"\".");
                console.log("\n================\n");
            })
            .catch(function(err){
                console.log(err);
            });
        break;
    
    ////If command is "movie-this" make a call to the Open Movie Database API
    case "movie-this":
        var movieTitle = command2;
        // console.log(movieTitle);
        getMovie(movieTitle);
        function getMovie(movieTitle){
        axios.get("http://www.omdbapi.com/?t="+ movieTitle +"&apikey="+omdb.key).then(
            function(response){
                // console.log(response.data);
                let m_title=response.data.Title;
                let m_year = response.data.Year;
                let m_imdb_rating = response.data.Ratings[0].Value;
                let m_rt_rating = response.data.Ratings[1].Value;
                let m_country = response.data.Country;
                let m_language = response.data.Language;
                let m_plot = response.data.Plot;
                let m_actors = response.data.Actors;

                console.log("The movie, \""+m_title+"\", was released in "+m_year+".\nIts IMDB Rating is "+m_imdb_rating+".\nIts Rotten Tomatoes Rating is "+m_rt_rating+".\nIt was produced in "+ m_country+" in "+ m_language+".\nBrief Plot: "+m_plot+"\nActors in the movie: "+m_actors);
                console.log("\n================\n");
            });
        }
        break;

    //If command is "do-what-it-says" read the file "random.txt" and use the commands provided 
    //as parameters in the runCommands() function and call the function again.
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function(error, data){
            if(error){
                return console.log(error);
            }
            var dataArr = data.split(", ");
            
            //Loop through the list of commands & create individual arrays for each command.
            //Pass in the two elements of each array as parameters in the runCommands() function.
            for(let i = 0; i<dataArr.length; i++){
                let shortArr = dataArr[i].split(" ");
                var commFirst = shortArr[0];
                var commSecond = shortArr.splice(1).join(" ");
                runCommands(commFirst, commSecond)
            }
        })
        break;
    //If commands do not match with above four, display instructions message to user. 
    default:
        console.log("Please enter a command ('movie-this', 'concert-this', 'spotify-this-song', \nor 'do-what it says') and the name of an movie, artist, or song");
}
}
runCommands(commFirst, commSecond);