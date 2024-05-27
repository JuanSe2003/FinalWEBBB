/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteController } from './estudiante.controller';
@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEntity])],
  providers: [EstudianteService],
  controllers: [EstudianteController]
})
export class EstudianteModule {}

