import { Entity,Column,PrimaryGeneratedColumn, JoinColumn, PrimaryColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombre:string

    @Column()
    apellido:string

    @Column({nullable:true})
    edad:number

    @OneToOne(()=>User, (user)=> user.profile,{onDelete:"CASCADE"})
    user:User
    
}