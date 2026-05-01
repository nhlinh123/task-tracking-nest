import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { USER_SERVICE_TOKEN } from './constant/user.token';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService
    }
  ],
  exports: [
    USER_SERVICE_TOKEN
  ]
})
export class UserModule {}
