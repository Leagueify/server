package handlers

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestCreateAccount(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	expectedBody := `Create Account`

	if assert.NoError(t, createAccount(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
		println(rec.Body.String())
		assert.Equal(t, expectedBody, rec.Body.String())
	}
}

func TestGetAccount(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	expectedBody := `Get Account`

	if assert.NoError(t, getAccount(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		println(rec.Body.String())
		assert.Equal(t, expectedBody, rec.Body.String())
	}
}

func TestUpdateAccount(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodPatch, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	expectedBody := `Update Account`

	if assert.NoError(t, updateAccount(c)) {
		assert.Equal(t, http.StatusAccepted, rec.Code)
		println(rec.Body.String())
		assert.Equal(t, expectedBody, rec.Body.String())
	}
}
