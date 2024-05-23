import { Module } from '@nestjs/common';
import { PropuestaProyectoService } from './propuesta-proyecto.service';

@Module({
  providers: [PropuestaProyectoService]
})
export class PropuestaProyectoModule {}
