import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  PrimaryColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreRol: string;

  @OneToMany(() => User, (user) => user.rol)
  rol: Roles[];
}
 