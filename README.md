# Project Setup

## Installation

1. Install dependencies:
   ```sh
   bun install
   ```

2. Copy the environment variables file:
   ```sh
   cp .env.example .env
   ```

3. Start the Docker containers:
   ```sh
   docker-compose up -d
   ```

## Database and User Initialization

On startup, the application automatically creates a user with a balance of `10000`. If the balance is below `10000` on restart, it will be reset to `10000`.

## Running Load Tests

You can run a k6 load test to send `10000` requests to decrease the balance by `2` per request. Expected results:
- `5000` successful transactions (`-2` deducted per request)
- `5000` failed transactions due to insufficient funds

## Health Check Endpoint

To check if the API is running, visit:
```
http://localhost:4000/health
```

