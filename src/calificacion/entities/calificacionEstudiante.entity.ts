import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Competencia } from 'src/competencia/entities/competencia.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Calificacion } from './calificacion.entity';

@Entity()
export class CalificacionEstudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calificacionId: number;

  @Column()
  estudianteId: number;

  @Column({default:0})
  calificacionObtenida: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @ManyToOne(() => Calificacion, (calificacion) => calificacion.calificacion)
  calificacion: Calificacion;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.inscripcion,{onDelete:'CASCADE'})
  estudiante: Estudiante;
}