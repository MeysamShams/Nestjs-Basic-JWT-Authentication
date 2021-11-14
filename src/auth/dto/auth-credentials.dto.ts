import { IsNotEmpty, IsString, Length } from "class-validator"

export class AuthCredentialsDto{
    
    @IsNotEmpty()
    @Length(6,100)
    @IsString()
    username:string

    @IsNotEmpty()
    @Length(6,100)
    @IsString()
    password:string
}