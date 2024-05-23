/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ){}
    async findEstudianteById(id: string): Promise<EstudianteEntity>{
        const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({where:{id}, relations: ['proyecto']});
        if(!estudiante){
            return null;
        }
        return estudiante;
    }

    async createEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity>{
        if(estudiante.codigo.length !== 10){
            return null;
        }
        return await this.estudianteRepository.save(estudiante);
    }

}
