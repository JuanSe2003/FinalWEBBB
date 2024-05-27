/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsNumber} from 'class-validator';
export class EstudianteDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;
    @IsNotEmpty()
    @IsString()
    codigo: string;
    @IsNumber()
    @IsNotEmpty()
    numeroCreditosaprovados:number;
    
}
