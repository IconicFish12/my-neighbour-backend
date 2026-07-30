import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSecurityManageDto } from '../../dtos/requests/create/create-security-manage.dto';
import { UpdateSecurityManageDto } from '../../dtos/requests/update/update-security-manage.dto';
import { DatabaseService } from '../../database/database.service';
import { Prisma } from 'src/database/generated/prisma/client.ts';

@Injectable()
export class SecurityManageService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createRequest: CreateSecurityManageDto) {
    try {
      return await this.prisma.securityReports.create({
        data: {
          title: createRequest.title,
          description: createRequest.description,
          incidentDate: createRequest.incidentDate,
          location: createRequest.location,
          status: createRequest.status,
          employee: { connect: { id: createRequest.employeeId } },
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Membuat Data Laporan Keamanan',
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.securityReports.findMany({
        include: {
          employee: {
            include: {
              user: {
                select: {
                  fullName: true,
                  firstName: true,
                  lastName: true,
                  contactNumber: true,
                  username: true,
                },
              },
            },
          },
        },
        orderBy: {
          title: 'asc',
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Laporan Keamanan',
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.securityReports.findUniqueOrThrow({
        where: { id: id },
        include: {
          employee: {
            include: {
              user: {
                select: {
                  fullName: true,
                  firstName: true,
                  lastName: true,
                  contactNumber: true,
                  username: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Laporan Keamanan',
      );
    }
  }

  async update(id: string, updateRequest: UpdateSecurityManageDto) {
    try {
      const existData = await this.prisma.securityReports.findUniqueOrThrow({
        where: { id: id },
      });

      if (!existData) {
        throw new NotFoundException(
          `Data Laporan Keamanan dengan id: ${id} tidak ditemukan`,
        );
      }

      return await this.prisma.securityReports.update({
        where: { id: id },
        data: {
          title: updateRequest.title,
          description: updateRequest.description,
          incidentDate: updateRequest.incidentDate,
          location: updateRequest.location,
          status: updateRequest.status,
          employee: { connect: { id: updateRequest.employeeId } },
        },
      });
    } catch (error) {
      if ((error as Error).name === 'NotFoundError') {
        throw new NotFoundException(
          `Laporan Keamanan dengan id: ${id} tidak ditemukan`,
        );
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if ((error as any).code === 'P2025') {
          throw new NotFoundException(
            `Laporan Keamanan dengan id: ${id} tidak ditemukan`,
          );
        }
      }

      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Laporan Keamanan',
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.securityReports.delete({
        where: { id: id },
      });
    } catch (error) {
      if ((error as Error).name === 'NotFoundError') {
        throw new NotFoundException(
          `Laporan Keamanan dengan id: ${id} tidak ditemukan`,
        );
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if ((error as any).code === 'P2025') {
          throw new NotFoundException(
            `Laporan Keamanan dengan id: ${id} tidak ditemukan`,
          );
        }
      }

      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Laporan Keamanan',
      );
    }
  }
}
