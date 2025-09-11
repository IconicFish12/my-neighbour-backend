import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUnitManageDto } from '../../dtos/requests/create/create-unit-manage.dto';
import { UpdateUnitManageDto } from '../../dtos/requests/update/update-unit-manage.dto';
import { DatabaseService } from '../../common/database/database.service';
import { GeneralHelper } from '../../common/helper/generalHelper';
import { PrismaClientKnownRequestError } from '../../common/database/generated/prisma/runtime/library';
import { UnitStatus } from 'src/common/database/generated/prisma';

@Injectable()
export class UnitManageService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly helper: GeneralHelper,
  ) {}
  async create(createRequest: CreateUnitManageDto) {
    try {
      return await this.prisma.units.create({
        data: {
          unitNumber: createRequest.unitNumber,
          buildingName: createRequest.buildingName ?? null,
          location: createRequest.location,
          priceSale: this.helper.twoDecimal(createRequest.priceSale),
          floorNumber: createRequest.floorNumber ?? null,
          status: UnitStatus.AVAILABLE,
          numberOfRooms: createRequest.numberOfRooms ?? null,
          squareFootage: createRequest.squareFootage ?? null,
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Membuat Data Unit Hunian',
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.units.findMany({
        include: {
          _count: {
            select: {
              Complaints: true,
              Residents: true,
              Bills: true,
              Payments: true,
            },
          },
        },
        orderBy: {
          unitNumber: 'asc',
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Unit Hunian',
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.units.findUniqueOrThrow({
        where: { id: id },
        include: {
          Bills: {
            select: {
              amount: true,
            },
          },
          Complaints: {
            select: {
              title: true,
              category: true,
              description: true,
              resolutionDetails: true,
              submittedAt: true,
              resolvedAt: true,
              status: true,
              images: true,
            },
            orderBy: { title: 'asc' },
          },
          Residents: {
            include: {
              user: {
                select: {
                  fullName: true,
                  firstName: true,
                  lastName: true,
                  contactNumber: true,
                  dateOfBirth: true,
                  gender: true,
                  username: true,
                  primaryEmail: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Unit Hunian',
      );
    }
  }

  async update(id: string, updateRequest: UpdateUnitManageDto) {
    try {
      const existData = await this.prisma.units.findUniqueOrThrow({
        where: { id: id },
      });

      if (!existData) {
        throw new NotFoundException(
          `Unit Hunian dengan id: ${id} tidak ditemukan`,
        );
      }

      return await this.prisma.units.update({
        where: { id: id },
        data: {
          unitNumber: updateRequest.unitNumber ?? existData.unitNumber,
          buildingName: updateRequest.buildingName ?? existData.buildingName,
          location: updateRequest.location ?? existData.location,
          priceSale:
            this.helper.twoDecimal(updateRequest.priceSale!) ??
            existData.priceSale,
          status: updateRequest.status ?? existData.status,
          floorNumber: updateRequest.floorNumber ?? existData.floorNumber,
          numberOfRooms: updateRequest.numberOfRooms ?? existData.numberOfRooms,
          squareFootage: updateRequest.squareFootage ?? existData.squareFootage,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Unit Hunian dengan id: ${id} tidak ditemukan`,
          );
        }
      }
      console.error((error as Error).message, (error as Error).cause);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Unit Hunian', // Perbaiki pesan error
      );
    }
  }

  async remove(id: string) {
    try {
      const existData = await this.prisma.units.findUnique({
        where: { id: id },
      });

      if (!existData) {
        throw new NotFoundException(
          `Unit Hunian dengan id: ${id} tidak ditemukan`,
        );
      }

      return await this.prisma.units.delete({
        where: { id: id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Unit Hunian dengan id: ${id} tidak ditemukan`,
          );
        }
      }
      console.error((error as Error).message, (error as Error).cause);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Unit Hunian', // Perbaiki pesan error
      );
    }
  }
}
