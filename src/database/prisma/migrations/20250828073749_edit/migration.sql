/*
  Warnings:

  - Added the required column `harga_jual` to the `tb_unit_hunian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tb_unit_hunian" ADD COLUMN     "harga_jual" DOUBLE PRECISION NOT NULL;
