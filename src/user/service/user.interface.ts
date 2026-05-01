import { UserDto } from "../dto/user.dto";

export interface IUserService {
    getUserById(userId:string): Promise<UserDto | null>;
    patchUserById(userId: string, updateData: Partial<UserDto>): Promise<boolean>;
}