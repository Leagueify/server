import * as mongoose from "mongoose";

export const apiDocSchema = {
  $outboundEmail: "noreply@leagueify.org",
  $smtpHost: "smtp.gmail.com",
  $smtpPort: 465,
  $smtpUser: "SMTPUser",
  $smtpPass: "SMTPPass",
  enabled: false,
};

const emailConfigSchema = new mongoose.Schema(
  {
    outboundEmail: { type: String, required: true },
    smtpHost: { type: String, required: true },
    smtpPort: { type: Number, required: true },
    smtpUser: { type: String, required: true },
    smtpPass: { type: String, required: true },
    enabled: { type: Boolean, required: false, default: false },
    // league: { type: mongoose.Schema.Types.ObjectId, ref: "League" },
  },
  {
    methods: {
      isEnabled() {
        console.log(this.outboundEmail);
      },
    },
  },
);

export type EmailConfig = mongoose.InferSchemaType<typeof emailConfigSchema>;
export const EmailConfig = mongoose.model("EmailConfig", emailConfigSchema);
