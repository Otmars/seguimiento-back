import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { Competencia } from 'src/competencia/entities/competencia.entity';
import { Docente } from 'src/docente/entities/docente.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CalificacionEstudiante } from './calificacionEstudiante.entity';
export enum tipoCalificacion {
  PARCIAL = 'Parcial',
  PRACTICA = 'Practica',
  FINAL = 'Final',
}
@Entity({ name: 'calificacion' })
export class Calificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  descripcion: string;

  @Column({
    nullable: false,
  })
  puntaje: number;

  @Column()
  asignaturaId: number;

  @Column({
    type: 'enum',
    enum: tipoCalificacion,
    nullable: false,
    default: tipoCalificacion.PRACTICA,
  })
  tipoCalificacion: tipoCalificacion;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Asignatura, (asignatura) => asignatura.calificaion)
  asignatura: Asignatura;

  @OneToMany(() => CalificacionEstudiante, (calificacionestudiante) => calificacionestudiante.calificacion)
  calificacion: CalificacionEstudiante [];
}
