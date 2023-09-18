import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateEstudianteDto,
  InscripcionDto,
  registrarCompetenciaDto,
} from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Inscripciones } from './entities/inscripcionesEstudiante.entity';
import { AsignaturaToCompetencia } from 'src/asignatura/entities/asignaturaCompetencia.entity';
import { CompetenciaEstudiante } from './entities/competenciasEstudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Inscripciones)
    private inscripcionRepository: Repository<Inscripciones>,
    @InjectRepository(CompetenciaEstudiante)
    private competendiaEstudianteRepository: Repository<CompetenciaEstudiante>,
  ) {}

  async inscribir(inscripcion: InscripcionDto) {
    const userFound = await this.estudianteRepository.findOne({
      where: { id: inscripcion.estudianteId },
    });

    if (!userFound) {
      throw new HttpException('User no existe', HttpStatus.NOT_FOUND);
    }
    if (!userFound) {
      throw new HttpException('User no existe', HttpStatus.NOT_FOUND);
    }
    const nuevo = this.inscripcionRepository.create(inscripcion);
    return this.inscripcionRepository.save(nuevo);
  }

  async getinscripciones() {
    // return await this.inscripcionRepository.find({relations:['asignatura','estudiante']})
    // const consulta = await this.inscripcionRepository
    //   .createQueryBuilder('inscripcion')
    //   .select(['inscripcion', 'e.id', 'u.id', 'u.nombres','a']) // consulta chida
    //   .innerJoin('inscripcion.asignatura','a')
    //   .innerJoin('inscripcion.estudiante', 'e')
    //   .innerJoin('e.iduser', 'u')
    //   .getMany();
    // return consulta;
    const consulta = await this.estudianteRepository
      .createQueryBuilder('estudiante')
      .select(['estudiante', 'i', 'a', 'u']) // consulta chida
      .where('i.asignatura IS NOT NULL')
      .leftJoin('estudiante.iduser', 'u')
      .leftJoin('estudiante.inscripcion', 'i')
      .leftJoin('i.asignatura', 'a')
      .getMany();
    return consulta;
  }

  async getinscripcion(id: string) {
    console.log(id);

    const consulta = await this.estudianteRepository
      .createQueryBuilder('estudiante')
      .select(['estudiante.id', 'i.id', 'a']) // consulta chida
      .where('i.asignatura IS NOT NULL')
      .andWhere('u.id = :iduser', { iduser: id })
      .leftJoin('estudiante.iduser', 'u')
      .leftJoin('estudiante.inscripcion', 'i')
      .leftJoin('i.asignatura', 'a')
      .getMany();
    return consulta;
  }
  async retirarMateria(id: number) {
    const consulta = await this.inscripcionRepository.softDelete({ id });
    return consulta;
  }

  async findAll() {
    return await this.estudianteRepository.find({
      relations: ['iduser'],
      order:{id:'DESC'}
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

  async createCompetenciaEstudiante(body: registrarCompetenciaDto) {
    console.log(body);
    
    const relacionExiste = await this.competendiaEstudianteRepository.findOne({where:{
      estudianteId:body.estudianteId,
      competenciaAsignaturaCompetenciaId: body.competenciaAsignaturaCompetenciaId
    }})
    console.log(relacionExiste);
    
    if(relacionExiste){
      throw new HttpException('La realacion ya existe', HttpStatus.CONFLICT);
    }else{
      const nuevoDato = await this.competendiaEstudianteRepository.create(body);
      return this.competendiaEstudianteRepository.save(nuevoDato);
    }
  }

  getCompetenciaEstudiante(estudianteId: number, datos: any) {
    // const consulta = this.competendiaEstudianteRepository.find({
    //   where: { estudianteId },
    //   relations: ['competencia'],
    // });
    // console.log(datos);

    console.log("aqui wey");
    
    const consulta2 = this.competendiaEstudianteRepository
      .createQueryBuilder('comEst')
      .select(['comEst.estudianteId', 'asicom', 'c','com']) // consulta chida
      .where('estudianteId = :idestudiante', { idestudiante: estudianteId })
      .andWhere('c.id= :idasignatura', {
        idasignatura: datos.asignaturaid,
      })
      .leftJoin('comEst.competencia', 'asicom')
      .leftJoin('asicom.asignatura', 'c')
      .leftJoin('asicom.competencia', 'com')
      .getMany();
    return consulta2;
  }
  async getAllCompetenciaEstudiante(estudianteId: string) {
    
    console.log("aqui");
    
    // const iduser:Estudiante[] = await this.estudianteRepository
    //   .createQueryBuilder('estudiante')
    //   .select(['estudiante'])
    //   .where('u.id = :ids', { ids: estudianteId })
    //   .leftJoin('estudiante.iduser', 'u').getMany();

    // console.log(iduser[0].id);
    
    const consulta2 = await this.competendiaEstudianteRepository
      .createQueryBuilder('comEst')
      .select(['comEst.estudianteId', 'c', 'asi','asicom']) // consulta chida
      .where('u.id = :ids', { ids: estudianteId })
      // .andWhere('asicom.asignaturaid = :idasignatura',{idasignatura:datos.asignaturaid})
      .leftJoin('comEst.competencia', 'c')
      .leftJoin('c.asignatura','asi')
      .leftJoin('c.competencia','asicom')
      // .leftJoin('c.asignaturaCompetencia', 'asicom')
      // .leftJoin('asicom.asignatura', 'asi')
      .leftJoin('comEst.estudiante', 'e')
      .leftJoin('e.iduser', 'u')
      .getRawMany()

    // const consulta = this.competendiaEstudianteRepository.find({
    //   where: { estudianteId :iduser[0].id},
    //   relations: ['competencia'],
      
    // });

    return consulta2;
  }
}
