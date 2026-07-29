/*
  Warnings:

  - You are about to drop the column `resident_id` on the `tb_keluhan_penghuni` table. All the data in the column will be lost.
  - The primary key for the `tb_pegawai` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employee_id` on the `tb_pegawai` table. All the data in the column will be lost.
  - You are about to drop the column `bill_id` on the `tb_pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `tb_pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `resident_id` on the `tb_pembayaran` table. All the data in the column will be lost.
  - The primary key for the `tb_penghuni` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resident_id` on the `tb_penghuni` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `tb_pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `konten_pengumuman` on the `tb_pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `resident_id` on the `tb_perjanjian_sewa` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `tb_permintaan_pemeliharaan` table. All the data in the column will be lost.
  - You are about to drop the column `resident_id` on the `tb_permintaan_pemeliharaan` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `tb_tagihan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pegawai_id]` on the table `tb_pegawai` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `tb_pengguna` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[penghuni_id]` on the table `tb_penghuni` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[penghuni_id]` on the table `tb_perjanjian_sewa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `penghuni_id` to the `tb_keluhan_penghuni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pegawai_id` to the `tb_pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penghuni_id` to the `tb_pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagihan_id` to the `tb_pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `tb_pengguna` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penghuni_id` to the `tb_penghuni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pegawai_id` to the `tb_pengumuman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penghuni_id` to the `tb_perjanjian_sewa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penghuni_id` to the `tb_permintaan_pemeliharaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pegawai_id` to the `tb_tagihan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" DROP CONSTRAINT "tb_keluhan_penghuni_employee_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" DROP CONSTRAINT "tb_keluhan_penghuni_resident_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pegawai" DROP CONSTRAINT "tb_pegawai_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pembayaran" DROP CONSTRAINT "tb_pembayaran_bill_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pembayaran" DROP CONSTRAINT "tb_pembayaran_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pembayaran" DROP CONSTRAINT "tb_pembayaran_resident_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_penghuni" DROP CONSTRAINT "tb_penghuni_resident_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pengumuman" DROP CONSTRAINT "tb_pengumuman_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_perjanjian_sewa" DROP CONSTRAINT "tb_perjanjian_sewa_resident_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_permintaan_pemeliharaan" DROP CONSTRAINT "tb_permintaan_pemeliharaan_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_permintaan_pemeliharaan" DROP CONSTRAINT "tb_permintaan_pemeliharaan_resident_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_tagihan" DROP CONSTRAINT "tb_tagihan_employee_id_fkey";

-- DropIndex
DROP INDEX "public"."tb_pegawai_employee_id_key";

-- DropIndex
DROP INDEX "public"."tb_penghuni_resident_id_key";

-- DropIndex
DROP INDEX "public"."tb_perjanjian_sewa_resident_id_key";

-- AlterTable
ALTER TABLE "public"."tb_keluhan_penghuni" DROP COLUMN "resident_id",
ADD COLUMN     "penghuni_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_pegawai" DROP CONSTRAINT "tb_pegawai_pkey",
DROP COLUMN "employee_id",
ADD COLUMN     "pegawai_id" UUID NOT NULL,
ADD CONSTRAINT "tb_pegawai_pkey" PRIMARY KEY ("pegawai_id");

-- AlterTable
ALTER TABLE "public"."tb_pembayaran" DROP COLUMN "bill_id",
DROP COLUMN "employee_id",
DROP COLUMN "resident_id",
ADD COLUMN     "pegawai_id" UUID,
ADD COLUMN     "penghuni_id" UUID NOT NULL,
ADD COLUMN     "tagihan_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_pengguna" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_penghuni" DROP CONSTRAINT "tb_penghuni_pkey",
DROP COLUMN "resident_id",
ADD COLUMN     "penghuni_id" UUID NOT NULL,
ADD CONSTRAINT "tb_penghuni_pkey" PRIMARY KEY ("penghuni_id");

-- AlterTable
ALTER TABLE "public"."tb_pengumuman" DROP COLUMN "employeeId",
DROP COLUMN "konten_pengumuman",
ADD COLUMN     "lampiran_pengumuman" TEXT[],
ADD COLUMN     "pegawai_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_perjanjian_sewa" DROP COLUMN "resident_id",
ADD COLUMN     "penghuni_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_permintaan_pemeliharaan" DROP COLUMN "employee_id",
DROP COLUMN "resident_id",
ADD COLUMN     "pegawai_id" UUID,
ADD COLUMN     "penghuni_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_tagihan" DROP COLUMN "employee_id",
ADD COLUMN     "pegawai_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_pegawai_pegawai_id_key" ON "public"."tb_pegawai"("pegawai_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_pengguna_username_key" ON "public"."tb_pengguna"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tb_penghuni_penghuni_id_key" ON "public"."tb_penghuni"("penghuni_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_perjanjian_sewa_penghuni_id_key" ON "public"."tb_perjanjian_sewa"("penghuni_id");

-- AddForeignKey
ALTER TABLE "public"."tb_penghuni" ADD CONSTRAINT "tb_penghuni_penghuni_id_fkey" FOREIGN KEY ("penghuni_id") REFERENCES "public"."tb_pengguna"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pegawai" ADD CONSTRAINT "tb_pegawai_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "public"."tb_pengguna"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_permintaan_pemeliharaan" ADD CONSTRAINT "tb_permintaan_pemeliharaan_penghuni_id_fkey" FOREIGN KEY ("penghuni_id") REFERENCES "public"."tb_penghuni"("penghuni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_permintaan_pemeliharaan" ADD CONSTRAINT "tb_permintaan_pemeliharaan_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "public"."tb_pegawai"("pegawai_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" ADD CONSTRAINT "tb_keluhan_penghuni_penghuni_id_fkey" FOREIGN KEY ("penghuni_id") REFERENCES "public"."tb_penghuni"("penghuni_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" ADD CONSTRAINT "tb_keluhan_penghuni_employee_fkey" FOREIGN KEY ("employee") REFERENCES "public"."tb_pegawai"("pegawai_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pembayaran" ADD CONSTRAINT "tb_pembayaran_penghuni_id_fkey" FOREIGN KEY ("penghuni_id") REFERENCES "public"."tb_penghuni"("penghuni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pembayaran" ADD CONSTRAINT "tb_pembayaran_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "public"."tb_pegawai"("pegawai_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pembayaran" ADD CONSTRAINT "tb_pembayaran_tagihan_id_fkey" FOREIGN KEY ("tagihan_id") REFERENCES "public"."tb_tagihan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pengumuman" ADD CONSTRAINT "tb_pengumuman_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "public"."tb_pegawai"("pegawai_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_perjanjian_sewa" ADD CONSTRAINT "tb_perjanjian_sewa_penghuni_id_fkey" FOREIGN KEY ("penghuni_id") REFERENCES "public"."tb_penghuni"("penghuni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_tagihan" ADD CONSTRAINT "tb_tagihan_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "public"."tb_pegawai"("pegawai_id") ON DELETE RESTRICT ON UPDATE CASCADE;
