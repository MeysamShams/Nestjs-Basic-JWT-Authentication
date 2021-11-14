import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import {AuthCredentialsDto} from '../dto/auth-credentials.dto'
import * as bcrypt from 'bcrypt'
import { BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async createUser(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        const {username,password}=authCredentialsDto
        try{

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        
        const user=this.create({username,password:hashedPassword})
        
        await user.save()
        }catch(e){
            if(e.code='23505') // duplicated username error code
                throw new ConflictException("Username already exist !")
            else
                throw new InternalServerErrorException()
                
        }
    }

    async checkCredentials(authCredentialsDto:AuthCredentialsDto):Promise<boolean>{
        const {username,password}=authCredentialsDto

        const user=await this.findOne({username});
        
        if(user && (await bcrypt.compare(password,user.password))) {
            return true;
        }
        else throw new BadRequestException("Username or password is wrong ! ")


    }
}