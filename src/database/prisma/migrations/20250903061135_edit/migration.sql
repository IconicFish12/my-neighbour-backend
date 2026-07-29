-- AlterTable
ALTER TABLE "public"."tb_penghuni" ADD COLUMN     "kode_unik_keluarga" TEXT;

-- AlterTable
ALTER TABLE "public"."tb_pengumuman" ALTER COLUMN "lampiran_pengumuman" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "public"."tb_postingan_forum" ALTER COLUMN "lampiran_pengumuman" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "public"."tb_unit_hunian" ADD COLUMN     "bukti_kepemilikan_unit" TEXT[] DEFAULT ARRAY[]::TEXT[];
