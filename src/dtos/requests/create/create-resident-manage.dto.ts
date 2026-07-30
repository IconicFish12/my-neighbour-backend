/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  ValidateIf,
} from 'class-validator';
import { ResidentStatus } from '../../../database/generated/prisma/client.ts';
import { Type } from 'class-transformer';
import { IsUnique } from 'src/common/pipes/validators/is-unique-validators';

export class CreateResidentManageDto {
  @IsUUID('4', {
    message: 'ID pengguna aplikasi harus berupa UUID versi 4 yang valid.',
  })
  @IsNotEmpty({ message: 'ID pengguna aplikasi tidak boleh kosong.' })
  @IsUnique(
    { field: 'userId', model: 'employees' },
    { message: 'pengguna sudah terdaftar sudah terdaftar' },
  )
  readonly userId: string;

  @IsString({ message: 'Nama kontak darurat harus berupa teks.' })
  @IsOptional()
  readonly emergencyContactName: string;

  @IsString({ message: 'Nomor kontak darurat harus berupa teks.' })
  @Matches(/^\+?\d{8,15}$/, { message: 'Nomor kontak darurat tidak valid.' })
  @IsOptional()
  readonly emergencyContactNumber: string;

  @IsDate({ message: 'Tanggal masuk harus berupa format tanggal yang valid.' })
  @IsNotEmpty({ message: 'Tanggal Masuk tidak boleh kosong' })
  @Type(() => Date)
  readonly movedInDate: Date;

  @IsDate({ message: 'Tanggal keluar harus berupa format tanggal yang valid.' })
  @ValidateIf((o) => o.movedOutDate !== null)
  @IsOptional()
  @Type(() => Date)
  readonly movedOutDate: Date;

  @IsNotEmpty({ message: 'Status penghuni tidak boleh kosong.' })
  @IsEnum(ResidentStatus, {
    message:
      'Status penghuni tidak valid. Pilihan: ' +
      Object.values(ResidentStatus).join(', '),
  })
  readonly residentStatus: ResidentStatus;

  @ValidateIf((o) => o.residentType === ResidentStatus.HEAD_HOUSE_HOLD)
  @IsUUID('4', {
    message: 'ID Unit Hunian harus berupa UUID versi 4 yang valid.',
  })
  @IsString({ message: 'Nama kontak darurat harus berupa teks.' })
  @IsNotEmpty({ message: 'ID Unit hunian tidak boleh kosong' })
  readonly unitId: string;
}
