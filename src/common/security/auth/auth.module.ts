import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from './jwt-strategy.service';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MailerManageModule } from 'src/common/helper/mail/mailer-manage.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsConfiguration } from 'src/common/helper/uploads/uploads-configuration';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    MulterModule.register(UploadsConfiguration.defaultConfig),
    DatabaseModule,
    MailerManageModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService, DatabaseService],
  exports: [AuthService, JwtStrategyService],
})
export class AuthModule {}
