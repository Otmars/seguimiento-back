import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    content:string
    
    @Column()
    autorId:string
    
    // @ManyToOne(()=> User, user => user.posts,{onDelete:"CASCADE"})
    // autor:string
}
