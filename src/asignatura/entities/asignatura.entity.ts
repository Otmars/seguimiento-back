import { Competencia } from 'src/competencia/entities/competencia.entity';
import { Docente } from 'src/docente/entities/docente.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AsignaturaToCompetencia } from './asignaturaCompetencia.entity';

@Entity({ name: 'asignatura' })
export class Asignatura {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  nombre: string;


  @Column()
  siglaCodigo: string;

  @Column()
  cargaHoraria: number;

  // @Column()
  // RegNivelEst: string;

  @Column()
  nMeses: number;

  // @Column({default:"ninguno"})
  // prerequisito: string;

  @Column()
  paralelo:string;
  
  @ManyToOne(()=>Docente, (docente)=> docente.asignatura)
  docente: Docente

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @OneToMany(() => AsignaturaToCompetencia, (asignaturaCompetencia) => asignaturaCompetencia.asignatura)
  asignaturaCompetencia: AsignaturaToCompetencia [];
}
