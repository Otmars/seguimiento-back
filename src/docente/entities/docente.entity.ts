import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'docente' })
export class Docente {
  @PrimaryGeneratedColumn()
    id: number;

  // @OneToOne(()=>User, (user)=> user.profile,{onDelete:"CASCADE"})
    // user:User
    @OneToOne(()=>User,{ onDelete : 'CASCADE'})
    @JoinColumn()
    iduser:string

    @OneToMany(()=>Asignatura, (asignatura)=>asignatura.docente)
    asignatura = Asignatura
}
