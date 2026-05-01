import { IsDate, IsEmail, IsString } from "class-validator";

export class UserDto {
    email!: string;

    @IsString()
    name!: string;

    @IsDate()
    dob!: Date;
}