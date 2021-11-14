import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type:"varchar",nullable:false,unique:true})
    username:string

    @Column({type:"varchar",nullable:false})
    password:string
}