import { Injectable } from '@nestjs/common';
import { CreateForumTagManageDto } from '../../../dtos/requests/create/create-forum-tag-manage.dto';
import { UpdateForumTagManageDto } from '../../../dtos/requests/update/update-forum-tag-manage.dto';

@Injectable()
export class ForumTagManageService {
  async create(createRequest: CreateForumTagManageDto) {}

  async findAll() {}

  async findOne(id: number) {}

  async update(id: number, updateRequest: UpdateForumTagManageDto) {}

  async remove(id: number) {}
}
