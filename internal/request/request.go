package request

import (
	"encoding/json"
	"io"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type (
	CustomValidator struct {
		validator *validator.Validate
	}
)

func ParseBody(c echo.Context, router interface{}) map[string]string {
	defer c.Request().Body.Close()
	body, err := io.ReadAll(c.Request().Body)
	if err != nil {
		errMsg := map[string]string{
			"message": "Invalid Request",
		}
		return errMsg
	}
	// Unmarshal Body
	err = json.Unmarshal(body, &router)
	if err != nil {
		errMsg := map[string]string{
			"message": "Invalid JSON Payload",
		}
		return errMsg
	}
	// Validate Body
	c.Echo().Validator = &CustomValidator{validator: validator.New()}
	err = c.Validate(router)
	// TODO: Better error messaging
	if err != nil {
		errMsg := map[string]string{
			"message": err.Error(),
		}
		return errMsg
	}
	// Return nil if no errors
	return nil
}

func (cv *CustomValidator) Validate(i interface{}) error {
	if err := cv.validator.Struct(i); err != nil {
		return echo.NewHTTPError(400, err.Error())
	}
	return nil
}
