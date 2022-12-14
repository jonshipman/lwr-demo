# LWC Boilerplate Example

The **LWC Boilerplate** example contains the minimum code needed to get a simple Single Page Application (SPA) on LWR running.

## Project Setup

The directory structure looks like this:

```
src/server  // Server scripts
src/modules // Modules
src/assets  // Static Assets
src/layouts // HTML Layout
```

## Configuration

The LWR server is configured in `lwr.config.json`, at the root of the project. This demo is setup with three routes (admin/dashboard, about, and home "/") in a client-side routing configuration. The client routes are configured vertically in each parent module's routes module. Include the routes module inside `router/context`.



The module ``router/link`` is used in place of anchor tags for SPA navigating. Nested routes can go up to five levels deep. If you need deeper, you can edit the `src/modules/router/create/routes.js` file.

## Running the Project

```bash
yarn install
yarn start # development mode and ESM format
```

Open the site at [http://localhost:3000](http://localhost:3000)
