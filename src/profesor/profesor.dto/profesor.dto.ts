/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsNumber} from 'class-validator';
export class ProfesorDto {
    @IsNumber()
    @IsNotEmpty()
    readonly numeroCedula: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly grupoInvestigacion: string;

    @IsNumber()
    @IsNotEmpty()
    readonly numeroDeExtensión: number;
}
