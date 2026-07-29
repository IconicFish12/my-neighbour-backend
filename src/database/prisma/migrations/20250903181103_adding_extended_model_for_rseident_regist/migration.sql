-- CreateEnum
CREATE TYPE "public"."RegistrationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'AWAITING_FAMILY_APPROVAL');

-- CreateEnum
CREATE TYPE "public"."RegistrationMethod" AS ENUM ('ADMIN_DRIVEN', 'USER_DRIVEN');

-- CreateEnum
CREATE TYPE "public"."DocumentType" AS ENUM ('AJB', 'SHM', 'KPR_PROOF', 'ID_CARD', 'FAMILY_CARD');

-- CreateEnum
CREATE TYPE "public"."ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."tb_penghuni" ADD COLUMN     "alasan_penolakan" TEXT,
ADD COLUMN     "disetujui_kepala_keluarga" UUID,
ADD COLUMN     "disetujui_oleh" UUID,
ADD COLUMN     "menunggu_persetujuan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "metode_registrasi" "public"."RegistrationMethod" NOT NULL DEFAULT 'USER_DRIVEN',
ADD COLUMN     "status_registrasi" "public"."RegistrationStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "tanggal_persetujuan" TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."tb_kode_keluarga" (
    "kode_keluarga_id" UUID NOT NULL,
    "kode_unik" TEXT NOT NULL,
    "kepala_keluarga_id" UUID NOT NULL,
    "unit_id" UUID,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "maksimal_anggota" INTEGER NOT NULL DEFAULT 10,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_kode_keluarga_pkey" PRIMARY KEY ("kode_keluarga_id")
);

-- CreateTable
CREATE TABLE "public"."tb_persetujuan_keluarga" (
    "persetujuan_id" UUID NOT NULL,
    "anggota_keluarga_id" UUID NOT NULL,
    "kepala_keluarga_id" UUID NOT NULL,
    "status" "public"."ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "tanggal_permintaan" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_respon" TIMESTAMP,
    "catatan" TEXT,

    CONSTRAINT "tb_persetujuan_keluarga_pkey" PRIMARY KEY ("persetujuan_id")
);

-- CreateTable
CREATE TABLE "public"."tb_dokumen_penghuni" (
    "dokumen_id" UUID NOT NULL,
    "penghuni_id" UUID NOT NULL,
    "tipe_dokumen" "public"."DocumentType" NOT NULL,
    "nama_file" TEXT NOT NULL,
    "url_file" TEXT NOT NULL,
    "ukuran_file" INTEGER NOT NULL,
    "tanggal_upload" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diverifikasi_oleh" UUID,
    "tanggal_verifikasi" TIMESTAMP,
    "terverifikasi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tb_dokumen_penghuni_pkey" PRIMARY KEY ("dokumen_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_kode_keluarga_kode_unik_key" ON "public"."tb_kode_keluarga"("kode_unik");

-- AddForeignKey
ALTER TABLE "public"."tb_kode_keluarga" ADD CONSTRAINT "tb_kode_keluarga_kepala_keluarga_id_fkey" FOREIGN KEY ("kepala_keluarga_id") REFERENCES "public"."tb_penghuni"("penghuni_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_kode_keluarga" ADD CONSTRAINT "tb_kode_keluarga_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("unit_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_persetujuan_keluarga" ADD CONSTRAINT "tb_persetujuan_keluarga_anggota_keluarga_id_fkey" FOREIGN KEY ("anggota_keluarga_id") REFERENCES "public"."tb_penghuni"("penghuni_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_persetujuan_keluarga" ADD CONSTRAINT "tb_persetujuan_keluarga_kepala_keluarga_id_fkey" FOREIGN KEY ("kepala_keluarga_id") REFERENCES "public"."tb_penghuni"("penghuni_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_dokumen_penghuni" ADD CONSTRAINT "tb_dokumen_penghuni_penghuni_id_fkey" FOREIGN KEY ("penghuni_id") REFERENCES "public"."tb_penghuni"("penghuni_id") ON DELETE CASCADE ON UPDATE CASCADE;
