/* eslint-disable prettier/prettier */
import { Controller, Param,Get, Post, Body } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { plainToInstance } from 'class-transformer';
import { EstudianteEntity } from './estudiante.entity';

@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) { }

    @Post()
    async crearEstudiante(@Body() estudianteDto: EstudianteDto) {
        const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
        return await this.estudianteService.createEstudiante(estudiante);
    }

    @Get(':id')
    async findEstudianteById(@Param('id') id: string) {
        return this.estudianteService.findEstudianteById(id);
    }

}
