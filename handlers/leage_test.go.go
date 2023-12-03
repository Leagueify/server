package handlers

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestCreateLeague(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	expectedBody := `Create League`

	if assert.NoError(t, createLeague(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
		println(rec.Body.String())
		assert.Equal(t, expectedBody, rec.Body.String())
	}
}

func TestGetLeague(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	expectedBody := `Get League`

	if assert.NoError(t, getLeague(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		println(rec.Body.String())
		assert.Equal(t, expectedBody, rec.Body.String())
	}
}

func TestUpdateLeague(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodPatch, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	expectedBody := `Update League`

	if assert.NoError(t, updateLeague(c)) {
		assert.Equal(t, http.StatusAccepted, rec.Code)
		println(rec.Body.String())
		assert.Equal(t, expectedBody, rec.Body.String())
	}
}
