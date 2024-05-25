/* eslint-disable prettier/prettier */
import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { PropuestaEntity } from '../propuesta/propuesta.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
@Entity()
export class ProyectoEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    fechaInicio: string;
    @Column()
    fechaFin: string;
    @Column()
    URL:string;
    @OneToOne(() => PropuestaEntity, propuesta => propuesta.proyecto)
    @JoinColumn()
    propuesta: PropuestaEntity;
    @OneToOne(() => EstudianteEntity, estudiante => estudiante.proyecto)
    estudiante: EstudianteEntity;
}
