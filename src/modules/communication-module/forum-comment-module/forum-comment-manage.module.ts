import { Module } from '@nestjs/common';
import { ForumCommentManageService } from './forum-comment-manage.service';
import { ForumCommentManageController } from './forum-comment-manage.controller';
import { DatabaseService } from '../../../database/database.service';
import { GeneralHelper } from '../../../common/helper/generalHelper';
import { AppUserManageModule } from '../../../modules/user-manage-module/app-users-module/app-user-manage.module';
import { EmployeeManageModule } from '../../../modules/user-manage-module/employee-module/employee-manage.module';
import { ResidentManageModule } from '../../../modules/user-manage-module/resident-module/resident-manage.module';

@Module({
  imports: [AppUserManageModule, EmployeeManageModule, ResidentManageModule],
  controllers: [ForumCommentManageController],
  providers: [ForumCommentManageService, DatabaseService, GeneralHelper],
  exports: [ForumCommentManageService],
})
export class ForumCommentManageModule {}
