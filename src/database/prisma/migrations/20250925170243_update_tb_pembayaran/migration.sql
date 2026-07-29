/*
  Warnings:

  - You are about to drop the column `metode_pembayaran` on the `tb_pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `status_pembayaran` on the `tb_pembayaran` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."tb_pembayaran" DROP COLUMN "metode_pembayaran",
DROP COLUMN "status_pembayaran";
