import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateEstudianteDto,
  InscripcionDto,
  Masivo,
  registrarCompetenciaDto,
} from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Inscripciones } from './entities/inscripcionesEstudiante.entity';
import { AsignaturaToCompetencia } from 'src/asignatura/entities/asignaturaCompetencia.entity';
import { CompetenciaEstudiante } from './entities/competenciasEstudiante.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { User } from 'src/user/entities/user.entity';
import { Competencia } from 'src/competencia/entities/competencia.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Inscripciones)
    private inscripcionRepository: Repository<Inscripciones>,
    @InjectRepository(CompetenciaEstudiante)
    private competendiaEstudianteRepository: Repository<CompetenciaEstudiante>,
    @InjectRepository(Asignatura)
    private asignaturaRepository: Repository<Asignatura>,
    @InjectRepository(Competencia)
    private competenciaRepository: Repository<Competencia>,
  ) {}

  async inscribir(inscripcion: InscripcionDto) {
    const userFound = await this.estudianteRepository.findOne({
      where: { id: inscripcion.estudianteId },
    });

    if (!userFound) {
      throw new HttpException('User no existe', HttpStatus.NOT_FOUND);
    }
    const inscripto = await this.inscripcionRepository.findOne({
      where: {
        estudianteId: inscripcion.estudianteId,
        asignaturaId: inscripcion.asignaturaId,
      },
    });
    // console.log(inscripto);

    if (inscripto) {
      throw new HttpException('Ya esta Inscrito', HttpStatus.CONFLICT);
    }
    const nuevo = await this.inscripcionRepository.create(inscripcion);
    return await this.inscripcionRepository.save(nuevo);
  }

  async inscribirMasivo(inscripcion: Masivo) {
    const userFound = await this.estudianteRepository
      .createQueryBuilder('estudiante')
      .select(['estudiante'])
      .where('u.username = :iduser', { iduser: inscripcion.username })
      .leftJoin('estudiante.iduser', 'u')
      .getOne();
    if (!userFound) {
      throw new HttpException('User no existe', HttpStatus.NOT_FOUND);
    }
    const asignaturaFound = await this.asignaturaRepository.findOne({
      where: {
        paralelo: inscripcion.paralelo,
        siglaCodigo: inscripcion.sigla,
      },
    });
    if (!asignaturaFound) {
      throw new HttpException('Asignatura no existe', HttpStatus.NOT_FOUND);
    }

    if (
      inscripcion.sigla == '400' ||
      inscripcion.sigla == '500' ||
      inscripcion.sigla == '501' ||
      inscripcion.sigla == '401'
    ) {
      const materias = await this.asignaturaRepository.find({
        where: {
          paralelo: inscripcion.paralelo,
          siglaCodigo: inscripcion.sigla,
        },
      });
      if (materias) {
        for (let i = 0; i < materias.length; i++) {
          const element = materias[i];
          const inscripto = await this.inscripcionRepository.findOne({
            where: {
              estudianteId: userFound.id,
              asignaturaId: element.id,
            },
          });
          if (!inscripto) {
            const nuevo = await this.inscripcionRepository.create({
              estudianteId: userFound.id,
              asignaturaId: element.id,
              gestion: 2023,
            });
            await this.inscripcionRepository.save(nuevo);
          }
        }
        return materias;
      }
    }
    const subir = await this.inscribir({
      estudianteId: userFound.id,
      asignaturaId: asignaturaFound.id,
      gestion: 2023,
    });
    return subir;
    // const nuevo = this.inscripcionRepository.create(inscripcion);
    // return this.inscripcionRepository.save(nuevo);
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
    const consulta = await this.estudianteRepository
      .createQueryBuilder('estudiante')
      .select([
        'estudiante.id',
        'i.id',
        'a',
        'd',
        'us.nombres',
        'us.apellidoPaterno',
        'us.apellidoMaterno',
        'us.email',
        'us.telefono',
      ]) // consulta chida
      .where('i.asignatura IS NOT NULL')
      .andWhere('u.id = :iduser', { iduser: id })
      .leftJoin('estudiante.iduser', 'u')
      .leftJoin('estudiante.inscripcion', 'i')
      .leftJoin('i.asignatura', 'a')
      .leftJoin('a.docente', 'd')
      .leftJoin('d.iduser', 'us')
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
      order: { id: 'DESC' },
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

    const relacionExiste = await this.competendiaEstudianteRepository.findOne({
      where: {
        estudianteId: body.estudianteId,
        competenciaAsignaturaCompetenciaId:
          body.competenciaAsignaturaCompetenciaId,
      },
    });
    console.log(relacionExiste);

    if (relacionExiste) {
      throw new HttpException('La realacion ya existe', HttpStatus.CONFLICT);
    } else {
      const nuevoDato = await this.competendiaEstudianteRepository.create(body);
      return this.competendiaEstudianteRepository.save(nuevoDato);
    }
  }

  async getCompetenciaEstudiante(estudianteId: number, datos: any) {
    // const consulta = this.competendiaEstudianteRepository.find({
    //   where: { estudianteId },
    //   relations: ['competencia'],
    // });
    // console.log(datos);

    // console.log({estudianteId,datos});

    const consulta2 = await this.competendiaEstudianteRepository
      .createQueryBuilder('comEst')
      .select(['comEst.estudianteId', 'asicom', 'c', 'com']) // consulta chida
      .where('estudianteId = :idestudiante', { idestudiante: estudianteId })
      .andWhere('c.id= :idasignatura', {
        idasignatura: datos.asignaturaid,
      })
      .leftJoin('comEst.competencia', 'asicom')
      .leftJoin('asicom.asignatura', 'c')
      .leftJoin('asicom.competencia', 'com')
      .getMany();

    // console.log(consulta2);

    return consulta2;
  }
  async getAllCompetenciaEstudiante(estudianteId: string) {
    // const iduser:Estudiante[] = await this.estudianteRepository
    //   .createQueryBuilder('estudiante')
    //   .select(['estudiante'])
    //   .where('u.id = :ids', { ids: estudianteId })
    //   .leftJoin('estudiante.iduser', 'u').getMany();

    const consulta2 = await this.competendiaEstudianteRepository
      .createQueryBuilder('comEst')
      .select(['comEst.estudianteId', 'c', 'asi', 'asicom']) // consulta chida
      .where('u.id = :ids', { ids: estudianteId })
      // .andWhere('asicom.asignaturaid = :idasignatura',{idasignatura:datos.asignaturaid})
      .leftJoin('comEst.competencia', 'c')
      .leftJoin('c.asignatura', 'asi')
      .leftJoin('c.competencia', 'asicom')
      // .leftJoin('c.asignaturaCompetencia', 'asicom')
      // .leftJoin('asicom.asignatura', 'asi')
      .leftJoin('comEst.estudiante', 'e')
      .leftJoin('e.iduser', 'u')
      .orderBy('comEst.id', 'DESC')
      .getRawMany();

    // const consulta = this.competendiaEstudianteRepository.find({
    //   where: { estudianteId :iduser[0].id},
    //   relations: ['competencia'],

    // });
    return consulta2;
  }
  async getallCompetenciasAllEstudiante() {
    const consulta3 = await this.competenciaRepository.find({
      select: { descripcion: true, tipoCompetencia: true },
    });

    const consulta1 = await this.estudianteRepository
      .createQueryBuilder('est')
      .select([
        'est',
        'u.nombres',
        'u.apellidoPaterno',
        'u.apellidoMaterno',
        'u.ci',
        'u.telefono',
        'u.email',
      ])
      .leftJoin('est.iduser', 'u')
      .getMany();

    const consulta2 = await this.competendiaEstudianteRepository
      .createQueryBuilder('comEst')
      .select([
        'comEst.id',
        'comEst.createdAt',
        'c.asignaturaCompetenciaId',
        'asi.nombre',
        'asi.siglaCodigo',
        'asi.paralelo',
        'asicom.descripcion',
        'asicom.tipoCompetencia',
        'e',
        'u.nombres',
        'u.apellidoPaterno',
        'u.apellidoMaterno',
        'u.ci',
        'u.telefono',
        'u.email',
        'asidoc',
        'udoc.nombres',
        'udoc.apellidoPaterno',
        'udoc.apellidoMaterno',
      ]) // consulta chida
      .leftJoin('comEst.competencia', 'c')
      .leftJoin('c.asignatura', 'asi')
      .leftJoin('asi.docente', 'asidoc')
      .leftJoin('asidoc.iduser', 'udoc')
      .leftJoin('c.competencia', 'asicom')
      .leftJoin('comEst.estudiante', 'e')
      .leftJoin('e.iduser', 'u')
      .orderBy('comEst.id', 'DESC')
      .getMany();
    return { estudiante: consulta1, datos: consulta2, competencia: consulta3 };
  }

  async getCompetenciasObtenidasNoObtenidas(id: number) {
    const consulta1 = await this.inscripcionRepository
      .createQueryBuilder('ins')
      .select(['ins.id', 'asi', 'asicom.asignaturaCompetenciaId', 'com'])
      .where('e.id = :ids', { ids: id })
      .leftJoin('ins.estudiante', 'e')
      .leftJoin('ins.asignatura', 'asi')
      .leftJoin('asi.asignaturaCompetencia', 'asicom')
      .leftJoin('asicom.competencia', 'com')
      .getMany();

    const consulta2 = await this.competendiaEstudianteRepository
      .createQueryBuilder('comest')
      .select(['comest', 'c','com'])
      .where('e.id = :ids', { ids: id })
      .leftJoin('comest.estudiante', 'e')
      .leftJoin('comest.competencia', 'c')
      .leftJoin('c.competencia', 'com')

      .getMany();


    //   const consulta1 = await this.inscripcionRepository
    //   .createQueryBuilder('ins')
    //   .select(['ins.id', 'e.id', 'asi', 'asicom','com','comest','come','comee'])
    //   .where('e.id = :ids', { ids: id })
    //   .leftJoin('ins.estudiante', 'e')
    //   .leftJoin('e.iduser', 'u')
    //   .leftJoin('e.competencia','comest')
    //   .leftJoin('comest.competencia','come')
    //   .leftJoin('come.competencia','comee')
    //   .leftJoin('ins.asignatura', 'asi')
    //   .leftJoin('asi.asignaturaCompetencia', 'asicom')
    //   .leftJoin('asicom.competencia','com')
    //   .getMany();
    // return consulta1;
    // const consulta1 = await this.competendiaEstudianteRepository
    //   .createQueryBuilder('comest')
    //   .select(['comest','est','ins','asi','asicom','com'])
    //   .where('est.id = :ids', { ids: id })
    //   .leftJoin('comest.estudiante', 'est')
    //   .leftJoin('est.inscripcion', 'ins')
    //   .leftJoin('ins.asignatura','asi')
    //   .leftJoin('asi.asignaturaCompetencia','asicom')
    //   .leftJoin('asicom.competencia','com')
    //   .getMany();
    // return consulta1;

    return {todas:consulta1,obtenidas:consulta2};
  }
}
