import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString } from "class-validator";

export class UserEntity {
    @IsString()
    id!: string;

    @IsEmail()
    email!: string;

    @IsString()
    password!: string;

    @IsString()
    name!: string;

    @IsDate()
    @Type(() => Date)
    dob!: Date;

    @IsDate()
    @Type(() => Date)
    createdAt!: Date;
}