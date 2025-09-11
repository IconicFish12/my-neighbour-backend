import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender, UserRole } from '../../../common/database/generated/prisma';
import { Type } from 'class-transformer';
import { IsUnique } from 'src/common/pipes/validators/is-unique-validators';

export class CreateAppUserManageDto {
  @IsString({ message: 'Nama lengkap harus berupa teks' })
  @IsNotEmpty({ message: 'Nama lengkap tidak boleh kosong' })
  readonly fullName: string;

  @IsString({ message: 'Nama depan harus berupa teks' })
  @IsNotEmpty({ message: 'Nama depan tidak boleh kosong' })
  readonly firstName: string;

  @IsString({ message: 'Nama belakang harus berupa teks' })
  @IsNotEmpty({ message: 'Nama belakang tidak boleh kosong' })
  readonly lastName: string;

  @IsString({ message: 'Username harus berupa teks' })
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  @IsUnique(
    { field: 'username', model: 'users' },
    { message: 'Username sudah terdaftar ' },
  )
  @MinLength(5, { message: 'Username harus lebih dari 5 karakter' })
  @MaxLength(15, { message: 'Username harus kurang dari 15 karakter' })
  readonly username: string;

  @IsDate({ message: 'Tanggal lahir harus berupa format tanggal' })
  @IsOptional()
  @Type(() => Date)
  readonly dateOfBirth: Date;

  @IsString({ message: 'Nomor kontak harus berupa teks' })
  @IsOptional()
  readonly contactNumber: string;

  @IsString({ message: 'Email utama harus berupa teks' })
  @IsNotEmpty({ message: 'Email utama tidak boleh kosong' })
  @IsUnique(
    { field: 'primaryEmail', model: 'users' },
    { message: 'Email utama sudah digunakan' },
  )
  @IsEmail(
    {
      ignore_max_length: true,
      allow_display_name: true,
    },
    {
      message: 'Kolom Email harus berupa Email yang valid',
    },
  )
  readonly primaryEmail: string;

  @IsString({ message: 'Email sekunder harus berupa teks' })
  @IsOptional()
  @IsUnique(
    { field: 'secondaryEmail', model: 'users' },
    { message: 'Email sekunder sudah digunakan' },
  )
  @IsEmail(
    {
      ignore_max_length: true,
      allow_display_name: true,
    },
    {
      message: 'Kolom Email harus berupa Email yang valid',
    },
  )
  readonly secondaryEmail: string;

  @IsString({ message: 'Password harus berupa teks' })
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @MinLength(4, { message: 'Password minimal 4 karakter' })
  @IsStrongPassword(
    {
      minLength: 4,
      minLowercase: 1,
      minNumbers: 3,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message: 'Kata sandi harus minimal 4 karakter, 3 angka, dan 1 simbol.',
    },
  )
  @MaxLength(15, {
    message: 'Password maksimal 15 karakter',
  })
  readonly password: string;

  @IsNotEmpty({ message: 'Peran tidak boleh kosong' })
  @IsEnum(UserRole, {
    message: 'Peran tidak valid: ' + Object.values(UserRole).join(', '),
  })
  readonly role: UserRole;

  @IsNotEmpty({ message: 'Jenis kelamin tidak boleh kosong' })
  @IsEnum(Gender, {
    message:
      'Jenis kelamin tidak valid, Pilihan: ' + Object.values(Gender).join(', '),
  })
  readonly gender: Gender;
}
