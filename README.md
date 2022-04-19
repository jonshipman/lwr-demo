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

The LWR server is configured in `lwr.config.json`, at the root of the project. This demo is setup with two routes (about and home "/") in a client-side routing configuration. The client routes are configured in src/modules/app/routes. The module ``app/routerLink`` is used in place of anchor tags for SPA navigating. For nested routes, point the module in app/routes to a secondary router (to create items such as about/history, about/staff, and so on). Nested route parents need "exact" set to false.

## Running the Project

```bash
yarn install
yarn start # development mode and ESM format
```

Open the site at [http://localhost:3000](http://localhost:3000)
