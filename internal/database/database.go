package database

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

var connStr string = fmt.Sprintf(
	"host=leagueify-database user=%s password=%s dbname=leagueify sslmode=disable",
	os.Getenv("DATABASE_USER"),
	os.Getenv("DATABASE_PASS"),
)

func Connect() (*sql.DB, error) {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}
	return db, nil
}
