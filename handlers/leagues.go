package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type (
	CreateLeaguePayload struct {
		LeagueName string            `json:"leagueName"`
		SportId    int               `json:"sportID"`
		Divisions  []LeagueDivisions `json:"divisions"`
		Positions  []string          `json:"positions"`
	}

	LeagueDivisions struct {
		Name   string `json:"name"`
		Open   bool   `json:"open"`
		MinAge int8   `json:"minAge"`
		MaxAge int8   `json:"maxAge"`
	}

	ResponseUnauthorizedLeague struct {
		Message string `json:"message"`
	}

	ResponseFailureLeague struct {
		Message string `json:"message"`
	}

	ResponseSuccessLeague struct {
		LeagueID string `json:"leagueID"`
	}
)

func LeagueRouter(api *echo.Group) {
	league := api.Group("/league")
	league.POST("", createLeague)
}

func createLeague(c echo.Context) (err error) {
	return c.String(http.StatusOK, "Create League")
}
