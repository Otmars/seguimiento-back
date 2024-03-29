import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompetenciaService } from './competencia.service';
import { CreateCompetenciaDto } from './dto/create-competencia.dto';
import { UpdateCompetenciaDto } from './dto/update-competencia.dto';
import { competenciaAsignatura } from '../asignatura/dto/competencia-asignatura.dto';
import { JwtAuthGuard } from 'src/user/guardjwt';

@ApiTags('competencia')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('competencia')
export class CompetenciaController {
  constructor(private readonly competenciaService: CompetenciaService) {}

  @Post()
  create(@Body() createCompetenciaDto: CreateCompetenciaDto) {
    return this.competenciaService.create(createCompetenciaDto);
  }
  @Post('/asicom')
  addcompetenciaAsinatura(@Body() competenciaAsignaturaDto : competenciaAsignatura ){
    return this.competenciaService.addCompetenciaAsignatura(competenciaAsignaturaDto.competenciaId,competenciaAsignaturaDto.asignaturaId)
  }
  @Get()
  findAll() {
    return this.competenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competenciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompetenciaDto: UpdateCompetenciaDto) {
    return this.competenciaService.update(+id, updateCompetenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competenciaService.remove(+id);
  }
}
