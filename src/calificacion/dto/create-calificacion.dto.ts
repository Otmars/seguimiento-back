import { Asignatura } from "src/asignatura/entities/asignatura.entity"
import { tipoCalificacion } from "../entities/calificacion.entity"

export class CreateCalificacionDto {

    descripcion:string 

    puntaje:number

    asignaturaId:number

    tipoCalificacion:tipoCalificacion
}
