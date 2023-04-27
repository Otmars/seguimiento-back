import { Module } from '@nestjs/common';
import { CompetenciaService } from './competencia.service';
import { CompetenciaController } from './competencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competencia } from './entities/competencia.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Competencia,Asignatura])],
  controllers: [CompetenciaController],
  providers: [CompetenciaService]
})
export class CompetenciaModule {}
