package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func EmailRouter(api *echo.Group) {
	email := api.Group("/email")
	email.POST("", createEmailConfig)
}

func createEmailConfig(c echo.Context) error {
	return c.String(http.StatusOK, "Create Email Config")
}
