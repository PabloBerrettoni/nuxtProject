# nuxtProject

## Docker Setup

1) Fill the .env file located in /backend
2) 
```bash
$ docker-compose up
```

## Dev Setup

```bash
# install dependencies
$ npm install (using node 16)
# install backend dependencies in ~/backend
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
# serve backend with nodemon, listens in port 3001 (can change that in the enviroment files)
$ nodemon

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).
