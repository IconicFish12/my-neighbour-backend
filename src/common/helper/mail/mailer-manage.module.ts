import { Module } from '@nestjs/common';
import * as path from 'path';
import { MailerManageService } from './mailer-manage.service';
import { MailerManageController } from './mailer-manage.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { EmployeeManageModule } from 'src/modules/user-manage-module/employee-module/employee-manage.module';
import { ResidentManageModule } from 'src/modules/user-manage-module/resident-module/resident-manage.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    EmployeeManageModule,
    ResidentManageModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST', 'smtp.gmail.com'),
          port: configService.get<number>('MAIL_PORT', 465),
          secure: true, // ✅ True untuk port 465 (SSL)
          auth: {
            user: configService.get<string>('MAIL_USERNAME'), // ✅ Fix variable name
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
          // ✅ Remove conflicting TLS settings for Gmail
          pool: true, // ✅ Enable connection pooling
          maxConnections: 5,
          maxMessages: 100,
          rateDelta: 20000,
          rateLimit: 5,
        },
        defaults: {
          from: `"${configService.get<string>('MAIL_FROM_NAME', 'No Reply')}" <${configService.get<string>('MAIL_USERNAME')}>`,
        },
        template: {
          dir: path.join(__dirname, '../mail/templates'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [MailerManageController],
  providers: [MailerManageService],
  exports: [MailerManageService],
})
export class MailerManageModule {}
