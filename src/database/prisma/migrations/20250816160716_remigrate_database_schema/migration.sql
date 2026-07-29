-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('RESIDENT', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "public"."EmployeeRole" AS ENUM ('ADMIN', 'PROPERTY_MANAGER', 'TECHNICIAN', 'SECURITY', 'NONE');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'NONE');

-- CreateEnum
CREATE TYPE "public"."ResidentStatus" AS ENUM ('HEAD_HOUSE_HOLD', 'FAMILY_MEMBERS');

-- CreateEnum
CREATE TYPE "public"."PostedBy" AS ENUM ('RESIDENT', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "public"."UnitStatus" AS ENUM ('OCCUPIED', 'VACANT', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PAID', 'PENDING', 'OVERDUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('BANK_TRANSFER', 'E_WALLET', 'CREDIT_CARD', 'CASH');

-- CreateEnum
CREATE TYPE "public"."MaintenancePriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "public"."MaintenanceStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('CICILAN_KPR', 'IURAN_BULANAN');

-- CreateEnum
CREATE TYPE "public"."ContactRole" AS ENUM ('EMPLOYEE', 'EMERGENCY_SERVICES');

-- CreateTable
CREATE TABLE "public"."tb_pengguna" (
    "id" UUID NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "nama_depan" TEXT NOT NULL,
    "nama_belakang" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3),
    "nomor_kontak" TEXT,
    "email_utama" TEXT NOT NULL,
    "email_kedua" TEXT,
    "password_terenkripsi" TEXT NOT NULL,
    "sessionToken" TEXT,
    "emailVerificationToken" TEXT,
    "passwordResetToken" TEXT,
    "role" "public"."UserRole" NOT NULL,
    "gender" "public"."Gender" NOT NULL DEFAULT 'NONE',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_pengguna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_penghuni" (
    "resident_id" UUID NOT NULL,
    "nama_kontak_darurat" TEXT,
    "nomor_kontak_darurat" TEXT,
    "tanggal_masuk" TIMESTAMP(3) NOT NULL,
    "tanggal_keluar" TIMESTAMP(3),
    "residentStatus" "public"."ResidentStatus" NOT NULL DEFAULT 'FAMILY_MEMBERS',
    "unit_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_penghuni_pkey" PRIMARY KEY ("resident_id")
);

-- CreateTable
CREATE TABLE "public"."tb_pegawai" (
    "employee_id" UUID NOT NULL,
    "nomor_pegawai" TEXT NOT NULL,
    "tanggal_perekrutan" TIMESTAMP(3) NOT NULL,
    "posisi_pegawai" "public"."EmployeeRole" NOT NULL DEFAULT 'NONE',
    "jam_kerja_pegawai" INTEGER NOT NULL,
    "gaji_pegawai" DOUBLE PRECISION NOT NULL,
    "bonus_pegawai" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_pegawai_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "public"."tb_permintaan_pemeliharaan" (
    "id" UUID NOT NULL,
    "nama_permintaan" TEXT NOT NULL,
    "deskripsi_pemintaan" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prioritas_permintaan" "public"."MaintenancePriority" NOT NULL,
    "status_permintaan" "public"."MaintenanceStatus" NOT NULL,
    "resident_id" UUID NOT NULL,
    "unit_id" UUID NOT NULL,
    "employee_id" UUID,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_permintaan_pemeliharaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Complaint" (
    "id" UUID NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_pembayaran" (
    "id" UUID NOT NULL,
    "jumlah_pembayaran" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metode_pembayaran" "public"."PaymentMethod" NOT NULL,
    "status_pembayaran" "public"."PaymentStatus" NOT NULL,
    "tujuan_pembayaram" TEXT NOT NULL,
    "deskripsi_pembayaran" TEXT,
    "resident_id" UUID NOT NULL,
    "unit_id" UUID,
    "lease_id" UUID,
    "employee_id" UUID,
    "bill_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_pengumuman" (
    "id" UUID NOT NULL,
    "judul" TEXT NOT NULL,
    "konten_pengumuman" TEXT NOT NULL,
    "isi_pengumuman" TEXT NOT NULL,
    "tanggal_publikasi" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_selesai" TIMESTAMP(3),
    "employeeId" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_postingan_forum" (
    "id" UUID NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "authorRole" "public"."UserRole" NOT NULL,
    "id_penulis" UUID NOT NULL,
    "tanggal_publikasi" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_postingan_forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_PostTag" (
    "id" UUID NOT NULL,
    "nama_tag" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_PostTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_komentar_forum" (
    "id" UUID NOT NULL,
    "isi_komentar" TEXT NOT NULL,
    "id_penulis" UUID NOT NULL,
    "id_postingan" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tb_komentar_forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_unit_hunian" (
    "id" UUID NOT NULL,
    "nomor_unit" TEXT NOT NULL,
    "nama_unit" TEXT,
    "jumlah_lantai" INTEGER,
    "jumlah_ruangan" INTEGER,
    "ukuran_unit" INTEGER,
    "harga_cicilan" DOUBLE PRECISION,
    "lokasi_unit" TEXT NOT NULL,
    "status" "public"."UnitStatus" NOT NULL,
    "harga_jual" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tb_unit_hunian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_perjanjian_sewa" (
    "id" UUID NOT NULL,
    "tanggal_mulai" TIMESTAMP(3) NOT NULL,
    "tanggal_selesai" TIMESTAMP(3) NOT NULL,
    "sewa_bulanan" DOUBLE PRECISION NOT NULL,
    "jumlah_deposit" DOUBLE PRECISION,
    "syarat_dan_ketentuan" TEXT,
    "resident_id" UUID NOT NULL,
    "unit_id" UUID NOT NULL,

    CONSTRAINT "tb_perjanjian_sewa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_tagihan" (
    "id" UUID NOT NULL,
    "jumlah_tagihan" DOUBLE PRECISION NOT NULL,
    "tipe_pembayaran" "public"."PaymentType" NOT NULL,
    "batas_waktu_pembayaran" TIMESTAMP(3) NOT NULL,
    "sudah_dibayar" BOOLEAN NOT NULL DEFAULT false,
    "unit_id" UUID NOT NULL,
    "employee_id" UUID NOT NULL,

    CONSTRAINT "tb_tagihan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_kontak_penting" (
    "id" UUID NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" "public"."ContactRole" NOT NULL,
    "nomor_telepon" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "tb_kontak_penting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ForumPostToPostTag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ForumPostToPostTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_pengguna_email_utama_key" ON "public"."tb_pengguna"("email_utama");

-- CreateIndex
CREATE UNIQUE INDEX "tb_pengguna_email_kedua_key" ON "public"."tb_pengguna"("email_kedua");

-- CreateIndex
CREATE UNIQUE INDEX "tb_pengguna_password_terenkripsi_key" ON "public"."tb_pengguna"("password_terenkripsi");

-- CreateIndex
CREATE UNIQUE INDEX "tb_pengguna_sessionToken_key" ON "public"."tb_pengguna"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "tb_pengguna_emailVerificationToken_key" ON "public"."tb_pengguna"("emailVerificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "tb_pengguna_passwordResetToken_key" ON "public"."tb_pengguna"("passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "tb_penghuni_resident_id_key" ON "public"."tb_penghuni"("resident_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_pegawai_employee_id_key" ON "public"."tb_pegawai"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_pegawai_nomor_pegawai_key" ON "public"."tb_pegawai"("nomor_pegawai");

-- CreateIndex
CREATE UNIQUE INDEX "tb_unit_hunian_nomor_unit_key" ON "public"."tb_unit_hunian"("nomor_unit");

-- CreateIndex
CREATE UNIQUE INDEX "tb_perjanjian_sewa_resident_id_key" ON "public"."tb_perjanjian_sewa"("resident_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_perjanjian_sewa_unit_id_key" ON "public"."tb_perjanjian_sewa"("unit_id");

-- CreateIndex
CREATE INDEX "_ForumPostToPostTag_B_index" ON "public"."_ForumPostToPostTag"("B");

-- AddForeignKey
ALTER TABLE "public"."tb_penghuni" ADD CONSTRAINT "tb_penghuni_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "public"."tb_pengguna"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_penghuni" ADD CONSTRAINT "tb_penghuni_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pegawai" ADD CONSTRAINT "tb_pegawai_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."tb_pengguna"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_permintaan_pemeliharaan" ADD CONSTRAINT "tb_permintaan_pemeliharaan_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "public"."tb_penghuni"("resident_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_permintaan_pemeliharaan" ADD CONSTRAINT "tb_permintaan_pemeliharaan_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_permintaan_pemeliharaan" ADD CONSTRAINT "tb_permintaan_pemeliharaan_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."tb_pegawai"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pembayaran" ADD CONSTRAINT "tb_pembayaran_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "public"."tb_penghuni"("resident_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pembayaran" ADD CONSTRAINT "tb_pembayaran_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pembayaran" ADD CONSTRAINT "tb_pembayaran_lease_id_fkey" FOREIGN KEY ("lease_id") REFERENCES "public"."tb_perjanjian_sewa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pembayaran" ADD CONSTRAINT "tb_pembayaran_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."tb_pegawai"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pembayaran" ADD CONSTRAINT "tb_pembayaran_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "public"."tb_tagihan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_pengumuman" ADD CONSTRAINT "tb_pengumuman_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "public"."tb_pegawai"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_postingan_forum" ADD CONSTRAINT "tb_postingan_forum_id_penulis_fkey" FOREIGN KEY ("id_penulis") REFERENCES "public"."tb_pengguna"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_komentar_forum" ADD CONSTRAINT "tb_komentar_forum_id_penulis_fkey" FOREIGN KEY ("id_penulis") REFERENCES "public"."tb_pengguna"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_komentar_forum" ADD CONSTRAINT "tb_komentar_forum_id_postingan_fkey" FOREIGN KEY ("id_postingan") REFERENCES "public"."tb_postingan_forum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_perjanjian_sewa" ADD CONSTRAINT "tb_perjanjian_sewa_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "public"."tb_penghuni"("resident_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_perjanjian_sewa" ADD CONSTRAINT "tb_perjanjian_sewa_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_tagihan" ADD CONSTRAINT "tb_tagihan_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_tagihan" ADD CONSTRAINT "tb_tagihan_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."tb_pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ForumPostToPostTag" ADD CONSTRAINT "_ForumPostToPostTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."tb_postingan_forum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ForumPostToPostTag" ADD CONSTRAINT "_ForumPostToPostTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."tb_PostTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
