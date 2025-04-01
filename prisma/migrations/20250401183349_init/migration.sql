/*
  Warnings:

  - You are about to drop the column `USER_ADMIN_ID` on the `FT_USER` table. All the data in the column will be lost.
  - Added the required column `USER_ADMIN_EMAIL` to the `FT_USER` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FT_USER" DROP CONSTRAINT "FT_USER_USER_ADMIN_ID_fkey";

-- AlterTable
ALTER TABLE "FT_USER" DROP COLUMN "USER_ADMIN_ID",
ADD COLUMN     "USER_ADMIN_EMAIL" VARCHAR NOT NULL;

-- AddForeignKey
ALTER TABLE "FT_USER" ADD CONSTRAINT "FT_USER_USER_ADMIN_EMAIL_fkey" FOREIGN KEY ("USER_ADMIN_EMAIL") REFERENCES "FT_USER"("USER_EMAIL") ON DELETE RESTRICT ON UPDATE CASCADE;
