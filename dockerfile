# syntax=docker/dockerfile:1

# Download Go dependencies
FROM golang:1.21.5-alpine3.19 as server-base
WORKDIR /app
COPY go.mod ./
RUN go mod download

# Build Leagueify executable
FROM golang:1.21.5-alpine3.19 as server-build
COPY --from=server-base /go/pkg /go/pkg
WORKDIR /app
COPY . ./
RUN go install github.com/swaggo/swag/cmd/swag@latest
RUN swag init -g server.go --outputTypes json
RUN CGO_ENABLED=0 GOOS=linux go build -o /leagueify .

# Create production image
FROM gcr.io/distroless/base-debian11 AS release
COPY --from=server-build /leagueify /leagueify
COPY --from=server-build /app/docs ./docs
EXPOSE 8000
ENTRYPOINT ["/leagueify"]
