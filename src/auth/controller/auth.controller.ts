import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { AUTH_SERVICE_TOKEN } from '../constant/auth.token';
import { RegisterDto } from '../dto/regiter.dto';
import { IJwtResponse } from '../model/jwt-response.model';
import { LoginDto } from '../dto/login.dto';
import { BaseResponse } from 'src/common';
import type { IAuthService } from '../service/auth.interface';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {   
    constructor(
        @Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService
    ) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 200, description: 'User created successfully' })
    async register(@Body() model: RegisterDto) {
        const result: IJwtResponse | string = await this.authService.register(model);
        if (typeof result === 'string') {
            return new BaseResponse<null>(null, result, HttpStatus.OK);
        }
        return new BaseResponse<IJwtResponse>(result);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login with email and password' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    async login(@Body() model: LoginDto) {
        const result: IJwtResponse | string = await this.authService.login(model);
        if (typeof result === 'string') {
            return new BaseResponse<null>(null, result, HttpStatus.OK);
        }
        return new BaseResponse<IJwtResponse>(result);
    }
}
