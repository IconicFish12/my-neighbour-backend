/*
  Warnings:

  - You are about to drop the column `status` on the `tb_unit_hunian` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."tb_unit_hunian" DROP COLUMN "status",
ADD COLUMN     "status_unit" "public"."UnitStatus" NOT NULL DEFAULT 'AVAILABLE';
