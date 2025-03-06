-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'A faire',
    "priorite" TEXT,
    "date_creation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_limite" DATETIME,
    "assignation" TEXT
);
INSERT INTO "new_todo" ("assignation", "date_creation", "date_limite", "description", "id", "priorite", "statut", "titre") SELECT "assignation", "date_creation", "date_limite", "description", "id", "priorite", "statut", "titre" FROM "todo";
DROP TABLE "todo";
ALTER TABLE "new_todo" RENAME TO "todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
