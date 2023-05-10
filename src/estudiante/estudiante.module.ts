import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Inscripciones } from './entities/inscripcionesEstudiante.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Estudiante,Inscripciones])],
  controllers: [EstudianteController],
  providers: [EstudianteService],

})
export class EstudianteModule {}
