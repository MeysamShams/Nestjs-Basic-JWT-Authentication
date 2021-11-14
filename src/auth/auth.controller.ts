import { Body, Controller, Get, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post("/register")
    @UsePipes(ValidationPipe)
    register(@Body() authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.authService.register(authCredentialsDto)
    }
}
