import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  ComplaintStatus,
  MaintenanceCategory,
  MaintenanceStatus,
} from '../../../common/database/generated/prisma';
import { Type } from 'class-transformer';

export class CreateComplaintManageDto {
  @IsString({ message: 'Judul keluhan harus berupa teks.' })
  @IsNotEmpty({ message: 'Judul keluhan tidak boleh kosong.' })
  readonly title: string;

  @IsString({ message: 'Deskripsi keluhan harus berupa teks.' })
  @IsNotEmpty({ message: 'Deskripsi keluhan tidak boleh kosong.' })
  readonly description: string;

  @IsEnum(MaintenanceCategory, {
    message:
      'Kategori kerusakan tidak valid. Pilihan' +
      Object.values(MaintenanceCategory).join(', '),
  })
  @IsNotEmpty({
    message: 'Kategori kerusakan (ringan/sedang/berat) tidak boleh kosong.',
  })
  readonly category: MaintenanceCategory;

  @IsEnum(ComplaintStatus, {
    message:
      'Status keluhan tidak valid.Pilihan' +
      Object.values(MaintenanceStatus).join(', '),
  })
  @IsNotEmpty({ message: 'Status keluhan tidak boleh kosong.' })
  readonly status: ComplaintStatus;

  @IsDate({ message: 'Tanggal pengajuan keluhan harus berupa format tanggal.' })
  @IsNotEmpty({ message: 'Tanggal pengajuan keluhan tidak boleh kosong.' })
  @Type(() => Date)
  readonly submittedAt: Date;

  // Biasanya diisi saat update status
  @IsDate({ message: 'Tanggal penyelesaian harus berupa format tanggal.' })
  @IsOptional({ message: 'Tanggal penyelesaian bersifat opsional.' })
  @Type(() => Date)
  readonly resolvedAt?: Date;

  @IsString({ message: 'Detail penyelesaian harus berupa teks.' })
  @IsOptional({ message: 'Detail penyelesaian bersifat opsional.' })
  readonly resolutionDetails?: string;

  @IsUUID('4', { message: 'ID penghuni harus berupa UUID versi 4 yang valid.' })
  @IsNotEmpty({ message: 'ID penghuni tidak boleh kosong.' })
  readonly residentId: string;

  @IsUUID('4', { message: 'ID karyawan harus berupa UUID versi 4 yang valid.' })
  @IsOptional({ message: 'ID karyawan bersifat opsional.' })
  readonly employeeId?: string;

  @IsUUID('4', {
    message: 'ID unit hunian harus berupa UUID versi 4 yang valid.',
  })
  @IsOptional({ message: 'ID unit hunian bersifat opsional.' })
  readonly unitId?: string;

  @IsArray({ message: 'Images harus berupa array.' })
  @IsString({
    message: 'Setiap item gambar harus berupa URL (string).',
    each: true,
  })
  @IsOptional({ message: 'Daftar gambar bersifat opsional.' })
  readonly images?: string[];
}
