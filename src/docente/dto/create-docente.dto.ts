import { ApiProperty } from '@nestjs/swagger';

export class CreateDocenteDto {
  @ApiProperty()
  iduser: string;
}
