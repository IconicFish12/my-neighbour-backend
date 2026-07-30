/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateForumPostManageDto } from '../../../dtos/requests/create/create-forum-post-manage.dto';
import { UpdateForumPostManageDto } from '../../../dtos/requests/update/update-forum-post-manage.dto';
import { DatabaseService } from '../../../database/database.service';
import { Prisma } from 'src/database/generated/prisma/client.ts';
import { UploadsService } from 'src/common/helper/uploads/uploads.service';
import { GeneralHelper } from 'src/common/helper/generalHelper';

interface FileAttachment {
  path: string;
  originalName?: string;
  size?: number;
  mimetype?: string;
  uploadedAt?: Date;
}

interface ForumPostWithAttachments {
  attachments: string[] | FileAttachment[] | null;
  [key: string]: any;
}
@Injectable()
export class ForumPostManageService extends UploadsService {
  constructor(private readonly prisma: DatabaseService) {
    super();
  }
  async create(
    createRequest: CreateForumPostManageDto,
    files?: Express.Multer.File[],
  ) {
    try {
      const filesPath = this.processFiles(files);

      const user = await this.prisma.users.findUnique({
        where: { id: createRequest.userId },
      });

      return await this.prisma.forumPosts.create({
        data: {
          title: createRequest.title,
          content: createRequest.content,
          authorRole: user?.role || createRequest.authorRole,
          attachments: filesPath,
          user: { connect: { id: createRequest.userId } },
          tags: {
            connectOrCreate: {
              create: {
                tagName: createRequest.tagName,
              },
              where: {
                id: createRequest.tagId || undefined,
                tagName: createRequest.tagName,
              },
            },
          },
        },
        include: {
          tags: true,
        },
      });
    } catch (error) {
      if ((error as Error).name === 'NotFoundError') {
        throw new NotFoundException(
          `Postingan forum dengan id: ${createRequest.tagId} tidak ditemukan`,
        );
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if ((error as any).code === 'P2025') {
          throw new NotFoundException(
            `Postingan forum dengan id: ${createRequest.tagId} tidak ditemukan`,
          );
        }
      }
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Membuat Data Postingan forum',
      );
    }
  }

  async findAll() {
    try {
      const forumPostData = await this.prisma.forumPosts.findMany({
        include: {
          _count: { select: { comments: true, tags: true } },
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
          title: 'asc',
        },
      });

      return forumPostData.map((data) => ({
        ...data,
        attachments: this.safeParseAttachments(data.attachments),
      }));
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Postingan forum',
      );
    }
  }

  async findOne(id: string) {
    try {
      const forumPostData = await this.prisma.forumPosts.findUniqueOrThrow({
        where: { id: id },
        include: {
          comments: true,
          tags: true,
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
      });

      return {
        ...forumPostData,
        attachments: this.safeParseAttachments(forumPostData.attachments),
      };
    } catch (error) {
      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Data Postingan forum',
      );
    }
  }

  async update(
    id: string,
    updateRequest: UpdateForumPostManageDto,
    files?: Express.Multer.File[],
  ) {
    try {
      const existData = await this.prisma.forumPosts.findUniqueOrThrow({
        where: { id: id },
      });

      let filesPath: string[] = [];

      if (files && files.length > 0) {
        filesPath = this.processFiles(files);

        const oldAttachments = this.safeParseAttachments(existData.attachments);
        for (const oldPath of oldAttachments) {
          GeneralHelper.deleteFile(oldPath);
        }
      } else {
        filesPath = this.safeParseAttachments(existData.attachments);
      }

      return await this.prisma.forumPosts.update({
        where: { id: id },
        data: {
          title: updateRequest.title ?? existData.title,
          content: updateRequest.content ?? existData.content,
          authorRole: updateRequest.authorRole ?? existData.authorRole,
          attachments: filesPath ?? existData.attachments,
          user: existData.userId
            ? { connect: { id: updateRequest.userId } }
            : undefined,
          tags: { connect: { id: updateRequest.tagId } },
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if ((error as Error).name === 'NotFoundError') {
        throw new NotFoundException(
          `Postingan forum dengan id: ${id} tidak ditemukan`,
        );
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if ((error as any).code === 'P2025') {
          throw new NotFoundException(
            `Postingan forum dengan id: ${id} tidak ditemukan`,
          );
        }
      }

      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Postingan forum',
      );
    }
  }

  async remove(id: string) {
    try {
      const existData = await this.prisma.forumPosts.findUniqueOrThrow({
        where: { id: id },
      });

      const attachmentPaths = this.safeParseAttachments(existData.attachments);
      for (const filePath of attachmentPaths) {
        GeneralHelper.deleteFile(filePath);
      }

      return await this.prisma.forumPosts.delete({
        where: { id: id },
      });
    } catch (error) {
      if ((error as Error).name === 'NotFoundError') {
        throw new NotFoundException(
          `Postingan forum dengan id: ${id} tidak ditemukan`,
        );
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if ((error as any).code === 'P2025') {
          throw new NotFoundException(
            `Postingan forum dengan id: ${id} tidak ditemukan`,
          );
        }
      }

      console.error((error as Error).message);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan Saat Mendapatkan Postingan forum',
      );
    }
  }
}
