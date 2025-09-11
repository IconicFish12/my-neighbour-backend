import { Module } from '@nestjs/common';
import { ExportsManageModule } from './export/exports-manage.module';
import { MailerManageModule } from './mail/mailer-manage.module';
import { GeneralHelper } from './generalHelper';
import { MidtransModule } from './midtrans/midtrans.module';
import { UploadFilesModule } from './uploads/uploads.module';

@Module({
  imports: [
    ExportsManageModule,
    MailerManageModule,
    MidtransModule,
    UploadFilesModule,
  ],
  providers: [GeneralHelper],
  exports: [
    ExportsManageModule,
    MailerManageModule,
    MidtransModule,
    UploadFilesModule,
  ],
})
export class HelperModule {}
