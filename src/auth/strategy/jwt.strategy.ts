import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {ExtractJwt,Strategy} from 'passport-jwt'
import { JwtPayloadInterface } from "../interface/jwtPayload.interface";
import { UserRepository } from "../repository/user.repository";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository
    ){
        super({
            secretOrKey:"StrongSecret",
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload:JwtPayloadInterface){
        const {username}=payload
        const user=await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException()
        }
        return user
    }
}