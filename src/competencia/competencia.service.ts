import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const asignaturaId = createCompetenciaDto.asignaturaId;

    // const asi = await this.asignaturaService.find({where:{id:id}});

    var newCompentencia = await this.competenciaService.create(
      createCompetenciaDto,
    );
    const competenciaId = newCompentencia.id
    // this.addCompetenciaAsignatura(competenciaId,asignaturaId)

    // console.log(newCompentencia);
    // newCompentencia = {...newCompentencia,asignatura : asi}
    
    await this.competenciaService.save(newCompentencia);
    return newCompentencia;
  }
  async addCompetenciaAsignatura (competenciaId: number, asignaturaId: number): Promise<any> {

    // const competencia =  await this.competenciaService.findOne({where:{id:competenciaId}});
    // if(!Competencia) {
    //   return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    // }
    // const asignatura = await this.asignaturaService.findOne({where:{id:asignaturaId}});
    // if(!asignatura) {
    //   return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    // }
    // competencia.asignatura = [asignatura]
    // console.log(competencia);
    
    // return this.competenciaService.save(competencia); 
  }

  findAll() {
    return this.competenciaService.find();
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
