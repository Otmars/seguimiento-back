import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Inscripciones } from './entities/inscripcionesEstudiante.entity';
import { CompetenciaEstudiante } from './entities/competenciasEstudiante.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { Competencia } from 'src/competencia/entities/competencia.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Estudiante,Inscripciones,CompetenciaEstudiante,Asignatura,Competencia])],
  controllers: [EstudianteController],
  providers: [EstudianteService],

})
export class EstudianteModule {}
