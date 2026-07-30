import { Module } from '@nestjs/common';
import { UnitManageService } from './unit-manage.service';
import { UnitManageController } from './unit-manage.controller';
import { DatabaseModule } from '../../database/database.module';
import { DatabaseService } from '../../database/database.service';
import { ResidentManageModule } from '../user-manage-module/resident-module/resident-manage.module';
import { GeneralHelper } from 'src/common/helper/generalHelper';

@Module({
  imports: [DatabaseModule, ResidentManageModule, UnitManageModule],
  controllers: [UnitManageController],
  providers: [UnitManageService, DatabaseService, GeneralHelper],
  exports: [UnitManageService],
})
export class UnitManageModule {}
