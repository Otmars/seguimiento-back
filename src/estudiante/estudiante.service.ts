import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {
  constructor (
    @InjectRepository(Estudiante) private estudianteRepository: Repository<Estudiante>,

  ){}
  create(createEstudianteDto: CreateEstudianteDto) {
    return 'This action adds a new estudiante';
  }

  async findAll() {
    return await this.estudianteRepository.find({
      relations: ['iduser'],
    });
  }

  async findOne(id: number) {
    return await this.estudianteRepository.find({
      where: { id },
      relations: ['iduser'],
    });
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
