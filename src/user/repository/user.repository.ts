import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';


@Injectable()
export class UserRepository {
    constructor(
        private prismaService: PrismaService,
    ) {}

    async getUserById(userId:string): Promise<UserEntity | null> {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id: userId }
            });
            return user;
        } catch (error) {
            console.error('Error occurred while getting user by id:', error);
            return null;
        }
    }

    async patchUserById(userId: string, updateData: Partial<UserDto>): Promise<boolean> {
        try {
            const user = await this.prismaService.user.update({
                where: { id: userId },
                data: updateData
            });

            if (!user) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }
}
