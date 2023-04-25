import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, isNumber } from 'class-validator';


export class CreateUserDto {
  @ApiProperty({ description: 'Crea un nuevo usuario', minimum: 1})
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: number;

  @ApiProperty()
  nombres: string;

  @ApiProperty()
  apellidoPaterno: string;

  @ApiProperty()
  apellidoMaterno: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  telefono: string;

  @ApiProperty()
  direccion: string;

  @ApiProperty()
  ci: string;

  @ApiProperty()
  fnacimiento: string;

  @IsNumber()
  @IsOptional(  )
  ru:number
}
