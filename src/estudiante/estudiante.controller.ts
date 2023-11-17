import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto, InscripcionDto, Masivo, registrarCompetenciaDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guardjwt';

@ApiTags('estudiante')
@UseGuards(JwtAuthGuard)
@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('/masivo')
  incripcionMasivo(@Body() createEstudianteDto: Masivo) {
    return this.estudianteService.inscribirMasivo(createEstudianteDto);
  }

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
    return this.estudianteService.getinscripcion(id);
  }
  @Get('/competencias')
  getAllComptenciaEstudiantes() {
    return this.estudianteService.getallCompetenciasAllEstudiante();
  }
  @Get('/nocompetencias/:id')
  getAllComptenciaEst(@Param('id') id :string) {
    return this.estudianteService.getCompetenciasObtenidasNoObtenidas(+id);
  }
  @Get('/competencia/:id')
  getAllComptenciaEstudiante(@Param('id') id :string) {
    return this.estudianteService.getAllCompetenciaEstudiante(id);
  }
  @Post('/competencia/:id')
  getComptenciaEstudiante(@Param('id') id :string, @Body() datos: any) {
    return this.estudianteService.getCompetenciaEstudiante(+id,datos);
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
