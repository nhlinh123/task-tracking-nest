import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { RegisterDto } from "../dto/regiter.dto";

@Injectable()
export class AuthRepository {
  constructor(
    private prisma: PrismaService
) {}

  findByEmail(email: string) {
    try {
      const user = this.prisma.user.findUnique({
        where: { email }
      });
      return user;
    } catch (error) {
      throw new Error('Error occurred while finding user by email');
    }
  }

  createUser(data: RegisterDto) {
    try {
        return this.prisma.user.create({ data });
    } catch (error) {
        throw new Error('Error occurred while creating user');
    }
  }
}