# Leagueify Server

The Leagueify server project contains the API and database needed for the "backend" of the Leagueify application.

The server is written in TypeScript and uses [Prisma](https://www.prisma.io/) to manage the database schema and migrations.

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
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Install Dependencies
bun install

# Run the Leagueify Server Stack
docker compose up -d
```

Open your browser to [http://localhost](http://localhost) to view the application. While the application is running, any changes made to the source code will be automatically reloaded.

## Creating a New Migration

Leagueify uses [Prisma](https://www.prisma.io/) to manage the database schema and migrations. To create a new migration, ensure the Leagueify stack is running and run the following command in a new terminal:

```bash
npx prisma migrate dev --name <migration-name>
```

This will create a new migration file in the `prisma/migrations` directory. The migration file will contain the changes to the database schema. Once the migration file is created, it can be committed to the repository. The migration-name should be descriptive of the changes being made to the database schema. The `--name` flag is optional. If not provided, Prisma will generate a random name for the migration.

**TODO:** Document the process of squashing migrations, and the affect it will have for production deployments.

## Build Docker Image

To build the Leagueify Docker image manually, run:

```bash
docker build -t leagueify-server .
```

This will build the image and all associated microservices with the tag `leagueify-server:latest`.
