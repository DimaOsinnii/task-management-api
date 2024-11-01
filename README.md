## Setup
Install [Node.js](https://nodejs.org) 18.x.x or higher.

Install [Docker](https://www.docker.com/products/docker-desktop/)

Create `.env` file, see `.env.example`


``` bash
 # Install deps
 pnpm install
 # Create docker container for postgres
 make docker-up
 # Run app in dev env
 pnpm dev
```

Go to - [Localhost](http://localhost:8000/docs)

