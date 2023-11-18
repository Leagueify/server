import * as mongoose from "mongoose";

enum Role {
  MASTER_ADMIN,
  ADMIN,
  USER,
}

export const apiDocSchema = {
  $name: "John Doe",
  $role: "USER",
  $email: "johndoe@gmail.com",
  $password: "password",
  $phone: "800-555-1234",
  $dateOfBirth: "1990-01-01",
  $coach: false,
  $volunteer: false,
  apiKey: "1234567890",
  token: "1234567890",
  expiration: 1234567890,
  isActive: true,
};

const accountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: Role, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    coach: { type: Boolean, required: true },
    volunteer: { type: Boolean, required: true },
    apiKey: { type: String, required: false, index: true, unique: true },
    token: { type: String, required: false },
    expiration: { type: Number, required: false },
    isActive: { type: Boolean, required: false, default: false },
  },
  {
    methods: {},
  },
);

export type Account = mongoose.InferSchemaType<typeof accountSchema>;
export const Account = mongoose.model("Account", accountSchema);
