import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TipoCompentecia } from '../entities/competencia.entity';

export class CreateCompetenciaDto {
  @ApiProperty()
  descripcion?: string;

  @IsEnum(TipoCompentecia)
  @ApiProperty()
  tipoCompetencia?: TipoCompentecia;

  @ApiProperty()
  asignaturaId:number
}
