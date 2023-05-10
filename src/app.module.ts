import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { PostModule } from './post/post.module';

import { CompetenciaModule } from './competencia/competencia.module';
import { AsignaturaModule } from './asignatura/asignatura.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { DocenteModule } from './docente/docente.module';
import { CalificacionModule } from './calificacion/calificacion.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Docente } from './docente/entities/docente.entity';
import { Asignatura } from './asignatura/entities/asignatura.entity';
import { Roles } from './user/entities/roles.entity';
import { Estudiante } from './estudiante/entities/estudiante.entity';
import { Competencia } from './competencia/entities/competencia.entity';
import { AsignaturaToCompetencia } from './asignatura/entities/asignaturaCompetencia.entity';
import { Inscripciones } from './estudiante/entities/inscripcionesEstudiante.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Docente,
        Asignatura,
        Roles,
        Estudiante,
        Competencia,
        AsignaturaToCompetencia,
        Inscripciones
      ],
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
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
  }
}
