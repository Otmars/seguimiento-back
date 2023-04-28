import { ApiProperty } from '@nestjs/swagger';

export class competenciaAsignatura {
  @ApiProperty()
  competenciaId?: number;

  @ApiProperty()
  asignaturaId: number;
}
