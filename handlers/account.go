package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func AccountRouter(api *echo.Group) {
	accounts := api.Group("/accounts")
	accounts.POST("", createAccount)
	accounts.GET("/:id", getAccount)
	accounts.PATCH("/:id", updateAccount)
}

// Accounts
//
//	@Summary		Create accounts
//	@Description	Create accounts Description
//	@Tags			Accounts
//	@Accept			json
//	@Produce		json
//	@Success		200
//	@Failure		400
//	@Router			/accounts [post]
func createAccount(c echo.Context) (err error) {
	return c.String(http.StatusCreated, "Create Account")
}

// Accounts
//
//	@Summary		Get accounts
//	@Description	Get accounts Description
//	@Tags			Accounts
//	@Accept			json
//	@Produce		json
//	@Success		200
//	@Failure		400
//	@Router			/accounts/{accountID}  [get]
//	@Param			accountID	path	string	true	"accountID"
func getAccount(c echo.Context) (err error) {
	return c.String(http.StatusOK, "Get Account")
}

// Accounts
//
//	@Summary		Update accounts
//	@Description	Update accounts Description
//	@Tags			Accounts
//	@Accept			json
//	@Produce		json
//	@Success		200
//	@Failure		400
//	@Router			/accounts/{accountID}  [patch]
//	@Param			accountID	path	string	true	"accountID"
func updateAccount(c echo.Context) (err error) {
	return c.String(http.StatusAccepted, "Update Account")
}
