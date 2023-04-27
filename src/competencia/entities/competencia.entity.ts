import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { AsignaturaToCompetencia } from 'src/asignatura/entities/asignaturaCompetencia.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export enum TipoCompentecia {
  MACRO = 'macro',
  GENERICAS = 'generica',
  ESPECIFICAS = 'especifica',
}

@Entity('competencia')
export class Competencia {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: false,
  })
  descripcion: string;

  @Column({
    type: 'enum',
    enum: TipoCompentecia,
    nullable: false,
  })
  tipoCompetencia: TipoCompentecia;

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => AsignaturaToCompetencia,
    (asignaturaCompetencia) => asignaturaCompetencia.competencia,
  )
  asignaturaCompetencia: AsignaturaToCompetencia[];
}
