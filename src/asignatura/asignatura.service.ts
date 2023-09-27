import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { Not, Repository } from 'typeorm';
import { async } from 'rxjs';
import { AsignaturaToCompetencia } from './entities/asignaturaCompetencia.entity';
import { competenciaAsignatura } from './dto/competencia-asignatura.dto';
import { Inscripciones } from 'src/estudiante/entities/inscripcionesEstudiante.entity';
import { Competencia } from 'src/competencia/entities/competencia.entity';

@Injectable()
export class AsignaturaService {
  constructor(
    @InjectRepository(Asignatura)
    private asignaturaService: Repository<Asignatura>,
    @InjectRepository(AsignaturaToCompetencia)
    private asiToComService: Repository<AsignaturaToCompetencia>,
    @InjectRepository(Inscripciones)
    private inscripcionService: Repository<Inscripciones>,
    @InjectRepository(Competencia)
    private competenciaRepository: Repository<Competencia>,
  ) {}

  async create(createAsignaturaDto: CreateAsignaturaDto) {
    const newAsignatura = await this.asignaturaService.create(
      createAsignaturaDto,
    );
    await this.asignaturaService.save(newAsignatura);
    return newAsignatura;
  }

  async asignaturaToCompetencia(body: competenciaAsignatura) {
    const foundrelation = await this.asiToComService.count({ where: [body] });
    if (foundrelation) {
      return new HttpException('La relacion ya existe', HttpStatus.CONFLICT);
    }
    const newRelation = this.asiToComService.create(body);
    return this.asiToComService.save(newRelation);
  }

  async getasignaturaToCompetencia(id: number) {
    let competenciasNoAsignadas: any[] = [];
    let competenciasAsignadas: any[] = [];
    // console.log("aqui");
    const materias = await this.asiToComService
      .createQueryBuilder('asicom')
      .select('asicom.competenciaId')
      .where('asignaturaId = :id', { id })
      .getMany();
    const competencias = await this.competenciaRepository.find();
    var contador = 0;
    // await materias.forEach(async (element) => {
    //   let c: any[] = [];
    //   const idcom = element.competenciaId
    //   // console.log(element.competenciaId);
    //   const competencias = await this.competenciaRepository.findOne({where:{id:element.competenciaId}});
    //   // console.log(competencias);

    //   c.push(competencias)
    //   competenciasNoAsignadas=c
    //   return c
    // });
    // console.log(competenciasNoAsignadas);
    for (let i = 0; i < materias.length; i++) {
      const dato = await this.competenciaRepository.findOne({
        where: { id: materias[i].competenciaId },
      });
      competenciasAsignadas.push(dato);
    }
    for (let i = 0; i < materias.length; i++) {
      for (let j = 0; j < competencias.length; j++) {
        if (materias[i].competenciaId == competencias[j].id) {
          competencias.splice(j, 1);
          competenciasNoAsignadas = competencias;
        }
      }
    }
    return { competenciasNoAsignadas, competenciasAsignadas };
  }

  async findAll() {
    const consulta = await this.asignaturaService
      .createQueryBuilder('asignatura')
      .select(['asignatura', 'd.id', 'u.id', 'u.nombres']) // consulta chida
      .leftJoin('asignatura.docente', 'd')
      .leftJoin('d.iduser', 'u')
      .orderBy('asignatura.id', 'DESC')
      .getMany();
    return consulta;
  }

  async findOne(id: number) {
    const asignaturaFound = await this.asignaturaService.findOne({
      where: { id },
    });
    if (!asignaturaFound) {
      throw new HttpException('Asignatura no existe', HttpStatus.NOT_FOUND);
    }
    const consulta = await this.asignaturaService
      .createQueryBuilder('asignatura')
      .select(['asignatura', 'd.id', 'u.id', 'u.nombres'])
      // .select(['asignatura.nombre', 'asignatura.id', 'd.id', 'u.id','u.nombres'])
      .where('asignatura.id = :id', { id }) // consulta chida
      .leftJoin('asignatura.docente', 'd')
      .leftJoin('d.iduser', 'u')
      .getMany();
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
  async findAsignaturaDocenteOne(id: string) {
    const consulta = await this.asignaturaService
      .createQueryBuilder('asignatura')
      .where('u.id = :id', { id }) // consulta chida
      .leftJoin('asignatura.docente', 'd')
      .leftJoin('d.iduser', 'u')
      .getMany();

    return consulta;
  }

  async inscritosAsignatura(id: number) {
    // const consulta = await this.inscripcionService.find({where:{asignaturaId:id},relations:['estudiante']})
    const consulta = await this.inscripcionService
      .createQueryBuilder('inscripcion')
      .select([
        'inscripcion',
        'e.id',
        'u.id',
        'u.nombres',
        'u.apellidoPaterno',
        'u.apellidoMaterno',
        'u.ci',
        'u.email',
        'a',
      ]) // consulta chida
      .where({ asignaturaId: id })
      .innerJoin('inscripcion.asignatura', 'a')
      .innerJoin('inscripcion.estudiante', 'e')
      .innerJoin('e.iduser', 'u')
      .getMany();
    return consulta;
  }
}
