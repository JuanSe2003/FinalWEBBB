import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaProyectoService } from './propuesta-proyecto.service';

describe('PropuestaProyectoService', () => {
  let service: PropuestaProyectoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropuestaProyectoService],
    }).compile();

    service = module.get<PropuestaProyectoService>(PropuestaProyectoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
