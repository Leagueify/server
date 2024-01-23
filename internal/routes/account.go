package routes

import (
	"fmt"
	"net/http"

	"github.com/Leagueify/server/internal/handlers"
	"github.com/labstack/echo/v4"
)

type (
	Account struct {
		Email       string `json:"email" validate:"required,email"`
		Password    string `json:"password" validate:"required,min=8,max=64"` // TODO: Validate Better
		DateOfBirth string `json:"dateOfBirth" validate:"required"`           // TODO: Validate Better
		FirstName   string `json:"firstName" validate:"required,min=2,max=32"`
		LastName    string `json:"lastName" validate:"required,min=2,max=32"`
		Phone       string `json:"phone" validate:"required,e164"`
	}

	ResponseFailureAccount struct {
		Message string `json:"message"`
	}

	ResponseSuccessAccount struct {
		Token string `json:"token"`
	}
)

var err map[string]string

func init() {
	db, err := handlers.ConnectToDatabase()
	if err != nil {
		fmt.Print(err)
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
	if err != nil {
		fmt.Print(err)
	}
}

func AccountRouter(api *echo.Group) {
	account := api.Group("/account")
	account.POST("", createAccount)
}

func createAccount(c echo.Context) error {
	account := Account{}

	// Parse Body
	err = handlers.ParseBody(c, &account)
	if err != nil {
		return c.JSONPretty(http.StatusBadRequest, err, "  ")
	}

	// Hash Password
	hashedPassword, err := handlers.HashPassword(account.Password)
	if err != nil {
		return c.JSONPretty(http.StatusBadRequest, err, "  ")
	}

	// Send to Database
	db, err := handlers.ConnectToDatabase()
	if err != nil {
		return c.JSONPretty(http.StatusInternalServerError, err, "  ")
	}
	defer db.Close()
	var accountID int
	err = db.QueryRow(
		`
    INSERT INTO accounts (
      id, email, password, date_of_birth, first_name, last_name, phone
    )
    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)
    RETURNING id
    `,
		account.Email,
		hashedPassword,
		account.DateOfBirth,
		account.FirstName,
		account.LastName,
		account.Phone,
	).Scan(&accountID)
	if err != nil {
		return c.JSONPretty(http.StatusBadRequest, err, "  ")
	}

	// Generate JWT
	userToken, err := handlers.GenerateJWT(accountID)
	if err != nil {
		errMsg := map[string]string{
			"message": "Invalid Request",
		}
		return c.JSONPretty(http.StatusBadRequest, errMsg, "  ")
	}

	token := ResponseSuccessAccount{
		Token: userToken,
	}
	return c.JSONPretty(http.StatusCreated, token, "  ")
}
