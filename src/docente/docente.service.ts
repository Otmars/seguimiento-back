import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDocenteDto,Docentenom } from './dto/create-docente.dto';
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
  }

  async findAll() {
    return await this.docenteRepository.find({
      relations: ['iduser'],
    });
  }
  async findAllNombre(){
    
    var docenteNombre:Docentenom[]=[]
    const consulta= await this.docenteRepository.createQueryBuilder('docente')
    .select([
      'docente.id',
      'd.nombres',
      'd.apellidoPaterno',
      'd.apellidoMaterno'
    ]) // consulta chida
    .leftJoin('docente.iduser', 'd')
    .getRawMany();
    for (let i = 0; i < Object.values(consulta).length; i++) {
      const element = Object.values(consulta)[i]['d_nombres']+" "+Object.values(consulta)[i]['d_apellidoPaterno']+" "+Object.values(consulta)[i]['d_apellidoMaterno'];
      const dato:Docentenom = {id:Object.values(consulta)[i]['docente_id'],nombre:element}
      docenteNombre.push(dato)
    }
    return docenteNombre
  }
  async findOne(id: number) {
    return await this.docenteRepository.find({
      where: { id },
      relations: ['iduser'],
    });
  }

}
