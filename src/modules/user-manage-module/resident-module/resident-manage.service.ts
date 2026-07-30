import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateResidentManageDto } from '../../../dtos/requests/create/create-resident-manage.dto';
import { UpdateResidentManageDto } from '../../../dtos/requests/update/update-resident-manage.dto';
import { DatabaseService } from '../../../database/database.service';
import { Prisma } from 'src/database/generated/prisma/client.ts';

@Injectable()
export class ResidentManageService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createRequest: CreateResidentManageDto) {
    try {
      const exist = await this.prisma.users.findUnique({
        where: { id: createRequest.userId },
      });

      if (!exist) {
        throw new NotFoundException(
          `Data Pengguna aplikasi dengan id: ${createRequest.userId} tidak ditemukan`,
        );
      }

      return await this.prisma.residents.create({
        data: {
          user: { connect: { id: createRequest.userId } },
          emergencyContactName: createRequest.emergencyContactName,
          emergencyContactNumber: createRequest.emergencyContactNumber,
          movedInDate: createRequest.movedInDate,
          movedOutDate: createRequest.movedOutDate,
          residentStatus: createRequest.residentStatus,
          ...(createRequest.unitId && {
            unit: { connect: { id: createRequest.unitId } },
          }),
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Membuat Data Penghuni',
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.residents.findMany({
        include: {
          _count: { select: { Complaints: true, Payments: true } },
          user: {
            select: {
              fullName: true,
              firstName: true,
              lastName: true,
              contactNumber: true,
              dateOfBirth: true,
              gender: true,
              primaryEmail: true,
            },
          },
        },
        orderBy: { user: { fullName: 'asc' } },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Penghuni',
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.residents.findUniqueOrThrow({
        where: { id: id },
        include: {
          _count: { select: { Complaints: true, Payments: true } },
          user: {
            select: {
              fullName: true,
              firstName: true,
              lastName: true,
              contactNumber: true,
              dateOfBirth: true,
              gender: true,
              primaryEmail: true,
            },
          },
          Payments: {
            select: {
              amount: true,
              paymentDate: true,
              bill: {
                select: {
                  type: true,
                  amount: true,
                  dueDate: true,
                  unit: {},
                },
              },
            },
            orderBy: {
              paymentDate: 'asc',
            },
          },
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Penghuni',
      );
    }
  }

  async update(id: string, updateRequest: UpdateResidentManageDto) {
    try {
      const existData = await this.prisma.residents.findUnique({
        where: { id: id },
      });

      if (!existData) {
        throw new NotFoundException(
          `Penghuni dengan id: ${id} tidak ditemukan`,
        );
      }

      const updatedData = await this.prisma.residents.update({
        where: { id: id },
        data: {
          emergencyContactName:
            updateRequest.emergencyContactName ??
            existData.emergencyContactName,
          emergencyContactNumber:
            updateRequest.emergencyContactNumber ??
            existData.emergencyContactNumber,
          movedInDate: updateRequest.movedInDate ?? existData.movedInDate,
          movedOutDate: updateRequest.movedOutDate ?? existData.movedOutDate,
          residentStatus:
            updateRequest.residentStatus ?? existData.residentStatus,
          unitId: updateRequest.unitId ?? existData.unitId,
          updatedAt: new Date(),
        },
      });

      return updatedData;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if ((error as any).code === 'P2025') {
          throw new NotFoundException(
            `Penghuni dengan id: ${id} tidak ditemukan`,
          );
        }
      }
      console.error((error as Error).message, (error as Error).cause);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Penghuni', // Perbaiki pesan error
      );
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.residents.findUnique({
        where: { id: id },
      });

      return await this.prisma.residents.delete({
        where: { id: id },
      });
    } catch (error) {
      if ((error as Error).name === 'NotFoundError') {
        throw new NotFoundException(
          `Penghuni dengan id: ${id} tidak ditemukan`,
        );
      }
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Menghapus Data Penghuni',
      );
    }
  }
}
