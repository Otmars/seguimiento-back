import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { Profile } from './user/entities/profile.entity';
import { CompetenciaModule } from './competencia/competencia.module';
import { AsignaturaModule } from './asignatura/asignatura.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { DocenteModule } from './docente/docente.module';
import { CalificacionModule } from './calificacion/calificacion.module';
import { AppDataSource } from './db/data-source';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Docente } from './docente/entities/docente.entity';
import { Asignatura } from './asignatura/entities/asignatura.entity';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt( process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Docente,Asignatura ],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    CompetenciaModule,
    AsignaturaModule,
    EstudianteModule,
    DocenteModule,
    CalificacionModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port:number
  constructor(private readonly configService:ConfigService){
    AppModule.port = +this.configService.get('PORT')
  }
}
