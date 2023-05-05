import { Post } from "src/post/entities/post.entity";
import { Entity,Column,PrimaryGeneratedColumn, JoinColumn,OneToOne, OneToMany, ManyToOne, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "./roles.entity";

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
 
  @ManyToOne(() => Roles, (user)=> user.nombreRol )
  rol: Roles

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

  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  // @OneToOne(() => Profile)
  // @JoinColumn()
  // profile: Profile;

  // @OneToMany(() => Post, (post) => post.autor)
  // posts: Post[];
}
