import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/regiter.dto';
import * as bcrypt from 'bcrypt';
import { IJwtResponse } from '../model/jwt-response.model';
import { IAuthService } from './auth.interface';
import { LoginDto } from '../dto/login.dto';
import { AuthRepository } from '../repository/auth.repository';
import { AuthMessage } from '../constant/auth.message';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private authRepository: AuthRepository,
        private jwtService: JwtService
    ) {}

    async register(model: RegisterDto): Promise<IJwtResponse | string> {
        const {email, password} = model;

        const isExistUser = await this.authRepository.findByEmail(email);

        if (isExistUser) {
            return AuthMessage.EMAIL_EXIST;
        }

        const hashedPassword = await bcrypt.hashSync(password, 20);

        const user = await this.authRepository.createUser({
            ...model,
            password: hashedPassword
        });

        return this.generateToken(user.id);
    }

    async login(model: LoginDto): Promise<IJwtResponse | string> {
        const {email, password} = model;

        
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            return AuthMessage.INVALID_CREDENTIALS;
        }

        const isMatchPassword = await bcrypt.compareSync(password, user.password);
        if (!isMatchPassword) {
            return AuthMessage.INVALID_CREDENTIALS;
        }

        return this.generateToken(user.id);
    }

    private generateToken(userId: string): IJwtResponse {
        return {
            access_token: this.jwtService.sign({ userId })
        }
    }
}
