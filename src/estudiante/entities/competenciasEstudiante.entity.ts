import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { Estudiante } from './estudiante.entity';
import { Competencia } from 'src/competencia/entities/competencia.entity';

@Entity()
export class CompetenciaEstudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  competenciaId: number;

  @Column()
  estudianteId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Competencia, (competencia) => competencia.asignaturaCompetencia)
  competencia: Competencia;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.competencia,{onDelete:'CASCADE'})
  estudiante: Estudiante;
}