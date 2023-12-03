package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func LeagueRouter(api *echo.Group) {
	leagues := api.Group("/leagues")
	leagues.POST("", createLeague)
	leagues.GET("/:id", getLeague)
	leagues.PATCH("/:id", updateLeague)
}

// League
//
//	@Summary		Create league
//	@Description	Create league Description
//	@Tags			League
//	@Accept			json
//	@Produce		json
//	@Success		200
//	@Failure		400
//	@Router			/leagues [post]
func createLeague(c echo.Context) (err error) {
	return c.String(http.StatusCreated, "Create League")
}

// League
//
//	@Summary		Get league
//	@Description	Get league Description
//	@Tags			League
//	@Accept			json
//	@Produce		json
//	@Success		200
//	@Failure		400
//	@Router			/leagues/{leagueID} [get]
func getLeague(c echo.Context) (err error) {
	return c.String(http.StatusOK, "Get League")
}

// League
//
//	@Summary		Update league
//	@Description	Update league Description
//	@Tags			League
//	@Accept			json
//	@Produce		json
//	@Success		200
//	@Failure		400
//	@Router			/leagues/{leagueID} [patch]
func updateLeague(c echo.Context) (err error) {
	return c.String(http.StatusAccepted, "Update League")
}
