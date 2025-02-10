-- CreateTable
CREATE TABLE "Family" (
    "id" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppUser" ADD CONSTRAINT "AppUser_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "Family"("id") ON DELETE SET NULL ON UPDATE CASCADE;
