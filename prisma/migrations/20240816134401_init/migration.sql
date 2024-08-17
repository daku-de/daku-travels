-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "map" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "country" JSONB NOT NULL,
    "activities" JSONB NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Travel" (
    "id" TEXT NOT NULL,
    "destination" JSONB NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResidencePeriod" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" JSONB NOT NULL,
    "startYear" INTEGER NOT NULL,
    "startMonth" INTEGER NOT NULL,
    "endYear" INTEGER,
    "endMonth" INTEGER,

    CONSTRAINT "ResidencePeriod_pkey" PRIMARY KEY ("id")
);
