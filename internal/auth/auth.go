package auth

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

var (
	key []byte
	t   *jwt.Token
	s   string
)

func AuthRequired(handler echo.HandlerFunc) echo.HandlerFunc {
	return handler
}

func GenerateJWT(accountID int) (string, error) {
	key := "JWT"
	t = jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"acc": accountID,
	})
	s, err := t.SignedString([]byte(key))
	if err != nil {
		return "", err
	}
	return s, nil
}

func HashPassword(providedPassword string) (string, error) {
	password := []byte(providedPassword)
	hashedPassword, err := bcrypt.GenerateFromPassword(password, 12)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}
