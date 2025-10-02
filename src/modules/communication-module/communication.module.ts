import { Module } from '@nestjs/common';
import { AnnouncementManageModule } from './announcement-module/announcement-manage.module';
import { ForumPostManageModule } from './forum-post-module/forum-post-manage.module';
import { ForumCommentManageModule } from './forum-comment-module/forum-comment-manage.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { ResidentManageModule } from '../user-manage-module/resident-module/resident-manage.module';
import { EmployeeManageModule } from '../user-manage-module/employee-module/employee-manage.module';
import { ForumTagManageModule } from './forum-tag-module/forum-tag-manage.module';

@Module({
  imports: [
    DatabaseModule,
    AnnouncementManageModule,
    ForumPostManageModule,
    ForumCommentManageModule,
    ResidentManageModule,
    EmployeeManageModule,
    ForumTagManageModule,
  ],
  exports: [
    AnnouncementManageModule,
    ForumPostManageModule,
    ForumCommentManageModule,
  ],
})
export class CommunicationModule {}
