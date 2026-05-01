import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import { UserMessage } from '../constant/user.message';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
    ) {}

    async getUserById(userId:string): Promise<UserDto | null> {
        const user: UserDto | null = await this.userRepository.getUserById(userId);
        return user;
    }

    async patchUserById(userId: string, updateData: Partial<UserDto>): Promise<boolean> {
        const result: boolean = await this.userRepository.patchUserById(userId, updateData);
        return result;
    }
}
