/* eslint-disable prettier/prettier */
import { Column, Entity, OneToOne, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { ProyectoEntity} from "../proyecto/proyecto.entity";
import { ProfesorEntity } from "../profesor/profesor.entity";
@Entity()
export class PropuestaEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    titulo: string;
    @Column()
    descripcion: string;
    @Column()
    palabraClave: string;
    @OneToOne(() => ProyectoEntity, proyecto => proyecto.propuesta)
    proyecto: ProyectoEntity;
    @ManyToOne(() => ProfesorEntity, profesor => profesor.propuestas)
    profesor: ProfesorEntity;
}
