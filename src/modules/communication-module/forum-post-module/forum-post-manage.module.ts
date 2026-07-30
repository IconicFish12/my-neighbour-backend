import { Module } from '@nestjs/common';
import { ForumPostManageService } from './forum-post-manage.service';
import { ForumPostManageController } from './forum-post-manage.controller';
import { DatabaseService } from '../../../database/database.service';
import { GeneralHelper } from '../../../common/helper/generalHelper';
import { AppUserManageModule } from '../../../modules/user-manage-module/app-users-module/app-user-manage.module';
import { EmployeeManageModule } from '../../../modules/user-manage-module/employee-module/employee-manage.module';
import { ResidentManageModule } from '../../../modules/user-manage-module/resident-module/resident-manage.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsConfiguration } from 'src/common/helper/uploads/uploads-configuration';

@Module({
  imports: [
    AppUserManageModule,
    EmployeeManageModule,
    ResidentManageModule,
    MulterModule.register(UploadsConfiguration.forumPostConfig),
  ],
  controllers: [ForumPostManageController],
  providers: [ForumPostManageService, DatabaseService, GeneralHelper],
  exports: [ForumPostManageService],
})
export class ForumPostManageModule {}
