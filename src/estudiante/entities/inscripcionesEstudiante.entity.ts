import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Competencia } from 'src/competencia/entities/competencia.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { Estudiante } from './estudiante.entity';

@Entity()
export class Inscripciones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  asignaturaId: number;

  @Column()
  estudianteId: number;

  @Column()
  gestion: number;
  
  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @ManyToOne(() => Asignatura, (asignatura) => asignatura.asignaturaCompetencia)
  asignatura: Asignatura;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.inscripcion,{onDelete:'CASCADE'})
  estudiante: Estudiante;
}