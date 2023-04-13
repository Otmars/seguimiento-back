import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'asignatura' })
export class Asignatura {
  @PrimaryColumn()
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

  @Column()
  prerequisito: string;
}
