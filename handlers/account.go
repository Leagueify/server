package handlers

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
)

type (
	CreateAccountPayload struct {
		Email       string `json:"email"`
		Password    string `json:"password"`
		DateOfBirth string `json:"dateOfBirth"`
		FirstName   string `json:"firstName"`
		LastName    string `json:"lastName"`
		Phone       string `json:"phone"`
	}

	ResponseFailureAccount struct {
		Message string `json:"message"`
	}

	ResponseSuccessAccount struct {
		Token string `json:"token"`
	}
)

func AccountRouter(api *echo.Group) {
	account := api.Group("/account")
	account.POST("", createAccount)
}

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
