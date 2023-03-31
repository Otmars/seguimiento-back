import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'Crea un nuevo usuario', minimum: 1})
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  roles: UserRole;

  @ApiProperty()
  nombres: string;

  @ApiProperty()
  apellidoPaterno: string;

  @ApiProperty()
  apellidoMaterno: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  telefono: string;

  @ApiProperty()
  direccion: string;

  @ApiProperty()
  ci: string;

  @ApiProperty()
  fnacimiento: string;
}
