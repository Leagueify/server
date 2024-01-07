# syntax=docker/dockerfile:1

# Specify docker image
FROM golang:1.21.5-alpine3.19 as server-build

# Set Work Directory, copy go mod, and download dependencies
WORKDIR /app
COPY go.mod ./
RUN go mod download

# Copy necessary files
COPY * ./

# Install Swaggo and Generate Swagger Schema
RUN go install github.com/swaggo/swag/cmd/swag@latest
RUN swag init -g server.go --outputTypes json

# Build go executable
RUN go build -o /leagueify

# Create production image
FROM gcr.io/distroless/base-debian11 AS release
COPY --from=server-build /leagueify /leagueify
EXPOSE 8000
ENTRYPOINT ["/leagueify"]
