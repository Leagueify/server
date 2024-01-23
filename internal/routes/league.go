package routes

import (
	"fmt"
	"net/http"

	"github.com/Leagueify/server/internal/handlers"
	"github.com/labstack/echo/v4"
)

type (
	League struct {
		Name      string      `json:"name" validate:"required,min=2,max=32"`
		Positions []string    `json:"positions" validate:"required,min=1,max=32"`
		Divisions []Divisions `json:"divisions" validate:"required,min=1,max=32"`
		SportID   int8        `json:"sportID" validate:"required,number,min=1,max=255"`
	}

	Divisions struct {
		Name   string `json:"name"`
		MinAge int8   `json:"minAge" validate:"required_unless=Open true,min=1,max=127"`
		MaxAge int8   `json:"maxAge" validate:"required_unless=Open true,min=1,max=127"`
		Open   bool   `json:"open"`
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

func init() {
	db, err := handlers.ConnectToDatabase()
	if err != nil {
		fmt.Print(err)
	}
	defer db.Close()
	_, err = db.Exec(`
  CREATE TABLE IF NOT EXISTS leagues (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    sport_id SMALLINT NOT NULL,
    divisions TEXT[] NOT NULL,
    positions TEXT[] NOT NULL
  );
  CREATE TABLE IF NOT EXISTS divisions (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    open BOOLEAN NOT NULL,
    min_age SMALLINT NOT NULL,
    max_age SMALLINT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS positions (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL
  );
  `)
	if err != nil {
		fmt.Print(err)
	}
}

func LeagueRouter(api *echo.Group) {
	league := api.Group("/league")
	league.POST("", handlers.AuthRequired(createLeague))
}

func createLeague(c echo.Context) error {
	league := League{}

	// Parse Body
	if err = handlers.ParseBody(c, &league); err != nil {
		return c.JSONPretty(http.StatusBadRequest, err, "  ")
	}

	// TODO: Generate Divisions and Positions

	// Send to Database
	db, err := handlers.ConnectToDatabase()
	if err != nil {
		return c.JSONPretty(http.StatusInternalServerError, err, "  ")
	}
	defer db.Close()
	var leagueID int
	err = db.QueryRow(
		`
    INSERT INTO leagues (
      id, name, sport_id, divisions, positions
    )
    VALUES (DEFAULT, $1, $2, $3, $4)
    RETURNING id
    `,
		league.Name,
		league.SportID,
		"{}",
		"{1,2,3}",
	).Scan(&leagueID)
	if err != nil {
		return c.JSONPretty(http.StatusBadRequest, err, "  ")
	}

	return c.JSONPretty(http.StatusOK, league, "  ")
}
