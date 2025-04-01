/*
  Warnings:

  - You are about to drop the column `FTRE_ID` on the `FT_LOG_FEATURE` table. All the data in the column will be lost.
  - You are about to drop the column `USER_ID` on the `FT_LOG_FEATURE` table. All the data in the column will be lost.
  - You are about to drop the column `USER_ID` on the `FT_LOG_USER` table. All the data in the column will be lost.
  - Added the required column `LOGF_EXECUTED_BY` to the `FT_LOG_FEATURE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOGF_FEATURE_ID` to the `FT_LOG_FEATURE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOGF_FEATURE_NAME` to the `FT_LOG_FEATURE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOGF_FEATURE_PROFILE` to the `FT_LOG_FEATURE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LOGU_EXECUTED_BY` to the `FT_LOG_USER` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FT_LOG_FEATURE" DROP CONSTRAINT "FT_LOG_FEATURE_FTRE_ID_fkey";

-- DropForeignKey
ALTER TABLE "FT_LOG_FEATURE" DROP CONSTRAINT "FT_LOG_FEATURE_USER_ID_fkey";

-- DropForeignKey
ALTER TABLE "FT_LOG_USER" DROP CONSTRAINT "FT_LOG_USER_USER_ID_fkey";

-- AlterTable
ALTER TABLE "FT_LOG_FEATURE" DROP COLUMN "FTRE_ID",
DROP COLUMN "USER_ID",
ADD COLUMN     "LOGF_EXECUTED_BY" VARCHAR NOT NULL,
ADD COLUMN     "LOGF_FEATURE_ID" INTEGER NOT NULL,
ADD COLUMN     "LOGF_FEATURE_NAME" VARCHAR NOT NULL,
ADD COLUMN     "LOGF_FEATURE_PROFILE" "ENUM_PROFILE" NOT NULL;

-- AlterTable
ALTER TABLE "FT_LOG_USER" DROP COLUMN "USER_ID",
ADD COLUMN     "LOGU_EXECUTED_BY" VARCHAR NOT NULL;
