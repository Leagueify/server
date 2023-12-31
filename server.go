package main

import (
	"embed"

	"github.com/Leagueify/server/handlers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// @title Leagueify API Documentation
// @version 0.0.1
// @description This is test server for Leagueify.
//
// @contact.name  Leagueify Support
// @contact.url https://leagueify.org/support
// @contact.email support@leagueify.org
//
// @license.name  MIT
// @license.url https://github.com/Leagueify/server/blob/main/LICENSE
//
// @host  localhost:8000
// @BasePath  /api
// @schemes http

var (
	//go:embed all:client
	client      embed.FS
	clientDirFS = echo.MustSubFS(client, "client")
	//go:embed all:docs
	docs      embed.FS
	docsDirFS = echo.MustSubFS(docs, "docs")
)

func main() {
	e := echo.New()

	// Midddleware Configuration
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${time_rfc3339} :: ${remote_ip} :: ${level} :: ${status}:${method}:${uri}\n",
	}))

	// Root Client Routes
	e.StaticFS("/", clientDirFS)
	//e.GET("/", clientRoutes)

	// API Documentation Routes
	e.StaticFS("/api/", docsDirFS)

	// API Routes
	api := e.Group("/api")
	handlers.AccountRouter(api)
	handlers.EmailRouter(api)
	handlers.LeagueRouter(api)

	// Start Server
	e.Logger.Fatal(e.Start(":8000"))
}
