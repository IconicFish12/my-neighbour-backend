/*
  Warnings:

  - Added the required column `kategori_kerusakan` to the `tb_keluhan_penghuni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tb_keluhan_penghuni" ADD COLUMN     "kategori_kerusakan" "public"."MaintenancePriority" NOT NULL;
