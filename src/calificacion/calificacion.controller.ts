import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CalificacionService } from './calificacion.service';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
import { JwtAuthGuard } from 'src/user/guardjwt';

@ApiTags('asignatura')
@UseGuards(JwtAuthGuard)
@Controller('calificacion')
export class CalificacionController {
  constructor(private readonly calificacionService: CalificacionService) {}

  @Post()
  create(@Body() createCalificacionDto: CreateCalificacionDto) {
    return this.calificacionService.create(createCalificacionDto);
  }

  @Get()
  findAll() {
    return this.calificacionService.findAll();
  }
  @Get('/:id')
  findAllAsignatura(@Param('id') id: string) {
    return this.calificacionService.findAllAsignatura(+id);
  }
  @Get('/reporte/:id')
  findAllAsignaturaReporte(@Param('id') id: string) {
    return this.calificacionService.reportecalificaionAsignatura(+id);
  }
  @Get('/parciales/:id')
  findParciales(@Param('id') id: string) {
    return this.calificacionService.findParciales(+id);
  }
  @Get('/practicas/:id')
  findPracticas(@Param('id') id: string) {
    return this.calificacionService.findPracticas(+id);
  }

  @Get(':id')
  findCalificacionesAsignatura(@Param('id') id: string) {
    return this.calificacionService.findCalificacionesAsignatura(+id);
  }
  @Post('/estudiante/:id')
  findCalificacionEstudiante(
    @Param('id') id: string,
    @Body() idAsinatura: any,
  ) {
    return this.calificacionService.getcalificacionEstudiante(+id, idAsinatura);
  }

  @Get('/all_estudiante/:id')
  findAllCalificacionEstudiante(@Param('id') id: string) {
    return this.calificacionService.todasCalificaiones(id);
  }

  @Post('calificacion-estudiante/:id')
  calificando(@Param('id') id: string, @Body() body: any) {
    return this.calificacionService.calificar(+id, body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCalificacionDto: UpdateCalificacionDto,
  ) {
    return this.calificacionService.update(+id, updateCalificacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calificacionService.remove(+id);
  }
}
