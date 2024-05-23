/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
@Module({
    imports: [TypeOrmModule.forFeature([EstudianteEntity])],
  providers: [EstudianteService]
})
export class EstudianteModule {}

