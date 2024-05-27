/* eslint-disable prettier/prettier */
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProyectoEntity } from "../proyecto/proyecto.entity";
@Entity()
export class EstudianteEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    nombre: string;
    @Column()
    codigo: string;
    @Column()
    numeroCreditosaprovados:number;

    @OneToOne(() => ProyectoEntity, proyecto => proyecto.estudiante)
    proyecto: ProyectoEntity;
}
