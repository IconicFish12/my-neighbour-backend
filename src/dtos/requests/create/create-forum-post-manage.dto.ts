/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsDate,
  IsUUID,
  IsEnum,
  IsArray,
} from 'class-validator';
import { UserRole } from '../../../common/database/generated/prisma';
import { IsUnique } from 'src/common/pipes/validators/is-unique-validators';

export class CreateForumPostManageDto {
  @IsString({ message: 'Judul pengumuman harus berupa teks.' })
  @IsNotEmpty({ message: 'Judul pengumuman tidak boleh kosong.' })
  @MinLength(5, {
    message: 'Judul pengumuman harus memiliki setidaknya 5 karakter.',
  })
  readonly title: string;

  @IsString({ message: 'Isi pengumuman harus berupa teks.' })
  @IsNotEmpty({ message: 'Isi pengumuman tidak boleh kosong.' })
  readonly content: string;

  @IsArray({ message: 'Lampiran harus berupa array.' })
  @IsString({
    each: true,
    message: 'Setiap lampiran harus berupa teks (URL/path).',
  })
  @IsOptional({ message: 'Lampiran pengumuman bersifat opsional.' })
  @Transform(({ value }) => {
    // Handle form-data yang mungkin dikirim sebagai string
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value.split(',').map((item: string) => item.trim());
      }
    }
    return value;
  })
  readonly attachments?: string[];

  @IsEnum(UserRole, {
    message:
      'Peran Penulis tidak valid. Pilihan: ' +
      Object.values(UserRole).join(','),
  })
  @IsOptional({ message: 'Peran Penulis bersifat Optional' })
  readonly authorRole: UserRole;

  @IsDate({
    message: 'Tanggal publikasi harus berupa format tanggal yang valid.',
  })
  @IsNotEmpty({ message: 'Tanggal publikasi tidak boleh kosong.' })
  @Type(() => Date)
  readonly publishDate: Date;

  @IsUUID('4', {
    message: 'ID Pengguna aplikasi harus berupa UUID versi 4 yang valid.',
  })
  @IsString({ message: 'ID Pengguna aplikasi harus berupa teks' })
  @IsNotEmpty({ message: 'ID Pengguna aplikasi tidak boleh kosong.' })
  readonly userId: string;

  @IsString({ message: 'Label Forum Harus berupa teks' })
  @IsUnique({ field: 'tagName', model: 'postTags' })
  @IsOptional({ message: 'Label Forum Bersifat Optional' })
  readonly tagName: string;

  @IsUUID('4', { message: 'ID Label harus berupa UUID versi 4 yang valid.' })
  @IsString({ message: 'ID Label harus berupa teks' })
  @IsOptional({ message: 'ID Label Bersifat Optional.' })
  readonly tagId: string;
}
