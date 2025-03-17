/*
  Warnings:

  - You are about to alter the column `date_creation` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `date_limite` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "statut_id" INTEGER,
    "priorite_id" INTEGER,
    "date_creation" INTEGER NOT NULL,
    "date_limite" INTEGER,
    "assignation_id" INTEGER,
    CONSTRAINT "Todo_statut_id_fkey" FOREIGN KEY ("statut_id") REFERENCES "Statut" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Todo_priorite_id_fkey" FOREIGN KEY ("priorite_id") REFERENCES "Priorite" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Todo_assignation_id_fkey" FOREIGN KEY ("assignation_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Todo" ("assignation_id", "date_creation", "date_limite", "description", "id", "priorite_id", "statut_id", "titre") SELECT "assignation_id", "date_creation", "date_limite", "description", "id", "priorite_id", "statut_id", "titre" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
