/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PropuestaEntity } from '../propuesta/propuesta.entity';
@Entity()
export class ProfesorEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    numeroCedula:number;

    @Column()
    numeroextension:number;
    
    @Column()
    nombre:string;

    @Column()
    grupoInvestigacion:string;

    @OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor)
    propuestas: PropuestaEntity[];
    
}
