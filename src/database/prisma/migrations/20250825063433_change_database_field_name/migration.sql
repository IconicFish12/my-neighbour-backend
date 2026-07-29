/*
  Warnings:

  - The primary key for the `tb_PostTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tb_PostTag` table. All the data in the column will be lost.
  - You are about to drop the column `nama_tag` on the `tb_PostTag` table. All the data in the column will be lost.
  - The primary key for the `tb_keluhan_penghuni` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tb_keluhan_penghuni` table. All the data in the column will be lost.
  - The primary key for the `tb_komentar_forum` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tb_komentar_forum` table. All the data in the column will be lost.
  - You are about to drop the column `id_penulis` on the `tb_komentar_forum` table. All the data in the column will be lost.
  - The primary key for the `tb_kontak_penting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tb_kontak_penting` table. All the data in the column will be lost.
  - The primary key for the `tb_pembayaran` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tb_pembayaran` table. All the data in the column will be lost.
  - The primary key for the `tb_pengguna` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tb_pengguna` table. All the data in the column will be lost.
  - The primary key for the `tb_pengumuman` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tb_pengumuman` table. All the data in the column will be lost.
  - The primary key for the `tb_postingan_forum` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tb_postingan_forum` table. All the data in the column will be lost.
  - You are about to drop the column `id_penulis` on the `tb_postingan_forum` table. All the data in the column will be lost.
  - The primary key for the `tb_tagihan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tb_tagihan` table. All the data in the column will be lost.
  - The primary key for the `tb_unit_hunian` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tb_unit_hunian` table. All the data in the column will be lost.
  - The required column `label_id` was added to the `tb_PostTag` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `nama_label` to the `tb_PostTag` table without a default value. This is not possible if the table is not empty.
  - The required column `keluhan_id` was added to the `tb_keluhan_penghuni` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `forum_comment_id` was added to the `tb_komentar_forum` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `pengguna_id` to the `tb_komentar_forum` table without a default value. This is not possible if the table is not empty.
  - The required column `kontak_id` was added to the `tb_kontak_penting` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `pembayaran_id` was added to the `tb_pembayaran` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `pengguna_id` was added to the `tb_pengguna` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `pengumuman_id` was added to the `tb_pengumuman` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `forum_post_id` was added to the `tb_postingan_forum` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `pengguna_id` to the `tb_postingan_forum` table without a default value. This is not possible if the table is not empty.
  - The required column `tagihan_id` was added to the `tb_tagihan` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `unit_id` was added to the `tb_unit_hunian` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "public"."_ForumPostsToPostTags" DROP CONSTRAINT "_ForumPostsToPostTags_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ForumPostsToPostTags" DROP CONSTRAINT "_ForumPostsToPostTags_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" DROP CONSTRAINT "tb_keluhan_penghuni_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_komentar_forum" DROP CONSTRAINT "tb_komentar_forum_id_penulis_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_komentar_forum" DROP CONSTRAINT "tb_komentar_forum_id_postingan_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pegawai" DROP CONSTRAINT "tb_pegawai_pegawai_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pembayaran" DROP CONSTRAINT "tb_pembayaran_tagihan_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_pembayaran" DROP CONSTRAINT "tb_pembayaran_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_penghuni" DROP CONSTRAINT "tb_penghuni_penghuni_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_penghuni" DROP CONSTRAINT "tb_penghuni_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_perjanjian_sewa" DROP CONSTRAINT "tb_perjanjian_sewa_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_permintaan_pemeliharaan" DROP CONSTRAINT "tb_permintaan_pemeliharaan_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_postingan_forum" DROP CONSTRAINT "tb_postingan_forum_id_penulis_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_tagihan" DROP CONSTRAINT "tb_tagihan_unit_id_fkey";

-- AlterTable
ALTER TABLE "public"."tb_PostTag" DROP CONSTRAINT "tb_PostTag_pkey",
DROP COLUMN "id",
DROP COLUMN "nama_tag",
ADD COLUMN     "label_id" UUID NOT NULL,
ADD COLUMN     "nama_label" TEXT NOT NULL,
ADD CONSTRAINT "tb_PostTag_pkey" PRIMARY KEY ("label_id");

-- AlterTable
ALTER TABLE "public"."tb_keluhan_penghuni" DROP CONSTRAINT "tb_keluhan_penghuni_pkey",
DROP COLUMN "id",
ADD COLUMN     "keluhan_id" UUID NOT NULL,
ADD CONSTRAINT "tb_keluhan_penghuni_pkey" PRIMARY KEY ("keluhan_id");

-- AlterTable
ALTER TABLE "public"."tb_komentar_forum" DROP CONSTRAINT "tb_komentar_forum_pkey",
DROP COLUMN "id",
DROP COLUMN "id_penulis",
ADD COLUMN     "forum_comment_id" UUID NOT NULL,
ADD COLUMN     "pengguna_id" UUID NOT NULL,
ADD CONSTRAINT "tb_komentar_forum_pkey" PRIMARY KEY ("forum_comment_id");

-- AlterTable
ALTER TABLE "public"."tb_kontak_penting" DROP CONSTRAINT "tb_kontak_penting_pkey",
DROP COLUMN "id",
ADD COLUMN     "kontak_id" UUID NOT NULL,
ADD CONSTRAINT "tb_kontak_penting_pkey" PRIMARY KEY ("kontak_id");

-- AlterTable
ALTER TABLE "public"."tb_pembayaran" DROP CONSTRAINT "tb_pembayaran_pkey",
DROP COLUMN "id",
ADD COLUMN     "pembayaran_id" UUID NOT NULL,
ADD CONSTRAINT "tb_pembayaran_pkey" PRIMARY KEY ("pembayaran_id");

-- AlterTable
ALTER TABLE "public"."tb_pengguna" DROP CONSTRAINT "tb_pengguna_pkey",
DROP COLUMN "id",
ADD COLUMN     "pengguna_id" UUID NOT NULL,
ADD CONSTRAINT "tb_pengguna_pkey" PRIMARY KEY ("pengguna_id");

-- AlterTable
ALTER TABLE "public"."tb_pengumuman" DROP CONSTRAINT "tb_pengumuman_pkey",
DROP COLUMN "id",
ADD COLUMN     "pengumuman_id" UUID NOT NULL,
ADD CONSTRAINT "tb_pengumuman_pkey" PRIMARY KEY ("pengumuman_id");

-- AlterTable
ALTER TABLE "public"."tb_postingan_forum" DROP CONSTRAINT "tb_postingan_forum_pkey",
DROP COLUMN "id",
DROP COLUMN "id_penulis",
ADD COLUMN     "forum_post_id" UUID NOT NULL,
ADD COLUMN     "pengguna_id" UUID NOT NULL,
ADD CONSTRAINT "tb_postingan_forum_pkey" PRIMARY KEY ("forum_post_id");

-- AlterTable
ALTER TABLE "public"."tb_tagihan" DROP CONSTRAINT "tb_tagihan_pkey",
DROP COLUMN "id",
ADD COLUMN     "tagihan_id" UUID NOT NULL,
ADD CONSTRAINT "tb_tagihan_pkey" PRIMARY KEY ("tagihan_id");

-- AlterTable
ALTER TABLE "public"."tb_unit_hunian" DROP CONSTRAINT "tb_unit_hunian_pkey",
DROP COLUMN "id",
ADD COLUMN     "unit_id" UUID NOT NULL,
ADD CONSTRAINT "tb_unit_hunian_pkey" PRIMARY KEY ("unit_id");

-- AddForeignKey
ALTER TABLE "public"."tb_penghuni" ADD CONSTRAINT "tb_penghuni_penghuni_id_fkey" FOREIGN KEY ("penghuni_id") REFERENCES "public"."tb_pengguna"("pengguna_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_penghuni" ADD CONSTRAINT "tb_penghuni_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("unit_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pegawai" ADD CONSTRAINT "tb_pegawai_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "public"."tb_pengguna"("pengguna_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_permintaan_pemeliharaan" ADD CONSTRAINT "tb_permintaan_pemeliharaan_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" ADD CONSTRAINT "tb_keluhan_penghuni_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("unit_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pembayaran" ADD CONSTRAINT "tb_pembayaran_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("unit_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pembayaran" ADD CONSTRAINT "tb_pembayaran_tagihan_id_fkey" FOREIGN KEY ("tagihan_id") REFERENCES "public"."tb_tagihan"("tagihan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_postingan_forum" ADD CONSTRAINT "tb_postingan_forum_pengguna_id_fkey" FOREIGN KEY ("pengguna_id") REFERENCES "public"."tb_pengguna"("pengguna_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_komentar_forum" ADD CONSTRAINT "tb_komentar_forum_pengguna_id_fkey" FOREIGN KEY ("pengguna_id") REFERENCES "public"."tb_pengguna"("pengguna_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_komentar_forum" ADD CONSTRAINT "tb_komentar_forum_id_postingan_fkey" FOREIGN KEY ("id_postingan") REFERENCES "public"."tb_postingan_forum"("forum_post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_perjanjian_sewa" ADD CONSTRAINT "tb_perjanjian_sewa_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_tagihan" ADD CONSTRAINT "tb_tagihan_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ForumPostsToPostTags" ADD CONSTRAINT "_ForumPostsToPostTags_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."tb_postingan_forum"("forum_post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ForumPostsToPostTags" ADD CONSTRAINT "_ForumPostsToPostTags_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."tb_PostTag"("label_id") ON DELETE CASCADE ON UPDATE CASCADE;
