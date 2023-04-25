import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente) private docenteRepository: Repository<Docente>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService : UserService
      ) {}

  async create(createDocenteDto: CreateDocenteDto) {
    const newdocente = createDocenteDto

    // console.log(createDocenteDto);
    // const { iduser } = createDocenteDto;
    // const userFound = await this.userRepository.findOne({
    //   where: {
    //     id: iduser,
    //   },
    // });
    // if (!userFound) {
    //   return new HttpException('Usuario no existe', HttpStatus.CONFLICT); //throw en lugar del return
    // }
    // const newDocente = this.docenteRepository.create(createDocenteDto);
    // return this.docenteRepository.save(newDocente);
    // this.userService.create(newdocente)  
  }

  async findAll() {
    return await this.docenteRepository.find({
      relations: ['iduser'],
    });
  }

  async findOne(id: number) {
    return await this.docenteRepository.find({
      where: { id },
      relations: ['iduser'],
    });
  }

  update(id: number, updateDocenteDto: UpdateDocenteDto) {
    return `This action updates a #${id} docente`;
  }

  remove(id: number) {
    return `This action removes a #${id} docente`;
  }
}
