/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';
@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
    ) {}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {       
        const fechaInicio = new Date(proyecto.fechaInicio);
        const fechaFin = new Date(proyecto.fechaFin);
        if(fechaInicio > fechaFin){
            return null;
        }
        return await this.proyectoRepository.save(proyecto);
    }
}
