import { Post } from "src/post/entities/post.entity";
import { Entity,Column,PrimaryGeneratedColumn, JoinColumn,OneToOne, OneToMany } from "typeorm";
import { Profile } from "./profile.entity";
export enum UserRole {
    ADMIN = 'admin',
    ESTUDIANTE = 'estudiante',
    DOCENTE = 'docente',
  }
@Entity({name: 'user'})
export class User {
    
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // @Column({nullable : true})
  // authStrategy:string
  @Column({
    type: 'set',
    enum: UserRole,
    // default: [UserRole.DOCENTE],
  })
  roles: UserRole;

  @Column('varchar')
  nombres: string;

  @Column('varchar')
  apellidoPaterno: string;

  @Column('varchar')
  apellidoMaterno: string;

  @Column({type:"varchar",default:null})
  email: string;

  @Column({ type: 'int', width: 8 })
  telefono: string;

  @Column('varchar')
  direccion: string;

  @Column({ type: 'int', width: 8 })
  ci: string;

  //   @Column({ type: 'int', width: 10 }) //dato de estudiante
  //   ru: string;

  @Column({ type: 'date' })
  fnacimiento: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  // @OneToOne(() => Profile)
  // @JoinColumn()
  // profile: Profile;

  // @OneToMany(() => Post, (post) => post.autor)
  // posts: Post[];
}
