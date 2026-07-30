import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateForumCommentManageDto } from '../../../dtos/requests/create/create-forum-comment-manage.dto';
import { UpdateForumCommentManageDto } from '../../../dtos/requests/update/update-forum-comment-manage.dto';
import { DatabaseService } from '../../../database/database.service';
import { Prisma } from 'src/database/generated/prisma/client.ts';

@Injectable()
export class ForumCommentManageService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createRequest: CreateForumCommentManageDto) {
    try {
      return await this.prisma.forumComments.create({
        data: {
          content: createRequest.content,
          postId: createRequest.postId,
          userId: createRequest.userId,
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Membuat Data Comment post ',
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.forumComments.findMany({
        include: {
          user: {
            select: {
              fullName: true,
              firstName: true,
              lastName: true,
              role: true,
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Membuat Data Comment post ',
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.forumComments.findUniqueOrThrow({
        where: { id: id },
        include: {
          user: {
            select: {
              fullName: true,
              firstName: true,
              lastName: true,
              role: true,
              username: true,
            },
          },
          post: {
            select: {
              title: true,
              content: true,
              attachments: true,
              tags: true,
            },
          },
        },
      });
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Membuat Data Comment post ',
      );
    }
  }

  async update(id: string, updateRequest: UpdateForumCommentManageDto) {
    try {
      const existData = await this.prisma.forumComments.findUniqueOrThrow({
        where: { id: id },
      });

      if (!existData) {
        throw new NotFoundException(
          `Data Comment post  dengan id: ${id} tidak ditemukan`,
        );
      }

      return await this.prisma.forumComments.update({
        where: { id: id },
        data: {
          content: updateRequest.content,
          postId: updateRequest.postId,
          userId: updateRequest.userId,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if ((error as Error).name === 'NotFoundError') {
        throw new NotFoundException(
          `Comment post  dengan id: ${id} tidak ditemukan`,
        );
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if ((error as any).code === 'P2025') {
          throw new NotFoundException(
            `Comment post  dengan id: ${id} tidak ditemukan`,
          );
        }
      }

      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Comment post ',
      );
    }
  }

  async remove(id: string) {
    try {
      const existData = await this.prisma.forumComments.findUnique({
        where: { id: id },
      });

      if (!existData) {
        throw new NotFoundException(
          `Data Comment post  dengan id: ${id} tidak ditemukan`,
        );
      }

      return await this.prisma.forumComments.delete({
        where: { id: id },
      });
    } catch (error) {
      if ((error as Error).name === 'NotFoundError') {
        throw new NotFoundException(
          `Comment post  dengan id: ${id} tidak ditemukan`,
        );
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if ((error as any).code === 'P2025') {
          throw new NotFoundException(
            `Comment post  dengan id: ${id} tidak ditemukan`,
          );
        }
      }

      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Comment post ',
      );
    }
  }
}
