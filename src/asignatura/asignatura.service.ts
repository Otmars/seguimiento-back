import { Injectable } from '@nestjs/common';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { Repository } from 'typeorm';
import { async } from 'rxjs';

@Injectable()
export class AsignaturaService {
  constructor(
    @InjectRepository(Asignatura) private asignaturaService:Repository<Asignatura>
  ){}

  async create(createAsignaturaDto: CreateAsignaturaDto) {
    const newAsignatura = await this.asignaturaService.create(createAsignaturaDto)
    await this.asignaturaService.save(newAsignatura)
    return newAsignatura;
  }

  findAll() {
    return `This action returns all asignatura`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asignatura`;
  }

  update(id: number, updateAsignaturaDto: UpdateAsignaturaDto) {
    return `This action updates a #${id} asignatura`;
  }

  remove(id: number) {
    return `This action removes a #${id} asignatura`;
  }
}
