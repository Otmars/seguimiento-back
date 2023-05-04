import { ApiProperty } from '@nestjs/swagger';

export class CreateAsignaturaDto {

  id: number;

  @ApiProperty(
    {description: 'nombre de la asignatura o materia'})
  nombre: string;

  @ApiProperty()
  siglaCodigo: string;

  @ApiProperty()
  cargaHoraria: number;

  // @ApiProperty()
  // RegNivelEst: string;

  @ApiProperty()
  nMeses: number;

  // @ApiProperty()
  // prerequisito: string;

  @ApiProperty()
  paralelo: string;

  @ApiProperty()
  docenteId: number;
}
