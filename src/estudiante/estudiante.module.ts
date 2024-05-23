/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { EstudianteService } from './estudiante.service';
@Module({
  providers: [EstudianteService]
})
@Entity()
export class EstudianteModule {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    telefono: string;
    
    @OneToOne(() => ProyectoEntity)
    @JoinColumn()
    proyecto: ProyectoEntity;
}
