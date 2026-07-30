import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateComplaintManageDto } from '../../../dtos/requests/create/create-complaint-manage.dto';
import { UpdateComplaintManageDto } from '../../../dtos/requests/update/update-complaint-manage.dto';
import { DatabaseService } from '../../../database/database.service';
import { Prisma } from 'src/database/generated/prisma/client.ts';

@Injectable()
export class ComplaintManageService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createRequest: CreateComplaintManageDto) {
    try {
      return await this.prisma.complaints.create({
        data: {
          title: createRequest.title,
          description: createRequest.description,
          category: createRequest.category,
          employeeId: createRequest.employeeId ?? null,
          residentId: createRequest.residentId,
          images: createRequest.images ?? [],
          resolutionDetails: createRequest.resolutionDetails ?? null,
          resolvedAt: createRequest.resolvedAt ?? null,
          unitId: createRequest.unitId ?? null,
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Membuat Data Keluhan',
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.complaints.findMany({
        orderBy: { submittedAt: 'asc' },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Keluhan',
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.complaints.findUniqueOrThrow({
        where: { id: id },
        include: {
          employee: {
            select: {
              employeeNumberId: true,
              employeePosition: true,
            },
            include: {
              user: {
                select: {
                  id: true,
                  fullName: true,
                  firstName: true,
                  lastName: true,
                  username: true,
                },
              },
            },
          },
          resident: {
            include: {
              user: {
                select: {
                  id: true,
                  fullName: true,
                  firstName: true,
                  lastName: true,
                  username: true,
                },
              },
              unit: {
                select: {
                  buildingName: true,
                  location: true,
                  unitNumber: true,
                  status: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Keluhan',
      );
    }
  }

  async update(id: string, updateRequest: UpdateComplaintManageDto) {
    try {
      const existData = await this.prisma.complaints.findUniqueOrThrow({
        where: { id: id },
      });

      if (!existData) {
        throw new NotFoundException(
          `Data Keluhan dengan id: ${id} tidak ditemukan`,
        );
      }

      return await this.prisma.complaints.update({
        where: { id: id },
        data: {
          title: updateRequest.title ?? existData.title,
          description: updateRequest.description ?? existData.description,
          category: updateRequest.category ?? existData.category,
          employeeId: updateRequest.employeeId ?? existData.employeeId,
          residentId: updateRequest.residentId ?? existData.residentId,
          images: updateRequest.images ?? [],
          resolutionDetails:
            updateRequest.resolutionDetails ?? existData.resolutionDetails,
          resolvedAt: updateRequest.resolvedAt ?? existData.resolvedAt,
          unitId: updateRequest.unitId ?? existData.unitId,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if ((error as Error).name === 'NotFoundError') {
        throw new NotFoundException(`Keluhan dengan id: ${id} tidak ditemukan`);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if ((error as any).code === 'P2025') {
          throw new NotFoundException(
            `Keluhan dengan id: ${id} tidak ditemukan`,
          );
        }
      }

      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Keluhan',
      );
    }
  }

  async remove(id: string) {
    try {
      const existData = await this.prisma.complaints.findUniqueOrThrow({
        where: { id: id },
      });

      if (!existData) {
        throw new NotFoundException(
          `Data Keluhan dengan id: ${id} tidak ditemukan`,
        );
      }

      return await this.prisma.complaints.delete({
        where: { id: id },
      });
    } catch (error) {
      if ((error as Error).name === 'NotFoundError') {
        throw new NotFoundException(`Keluhan dengan id: ${id} tidak ditemukan`);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if ((error as any).code === 'P2025') {
          throw new NotFoundException(
            `Keluhan dengan id: ${id} tidak ditemukan`,
          );
        }
      }

      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Keluhan',
      );
    }
  }
}
