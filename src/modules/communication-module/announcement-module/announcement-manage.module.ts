import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AnnouncementManageService } from './announcement-manage.service';
import { AnnouncementManageController } from './announcement-manage.controller';
import { DatabaseService } from 'src/database/database.service';
import { GeneralHelper } from '../../../common/helper/generalHelper';
import { EmployeeManageModule } from '../../../modules/user-manage-module/employee-module/employee-manage.module';
import { UploadsConfiguration } from 'src/common/helper/uploads/uploads-configuration';

@Module({
  imports: [
    EmployeeManageModule,
    MulterModule.register(UploadsConfiguration.defaultConfig),
  ],
  controllers: [AnnouncementManageController],
  providers: [AnnouncementManageService, DatabaseService, GeneralHelper],
  exports: [AnnouncementManageService],
})
export class AnnouncementManageModule {}
