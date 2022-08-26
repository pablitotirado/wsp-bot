-- CreateTable
CREATE TABLE "Gastos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "concept" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "category" TEXT NOT NULL
);
