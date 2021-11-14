import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayloadInterface } from './interface/jwtPayload.interface';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        private jwtService:JwtService
    ){}

    async register(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        await this.userRepository.createUser(authCredentialsDto)
    }

    async login(authCredentialsDto:AuthCredentialsDto):Promise<{token:string}>{
        const {username}=authCredentialsDto;

        // check username and password
        await this.userRepository.checkCredentials(authCredentialsDto)
        
        
        const payload:JwtPayloadInterface={username}

        const token=await this.jwtService.signAsync(payload)
        
        return {token};
    }
}
