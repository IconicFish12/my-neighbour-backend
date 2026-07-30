import { IsOptional, IsDateString, IsEnum } from 'class-validator';
import { UserRole } from '../../database/generated/prisma/client.ts';

export class OperationalReportFilterDto {
  @IsOptional()
  @IsDateString({}, { message: 'Tanggal mulai harus dalam format ISO 8601.' })
  readonly startDate?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Tanggal akhir harus dalam format ISO 8601.' })
  readonly endDate?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Peran pengguna tidak valid.' })
  readonly userRole?: UserRole;

  @IsOptional()
  readonly unitStatus?: string;
}
