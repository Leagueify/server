# syntax=docker/dockerfile:1

# Download Go dependencies
FROM golang:1.22.0-alpine3.19 as server-base
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

# Build Leagueify-API executable
FROM golang:1.22.0-alpine3.19 as server-builder
COPY --from=server-base-dev /go/bin /go/bin
COPY --from=server-base /go/pkg /go/pkg
WORKDIR /app
COPY . ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /leagueify-api .

# Create production image
FROM gcr.io/distroless/base-debian11 AS release
COPY --from=server-builder /leagueify-api /leagueify-api
EXPOSE 8000
ENTRYPOINT ["/leagueify-api"]
