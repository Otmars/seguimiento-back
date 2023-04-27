import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Asignatura, (asignatura) => asignatura.asignaturaCompetencia)
  asignatura: Asignatura;

  @ManyToOne(
    () => Competencia,
    (competencia) => competencia.asignaturaCompetencia,
  )
  competencia: Competencia;
}
