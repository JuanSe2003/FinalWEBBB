/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private profesorRepository: Repository<ProfesorEntity>,
    ) {}

    async findbyId(id: string): Promise<ProfesorEntity> {
        const profesor :ProfesorEntity = await this.profesorRepository.findOne({where:{id}, relations: ['proyectos']});
        if (!profesor) {
            return null;
        }
        return profesor;
    }

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        
        if(profesor.grupoInvestigacion != 'TICSW' && profesor.grupoInvestigacion != 'IMAGINE' && profesor.grupoInvestigacion != 'COMIT'){
            return null;
        }
        return await this.profesorRepository.save(profesor);
    }

    async eliminarProfesor(id: string): Promise<ProfesorEntity> {
        const profesor = await this.profesorRepository.findOne({where: {id},relations: ['proyectos']});
        if (!profesor) {
            return null;
        }
        if(profesor.propuestas.length > 0){
            return null;
        }
        return await this.profesorRepository.remove(profesor);
    }

    async eliminarprofesorporCedula(numeroCedula: number): Promise<ProfesorEntity> {
        const profesor = await this.profesorRepository.findOne({where: {numeroCedula},relations: ['proyectos']});
        if (!profesor) {
            return null;
        }
        if(profesor.propuestas.length > 0){
            return null;
        }
        return await this.profesorRepository.remove(profesor);
    }

}
