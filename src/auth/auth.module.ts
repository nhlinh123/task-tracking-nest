import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { JwtStrategies } from './strategies/jwt.strategies';
import { AuthController } from './controller/auth.controller';
import { AUTH_SERVICE_TOKEN } from './constant/auth.token';
import { AuthRepository } from './repository/auth.repository';
import { JwtGuard } from './guards/jwt.guard';


@Module({
  imports: [
    JwtModule.register({
      secret: "VERY_SECRET_KEY",
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: [
    AuthRepository,
    JwtStrategies,
    JwtGuard,
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService
    }
  ],
  controllers: [AuthController],
  exports: [
    AUTH_SERVICE_TOKEN,
    JwtModule,
    JwtGuard
  ]
})
export class AuthModule {}
