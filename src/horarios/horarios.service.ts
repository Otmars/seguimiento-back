import { Injectable } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HorariosService {
  constructor(
    @InjectRepository(Horario) private horarioRepository: Repository<Horario>,
  ) {}
  async create(createHorarioDto: CreateHorarioDto) {
    const nuevo =  await this.horarioRepository.create(createHorarioDto)
    console.log(nuevo);
    
    return await this.horarioRepository.save(nuevo)
  }

  findAll() {
    return `This action returns all horarios`;
  }

  async findOne(id: string) {
    return await this.horarioRepository.find({where:{userId:id}});
  }

  update(id: number, updateHorarioDto: UpdateHorarioDto) {

const datoFound = this.horarioRepository.findOne({where:{id}})
    const updatedato = Object.assign(datoFound, updateHorarioDto);
    return this.horarioRepository.save(updatedato);
  }

  async remove(id: number) {
    return  await this.horarioRepository.softDelete(id)
  }
}
