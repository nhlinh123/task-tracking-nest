import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { RegisterDto } from './dto/regiter.dto';
import * as bcrypt from 'bcrypt';
import { IJwtResponse } from './model/jwt-response.model';
import { IAuthService } from './auth.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
    ) {}

    async register(model: RegisterDto): Promise<IJwtResponse> {
        const {email, password} = model;

        const isExistUser = await this.prismaService.user.findUnique({
            where : { email }
        });

        if (isExistUser) {
            throw new UnauthorizedException('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hashSync(password, 20);

        const user = await this.prismaService.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        return this.generateToken(user.id);
    }

    async login(model: LoginDto): Promise<IJwtResponse> {
        const {email, password} = model;
        const user = await this.prismaService.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatchPassword = await bcrypt.compareSync(password, user.password);
        if (!isMatchPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.generateToken(user.id);
    }

    private generateToken(userId: string): IJwtResponse {
        return {
            access_token: this.jwtService.sign({ userId })
        }
    }
}
