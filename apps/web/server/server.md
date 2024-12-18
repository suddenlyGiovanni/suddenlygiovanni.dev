# Server Setup Documentation

## Overview

The server is an Express application that serves a React Router build. It supports both development and production environments, dynamically configuring the server port and host.

## Key Components

### Configuration (`Config` class)

- Manages environment variables and server build path.
- Uses `effect` library for schema validation.

### Source Map Support

- Uses `source-map-support` to enhance error stack traces.

### Express Application

- Uses `compression` for response compression.
- Uses `morgan` for HTTP request logging.
- Serves static files and handles all incoming requests.

### Development Mode

- Uses `vite` for development server with middleware mode.
- Dynamically loads and handles requests using Vite's SSR capabilities.

### Production Mode

- Serves static assets with caching.
- Loads the server build from the specified path.

### Request Handling

- Uses `react-router` for handling requests and responses.
- Custom request handler created using `react-router-express`.

## Middleware Behavior

### Compression Middleware (`compression`)

- Compresses response bodies for all requests.
- Adds `Content-Encoding` headers and compresses the body.

### Morgan Middleware (`morgan`)

- Logs HTTP requests.
- Does not modify the `Request` or `Response` but logs details like method, URL, status, and response time.

### Static File Serving (`express.static`)

- Serves static files from the specified directories.
- Adds appropriate headers (e.g., `Cache-Control`) and serves files.

### Vite Dev Server Middleware (`viteDevServer.middlewares`)

- Handles requests in development mode.
- Attaches custom middlewares and acts as a handler function for custom HTTP servers.
- Provides features like HMR, module loading, and development-specific optimizations.

## Vite Dev Server in Development Mode

- A connect app instance that attaches custom middlewares to the dev server.
- Acts as a handler function for custom HTTP servers or as middleware in connect-style Node.js frameworks.
- Provides HMR, module loading, and development-specific optimizations.

## `viteDevServer.ssrLoadModule('./server/app.ts')` and `app.ts`

### `ssrLoadModule`

- Loads a given URL as an instantiated module for SSR.

### `app.ts`

- Sets up the Express application and request handler.
- Defines a request handler using `createRequestHandler` from `react-router-express`.
- Configures the request handler to load the server build and provide context values.

## Handling OS Signals for Graceful Shutdown

- Listens for termination signals (`SIGTERM` and `SIGINT`).
- Closes the server instance and cleans up resources when a signal is received.

## Additional Details

### Configuration

- Dynamically configures the port and host based on environment variables or default settings.

### Source Map Support

- Enhances error stack traces by retrieving source maps for better debugging.

### Request Handling

- Uses `react-router` to handle requests and responses, providing SSR capabilities.

## External Dependencies

- `compression`: Middleware for response compression.
- `effect`: Library for schema validation.
- `express`: Web framework for building the server.
- `get-port`: Utility to get an available port.
- `morgan`: HTTP request logger.
- `source-map-support`: Enhances error stack traces.
- `vite`: Development server and build tool.
- `react-router`: Library for handling routing and SSR.

# Unit Tests

## Objectives

- Validate the configuration schema and default values.
- Ensure the server starts correctly in both development and production modes.
- Verify middleware and request handling logic.
- Test static file serving and caching behavior.
- Validate error handling and logging.

## Test Cases

### Configuration Tests

- Validate default values for `NODE_ENV`, `PORT`, and `HOST`.
- Test schema validation for different configurations.

### Server Initialization Tests

- Ensure the server starts on the specified port and host.
- Verify the correct middleware is applied based on the environment.

### Middleware Tests

- Test `compression` middleware for response compression.
- Verify `morgan` logs HTTP requests correctly.

### Request Handling Tests

- Test request handling in development mode using Vite.
- Verify request handling in production mode with static file serving.

### Static File Serving Tests

- Ensure static assets are served with correct caching headers.
- Test serving of client-side assets from the build directory.

### Error Handling Tests

- Verify error handling and logging for different scenarios.
- Test source map support for enhanced error stack traces.
