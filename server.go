package main

import (
	"embed"
	"os"

	"github.com/Leagueify/server/handlers"
	"github.com/Leagueify/server/routes"
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

	db, err := handlers.ConnectToDatabase()
	if err != nil {
		e.Logger.Fatal(err)
	}
	defer db.Close()
	_, err = db.Exec(`
  CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL
  )
  `)

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
	routes.AccountRouter(api)
	routes.EmailRouter(api)
	routes.LeagueRouter(api)

	// Start Server
	e.Logger.Fatal(e.Start(":" + port))
}
