/* eslint-disable prettier/prettier */
import { plainToInstance } from 'class-transformer';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './profesor.dto/profesor.dto';
import { Controller, Param,Get, Post, Body ,Delete} from '@nestjs/common';

@Controller('profesor')
export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService) { }

    @Post()
    async crearProfesor(@Body() profesorDto: ProfesorDto) {
        const profesor: ProfesorEntity = plainToInstance(ProfesorEntity, profesorDto);
        return await this.profesorService.crearProfesor(profesor);
    }

    @Get(':id')
    async findProfesorById(@Param('id') id: string) {
        return this.profesorService.findbyId(id);
    }

    @Delete(':id')
    async eliminarProfesorId(@Param('id') id: string) {
        return this.profesorService.eliminarProfesor(id);
    }

    @Delete(':cedula')
    async eliminarProfesorCedula(@Param('cedula') cedula: number) {
        return this.profesorService.eliminarProfesorCedula(cedula);
    }
}
