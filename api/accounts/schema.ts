import * as mongoose from "mongoose";

enum Role {
  MASTER_ADMIN = "MASTER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export const accountLoginAPIDocSchema = {
  $email: "test+account@leagueify.org",
  $password: "Test123!",
};

export const accountsSchema = {
  $firstName: "John",
  $lastName: "Doe",
  $email: "test+account@leagueify.org",
  $password: "Test123!",
  $phone: "800-555-1234",
  $dateOfBirth: "1990-01-01",
  leagueID: "5f9b1b9b9b9b9b9b9b9b9b9b",
  role: Role.USER,
  coach: false,
  volunteer: false,
};

const accountSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "missing required field: firstName"],
    },
    lastName: {
      type: String,
      required: [true, "missing required field: lastName"],
    },
    email: {
      type: String,
      required: [true, "missing required field: email"],
      index: true,
      validate: [
        {
          validator: (v: string) => {
            return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v);
          },
          message: (props: any) => `${props.value} is not a valid email address`,
        },
        {
          validator: async (v: string, leagueId: string) => {
            const account = await Account.findOne({ league: leagueId, email: v });
            if (account) {
              return false;
            } else {
              return true;
            }
          },
          message: (props: any) => `An account with that email already exists`,
        },
      ],
    },
    password: {
      type: String,
      required: [true, "missing required field: password"],
    },
    phone: {
      type: String,
      required: [true, "missing required field: phone"],
      validate: {
        validator: (v: string) => {
          return /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i.test(v);
        },
        message: (props: any) => `${props.value} is not a valid phone number`,
      },
    },
    dateOfBirth: {
      type: String,
      required: [true, "missing required field: dateOfBirth"],
    },
    leagues: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      default: [],
    },
    coach: {
      type: Boolean,
      required: false,
      default: false,
    },
    volunteer: {
      type: Boolean,
      required: false,
      default: false,
    },
    role: {
      type: String,
      enum: Role,
      required: true,
      default: Role.USER,
    },
    token: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    methods: {},
  },
);

export type Account = mongoose.InferSchemaType<typeof accountSchema>;
export const Account = mongoose.model("Account", accountSchema);
