# Leagueify API

Leagueify is an open source platform for managing sporting leagues of any size.

This server is written in [Go][go-website] using the [Echo][echo-website] framework.

## Local Development

Leagueify API uses easy to use Makefile commands to get up and running quickly. Currently, Leagueify API requires Go 1.22.0 in order to run, please install Go before proceeding with the following commands:

``` bash
# Install Dependencies
make init

# Run Leagueify Locally
make dev-start

# Stop Leagueify and Remove Docker Image
make dev-clean
```

## Contribution Requirements

Leagueify API makes use of automated checks to verify code quality. To ensure code quality, please run the following commands before creating a PR:

```bash
# Vet Code for Errors
make vet

# Format Code 
make format

# Clean Go Dependencies
make clean
```

[go-website]: https://go.dev
[echo-website]: https://echo.labstack.com
