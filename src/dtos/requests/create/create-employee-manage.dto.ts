import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { EmployeeRole } from '../../../database/generated/prisma/client.ts';
import { IsUnique } from 'src/common/pipes/validators/is-unique-validators';
import { Type } from 'class-transformer';

export class CreateEmployeeManageDto {
  @IsUUID('4', {
    message: 'ID pengguna aplikasi harus berupa UUID versi 4 yang valid.',
  })
  @IsNotEmpty({ message: 'ID pengguna aplikasi tidak boleh kosong.' })
  @IsUnique(
    { field: 'userId', model: 'employees' },
    { message: 'pengguna sudah terdaftar sudah terdaftar' },
  )
  readonly userId: string;

  @IsString({ message: 'Nomor identitas Pegawai harus berupa teks.' })
  @IsNotEmpty({ message: 'Nomor identitas Pegawai tidak boleh kosong.' })
  @IsUnique(
    { field: 'employeeNumberId', model: 'employees' },
    { message: 'ID dari pegawai sudah terdaftar' },
  )
  readonly employeeNumberId: string;

  @IsNotEmpty({ message: 'Tanggal mulai kerja tidak boleh kosong.' })
  @IsDate({
    message: 'Tanggal mulai kerja harus berupa format tanggal yang valid.',
  })
  @Type(() => Date)
  readonly hireDate: Date;

  @IsNotEmpty({ message: 'Posisi Pegawai tidak boleh kosong.' })
  @IsEnum(EmployeeRole, {
    message:
      'Posisi Pegawai tidak valid. Pilihan' +
      Object.values(EmployeeRole).join(', '),
  })
  readonly employeePosition: EmployeeRole;

  @IsNotEmpty({ message: 'Jam kerja tidak boleh kosong.' })
  @IsInt({ message: 'Jam kerja harus berupa angka bulat.' })
  @Min(0, { message: 'Jam kerja tidak boleh kurang dari 0.' })
  @Max(24, { message: 'Jam kerja tidak boleh lebih dari 24.' })
  readonly workingHours: number;

  @IsNotEmpty({ message: 'Gaji tidak boleh kosong.' })
  @IsNumber({}, { message: 'Gaji harus berupa angka.' })
  @IsPositive({ message: 'Gaji harus bernilai positif.' })
  readonly salary: number;

  @IsNotEmpty({ message: 'Bonus tidak boleh kosong.' })
  @IsNumber({}, { message: 'Bonus harus berupa angka.' })
  @IsPositive({ message: 'Bonus harus bernilai positif.' })
  readonly bonus: number;
}
