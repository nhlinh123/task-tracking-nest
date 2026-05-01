import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString } from "class-validator";

export class UserDto {
    @IsEmail()
    @ApiProperty({ example: 'test@gmail.com' })
    email!: string;

    @IsString()
    @ApiProperty({ example: 'John Doe' })
    name!: string;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({ example: '"1990-01-01T00:00:00.000Z' })
    dob!: Date;
}