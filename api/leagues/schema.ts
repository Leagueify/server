// model League {
//   id              Int           @id @default(autoincrement())
//   name            String        @db.VarChar(64)
//   domain          String        @db.VarChar(255) @unique
//   sportRel        Sport         @relation(fields: [sport], references: [id])
//   sport           Int
//   emailConfigRel  EmailConfig?  @relation(fields: [emailConfig], references: [id])
//   emailConfig     Int?          @unique
//   divisions       Division[]
//   positions       Position[]
//   players         Player[]
//   isActive        Boolean       @default(false)
// }
