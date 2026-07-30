import { Module } from '@nestjs/common';
import { SecurityManageService } from './security-manage.service';
import { SecurityManageController } from './security-manage.controller';
import { DatabaseModule } from '../../database/database.module';
import { DatabaseService } from '../../database/database.service';
import { GeneralHelper } from '../../common/helper/generalHelper';
import { UsersManageModule } from '../user-manage-module/users-manage.module';

@Module({
  imports: [DatabaseModule, UsersManageModule],
  controllers: [SecurityManageController],
  providers: [SecurityManageService, DatabaseService, GeneralHelper],
  exports: [SecurityManageService],
})
export class SecurityManageModule {}
