import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository
    ){}

    async register(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        await this.userRepository.createUser(authCredentialsDto)
    }
}
