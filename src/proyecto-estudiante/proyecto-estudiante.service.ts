/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity'; 
import { EstudianteEntity } from '../estudiante/estudiante.entity';
@Injectable()
export class ProyectoEstudianteService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>,
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ){}

    async asignarProyectoEstudiante(idProyecto: string, idEstudiante: string): Promise<any>{
        const proyecto = await this.proyectoRepository.findOne({where:{id: idProyecto}, relations: ['estudiante']});
        const estudiante = await this.estudianteRepository.findOne({where:{id: idEstudiante}, relations: ['proyecto']});
        proyecto.estudiante = estudiante;
        return await this.proyectoRepository.save(proyecto);
    }

}
