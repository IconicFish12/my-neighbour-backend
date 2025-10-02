import { Module } from '@nestjs/common';
import { ForumTagManageService } from './forum-tag-manage.service';
import { ForumTagManageController } from './forum-tag-manage.controller';
import { DatabaseModule } from '../../../common/database/database.module';
import { DatabaseService } from '../../../common/database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ForumTagManageController],
  providers: [ForumTagManageService, DatabaseService],
  exports: [ForumTagManageService],
})
export class ForumTagManageModule {}
