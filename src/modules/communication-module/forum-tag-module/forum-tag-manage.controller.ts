import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ForumTagManageService } from './forum-tag-manage.service';
import { CreateForumTagManageDto } from '../../../dtos/requests/create/create-forum-tag-manage.dto';
import { UpdateForumTagManageDto } from '../../../dtos/requests/update/update-forum-tag-manage.dto';

@Controller('forum-tag-manage')
export class ForumTagManageController {
  constructor(private readonly forumTagManageService: ForumTagManageService) {}

  @Post()
  create(@Body() createForumTagManageDto: CreateForumTagManageDto) {
    return this.forumTagManageService.create(createForumTagManageDto);
  }

  @Get()
  findAll() {
    return this.forumTagManageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumTagManageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateForumTagManageDto: UpdateForumTagManageDto,
  ) {
    return this.forumTagManageService.update(+id, updateForumTagManageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forumTagManageService.remove(+id);
  }
}
