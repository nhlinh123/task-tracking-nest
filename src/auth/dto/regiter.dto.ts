import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    @ApiProperty({ example: 'test@gmail.com' })
    email!: string;
    
    @IsString()
    @MinLength(6)
    @ApiProperty({ example: 'password123' })
    password!: string;

    @IsString()
    @ApiProperty({ example: 'John Doe' })
    name!: string;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
    dob!: Date;
}