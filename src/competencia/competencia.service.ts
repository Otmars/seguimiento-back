import { Injectable } from '@nestjs/common';
import { CreateCompetenciaDto } from './dto/create-competencia.dto';
import { UpdateCompetenciaDto } from './dto/update-competencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Competencia } from './entities/competencia.entity';
import { Repository } from 'typeorm';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';

@Injectable()
export class CompetenciaService {
  constructor(
    @InjectRepository(Competencia)
    private competenciaService: Repository<Competencia>,
    @InjectRepository(Asignatura)
    private asignaturaService: Repository<Asignatura>,
  ) {}

  async create(createCompetenciaDto: CreateCompetenciaDto) {
    const id = createCompetenciaDto.asignaturaId;

    const asi = await this.asignaturaService.find({where:{id:id}});

    var newCompentencia = await this.competenciaService.create(
      createCompetenciaDto,
    );
    console.log(newCompentencia);
    newCompentencia = {...newCompentencia,asignatura : asi}
    
    await this.competenciaService.save(newCompentencia);
    return newCompentencia;
  }

  findAll() {
    return this.competenciaService.find({relations:['asignatura']});
  }

  findOne(id: number) {
    return this.competenciaService.findOne({ where: { id } });
  }

  update(id: number, updateCompetenciaDto: UpdateCompetenciaDto) {
    return this.competenciaService.update({ id }, updateCompetenciaDto);
  }

  remove(id: number) {
    return this.competenciaService.softRemove({ id });
  }
}
