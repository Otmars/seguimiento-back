import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto, InscripcionDto, registrarCompetenciaDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('estudiante')
@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('/inscripcion')
  incripcion(@Body() createEstudianteDto: InscripcionDto) {
    return this.estudianteService.inscribir(createEstudianteDto);
  }

  @Post('/competencia')
  registrarCompetencia(@Body() body: registrarCompetenciaDto) {
    return this.estudianteService.createCompetenciaEstudiante(body);
  }

  @Get('/inscripcion')
  inscribidos() {
    return this.estudianteService.getinscripciones();
  }

  @Get('/inscripcion/:id')
  estudianteinscrito(@Param('id') id :string ) {
    return this.estudianteService.getinscripcion(+id);
  }

  @Get('/competencia/:id')
  getComptenciaEstudiante(@Param('id') id :string ) {
    return this.estudianteService.getCompetenciaEstudiante(+id);
  }



  @Delete('/retirar/:id')
  retirar(@Param('id') id: string) {
    return this.estudianteService.retirarMateria(+id);
  }

  
  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudianteService.update(+id, updateEstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}
