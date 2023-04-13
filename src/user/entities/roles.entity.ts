import { Entity,Column,PrimaryGeneratedColumn, JoinColumn, PrimaryColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombreRol:string

}