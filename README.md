# Leagueify Server

The Leagueify server project contains core infrastructure (API, database, etc.) for the "backend" of all Leagueify applications.

The server is written in TypeScript and uses [Mongoose](https://mongoosejs.com/) with [MongoDB](https://www.mongodb.com/) to manage the database schema.

- [Running the Leagueify Server](#running-the-leagueify-server)
- [Local Development](#local-development)
- [Creating a New Migration](#creating-a-new-migration)
- [Build Docker Image](#build-docker-image)

## Running the Leagueify Server

To run Leagueify [Docker](https://www.docker.com/) is required to be installed and running on the host machine. Using the example [Docker Compose](docker-compose.yml) file within this repository, the following command will start the Leagueify application:

```bash
docker compose up -d
```

## Local Development

This project was created using [bun](https://bun.sh), which is a fast all-in-one JavaScript runtime.

Once the Leagueify Server repository is cloned, prepare the local environment by following these steps:

```bash
# Rename template environment file
cp template.env .env

# Install Bun
curl -fsSL https://bun.sh/install | bash

# Install Dependencies
bun install

# Run the Leagueify Server Stack
docker compose up -d
```

Open your browser to [http://localhost](http://localhost) to view the application. While the application is running, any changes made to the source code will be automatically reloaded.

## Build Docker Image

To build the Leagueify Docker image manually, run:

```bash
docker build -t leagueify-server .
```

This will build the image and all associated microservices with the tag `leagueify-server:latest`.
