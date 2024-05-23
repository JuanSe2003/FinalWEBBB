/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProfesorModule } from './profesor/profesor.module';
import { ProfesorPropuestaModule } from './profesor-propuesta/profesor-propuesta.module';
import { PropuestaProyectoModule } from './propuesta-proyecto/propuesta-proyecto.module';
import { ProyectoEstudianteModule } from './proyecto-estudiante/proyecto-estudiante.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [ProyectoModule, EstudianteModule, PropuestaModule, ProfesorModule, ProfesorPropuestaModule, PropuestaProyectoModule, ProyectoEstudianteModule ,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Maria',
      database: 'ParcialWeb2',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
