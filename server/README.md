# Server (Backend)

## Description

Backend part of the cabana booking application.
Built with Node.js and TypeScript.

---

## Environment Variables (.env)

Before running the project, create a `.env` file in the `server/` directory:

```env
PORT=
WS_PORT=
WS_HOSTNAME=
LOG_PATH=server.log
NODE_ENV=development
```

### Variables description:

* `PORT` — HTTP server port
* `WS_PORT` — WebSocket server port
* `WS_HOSTNAME` — WebSocket host
* `LOG_PATH` — path to log file
* `NODE_ENV` — environment mode (development/production)

---

## Architecture

The project follows a **Clean Architecture** approach with separation into layers:

* domain
* use cases
* infrastructure
* gateways

---

## Project structure

```
src/
├── config          # configuration (env, logger)
├── domain          # core business logic
├── gateways        # controllers, routes, middlewares
├── infrastructure  # external implementations
└── main.ts         # entry point
```

---

## Layers

### domain

Core business logic of the application:

* entities
* interfaces
* repository contracts (ports)
* use cases

Examples:

* booking and cabana entities
* `bookCabana` and `getMap` use cases

---

### use cases

Encapsulate business logic and application rules.
They do not depend on external systems.

---

### gateways

Entry points to the application:

* controllers
* routers
* middlewares
* DTOs

Handle HTTP requests, validation, and error processing.

---

### infrastructure

Implementation details:

* repositories
* parsers
* logger

This layer connects domain logic with external systems.

---

## Repositories

Separate repositories are implemented for different domains:

* booking
* guest
* resort

They follow defined interfaces (ports) from the domain layer.

---

## Testing

Core business logic is covered with tests:

* use cases
* parsers

This ensures reliability and stability of the application.

---

## Realtime Updates (WebSocket)

The server includes a WebSocket layer:

* emits events when a cabana is booked
* notifies all connected clients

This enables realtime synchronization with the frontend.
