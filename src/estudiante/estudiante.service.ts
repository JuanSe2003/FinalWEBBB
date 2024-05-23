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
}
