import { Module } from '@nestjs/common';
import { ProfesorPropuestaService } from './profesor-propuesta.service';

@Module({
  providers: [ProfesorPropuestaService]
})
export class ProfesorPropuestaModule {}
