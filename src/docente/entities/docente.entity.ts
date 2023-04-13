import { User } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'docente' })
export class Docente {
  @PrimaryGeneratedColumn()
    id: number;

  // @OneToOne(()=>User, (user)=> user.profile,{onDelete:"CASCADE"})
    // user:User
    @OneToOne(()=>User)
    @JoinColumn()
    iduser:string
}
