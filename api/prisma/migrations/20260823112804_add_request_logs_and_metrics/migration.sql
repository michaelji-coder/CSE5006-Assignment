-- CreateTable
CREATE TABLE "RssFeed" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "imageUrl" TEXT,
    "link" TEXT DEFAULT 'http://localhost:3000',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "RequestLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientId" TEXT NOT NULL,
    "feedId" INTEGER,
    "endpoint" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RequestLog_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "RssFeed" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
