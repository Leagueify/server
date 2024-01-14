package main

import (
	"embed"
	"os"

	"github.com/Leagueify/server/handlers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var (
	// Server Settings
	port = os.Getenv("PORT")

	//go:embed all:client
	client      embed.FS
	clientDirFS = echo.MustSubFS(client, "client")
	//go:embed all:docs
	apiDocs      embed.FS
	apiDocsDirFS = echo.MustSubFS(apiDocs, "docs")
)

func main() {
	e := echo.New()

	// Midddleware Configuration
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${time_rfc3339} :: ${remote_ip} :: ${level} :: ${status}:${method}:${uri}\n",
	}))

	// Root Client Routes
	e.StaticFS("/", clientDirFS)

	// API Documentation Routes
	e.StaticFS("/api", apiDocsDirFS)

	// API Routes
	api := e.Group("/api")
	handlers.AccountRouter(api)
	handlers.EmailRouter(api)
	handlers.LeagueRouter(api)

	// Start Server
	e.Logger.Fatal(e.Start(":" + port))
}
