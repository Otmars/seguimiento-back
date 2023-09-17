import { competenciaAsignatura } from "src/asignatura/dto/competencia-asignatura.dto";
import { AsignaturaToCompetencia } from "src/asignatura/entities/asignaturaCompetencia.entity";

export class CreateEstudianteDto {}

export class InscripcionDto {
  asignaturaId: number;
  estudianteId: number;
  gestion: number;
}

export class registrarCompetenciaDto {
  competenciaAsignaturaCompetenciaId: any;
  estudianteId: number;
}
