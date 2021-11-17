import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.register({
      secret:"StrongSecret",
      signOptions:{
        expiresIn:86400 // 1 day
      }
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
