package main

import (
	"net/http"

	"github.com/Leagueify/server/handlers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

//	@title			Leagueify API Documentation
//	@version		0.0.1
//	@description	This is a sample server server.

//	@contact.name	Leagueify Support
//	@contact.url	https://leagueify.org/support
//	@contact.email	support@leagueify.org

//	@license.name	MIT
//	@license.url	https://github.com/Leagueify/server/blob/main/LICENSE

// @host		localhost:3000
// @BasePath	/api
// @schemes	http
func main() {
	e := echo.New()
	e.Static("/", "docs")
	// Middleware
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${time_rfc3339} :: ${remote_ip} :: ${level} :: ${status}:${method}:${uri}\n",
	}))
	// Root Level Routes
	e.GET("/", rootRoutes)

	// Routes
	api := e.Group("/api")
	handlers.AccountRouter(api)
	handlers.EmailConfigRouter(api)
	handlers.LeagueRouter(api)

	// Start server
	e.Logger.Fatal(e.Start(":3000"))
}

func rootRoutes(c echo.Context) error {
	return c.HTML(http.StatusOK, `
    <!doctype html>
    <html lang='en'>
      <head>
        <meta charset='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <title>Leagueify API Documentation</title>
        <meta
          name='description'
          content='Leagueify API Documentation' />
        <link
          rel='icon
          href='Leagueify Logo.svg' />
        <script src='https://unpkg.com/@stoplight/elements/web-components.min.js'></script>
        <link
          rel='stylesheet'
          href='https://unpkg.com/@stoplight/elements/styles.min.css' />
      </head>

      <body style='height: 100vh'>
        <elements-api
          apiDescriptionUrl='http://localhost:3000/swagger.json'
          router='hash'
          layout='sidebar'
          hideExport='true'
          hideSchemas='true' />
      </body>
    </html>
  `)
}
