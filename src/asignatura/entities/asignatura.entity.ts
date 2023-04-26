import { Docente } from 'src/docente/entities/docente.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'asignatura' })
export class Asignatura {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  nombre: string;

  @Column()
  ciclo: string;

  @Column()
  siglaCodigo: string;

  @Column()
  cargaHoraria: string;

  @Column()
  RegNivelEst: string;

  @Column()
  nMeses: number;

  @Column({default:"ninguno"})
  prerequisito: string;

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
  
}
