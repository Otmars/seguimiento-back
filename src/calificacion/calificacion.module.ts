import { Module } from '@nestjs/common';
import { CalificacionService } from './calificacion.service';
import { CalificacionController } from './calificacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calificacion } from './entities/calificacion.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { AsignaturaService } from 'src/asignatura/asignatura.service';
import { AsignaturaModule } from 'src/asignatura/asignatura.module';
import { CalificacionEstudiante } from './entities/calificacionEstudiante.entity';
import { Inscripciones } from 'src/estudiante/entities/inscripcionesEstudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calificacion,CalificacionEstudiante,Inscripciones]),AsignaturaModule],
  controllers: [CalificacionController],
  providers: [CalificacionService]
})
export class CalificacionModule {}
