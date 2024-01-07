package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type (
	CreateLeaguePayload struct {
		LeagueName string            `json:"leagueName" validate:"required" example:"Leagueify Hockey"`
		SportId    int               `json:"sportID" validate:"required" example:"1"`
		Divisions  []LeagueDivisions `json:"divisions" validate:"required"`
		Positions  []string          `json:"positions" validate:"required" example:"Skater,Goalie"`
	}

	LeagueDivisions struct {
		Name   string `json:"name" validate:"required" example:"16U"`
		Open   bool   `json:"open" validate:"required" example:"false"`
		MinAge int8   `json:"minAge" validate:"required" example:"12" minimum:"1" maximum:"127"`
		MaxAge int8   `json:"maxAge" validate:"required" example:"16" minimum:"1" maximum:"127"`
	}

	ResponseUnauthorizedLeague struct {
		Message string `json:"message" example:"Unauthorized"`
	}

	ResponseFailureLeague struct {
		Message string `json:"message" example:"Missing Required Fields"`
	}

	ResponseSuccessLeague struct {
		LeagueID string `json:"leagueID" example:"1"`
	}
)

func LeagueRouter(api *echo.Group) {
	league := api.Group("/league")
	league.POST("", createLeague)
}

// @Summary  Create League
// @Description  Create League within Leagueify.
// @Tags League
// @Accept json
// @Param request body CreateLeaguePayload true "League Details"
// @Produce  json
// @Success  200  {object}  ResponseSuccessLeague
// @Failure 400 {object} ResponseFailureLeague
// @failure 403 {object} ResponseUnauthorizedLeague
// @Router /league [post]
func createLeague(c echo.Context) (err error) {
	return c.String(http.StatusOK, "Create League")
}
