# Cabana Booking

## Description

Fullstack application for managing and booking cabanas.
Includes a client (frontend) and server (backend) with realtime synchronization.

---

## Installation

```bash
npm install
```

---

## Run

```bash
npm start -- --map <value> --bookings <value>
```

### Arguments:

* `--map` — path or source of the map data
* `--bookings` — path or source of bookings data

Example:

```bash
npm start -- --map ./data/map.json --bookings ./data/bookings.json
```

---

## Project Structure

```
client/   # frontend (React, Vite)
server/   # backend (Node.js, TypeScript)
```

---

## Key Features

### Realtime updates (WebSocket)

* Instant synchronization between clients
* Updates UI when a cabana is booked
* Prevents booking conflicts

---

### Clean architecture (backend)

* Separation of domain, use cases, infrastructure, and gateways
* Scalable and maintainable structure

---

### Feature-Based Design (frontend)

* Modular and scalable frontend architecture
* Clear separation of features and entities

---

### Repository pattern

* Separate repositories for booking, guest, and resort
* Decoupled data access layer

---

### Logging

* Centralized logging system
* Configurable log output via environment variables

---

### Testing

* Core logic covered with tests
* Focus on use cases and critical functionality

---

## Technologies

* React
* TypeScript
* Node.js
* WebSocket

