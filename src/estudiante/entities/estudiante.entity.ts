import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inscripciones } from "./inscripcionesEstudiante.entity";

@Entity({name:'estudiante'})
export class Estudiante {
    @PrimaryGeneratedColumn()
    id: number;

  // @OneToOne(()=>User, (user)=> user.profile,{onDelete:"CASCADE"})
    // user:User
    @Column({default: null})
    ru: number  // registro universitario

    @OneToOne(()=>User,{ onDelete : 'CASCADE'})
    @JoinColumn()
    iduser:string

    @OneToMany(() => Inscripciones, (inscripcion) => inscripcion.estudiante)
  inscripcion: Inscripciones [];
}
