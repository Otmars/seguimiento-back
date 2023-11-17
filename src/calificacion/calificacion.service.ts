import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
import { Calificacion, tipoCalificacion } from './entities/calificacion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { AsignaturaService } from 'src/asignatura/asignatura.service';
import { Inscripciones } from 'src/estudiante/entities/inscripcionesEstudiante.entity';
import { CalificacionEstudiante } from './entities/calificacionEstudiante.entity';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';

@Injectable()
export class CalificacionService {
  constructor(
    @InjectRepository(Calificacion)
    private calificacionService: Repository<Calificacion>,
    private asignaturaService: AsignaturaService,
    @InjectRepository(Inscripciones)
    private inscripcionService: Repository<Inscripciones>,
    @InjectRepository(CalificacionEstudiante)
    private calificacionestudianteService: Repository<CalificacionEstudiante>,
    @InjectRepository(Asignatura)
    private asignaturaRepository: Repository<Asignatura>,
  ) {}

  async calificacionEstudiante(
    listaestudiante: number,
    idcalificacion: number,
  ) {
    console.log(listaestudiante, idcalificacion);

    const lista = await this.inscripcionService.find({
      where: { asignaturaId: listaestudiante },
    });
    // console.log(lista);
    for (let i = 0; i < lista.length; i++) {
      // console.log('estudiante->', lista[i].estudianteId);
      const registro = await this.calificacionestudianteService.create({
        estudianteId: lista[i].estudianteId,
        calificacionId: idcalificacion,
      });
      await this.calificacionestudianteService.save(registro);
    }
  }
  async getcalificacionEstudiante(estudianteId: number, idAsinatura: any) {
    console.log(estudianteId, '-----', idAsinatura.asignaturaId);
    console.log('aqquiiiiiiiiiiiiii');

    const consulta = await this.calificacionestudianteService
      .createQueryBuilder('ce')
      .select([
        'ce',
        'c.puntaje',
        'c.asignaturaId',
        'c.descripcion',
        'a.nombre',
      ])
      .where('c.asignaturaId = :id', { id: idAsinatura.asignaturaId }) // consulta chida
      .andWhere('ce.estudianteId = :ids', { ids: estudianteId })
      .leftJoin('ce.calificacion', 'c')
      .leftJoin('c.asignatura', 'a')
      .orderBy('ce.id', 'DESC')
      .getMany();
    return consulta;
  }
  async create(createCalificacionDto: CreateCalificacionDto) {
    const asignaturaFound = await this.asignaturaService.findOne(
      createCalificacionDto.asignaturaId,
    );

    if (!asignaturaFound) {
      throw new HttpException(
        'Asignatura no existeeeeee',
        HttpStatus.NOT_FOUND,
      );
    }
    const tipo = createCalificacionDto.tipoCalificacion;
    const puntaje = await this.getpuntajeacumulado(
      createCalificacionDto.asignaturaId,
      createCalificacionDto.tipoCalificacion,
    );
    const nuevaCalificacion = this.calificacionService.create(
      createCalificacionDto,
    );
    if (tipo == 'Practica') {
      if (puntaje + createCalificacionDto.puntaje <= 35) {
        console.log(nuevaCalificacion);
        const calificacionGuardada = await this.calificacionService.save(
          nuevaCalificacion,
        );
        await this.calificacionEstudiante(
          createCalificacionDto.asignaturaId,
          calificacionGuardada.id,
        );
        return calificacionGuardada;
      }
    } else if (tipo == 'Parcial') {
      if (puntaje + createCalificacionDto.puntaje <= 35) {
        // return this.calificacionService.save(nuevaCalificacion);
        const calificacionGuardada = await this.calificacionService.save(
          nuevaCalificacion,
        );
        await this.calificacionEstudiante(
          createCalificacionDto.asignaturaId,
          calificacionGuardada.id,
        );
        return calificacionGuardada;
      }
    } else if (tipo == 'Final') {
      const final = await this.calificacionService.findOne({
        where: { tipoCalificacion: tipoCalificacion.FINAL },
      });
      if (final) {
        throw new HttpException(
          'El final ya esta habilitado',
          HttpStatus.CONFLICT,
        );
      }
      return this.calificacionService.save(nuevaCalificacion);
    }
    // const calificacion = await this.asignaturaService.

    throw new HttpException('Ocurrio un problema', HttpStatus.CONFLICT);
  }

  async getpuntajeacumulado(id: number, tipo: string) {
    const puntajeacumulado = await this.calificacionService
      .createQueryBuilder('calificacion')
      .select('SUM(calificacion.puntaje)', 'sum')
      .where('calificacion.asignaturaid = :id', { id })
      .andWhere('calificacion.tipoCalificacion = :tipo', { tipo })
      .getRawOne();
    if (puntajeacumulado.sum == null) {
      return 0;
    }
    return parseInt(puntajeacumulado.sum);
  }
  findAll() {
    return this.calificacionService
      .createQueryBuilder('cal')
      .select(['cal', 'c'])
      .leftJoin('cal.asignatura', 'c')
      .getMany();
  }
  findAllAsignatura(id: number) {
    return this.calificacionService
      .createQueryBuilder('cal')
      .select([
        'cal',
        'c',
        'est',
        'u.nombres',
        'u.apellidoPaterno',
        'u.apellidoMaterno',
        'u.ci',
      ])
      .where('cal.asignaturaId = :ids', { ids: id })
      .leftJoin('cal.calificacion', 'c')
      .leftJoin('c.estudiante', 'est')
      .leftJoin('est.iduser', 'u')
      .getMany();
  }
  findParciales(id: number) {
    return this.calificacionService.find({
      where: { asignaturaId: id, tipoCalificacion: tipoCalificacion.PARCIAL },
      order: { id: 'DESC' },
    });
  }

  findPracticas(id: number) {
    return this.calificacionService.find({
      where: { asignaturaId: id, tipoCalificacion: tipoCalificacion.PRACTICA },
      order: { id: 'DESC' },
    });
  }

  update(id: number, updateCalificacionDto: UpdateCalificacionDto) {
    return `This action updates a #${id} calificacion`;
  }

  async remove(id: number) {
    const consulta = await this.calificacionestudianteService
      .createQueryBuilder('ce')
      .select(['ce', 'c.asignaturaId'])
      .where('ce.calificacionId = :ids', { ids: id })
      .andWhere('ce.calificacionObtenida > 0')
      .leftJoin('ce.calificacion', 'c')
      .getMany();
    if (!(consulta > [])) {
      await this.calificacionService.delete(id);
      return { response: 'Calificacion Eliminada' };
    }

    return { response: 'No se puede eliminar' };
  }

  async findCalificacionesAsignatura(id: number) {
    return await this.calificacionService.find({
      where: { asignaturaId: id },
      order: { tipoCalificacion: 'ASC' },
    });
  }

  async calificar(id: number, body: any) {
    await this.calificacionestudianteService.update({ id }, body);
    return this.calificacionestudianteService.findBy({ id });
  }
  async todasCalificaiones(estudianteId: string) {
    const consulta = await this.calificacionestudianteService
      .createQueryBuilder('ce')
      .select([
        'ce',
        'c.puntaje',
        'c.asignaturaId',
        'c.descripcion',
        'a.nombre',
      ])
      .where('u.id = :ids', { ids: estudianteId })
      .leftJoin('ce.calificacion', 'c')
      .leftJoin('c.asignatura', 'a')
      .leftJoin('ce.estudiante', 'e')
      .leftJoin('e.iduser', 'u')
      .orderBy('c.asignaturaId')
      .orderBy('ce.id', 'DESC')
      .getMany();
    return consulta;
  }

  async reportecalificaionAsignatura(id: number) {
    const consulta = this.asignaturaRepository
      .createQueryBuilder('asi')
      .select(['asi','ins','est','u.nombres','u.apellidoPaterno','u.apellidoMaterno','u.ci'])
      .where('asi.id = :ids', { ids: id })
      .leftJoin('asi.inscripcion', 'ins')
      .leftJoin('ins.estudiante', 'est')
      .leftJoin('est.iduser', 'u')
      .getMany();
    return consulta;
  }
}
