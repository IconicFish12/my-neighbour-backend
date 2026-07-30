import { Module } from '@nestjs/common';
import { FamilyCodeManageService } from './family-code-manage.service';
import { FamilyCodeManageController } from './family-code-manage.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FamilyCodeManageController],
  providers: [FamilyCodeManageService, DatabaseService],
  exports: [FamilyCodeManageService],
})
export class FamilyCodeManageModule {}
