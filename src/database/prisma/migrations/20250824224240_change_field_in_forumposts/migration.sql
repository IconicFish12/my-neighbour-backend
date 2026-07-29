/*
  Warnings:

  - You are about to drop the column `isPublished` on the `tb_postingan_forum` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."tb_postingan_forum" DROP COLUMN "isPublished",
ADD COLUMN     "lampiran_pengumuman" TEXT[];
