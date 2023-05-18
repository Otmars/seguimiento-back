import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
import { Calificacion, tipoCalificacion } from './entities/calificacion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { AsignaturaService } from 'src/asignatura/asignatura.service';

@Injectable()
export class CalificacionService {
  constructor(
    @InjectRepository(Calificacion)
    private calificacionService: Repository<Calificacion>,
    private asignaturaService: AsignaturaService,
  ) {}
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
    console.log(puntaje);
    const nuevaCalificacion = this.calificacionService.create(
      createCalificacionDto,
    );
    if (tipo == 'Practica') {
      if (puntaje+createCalificacionDto.puntaje <= 35) {
        return this.calificacionService.save(nuevaCalificacion);
      }
    } else if (tipo == 'Parcial') {
      if (puntaje+createCalificacionDto.puntaje <= 35) {
        return this.calificacionService.save(nuevaCalificacion);
      }
      
    } else if (tipo == 'Final') {
      const final  = await this.calificacionService.findOne({where:{tipoCalificacion: tipoCalificacion.FINAL}})
      console.log(final);
      
      if (final) {
        throw new HttpException(
          'El final ya esta habilitado',
          HttpStatus.CONFLICT,
        );
        
      }
      return this.calificacionService.save(nuevaCalificacion);
    }
    // const calificacion = await this.asignaturaService.
    
    throw new HttpException(
      'Ocurrio un problema',
      HttpStatus.CONFLICT,
    );
  }

  async getpuntajeacumulado(id: number, tipo: string) {

    const puntajeacumulado = await this.calificacionService
      .createQueryBuilder('calificacion')
      .select('SUM(calificacion.puntaje)', 'sum')
      .where('calificacion.asignaturaid = :id', { id })
      .andWhere('calificacion.tipoCalificacion = :tipo', { tipo })
      .getRawOne();

      console.log(puntajeacumulado);
    if (puntajeacumulado.sum == null) {
      return 0
    }  
    return parseInt(puntajeacumulado.sum);
  }
  findAll() {
    return this.calificacionService.find();
  }

  findParciales(id: number) {
    return this.calificacionService.find({where:{asignaturaId:id,tipoCalificacion:tipoCalificacion.PARCIAL}});
  }

  findPracticas(id: number) {
    return this.calificacionService.find({where:{asignaturaId:id,tipoCalificacion:tipoCalificacion.PRACTICA}});
  }

  update(id: number, updateCalificacionDto: UpdateCalificacionDto) {
    return `This action updates a #${id} calificacion`;
  }

  remove(id: number) {
    return this.calificacionService.softDelete(id);
  }

  findCalificacionesAsignatura(id:number){
    console.log("aqui");  
    return this.calificacionService.find({where:{asignaturaId:id},order:{tipoCalificacion:"ASC"}});
  }
  
}
