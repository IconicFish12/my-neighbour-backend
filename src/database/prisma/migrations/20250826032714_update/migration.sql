/*
  Warnings:

  - You are about to drop the column `requestDate` on the `tb_permintaan_pemeliharaan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."tb_permintaan_pemeliharaan" DROP COLUMN "requestDate",
ADD COLUMN     "tanggal_permintaan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "prioritas_permintaan" DROP NOT NULL;
