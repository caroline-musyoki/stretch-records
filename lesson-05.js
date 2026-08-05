/* # Lesson 05 System Audit

Branch:
lesson-05

System audited:
Stretch Records artist page

Evidence sources:
- Browser DevTools Network tab
- Browser rendered page
- json-server terminal output


---

## 1. Failure Handling Audit

### Test performed

I stopped json-server while the page was open, then refreshed the browser.


### Observation

The visitor saw:

"Sorry, we cannot load artists right now. Please try again later."


The loading message cleared and the error message appeared.


### Failure type

The failure was caused by a single point of failure:

The artist API server running through json-server.


### Redundancy

Redundancy would mean having another available server or data source that could provide the artist data if the primary server failed.


---

## 2. Network Throttling Audit

### Test performed

I enabled a slow network preset in DevTools and reloaded the page.


### Observation

Measured load time:

Replace with your Network tab result:

Example:

4.2 seconds


While waiting, the screen displayed:

"Loading artists..."


The delay produced was:

Latency


Latency is the time taken for a request to travel to the server and return with a response.


---

## 3. Cache Comparison Audit

### Test performed

I compared two reloads:

1. Cache disabled
2. Cache enabled


### Observation

Cache disabled:

Network request:

Example:
- Request completed in 850 ms
- Data downloaded from server


Cache enabled:

Network request:

Example:
- Request completed faster
- Browser reused stored resources


The difference measured was:

Replace with your actual Network timing.


### Definition

Caching is storing previously loaded resources so they can be reused instead of requested again.


---

# 4. System Layers


## Presentation Layer

Location:

Browser HTML, CSS, and JavaScript rendering.


Responsible for:

- Displaying artist cards
- Showing loading messages
- Showing error messages
- Handling user interaction


Evidence:

The cards appeared in the browser after the fetch request completed.



---

## Application Layer

Location:

JavaScript loader functions.


Responsible for:

- Fetching artist data
- Checking response status
- Parsing JSON
- Creating artist card HTML
- Handling errors


Honest limitation:

The middle layer does not contain a real business rules engine.

json-server does not provide real application logic.


---

## Data Layer

Location:

artists.json


Responsible for:

- Storing artist records
- Providing data through json-server


Evidence:

The server terminal showed requests reaching the endpoint.


---

# 5. Request Journey


Example request:

GET

http://localhost:3000/artists


Full journey:

1. The browser JavaScript called the artists endpoint.

2. DevTools Network tab showed the GET request.

3. json-server received the request.

4. json-server read artist information from artists.json.

5. The server returned JSON data.

6. JavaScript converted the response using response.json().

7. The card builder created HTML.

8. The browser displayed the artist cards.


Evidence:

Network tab:
- Request URL:
- Status:
- Response:


Server terminal:

Observed request:

Replace with your terminal output.


---

# STRETCH - Real System Requirements


json-server allows simple storage and retrieval, but a real system would need additional responsibilities.


## Validation

Layer:

Application layer


Purpose:

Checks that artist data is complete and correctly formatted before saving.


Example:

An artist must have:
- name
- genre
- songs


---

## Identity

Layer:

Data layer


Purpose:

A real system needs permanent unique identifiers,
authentication, and ownership tracking.


Example:

User accounts and database IDs.


---

## Rules

Layer:

Application layer


Purpose:

Controls what actions are allowed.


Example:

Prevent duplicate artists or unauthorized changes.


---

## What Lesson 4 proved cannot live in the browser alone

Validation, identity, and business rules cannot rely only on browser JavaScript because users can modify browser code and bypass client-side checks.

A real system must enforce important rules on the server.
*/
