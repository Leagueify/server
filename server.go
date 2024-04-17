package main

import (
	"embed"
	"fmt"

	"github.com/Leagueify/api/internal/api"
	"github.com/Leagueify/api/internal/config"
	"github.com/getsentry/sentry-go"
	sentryecho "github.com/getsentry/sentry-go/echo"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var (
	//go:embed all:internal/web
	web        embed.FS
	webAssetFS = echo.MustSubFS(web, "internal/web/assets")
	webDocsFS  = echo.MustSubFS(web, "internal/web/docs")
)

func main() {
	// Configuration
	cfg := config.LoadConfig()
	// Echo Initialization
	e := echo.New()
	// Middleware Config
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${time_rfv3339}::${remote_id}::${status}:${method}:${uri}\n",
	}))
	e.Use(middleware.Recover())
	// Sentry Initialization if Configured
	if cfg.SentryDsn != "" {
		if err := sentry.Init(sentry.ClientOptions{
			Dsn: cfg.SentryDsn,
			// Set TracesSampleRate to 1.0 to capture 100%
			// of transactions for performance monitoring.
			// We recommend adjusting this value in production.
			TracesSampleRate: 1.0,
		}); err != nil {
			fmt.Printf("Sentry initialization failed: %v\n", err)
		}
		e.Use(sentryecho.New(sentryecho.Options{
			Repanic: true,
		}))
	}
	// API Docs
	e.StaticFS("/api", webDocsFS)
	e.StaticFS("/assets", webAssetFS)
	// API Routes
	api.Routes(e)
	// Start Server
	e.Logger.Fatal(e.Start(":8888"))
}
