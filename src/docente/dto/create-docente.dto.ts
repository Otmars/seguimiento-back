import { ApiProperty } from '@nestjs/swagger';

export class CreateDocenteDto {
  @ApiProperty()
  iduser: string;
}
export interface Docentenom {
  id:number;
  nombre: string;
}