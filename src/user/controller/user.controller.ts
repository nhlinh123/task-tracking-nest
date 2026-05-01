import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BaseResponse } from 'src/common';
import { UserDto } from '../dto/user.dto';
import { UserMessage } from '../constant/user.message';
import type { IUserService } from '../service/user.interface';
import type { Request } from 'express';
import { JwtGuard } from 'src/auth';
import { USER_SERVICE_TOKEN } from '../constant/user.token';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        @Inject(USER_SERVICE_TOKEN) private userService: IUserService
    ) {}

    @Get(':id')
    @UseGuards(JwtGuard)
    async getUserById(@Param('id') userId: string): Promise<BaseResponse<UserDto | null>> {
        const user: UserDto | null = await this.userService.getUserById(userId);
        return new BaseResponse<UserDto | null>(
            user,
            user === null ? UserMessage.USER_NOT_FOUND : '',
            HttpStatus.OK
        );
    }   

    @Post('update/:id')
    @UseGuards(JwtGuard)
    async patchUserById(@Param('id') userId: string, @Body() updateData: Partial<UserDto>, @Req() req: Request): Promise<BaseResponse<boolean>> {
        if (userId !== req.user?.['userId']) {
            return new BaseResponse<boolean>(
                false,
                UserMessage.USER_NOT_FOUND,
                HttpStatus.BAD_REQUEST
            );
        }
        const result: boolean = await this.userService.patchUserById(userId, updateData);
        return new BaseResponse<boolean>(
            result,
            result ? '' : UserMessage.USER_NOT_FOUND,
            HttpStatus.OK
        );
    }
}
