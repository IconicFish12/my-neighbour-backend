-- DropForeignKey
ALTER TABLE "public"."tb_tagihan" DROP CONSTRAINT "tb_tagihan_employee_id_fkey";

-- AlterTable
ALTER TABLE "public"."tb_tagihan" ADD COLUMN     "userId" UUID;

-- AddForeignKey
ALTER TABLE "public"."tb_tagihan" ADD CONSTRAINT "tb_tagihan_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."tb_pegawai"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
