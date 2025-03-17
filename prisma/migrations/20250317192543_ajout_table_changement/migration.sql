-- CreateTable
CREATE TABLE "Changement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_creation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changement" TEXT NOT NULL,
    "par_user_id" INTEGER NOT NULL,
    "todo_id" INTEGER NOT NULL,
    CONSTRAINT "Changement_par_user_id_fkey" FOREIGN KEY ("par_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Changement_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "Todo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
