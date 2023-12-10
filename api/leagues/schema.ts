import * as mongoose from "mongoose";

enum Sport {
  BASEBALL = "Baseball",
  BASKETBALL = "Basketball",
  FIELD_HOCKEY = "Field Hockey",
  FOOTBALL = "Football",
  HOCKEY = "Hockey",
  LACROSSE = "Lacrosse",
  QUIDDITCH = "Quidditch",
  RUGBY = "Rugby",
  SOCCER = "Soccer",
  SOFTBALL = "Softball",
  VOLLEYBALL = "Volleyball",
}

export const leaguesSchema = {
  $leagueName: "Leagueify Sports League",
  $sport: Sport.HOCKEY,
  $divisions: [
    {
      name: "8U",
      open: false,
      minAge: 5,
      maxAge: 8,
    },
    {
      name: "10U",
      open: false,
      minAge: 7,
      maxAge: 10,
    },
  ],
  $positions: ["Skater", "Goalie"],
};

const leagueSchema = new mongoose.Schema({
  leagueName: {
    type: String,
    required: [true, "Missing required field: leagueName"],
  },
  sport: {
    type: String,
    enum: {
      values: Object.values(Sport),
      message: "Please select a supported sport",
    },
    required: [true, "Missing required field: sport"],
  },
  divisions: {
    type: [mongoose.Schema.Types.Array],
    required: [true, "Missing required field: divisions"],
    validate: [
      {
        validator: (divisions: any[]) => {
          return divisions.length > 0;
        },
        message: "Missing required field: divisions",
      },
    ],
  },
  positions: {
    type: [mongoose.Schema.Types.Array],
    required: [true, "Missing required field: positions"],
    validate: [
      {
        validator: (positions: any[]) => {
          return positions.length > 0;
        },
        message: "Missing required field: positions",
      },
    ],
  },
});

export type League = mongoose.InferSchemaType<typeof leagueSchema>;
export const League = mongoose.model("League", leagueSchema);
