# LIRI-node-app

### Overview
This app makes calls to various APIs to provide song previews, concert information, and data about your favorite movies. The LIRI App stands for _Language_ Interpretation and Recognition Interface (a spin-off of Apple's infamous SIRI, which is the _Speech_ Interpretation and Recognition Interface). Much like SIRI, LIRI takes user commands to display information to the user. Click [here](https://youtu.be/IAJxCV4JhT8) for a video walk-through.

### How to Use LIRI:
LIRI is fairly simple to use. It is run through the terminal by issuing Node commands. The user needs to issue a command in the pattern: "node <filename.ext> <command_of_your_choice> <artist/movie/song_name>". Where the <command_of_your_choice> is one of the four commands below: 

Command      | What it does:
------------- | --------------
concert-this | Finds concerts in the area for the specified artist using the Bands In Town API.
movie-this | Displays movie data including plot, actors, and release date for the specified movie using the Online Movie Database API.
spotify-this-song | Displays song data including artist, album, and provides a song preview for the speficied song using the Spotify API.
do-what-it-says | Reads commands from an external text file and uses the input to run one of the three commands above. 

### Try it Out! 
Try out a command such as: "node liri.js spotify-this-song firework" 

### NPM packages
LIRI uses a number of different npm packages. Remember to run "npm install" in your terminal so you can have a fully functional LIRI experience. 

### Video Walk-Through
[Click here for the video.](https://youtu.be/IAJxCV4JhT8)
