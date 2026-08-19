"use strict";
/*
LESSON 03 - Promises, Async/Await, Errors

Branch:
lesson-03

Continues from Lesson 2:
- Artist loader uses a simulated delay
- Loading message appears before rendering

This file contains:
- Promise handlers
- Promise ordering puzzle
- Async/await loader
- Custom errors
- Rethrowing
- Promise.all()
- Promise.allSettled()
*/

// =====================================================
// 1. Artist loader using then(), catch(), finally()
// =====================================================

const artistContainer = document.querySelector(".artist-container");

function loadArtists() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const artists = [
        {
          name: "Pinkfong",
          genre: "Children's music",
        },
        {
          name: "Asake",
          genre: "Afrobeats",
        },
      ];

      if (artists.length > 0) {
        resolve(artists);
      } else {
        reject(new Error("No artist data available."));
      }
    }, 2000);
  });
}

function displayArtists(artists) {
  artistContainer.innerHTML = "";

  artists.forEach((artist) => {
    artistContainer.innerHTML += `
            <section class="artist-card">
                <h2>${artist.name}</h2>
                <p>${artist.genre}</p>
            </section>
        `;
  });
}

function showLoading() {
  artistContainer.innerHTML = "<p class='loading'>Loading artists...</p>";
}

showLoading();

loadArtists()
  .then((artists) => {
    displayArtists(artists);
  })

  .catch((error) => {
    artistContainer.innerHTML = `<p>Sorry, we could not load artists right now. Please try again later.</p>`;

    console.error(error.message);
  })

  .finally(() => {
    console.log("Artist loading process finished.");
  });

// =====================================================
// 2. Promise ordering puzzle
// =====================================================

/*
Prediction before running:

1. Script start
2. Script end
3. Promise reaction
4. Zero delay timer


Actual result:

1. Script start ✅
2. Script end ✅
3. Promise reaction ✅
4. Zero delay timer ✅


Explanation:

The Promise callback is placed in the microtask queue, which is
processed before the timer callback queue after the call stack is empty.
*/

console.log("Script start");

setTimeout(() => {
  console.log("Zero delay timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise reaction");
});

console.log("Script end");

// =====================================================
// 3. Async/await version of loader
// =====================================================

async function loadArtistsAsync() {
  try {
    showLoading();

    const artists = await loadArtists();

    displayArtists(artists);
  } catch (error) {
    artistContainer.innerHTML = `<p>Unable to display artists. Please refresh and try again.</p>`;

    console.error(error.message);
  } finally {
    console.log("Async artist loading finished.");
  }
}

// loadArtistsAsync();

// The async version behaves the same:
// success renders cards,
// failure shows a visitor message,
// finally always runs.

// =====================================================
// 4. Custom error class
// =====================================================

class MissingArtistError extends Error {
  constructor(message) {
    super(message);

    this.name = "MissingArtistError";
  }
}

function checkArtist(artist) {
  if (!artist.name) {
    throw new MissingArtistError(
      "Artist data is missing a name. Please check the artist database.",
    );
  }

  return artist;
}

try {
  checkArtist({
    genre: "Pop",
  });
} catch (error) {
  console.error(error.message);
}

// =====================================================
// 5. Rethrowing errors with context
// =====================================================

function saveArtist() {
  try {
    checkArtist({});
  } catch (error) {
    throw new Error(
      `Stretch Records artist page failed while saving artist data: ${error.message}`,
    );
  }
}

try {
  saveArtist();
} catch (error) {
  console.log(error.message);
}

/*
Final message reaching the top:

"Stretch Records artist page failed while saving artist data:
Artist data is missing a name. Please check the artist database."
*/

// =====================================================
// 6. Promise.all()
// =====================================================

function delayedTask(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, delay);
  });
}

Promise.all([
  delayedTask("Artists loaded", 1000),
  delayedTask("Images loaded", 1500),
  delayedTask("Songs loaded", 2000),
])

  .then((results) => {
    console.log("Promise.all result:", results);
  })

  .catch((error) => {
    console.error(error);
  });

// One task rejecting

Promise.all([
  delayedTask("Artists loaded", 1000),

  Promise.reject("Images failed"),

  delayedTask("Songs loaded", 2000),
])

  .then((results) => {
    console.log(results);
  })

  .catch((error) => {
    console.log("Promise.all failed:", error);
  });

// allSettled keeps every result

Promise.allSettled([
  delayedTask("Artists loaded", 1000),

  Promise.reject("Images failed"),

  delayedTask("Songs loaded", 2000),
])

  .then((results) => {
    console.log("allSettled results:", results);
  });

// =====================================================
// STRETCH - Visitor friendly failure
// =====================================================

/*
If artist data is empty, the visitor should not see technical errors.

Instead of:
"MissingArtistError: undefined name"

the visitor sees:

"Sorry, we couldn't find any artists right now.
Please try again later."


This wording is better because:
- It explains the problem clearly.
- It does not expose programming details.
- It gives the visitor an action: try again later.
*/

function validateArtists(artists) {
  if (!artists || artists.length === 0) {
    throw new MissingArtistError("No artists are available at the moment.");
  }
}

try {
  validateArtists([]);
} catch (error) {
  artistContainer.innerHTML = `<p>Sorry, we couldn't find any artists right now. Please try again later.</p>`;
}
