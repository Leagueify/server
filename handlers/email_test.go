package handlers

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestCreateEmail(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	expectedBody := `Create Email Config`

	if assert.NoError(t, createEmailConfig(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
		println(rec.Body.String())
		assert.Equal(t, expectedBody, rec.Body.String())
	}
}

func TestGetEmail(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	expectedBody := `Get Email Config`

	if assert.NoError(t, getEmailConfig(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		println(rec.Body.String())
		assert.Equal(t, expectedBody, rec.Body.String())
	}
}

func TestUpdateEmail(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodPatch, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	expectedBody := `Update Email Config`

	if assert.NoError(t, updateEmailConfig(c)) {
		assert.Equal(t, http.StatusAccepted, rec.Code)
		println(rec.Body.String())
		assert.Equal(t, expectedBody, rec.Body.String())
	}
}
