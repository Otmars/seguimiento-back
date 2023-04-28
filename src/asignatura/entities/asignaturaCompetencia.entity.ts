import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Asignatura } from './asignatura.entity';
import { Competencia } from 'src/competencia/entities/competencia.entity';

@Entity()
export class AsignaturaToCompetencia {
  @PrimaryGeneratedColumn()
  asignaturaCompetenciaId: number;

  @Column()
  asignaturaId: number;

  @Column()
  competenciaId: number;
  
  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @ManyToOne(() => Asignatura, (asignatura) => asignatura.asignaturaCompetencia)
  asignatura: Asignatura;

  @ManyToOne(
    () => Competencia,
    (competencia) => competencia.asignaturaCompetencia,
  )
  competencia: Competencia;
}
