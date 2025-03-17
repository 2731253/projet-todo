-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Changement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_creation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changement" TEXT NOT NULL,
    "par_user_id" INTEGER NOT NULL,
    "todo_id" INTEGER,
    CONSTRAINT "Changement_par_user_id_fkey" FOREIGN KEY ("par_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Changement_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "Todo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Changement" ("changement", "date_creation", "id", "par_user_id", "todo_id") SELECT "changement", "date_creation", "id", "par_user_id", "todo_id" FROM "Changement";
DROP TABLE "Changement";
ALTER TABLE "new_Changement" RENAME TO "Changement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
