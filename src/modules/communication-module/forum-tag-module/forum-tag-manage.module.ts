import { Module } from '@nestjs/common';
import { ForumTagManageService } from './forum-tag-manage.service';
import { ForumTagManageController } from './forum-tag-manage.controller';
import { DatabaseModule } from '../../../database/database.module';
import { DatabaseService } from '../../../database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ForumTagManageController],
  providers: [ForumTagManageService, DatabaseService],
  exports: [ForumTagManageService],
})
export class ForumTagManageModule {}
