import { Module } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { AsignaturaController } from './asignatura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { AsignaturaToCompetencia } from './entities/asignaturaCompetencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asignatura,AsignaturaToCompetencia])],
  controllers: [AsignaturaController],
  providers: [AsignaturaService]
})
export class AsignaturaModule {}
