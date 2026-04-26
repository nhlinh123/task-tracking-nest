import { Body, Controller, Inject, Post } from '@nestjs/common';
import type { IAuthService } from './auth.interface';
import { AUTH_SERVICE_TOKEN } from './auth.token';
import { RegisterDto } from './dto/regiter.dto';
import { IJwtResponse } from './model/jwt-response.model';
import { BaseResponse } from 'src/common/model/base-response.interface';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService
    ) {}

    @Post('register')
    async register(@Body() model: RegisterDto) {
        const reponse = await this.authService.register(model);
        return new BaseResponse<IJwtResponse>(reponse);
    }

    @Post('login')
    async login(@Body() model: LoginDto) {
        const reponse = await this.authService.login(model);
        return new BaseResponse<IJwtResponse>(reponse);
    }
}
