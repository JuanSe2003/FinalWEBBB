/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudiantesList: EstudianteEntity[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const seedDatabase = async () => {
    repository.clear();
    estudiantesList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante: EstudianteEntity = await repository.save({
        nombre: faker.word.sample(),
        codigo: faker.word.sample(),
        numeroCreditosaprovados: faker.number.int()
      })
      estudiantesList.push(estudiante);
    }
  }

  it('should create a student successfully', async () => {
    const estudiante: EstudianteEntity = {
      id: '200',
      nombre: faker.word.sample(),
      codigo: "0123456789",
      numeroCreditosaprovados: faker.number.int(),
      proyecto: null
    };
    const nuevoEstudiante: EstudianteEntity = await service.createEstudiante(estudiante);
    expect(nuevoEstudiante).not.toBeNull();
    const estudianteAlmacenado: EstudianteEntity = await repository.findOne({ where: { id: nuevoEstudiante.id } });
    expect(estudianteAlmacenado).not.toBeNull();
    expect(estudianteAlmacenado.id).toEqual(nuevoEstudiante.id);
    expect(estudianteAlmacenado.nombre).toEqual(nuevoEstudiante.nombre);
    expect(estudianteAlmacenado.codigo).toEqual(nuevoEstudiante.codigo);
    expect(estudianteAlmacenado.numeroCreditosaprovados).toEqual(nuevoEstudiante.numeroCreditosaprovados);
  });

  it ("crear un estudiante que no se pueda", async () => {
    const estudiante: EstudianteEntity = {
      id: '200',
      nombre: faker.word.sample(),
      codigo: "000000",
      numeroCreditosaprovados: faker.number.int(),
      proyecto: null
    };
     const valor = await service.createEstudiante(estudiante);
     expect(valor).toBeNull();
  });

  it ("buscar un estudiante por id", async () => {
    const storedEstudiante = estudiantesList[0];
    const estudiante = await service.findEstudianteById(storedEstudiante.id);
    expect(estudiante).not.toBeNull();
    expect(estudiante.id).toEqual(storedEstudiante.id);
    expect(estudiante.nombre).toEqual(storedEstudiante.nombre);
    expect(estudiante.codigo).toEqual(storedEstudiante.codigo);
    expect(estudiante.numeroCreditosaprovados).toEqual(storedEstudiante.numeroCreditosaprovados);
  });   

  it ("buscar un estudiante por id que no existe", async () => {
    const estudiante = await service.findEstudianteById("000");
    expect(estudiante).toBeNull();
  });

  
});
