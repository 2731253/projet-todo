-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "statut_id" INTEGER,
    "priorite_id" INTEGER,
    "date_creation" BIGINT NOT NULL DEFAULT (strftime('%s', 'now') * 1000),
    "date_limite" BIGINT,
    "assignation_id" INTEGER,
    CONSTRAINT "Todo_statut_id_fkey" FOREIGN KEY ("statut_id") REFERENCES "Statut" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Todo_priorite_id_fkey" FOREIGN KEY ("priorite_id") REFERENCES "Priorite" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Todo_assignation_id_fkey" FOREIGN KEY ("assignation_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Statut" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Priorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Statut_nom_key" ON "Statut"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Priorite_nom_key" ON "Priorite"("nom");
