import { ApiProperty } from '@nestjs/swagger';

export class CreateAsignaturaDto {

  id: number;

  @ApiProperty(
    {description: 'nombre de la asignatura o materia'})
  nombre: string;

  @ApiProperty()
  ciclo: string;

  @ApiProperty()
  siglaCodigo: string;

  @ApiProperty()
  cargaHoraria: string;

  @ApiProperty()
  RegNivelEst: string;

  @ApiProperty()
  nMeses: number;

  @ApiProperty()
  prerequisito: string;

  @ApiProperty()
  paralelo: string;

  @ApiProperty()
  iddocente: number;
}
