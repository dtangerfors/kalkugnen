-- CreateTable
CREATE TABLE "Avatar" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "skinColor" TEXT NOT NULL,
    "earSize" TEXT NOT NULL,
    "hairColor" TEXT NOT NULL,
    "hairStyle" TEXT NOT NULL,
    "eyeStyle" TEXT NOT NULL,
    "noseStyle" TEXT NOT NULL,
    "mouthStyle" TEXT NOT NULL,
    "shirtStyle" TEXT NOT NULL,
    "shirtColor" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_user_id_key" ON "Avatar"("user_id");

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
