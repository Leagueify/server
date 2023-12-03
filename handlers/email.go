package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func EmailConfigRouter(api *echo.Group) {
	email := api.Group("/email")
	email.POST("", createEmailConfig)
	email.GET("/:id", getEmailConfig)
	email.PATCH("/:id", updateEmailConfig)
}

// Email Configs
//
//	@Summary		Create email configs
//	@Description	Create email configs Description
//	@Tags			Email Configs
//	@Accept			json
//	@Produce		json
//	@Success		200
//	@Failure		400
//	@Router			/email [post]
func createEmailConfig(c echo.Context) (err error) {
	return c.String(http.StatusCreated, "Create Email Config")
}

// Email Configs
//
//	@Summary		Get email configs
//	@Description	Get email configs Description
//	@Tags			Email Configs
//	@Accept			json
//	@Produce		json
//	@Success		200
//	@Failure		400
//	@Router			/email/{emailConfigID} [get]
func getEmailConfig(c echo.Context) (err error) {
	return c.String(http.StatusOK, "Get Email Config")
}

// Email Configs
//
//	@Summary		Update email configs
//	@Description	Update email configs Description
//	@Tags			Email Configs
//	@Accept			json
//	@Produce		json
//	@Success		200
//	@Failure		400
//	@Router			/email/{emailConfigID} [patch]
func updateEmailConfig(c echo.Context) (err error) {
	return c.String(http.StatusAccepted, "Update Email Config")
}
