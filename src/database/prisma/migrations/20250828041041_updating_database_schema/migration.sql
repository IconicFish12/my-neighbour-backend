/*
  Warnings:

  - You are about to drop the column `created_at` on the `tb_keluhan_penghuni` table. All the data in the column will be lost.
  - You are about to drop the column `employee` on the `tb_keluhan_penghuni` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `tb_keluhan_penghuni` table. All the data in the column will be lost.
  - The primary key for the `tb_komentar_forum` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `forum_comment_id` on the `tb_komentar_forum` table. All the data in the column will be lost.
  - You are about to drop the column `id_postingan` on the `tb_komentar_forum` table. All the data in the column will be lost.
  - You are about to drop the column `pengguna_id` on the `tb_komentar_forum` table. All the data in the column will be lost.
  - You are about to drop the column `deskripsi_pembayaran` on the `tb_pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `lease_id` on the `tb_pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `pegawai_id` on the `tb_pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `tujuan_pembayaram` on the `tb_pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `harga_cicilan` on the `tb_unit_hunian` table. All the data in the column will be lost.
  - You are about to drop the column `harga_jual` on the `tb_unit_hunian` table. All the data in the column will be lost.
  - You are about to drop the `tb_PostTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_perjanjian_sewa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_permintaan_pemeliharaan` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pengguna_id]` on the table `tb_pegawai` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pengguna_id]` on the table `tb_penghuni` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `kategori_kerusakan` on the `tb_keluhan_penghuni` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `komentar_id` was added to the `tb_komentar_forum` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `penulis_id` to the `tb_komentar_forum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `tb_komentar_forum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pengguna_id` to the `tb_pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pengguna_id` to the `tb_penghuni` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."MaintenanceCategory" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- DropForeignKey
ALTER TABLE "public"."_ForumPostsToPostTags" DROP CONSTRAINT "_ForumPostsToPostTags_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" DROP CONSTRAINT "tb_keluhan_penghuni_employee_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" DROP CONSTRAINT "tb_keluhan_penghuni_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_komentar_forum" DROP CONSTRAINT "tb_komentar_forum_id_postingan_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_komentar_forum" DROP CONSTRAINT "tb_komentar_forum_pengguna_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pegawai" DROP CONSTRAINT "tb_pegawai_pegawai_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pembayaran" DROP CONSTRAINT "tb_pembayaran_lease_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pembayaran" DROP CONSTRAINT "tb_pembayaran_pegawai_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pembayaran" DROP CONSTRAINT "tb_pembayaran_tagihan_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_penghuni" DROP CONSTRAINT "tb_penghuni_penghuni_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_penghuni" DROP CONSTRAINT "tb_penghuni_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pengumuman" DROP CONSTRAINT "tb_pengumuman_pegawai_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_perjanjian_sewa" DROP CONSTRAINT "tb_perjanjian_sewa_penghuni_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_perjanjian_sewa" DROP CONSTRAINT "tb_perjanjian_sewa_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_permintaan_pemeliharaan" DROP CONSTRAINT "tb_permintaan_pemeliharaan_pegawai_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_permintaan_pemeliharaan" DROP CONSTRAINT "tb_permintaan_pemeliharaan_penghuni_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_permintaan_pemeliharaan" DROP CONSTRAINT "tb_permintaan_pemeliharaan_unit_id_fkey";

-- DropIndex
DROP INDEX "public"."tb_keluhan_penghuni_employee_key";

-- DropIndex
DROP INDEX "public"."tb_pegawai_pegawai_id_key";

-- DropIndex
DROP INDEX "public"."tb_pengguna_password_terenkripsi_key";

-- DropIndex
DROP INDEX "public"."tb_penghuni_penghuni_id_key";

-- AlterTable
ALTER TABLE "public"."tb_keluhan_penghuni" DROP COLUMN "created_at",
DROP COLUMN "employee",
DROP COLUMN "updated_at",
ADD COLUMN     "pegawai_id" UUID,
DROP COLUMN "kategori_kerusakan",
ADD COLUMN     "kategori_kerusakan" "public"."MaintenanceCategory" NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_komentar_forum" DROP CONSTRAINT "tb_komentar_forum_pkey",
DROP COLUMN "forum_comment_id",
DROP COLUMN "id_postingan",
DROP COLUMN "pengguna_id",
ADD COLUMN     "komentar_id" UUID NOT NULL,
ADD COLUMN     "penulis_id" UUID NOT NULL,
ADD COLUMN     "post_id" UUID NOT NULL,
ADD CONSTRAINT "tb_komentar_forum_pkey" PRIMARY KEY ("komentar_id");

-- AlterTable
ALTER TABLE "public"."tb_pegawai" ADD COLUMN     "pengguna_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_pembayaran" DROP COLUMN "deskripsi_pembayaran",
DROP COLUMN "lease_id",
DROP COLUMN "pegawai_id",
DROP COLUMN "tujuan_pembayaram",
ADD COLUMN     "pegawai_id_pemroses" UUID,
ALTER COLUMN "tagihan_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_penghuni" ADD COLUMN     "jumlah_cicilan_kpr" DOUBLE PRECISION,
ADD COLUMN     "kpr_lunas" BOOLEAN DEFAULT false,
ADD COLUMN     "pengguna_id" UUID NOT NULL,
ADD COLUMN     "tanggal_jatuh_tempo_kpr" TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."tb_unit_hunian" DROP COLUMN "harga_cicilan",
DROP COLUMN "harga_jual";

-- DropTable
DROP TABLE "public"."tb_PostTag";

-- DropTable
DROP TABLE "public"."tb_perjanjian_sewa";

-- DropTable
DROP TABLE "public"."tb_permintaan_pemeliharaan";

-- DropEnum
DROP TYPE "public"."MaintenancePriority";

-- CreateTable
CREATE TABLE "public"."tb_tag_postingan" (
    "tag_id" UUID NOT NULL,
    "nama_tag" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_tag_postingan_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "public"."tb_laporan_keamanan" (
    "laporan_id" UUID NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "tanggal_insiden" TIMESTAMP NOT NULL,
    "status" "public"."MaintenanceStatus" NOT NULL,
    "dipublikasikan" BOOLEAN NOT NULL DEFAULT false,
    "pegawai_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_laporan_keamanan_pkey" PRIMARY KEY ("laporan_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_tag_postingan_nama_tag_key" ON "public"."tb_tag_postingan"("nama_tag");

-- CreateIndex
CREATE UNIQUE INDEX "tb_pegawai_pengguna_id_key" ON "public"."tb_pegawai"("pengguna_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_penghuni_pengguna_id_key" ON "public"."tb_penghuni"("pengguna_id");

-- AddForeignKey
ALTER TABLE "public"."tb_penghuni" ADD CONSTRAINT "tb_penghuni_pengguna_id_fkey" FOREIGN KEY ("pengguna_id") REFERENCES "public"."tb_pengguna"("pengguna_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_penghuni" ADD CONSTRAINT "tb_penghuni_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("unit_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pegawai" ADD CONSTRAINT "tb_pegawai_pengguna_id_fkey" FOREIGN KEY ("pengguna_id") REFERENCES "public"."tb_pengguna"("pengguna_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" ADD CONSTRAINT "tb_keluhan_penghuni_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "public"."tb_pegawai"("pegawai_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" ADD CONSTRAINT "tb_keluhan_penghuni_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("unit_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pengumuman" ADD CONSTRAINT "tb_pengumuman_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "public"."tb_pegawai"("pegawai_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_komentar_forum" ADD CONSTRAINT "tb_komentar_forum_penulis_id_fkey" FOREIGN KEY ("penulis_id") REFERENCES "public"."tb_pengguna"("pengguna_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_komentar_forum" ADD CONSTRAINT "tb_komentar_forum_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."tb_postingan_forum"("forum_post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pembayaran" ADD CONSTRAINT "tb_pembayaran_pegawai_id_pemroses_fkey" FOREIGN KEY ("pegawai_id_pemroses") REFERENCES "public"."tb_pegawai"("pegawai_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pembayaran" ADD CONSTRAINT "tb_pembayaran_tagihan_id_fkey" FOREIGN KEY ("tagihan_id") REFERENCES "public"."tb_tagihan"("tagihan_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_laporan_keamanan" ADD CONSTRAINT "tb_laporan_keamanan_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "public"."tb_pegawai"("pegawai_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ForumPostsToPostTags" ADD CONSTRAINT "_ForumPostsToPostTags_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."tb_tag_postingan"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;
