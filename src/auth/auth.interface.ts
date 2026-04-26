import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/regiter.dto";
import { IJwtResponse } from "./model/jwt-response.model";

export interface IAuthService {
    register(model: RegisterDto): Promise<IJwtResponse>;
    login(model: LoginDto): Promise<IJwtResponse>;
}