"use strict";
const artists = [
  { name: "Pinkfong", genre: "Children's music", total: "11:31" },
  { name: "Adriano Celentano", genre: "Italian pop", total: "20:52" },
  { name: "Asake", genre: "Afrobeats", total: "14:08" },
  { name: "Miyagi and Andy Panda", genre: "Hip-hop", total: "16:21" },
  { name: "Johnny Cash", genre: "Country", total: "15:40" },
];

//Serve the page in the stretch-records folder with Live Server. Open Chrome DevTools, select the Network tab, and reload. In a comment at the top of the lesson file, record how many requests the single page load made and list three of them by name.
//index.html
//injectScriptAdjust.js

//Move the artist array out of stretch-records/script.js into a new file named stretch-records/artists.json, keeping every artist and property intact. Load it with the three-line fetch() pattern from this lesson so the page renders exactly as before.
fetch("./artists.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

//Add a sixth artist by editing only artists.json. Reload and confirm the new card appears. In a comment, state which files changed and which did not, and why that separation is the point.
//Break artists.json deliberately by adding one trailing comma. Reload, read the error in the console, and copy it into a comment. Then fix the file and confirm the cards return.
//In lesson-01.js, build one artist object, convert it to text with JSON.stringify(), log the text, parse it back with JSON.parse(), and log one property of the result, proving the full round trip.
//STRETCH. In a closing comment, describe your page as a system. Name the client, name the server, and state what the request asked for and what the response carried.
