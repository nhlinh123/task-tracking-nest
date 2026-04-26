import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategies } from './strategies/jwt.strategies';
import { AuthController } from './auth.controller';
import { AUTH_SERVICE_TOKEN } from './auth.token';


@Module({
  imports: [
    JwtModule.register({
      secret: "VERY_SECRET_KEY",
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: [
    JwtStrategies,
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService
    }
  ],
  controllers: [AuthController],
  exports: [
    AUTH_SERVICE_TOKEN
  ]
})
export class AuthModule {}
