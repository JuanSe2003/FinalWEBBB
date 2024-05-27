/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoModule } from './proyecto/proyecto.module';
import { ProyectoEntity } from './proyecto/proyecto.entity';
import { ProfesorModule } from './profesor/profesor.module';
import { ProfesorEntity } from './profesor/profesor.entity';
import { EstudianteModule } from './estudiante/estudiante.module';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { PropuestaModule } from './propuesta/propuesta.module';
import { PropuestaEntity } from './propuesta/propuesta.entity';

@Module({
 imports: [ ProyectoModule, ProfesorModule, EstudianteModule, PropuestaModule,
   TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'Maria',
     database: 'ParcialWeb4',
     entities: [ProyectoEntity, ProfesorEntity, EstudianteEntity, PropuestaEntity],
     dropSchema: true,
     synchronize: true,
     keepConnectionAlive: true
   }),
 ],
 controllers: [AppController],
 providers: [AppService],
})
export class AppModule {}
