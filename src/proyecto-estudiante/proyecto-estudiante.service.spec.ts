/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoEstudianteService } from './proyecto-estudiante.service';

describe('ProyectoEstudianteService', () => {
  let service: ProyectoEstudianteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectoEstudianteService],
    }).compile();

    service = module.get<ProyectoEstudianteService>(ProyectoEstudianteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
