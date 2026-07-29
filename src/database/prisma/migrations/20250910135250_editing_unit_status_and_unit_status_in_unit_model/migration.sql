/*
  Warnings:

  - You are about to drop the column `status` on the `tb_unit_hunian` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "public"."UnitStatus" ADD VALUE 'AVAILABLE';
