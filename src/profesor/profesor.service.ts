/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private profesorRepository: Repository<ProfesorEntity>,
    ) {}

    async findbyId(id: string): Promise<ProfesorEntity> {
        const profesor :ProfesorEntity = await this.profesorRepository.findOne({where:{id}, relations: ['propuestas']});
        if (!profesor) {
            throw new BusinessLogicException('Profesor no encontrado', BusinessError.NOT_FOUND);
        }
        return profesor;
    }

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        
        if(profesor.grupoInvestigacion != 'TICSW' && profesor.grupoInvestigacion != 'IMAGINE' && profesor.grupoInvestigacion != 'COMIT'){
            throw new BusinessLogicException('Grupo de investigacion no valido', BusinessError.BAD_REQUEST);
        }
        return await this.profesorRepository.save(profesor);
    }

    async eliminarProfesor(id: string): Promise<ProfesorEntity> {
        const profesor = await this.profesorRepository.findOne({where: {id},relations: ['propuestas']});
        if (!profesor) {
            throw new BusinessLogicException('No se puede eliminar el profesor porque tiene propuestas asociadas', BusinessError.BAD_REQUEST);
        }
        if(profesor.propuestas.length && Array.isArray(profesor.propuestas) && profesor.propuestas.length > 0){
            for (const propuesta of profesor.propuestas) {
                if (propuesta.proyecto!=null) {
                    throw new BusinessLogicException('No se puede eliminar el profesor porque tiene propuestas asociadas', BusinessError.BAD_REQUEST);
                }
            }
        }
        return await this.profesorRepository.remove(profesor);
    }

    async eliminarProfesorCedula(numeroCedula: number): Promise<ProfesorEntity> {
        const profesor = await this.profesorRepository.findOne({where: {numeroCedula},relations: ['propuestas']});
        if (!profesor) {
            throw new BusinessLogicException('No se puede eliminar el profesor porque tiene propuestas asociadas', BusinessError.BAD_REQUEST);
        }
        if(profesor.propuestas.length && Array.isArray(profesor.propuestas) && profesor.propuestas.length > 0){
            for (const propuesta of profesor.propuestas) {
                if (propuesta.proyecto!=null) {
                    throw new BusinessLogicException('No se puede eliminar el profesor porque tiene propuestas asociadas', BusinessError.BAD_REQUEST);
                }
            }
        }
        return await this.profesorRepository.remove(profesor);
    }

}
