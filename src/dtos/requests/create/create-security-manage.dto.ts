import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { MaintenanceStatus } from '../../../common/database/generated/prisma';
import { Type } from 'class-transformer';

export class CreateSecurityManageDto {
  @IsString({ message: 'Judul laporan harus berupa teks.' })
  @IsNotEmpty({ message: 'Judul laporan tidak boleh kosong.' })
  readonly title: string;

  @IsString({ message: 'Deskripsi laporan harus berupa teks.' })
  @IsNotEmpty({ message: 'Deskripsi laporan tidak boleh kosong.' })
  readonly description: string;

  @IsString({ message: 'Lokasi kejadian harus berupa teks.' })
  @IsNotEmpty({ message: 'Lokasi kejadian tidak boleh kosong.' })
  readonly location: string;

  @IsDate({
    message: 'Tanggal insiden harus berupa format tanggal yang valid.',
  })
  @IsNotEmpty({ message: 'Tanggal insiden tidak boleh kosong.' })
  @Type(() => Date)
  readonly incidentDate: Date;

  @IsEnum(MaintenanceStatus, {
    message:
      'Status laporan tidak valid. Pilihan: ' +
      Object.values(MaintenanceStatus).join(', '),
  })
  @IsNotEmpty({ message: 'Status laporan tidak boleh kosong.' })
  readonly status: MaintenanceStatus;

  @IsBoolean({ message: 'Kolom "isPublished" harus berupa boolean.' })
  @IsOptional()
  readonly isPublished?: boolean;

  @IsUUID('4', { message: 'ID pegawai harus berupa UUID versi 4 yang valid.' })
  @IsNotEmpty({ message: 'ID pegawai tidak boleh kosong.' })
  readonly employeeId: string;
}
