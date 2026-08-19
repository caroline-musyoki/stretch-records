"use strict";
/*
LESSON 02 - JavaScript Execution Model

Branch:
Create: lesson-02 from main

This file contains:
- Event loop observations
- Blocking loop experiment
- Call stack tracing
- Delayed rendering simulation
- Countdown timer
*/

// =====================================================
// 1. Predict timer output order
// =====================================================

/*
Prediction before running:

1. Program start
2. Program end
3. Timeout 0
4. Timeout 1 second
5. Interval tick
6. Interval tick
7. Interval tick

After running:

1. Program start ✅
2. Program end ✅
3. Timeout 0 ✅
4. Timeout 1 second ❌
   Correction: The interval callbacks may run before the 1 second timeout depending on their scheduled timing.
5. Interval tick ❌
   Correction: The interval starts after its delay and runs repeatedly while the call stack is empty.
6. Interval tick ❌
   Correction: Each interval callback is queued separately after the previous callback finishes.
7. Interval tick ❌
   Correction: The interval continues until it is cleared.
*/

console.log("Program start");

setTimeout(() => {
  console.log("Timeout 0");
}, 0);

setTimeout(() => {
  console.log("Timeout 1 second");
}, 1000);

let count = 0;

const timer = setInterval(() => {
  console.log("Interval tick");

  count++;

  if (count === 3) {
    clearInterval(timer);
  }
}, 500);

console.log("Program end");

// =====================================================
// 2. Blocking loop experiment
// =====================================================

/*
Add this function behind a button on the stretch-records page.

Example button:

<button id="block-button">
Block Page
</button>

The loop occupies the JavaScript call stack.

While the stack is busy:
- clicks cannot be processed
- timers cannot execute
- page updates cannot happen

The browser appears frozen because the event loop cannot continue.
*/

function blockingLoop() {
  const start = Date.now();

  while (Date.now() - start < 5000) {
    // intentionally blocking for 5 seconds
  }

  console.log("Blocking finished");
}

document
  .getElementById("block-button")
  ?.addEventListener("click", blockingLoop);

// =====================================================
// 3. Call stack tracing
// =====================================================

/*
Call stack diagram:

Initial:
(empty)

1. push main()

Stack:
main()


2. push firstFunction()

Stack:
firstFunction()
main()


3. push secondFunction()

Stack:
secondFunction()
firstFunction()
main()


4. push thirdFunction()

Stack:
thirdFunction()
secondFunction()
firstFunction()
main()


5. Error happens inside thirdFunction()


Pop thirdFunction()
Pop secondFunction()
Pop firstFunction()
Pop main()


The console stack trace should show the error location:
thirdFunction()
secondFunction()
firstFunction()
*/

function firstFunction() {
  secondFunction();
}

function secondFunction() {
  thirdFunction();
}

function thirdFunction() {
  throw new Error("Test error inside innermost function");
}

// Run to compare with console stack trace

// firstFunction();

// =====================================================
// 4. Simulate slow data loading
// =====================================================

const artistContainer = document.querySelector(".artist-container");

function showLoading() {
  if (artistContainer) {
    artistContainer.innerHTML = "<p>Loading artists...</p>";
  }
}

function renderArtists() {
  if (artistContainer) {
    artistContainer.innerHTML = `
            <section class="artist-card">
                <h2>Artists loaded</h2>
                <p>The cards appeared after a simulated delay.</p>
            </section>
        `;
  }
}

showLoading();

setTimeout(() => {
  renderArtists();
}, 2000);

// =====================================================
// 5. Countdown using setInterval()
// =====================================================

let countdown = 10;

const countdownTimer = setInterval(() => {
  console.log(countdown);

  countdown--;

  if (countdown < 0) {
    clearInterval(countdownTimer);

    console.log("Countdown stopped");
  }
}, 1000);

// =====================================================
// STRETCH
// =====================================================

/*
A single-threaded language can handle thousands of waiting tasks
because it does not keep all tasks running at the same time.

The call stack executes the current JavaScript work.

Browser facilities such as timers, network requests, and APIs handle
waiting tasks outside the stack.

When those tasks finish, their callbacks are placed into queues:
- task/callback queue
- microtask queue

The event loop continuously checks whether the call stack is empty.
If it is empty, the event loop moves queued callbacks onto the stack.

This allows many tasks to wait without freezing the page because the
JavaScript thread is only occupied when it is actively executing code.
*/
