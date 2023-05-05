import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@ApiTags('docente')
@Controller('docente')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}
  @Get('/nombre')
  findAllNombre() {
    return this.docenteService.findAllNombre();
  }
  @Post()
  async create(@Body() createDocenteDto: CreateDocenteDto) {
    try {
    return  await this.docenteService.create(createDocenteDto)
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get()
  findAll() {
    return this.docenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docenteService.findOne(+id);
  }
}