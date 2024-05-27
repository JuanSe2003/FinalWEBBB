/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PropuestaEntity } from './propuesta.entity';
import { PropuestaService } from './propuesta.service';
import { PropuestaDto } from './propuesta.dto/propuesta.dto';
import { Post, Body,Get,Param,Delete,HttpCode} from '@nestjs/common';
@Controller('propuesta')
export class PropuestaController {
    constructor(private readonly propuestaService: PropuestaService) { }

    @Post()
    async crearPropuesta(@Body() propuestaDto: PropuestaDto) {
        const propuesta: PropuestaEntity = plainToInstance(PropuestaEntity, propuestaDto);
        return await this.propuestaService.createPropuesta(propuesta);
    }

    @Get(':id')
    async findPropuestaById(@Param('id') id: string) {
        return this.propuestaService.findPropuestaById(id);
    }

    @Get()
    async findAllPropuesta() {
        return this.propuestaService.findAllPropuesta();
    }

    @Delete(':id')
    @HttpCode(204)
    async deletePropuesta(@Param('id') id: string) {
        return this.propuestaService.deletePropuesta(id);
    }

}
