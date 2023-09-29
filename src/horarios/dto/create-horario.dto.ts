import { User } from "src/user/entities/user.entity";

export class CreateHorarioDto {
  title: string;
  start: string;
  end: string;
  userId:string
}
