-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "USN" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "passingYear" INTEGER NOT NULL,
    "activityName" TEXT NOT NULL,
    "clubName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "USN" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BOD" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "USN" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "BOD_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "president" TEXT NOT NULL,
    "techLead" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "clubId" TEXT NOT NULL,
    "viewImage" TEXT NOT NULL,
    "downloadImage" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_USN_key" ON "Student"("USN");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_USN_key" ON "Admin"("USN");

-- CreateIndex
CREATE UNIQUE INDEX "BOD_email_key" ON "BOD"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BOD_USN_key" ON "BOD"("USN");

-- AddForeignKey
ALTER TABLE "BOD" ADD CONSTRAINT "BOD_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
