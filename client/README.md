# Client (Frontend)

## Description

Frontend part of the cabana booking application.
Built with React, TypeScript, and Vite.

---

## Environment Variables (.env)

Before running the project, create a `.env` file in the `client/` directory:

```env
VITE_SERVER_NAME=http://localhost
VITE_PORT=3000
```

### Variables description:

* `VITE_SERVER_NAME` — backend server host
* `VITE_PORT` — backend server port

These variables are used to build the API base URL.

---

## Architecture

The project follows a modified **Feature-Based Design (FBD)** approach.

### Project structure:

```
src/
├── app         # application initialization
├── config      # configuration (env, setup)
├── entities    # business entities (cabana, map)
├── features    # user features
├── pages       # pages composition
├── shared      # reusable code (UI, API, utils)
```

---

## Layers

### entities

Core business entities including:

* models
* interfaces
* UI components

Examples: `cabana`, `map`

---

### features

Encapsulated user scenarios:

* `book-cabana` — cabana booking logic and UI
* `get-map` — map fetching and processing

---

### shared

Reusable parts of the application:

* UI components
* API layer
* interfaces
* assets

---

### pages

High-level composition of features into screens.

---

## Advantages of the Architecture

* Clear separation of concerns
* High reusability
* Scalable structure
* Isolated business logic inside features
* Easier maintenance and refactoring

---

## Realtime Updates (WebSocket)

The application uses a WebSocket listener to handle realtime updates.

When a cabana is booked:

* all connected clients receive updates instantly
* UI is updated without page reload

This helps to:

* prevent booking conflicts
* keep data consistent
* improve user experience

---

## Notes

It is recommended to add `.env` to `.gitignore` to avoid committing environment-specific configuration.
