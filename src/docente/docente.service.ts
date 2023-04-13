import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DocenteService {
  constructor(@InjectRepository(Docente) private docenteRepository: Repository<Docente>,
  @InjectRepository(User) private userRepository: Repository<User>){}

  async create(createDocenteDto: CreateDocenteDto) {
    // console.log(createDocenteDto);
    const {iduser} = createDocenteDto;
    const userFound = await this.userRepository.findOne({
      where: {
        id: iduser},
    });
    if (!userFound) {
      return new HttpException('Usuario no existe', HttpStatus.CONFLICT); //throw en lugar del return
    }
    const newDocente = this.docenteRepository.create(createDocenteDto)
    return this.docenteRepository.save(newDocente);
  }

  findAll() {
    return `This action returns all docente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} docente`;
  }

  update(id: number, updateDocenteDto: UpdateDocenteDto) {
    return `This action updates a #${id} docente`;
  }

  remove(id: number) {
    return `This action removes a #${id} docente`;
  }
}
