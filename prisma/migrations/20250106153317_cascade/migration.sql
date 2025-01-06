-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credentials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "password" TEXT,
    "salt" TEXT,
    CONSTRAINT "Credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Credentials" ("id", "password", "salt", "userId") SELECT "id", "password", "salt", "userId" FROM "Credentials";
DROP TABLE "Credentials";
ALTER TABLE "new_Credentials" RENAME TO "Credentials";
CREATE UNIQUE INDEX "Credentials_id_key" ON "Credentials"("id");
CREATE UNIQUE INDEX "Credentials_userId_key" ON "Credentials"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
