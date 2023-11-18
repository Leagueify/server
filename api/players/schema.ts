// model Player {
//   id            Int       @id @default(autoincrement())
//   name          String    @db.VarChar(32)
//   dateOfBirth   BigInt
//   yearsPlayed   Int
//   positionRel   Position  @relation(fields: [position], references: [id])
//   position      Int
//   divisionRel   Division  @relation(fields: [division], references: [id])
//   division      Int
//   signedWaiver  Boolean   @default(false)
//   isRegistered  Boolean   @default(false)
//   parentRel     User      @relation(fields: [parent], references: [id])
//   parent        Int
//   leagueRel     League    @relation(fields: [league], references: [id])
//   league        Int
//   rosterRel     Roster?   @relation(fields: [roster], references: [id])
//   roster        Int?
// }
