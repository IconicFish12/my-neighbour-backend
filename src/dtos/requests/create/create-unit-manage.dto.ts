import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UnitStatus } from '../../../common/database/generated/prisma';
import { IsUnique } from 'src/common/pipes/validators/is-unique-validators';
import { Type } from 'class-transformer';

export class CreateUnitManageDto {
  @IsString({ message: 'Nomor unit harus berupa teks.' })
  @IsNotEmpty({ message: 'Nomor unit tidak boleh kosong.' })
  @IsUnique(
    { field: 'unitNumber', model: 'units' },
    { message: 'Nomor unit sudah digunakan.' },
  )
  readonly unitNumber: string;

  @IsString({ message: 'Nama bangunan harus berupa teks.' })
  @IsOptional()
  readonly buildingName?: string;

  @IsInt({ message: 'Nomor lantai harus berupa bilangan bulat.' })
  @IsOptional()
  @Type(() => Number)
  readonly floorNumber?: number;

  @IsInt({ message: 'Jumlah ruangan harus berupa bilangan bulat.' })
  @IsOptional()
  @Type(() => Number)
  readonly numberOfRooms?: number;

  @IsNumber({}, { message: 'Jumlah sewa harus berupa angka.' })
  @IsOptional()
  @Type(() => Number)
  readonly rentAmount?: number;

  @IsInt({ message: 'Luas unit harus berupa bilangan bulat.' })
  @IsOptional()
  @Type(() => Number)
  readonly squareFootage?: number;

  @IsString({ message: 'Lokasi harus berupa teks.' })
  @IsNotEmpty({ message: 'Lokasi Tidak boleh kosong' })
  readonly location: string;

  @IsEnum(UnitStatus, {
    message:
      'Status unit tidak valid. Pilihan: ' +
      Object.values(UnitStatus).join(', '),
  })
  @IsOptional()
  readonly status: UnitStatus;

  @IsNumber({}, { message: 'Harga jual harus berupa angka.' })
  @IsOptional()
  @Type(() => Number)
  readonly priceSale: number;
}
