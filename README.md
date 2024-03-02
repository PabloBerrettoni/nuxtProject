# NuxtProject

## Docker Setup

1. Fill the `.env` file located in `/backend`.
2. Update the base URL with the domain for the backend `nuxt.config.js`.
3. Run the following command:
    ```bash
    $ docker-compose up
    ```

## Development Setup

```bash
# Update base URL to localhost in `nuxt.config.js`
# Install dependencies
$ npm install (using Node.js 16)
# Install backend dependencies in `~/backend`
$ npm install

# Serve with hot reload at localhost:3000
$ npm run dev
# Serve backend with nodemon, listening on port 3001 (can be changed in the environment files)
$ nodemon

# Build for production and launch server
$ npm run build
$ npm run start

# Generate static project
$ npm run generate



Feel free to adjust it further to fit your preferences!

