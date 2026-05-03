import { Injectable } from '@nestjs/common';
import { mapSameFields } from 'src/common/mapper';
import { UserDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
    ) {}

    async getUserById(userId:string): Promise<UserDto | null> {
        const user: UserEntity | null = await this.userRepository.getUserById(userId);
        if (!user) {
            return null;
        }
        return mapSameFields(user, () => new UserDto());
    }

    async patchUserById(userId: string, updateData: Partial<UserDto>): Promise<boolean> {
        const result: boolean = await this.userRepository.patchUserById(userId, updateData);
        return result;
    }
}
