package main

import (
	"embed"
	"os"

	"github.com/Leagueify/server/internal/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var (
	// Server Settings
	port = os.Getenv("PORT")

	//go:embed all:api
	api      embed.FS
	apiDirFS = echo.MustSubFS(api, "api")
	//go:embed all:web
	web      embed.FS
	webDirFS = echo.MustSubFS(web, "web")
)

func main() {
	e := echo.New()

	// Midddleware Configuration
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${time_rfc3339} :: ${remote_ip} :: ${level} :: ${status}:${method}:${uri}\n",
	}))

	// Root Client Routes
	e.StaticFS("/", webDirFS)

	// API Documentation Routes
	e.StaticFS("/api", apiDirFS)

	// API Routes
	api := e.Group("/api")
	routes.AccountRouter(api)
	routes.EmailRouter(api)
	routes.LeagueRouter(api)

	// Start Server
	e.Logger.Fatal(e.Start(":" + port))
}
