package handlers

import (
	"database/sql"

	_ "github.com/lib/pq"
)

var (
	connStr string = "host=leagueify-database user=leagueify password=password dbname=leagueify sslmode=disable"
)

func ConnectToDatabase() (*sql.DB, error) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}
	return db, nil
}
