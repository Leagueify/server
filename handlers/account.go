package handlers

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
)

type (
	CreateAccountPayload struct {
		Email       string `json:"email" validate:"required" example:"john.doe@leagueify.org"`
		Password    string `json:"password" validate:"required" example:"Testu123!"`
		DateOfBirth string `json:"dateOfBirth" validate:"required" example:"1990-01-01"`
		FirstName   string `json:"firstName" validate:"required" example:"John"`
		LastName    string `json:"lastName" validate:"required" example:"Doe"`
		Phone       string `json:"phone" validate:"required" example:"+12085550123"`
	}

	ResponseFailureAccount struct {
		Message string `json:"message" example:"Missing Required Fields"`
	}

	ResponseSuccessAccount struct {
		Token string `json:"token" example:"header.payload.signature"`
	}
)

func AccountRouter(api *echo.Group) {
	account := api.Group("/account")
	account.POST("", createAccount)
}

// @Summary  Create Account
// @Description  Create an account in Leagueify.
// @Tags Account
// @Accept json
// @Param request body CreateAccountPayload true "Account information"
// @Produce  json
// @Success  200  {object}  ResponseSuccessAccount
// @Failure 400 {object} ResponseFailureAccount
// @Router /account [post]
func createAccount(c echo.Context) error {
	account := CreateAccountPayload{}
	// Ready Request Body
	defer c.Request().Body.Close()
	body, err := io.ReadAll(c.Request().Body)
	if err != nil {
		errMsg := map[string]string{
			"message": "Invalid Request",
		}
		return c.JSONPretty(http.StatusBadRequest, errMsg, "  ")
	}
	// Unmarshal Body
	err = json.Unmarshal(body, &account)
	if err != nil {
		errMsg := map[string]string{
			"message": "Invalid Request",
		}
		return c.JSONPretty(http.StatusBadRequest, errMsg, "  ")
	}
	// Echo Response Now
	return c.JSONPretty(http.StatusCreated, account, "  ")
}
