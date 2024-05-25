/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity';


@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ){}

    async findPropuestaById(id: string): Promise<PropuestaEntity>{
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where:{id},relations: ['profesor', 'proyecto']});
        if(!propuesta){
            return null;
        }
        return propuesta;
    }

    async findAllPropuesta(): Promise<PropuestaEntity[]>{
        return await this.propuestaRepository.find();
    }

    async createPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity>{
        if(propuesta.titulo === ''){
            return null;
        }
        return await this.propuestaRepository.save(propuesta);
    }


    async deletePropuesta(id: string): Promise<PropuestaEntity>{
        const propuesta = await this.propuestaRepository.findOne({where: {id},relations: ['proyecto']});
        if (!propuesta) {
            return null;
        }
        if(propuesta.proyecto){
            return null;
        }
        return await this.propuestaRepository.remove(propuesta);
    }


}
