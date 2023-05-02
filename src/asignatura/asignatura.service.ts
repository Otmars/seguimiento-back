import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { Repository } from 'typeorm';
import { async } from 'rxjs';
import { AsignaturaToCompetencia } from './entities/asignaturaCompetencia.entity';
import { competenciaAsignatura } from './dto/competencia-asignatura.dto';

@Injectable()
export class AsignaturaService {
  constructor(
    @InjectRepository(Asignatura)
    private asignaturaService: Repository<Asignatura>,
    @InjectRepository(AsignaturaToCompetencia)
    private asiToComService: Repository<AsignaturaToCompetencia>,
  ) {}

  async create(createAsignaturaDto: CreateAsignaturaDto) {
    const newAsignatura = await this.asignaturaService.create(
      createAsignaturaDto,
    );
    await this.asignaturaService.save(newAsignatura);
    return newAsignatura;
  }

  async asignaturaToCompetencia(body: competenciaAsignatura) {

    const foundrelation = await this.asiToComService.count({where:[body]})
    if (foundrelation) {
      return new HttpException('La relacion ya existe', HttpStatus.CONFLICT);
    }
    const newRelation = this.asiToComService.create(body);
    return this.asiToComService.save(newRelation);
  }

  async findAll() {
    const consulta = await this.asignaturaService
      .createQueryBuilder('asignatura')
      .select([
        'asignatura',
        'd.id',
        'u.id',
        'u.nombres',
      ]) // consulta chida
      .leftJoin('asignatura.docente', 'd')
      .leftJoin('d.iduser', 'u')
      .getMany();
    return consulta;
  }

  async findOne(id: number) {
    const consulta = await this.asignaturaService
      .createQueryBuilder('asignatura')
      .select(['asignatura', 'd.id', 'u.id', 'u.nombres'])

      // .select(['asignatura.nombre', 'asignatura.id', 'd.id', 'u.id','u.nombres'])
      .where('asignatura.id = :id', { id }) // consulta chida
      .leftJoin('asignatura.docente', 'd')
      .leftJoin('d.iduser', 'u')
      .getMany();
    console.log(consulta);

    return consulta;
  }

  async update(id: number, updateAsignaturaDto: UpdateAsignaturaDto) {
    const asignaturaFound = await this.asignaturaService.findOne({
      where: { id },
    });
    if (!asignaturaFound) {
      return new HttpException('Asignatura no existe', HttpStatus.NOT_FOUND);
    }
    const updateAsignatura = Object.assign(
      asignaturaFound,
      updateAsignaturaDto,
    );
    return this.asignaturaService.save(updateAsignatura);
  }

  remove(id: number) {
    return this.asignaturaService.softRemove({ id });
  }
}
