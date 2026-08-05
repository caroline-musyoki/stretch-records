/*
LESSON 04 - Fetch API, JSON Server, POST Requests

Branch:
lesson-04

Observations:

1. JSON Server endpoint:
http://localhost:3000/artists

Browser test:

Correct endpoint:
Status: 200 OK
Content-Type: application/json

Wrong endpoint:
Example:
http://localhost:3000/wrong-path

Status: 404 Not Found
Content-Type: application/json


The wrong path still returns a fulfilled Promise because fetch()
only rejects on network failures, not HTTP errors.
*/

// =====================================================
// 1. Fetch artists from local server
// =====================================================

const artistContainer = document.querySelector(".artist-container");

function showLoading() {
  artistContainer.innerHTML = "<p>Loading artists...</p>";
}

function createArtistCard(artist) {
  return `
        <section class="artist-card">

            <img src="${artist.photo}" alt="${artist.name}">

            <h2>${artist.name}</h2>

            <h3>${artist.genre}</h3>

            <p class="total">
                Total: ${artist.total}
            </p>

        </section>
    `;
}

async function loadArtists() {
  try {
    showLoading();

    const response = await fetch("http://localhost:3000/artists");

    console.log(response);

    /*
        Example Network observation:

        response.ok:
        true

        status:
        200

        Access-Control-Allow-Origin:
        *

        */

    if (!response.ok) {
      throw new Error(`Artist request failed: ${response.status}`);
    }

    const artists = await response.json();

    artistContainer.innerHTML = "";

    artists.forEach((artist) => {
      artistContainer.innerHTML += createArtistCard(artist);
    });
  } catch (error) {
    artistContainer.innerHTML = `
            <p>
            Sorry, we cannot load artists right now.
            Please try again later.
            </p>
            `;

    console.error(error.message);
  } finally {
    console.log("Artist loading finished.");
  }
}

loadArtists();

// =====================================================
// 2. Prove fetch() trap
// =====================================================

async function testWrongPath() {
  const response = await fetch("http://localhost:3000/wrong-path");

  /*
    Result:

    Promise fulfilled ✅

    fetch did not reject because
    the server responded.

    HTTP status:
    404

    */

  if (!response.ok) {
    throw new Error(`Server returned ${response.status}`);
  }
}

// testWrongPath();

// =====================================================
// 3. POST a new artist
// =====================================================

async function addArtist(newArtist) {
  try {
    const response = await fetch("http://localhost:3000/artists", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newArtist),
    });

    console.log("POST status:", response.status);

    /*
        Expected:

        201 Created

        After refresh:
        Artist remains because json-server
        writes to the database file.
        */
  } catch (error) {
    console.error(error.message);
  }
}

// Example:

/*
addArtist({

    name: "New Artist",

    genre: "Pop",

    total: "10:00",

    photo: "images/new.jpg"

});
*/

// =====================================================
// 4. Second JSON server
// =====================================================

/*
Start second server:

npx json-server label.json --port 3001


Servers:

Artists:
http://localhost:3000/artists


Label:
http://localhost:3001/label


*/

async function loadPageData() {
  try {
    const [artistsResponse, labelResponse] = await Promise.all([
      fetch("http://localhost:3000/artists"),

      fetch("http://localhost:3001/label"),
    ]);

    if (!artistsResponse.ok) {
      throw new Error("Artists server failed");
    }

    if (!labelResponse.ok) {
      throw new Error("Label server failed");
    }

    const artists = await artistsResponse.json();

    const label = await labelResponse.json();

    /*
        Render only after BOTH requests finish.
        */

    console.log(artists, label);
  } catch (error) {
    console.error(error.message);
  }
}

// loadPageData();

/*
=====================================================
STRETCH - Public API Documentation Notes
=====================================================

API endpoint address:
https://api.example.com/artists

HTTP method:
GET

Example parameter:
limit=10

Example request:
GET https://api.example.com/artists?limit=10


Response shape I would code against:

{
    "data": [
        {
            "id": 1,
            "name": "Artist name",
            "genre": "Music genre",
            "songs": [
                {
                    "title": "Song title",
                    "duration": "3:20"
                }
            ]
        }
    ]
}


One stated API limit:

The API allows only a limited number of requests per time period
(for example, 100 requests per hour).


Coding plan:

I would first fetch the endpoint,
check response.ok,
convert the response using response.json(),
then render the returned artist data.
*/
