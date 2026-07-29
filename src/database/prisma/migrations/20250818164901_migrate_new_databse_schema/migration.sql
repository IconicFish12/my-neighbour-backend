/*
  Warnings:

  - You are about to drop the `Complaint` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `tb_kontak_penting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tb_perjanjian_sewa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tb_tagihan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tb_unit_hunian` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ComplaintStatus" AS ENUM ('NEW', 'VERIFIED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."tb_kontak_penting" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_pengumuman" ALTER COLUMN "tanggal_publikasi" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."tb_perjanjian_sewa" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_postingan_forum" ALTER COLUMN "tanggal_publikasi" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."tb_tagihan" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_unit_hunian" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;

-- DropTable
DROP TABLE "public"."Complaint";

-- CreateTable
CREATE TABLE "public"."tb_keluhan_penghuni" (
    "id" UUID NOT NULL,
    "judul_keluhan" TEXT NOT NULL,
    "deskripsi_keluhan" TEXT NOT NULL,
    "status_keluhan" "public"."ComplaintStatus" NOT NULL DEFAULT 'NEW',
    "tanggal_pengajuan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_penyelesaian" TIMESTAMP(3),
    "detail_penyelesaian" TEXT,
    "resident_id" UUID NOT NULL,
    "employee" UUID,
    "unit_id" UUID,
    "url_gambar" TEXT[],

    CONSTRAINT "tb_keluhan_penghuni_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_keluhan_penghuni_employee_key" ON "public"."tb_keluhan_penghuni"("employee");

-- AddForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" ADD CONSTRAINT "tb_keluhan_penghuni_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "public"."tb_penghuni"("resident_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" ADD CONSTRAINT "tb_keluhan_penghuni_employee_fkey" FOREIGN KEY ("employee") REFERENCES "public"."tb_pegawai"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_keluhan_penghuni" ADD CONSTRAINT "tb_keluhan_penghuni_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("id") ON DELETE CASCADE ON UPDATE CASCADE;
