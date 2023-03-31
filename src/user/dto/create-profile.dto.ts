import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto{
    @ApiProperty()
    nombre:string

    @ApiProperty()
    apellido:string

    @ApiProperty()
    age?:number
}