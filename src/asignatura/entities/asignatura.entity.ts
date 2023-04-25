import { Docente } from 'src/docente/entities/docente.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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

}
