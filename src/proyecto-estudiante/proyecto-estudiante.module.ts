import { Module } from '@nestjs/common';
import { ProyectoEstudianteService } from './proyecto-estudiante.service';

@Module({
  providers: [ProyectoEstudianteService]
})
export class ProyectoEstudianteModule {}
