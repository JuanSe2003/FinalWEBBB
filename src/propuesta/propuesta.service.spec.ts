/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaService } from './propuesta.service';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repositoryPropuestas: Repository<PropuestaEntity>;
  let propuestasList: PropuestaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PropuestaService],
    }).compile();
    service = module.get<PropuestaService>(PropuestaService);
    repositoryPropuestas = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repositoryPropuestas.clear();
    propuestasList = [];
    for (let i=0; i<5; i++) {
      const propuesta :PropuestaEntity= await repositoryPropuestas.save({
        titulo: faker.lorem.sentence(),
        descripcion: faker.lorem.paragraph(),
        palabraClave: faker.lorem.word(),
        proyecto: null,
        profesor: null
      });
      propuestasList.push(propuesta);
    }
  }

  it ('Crear una propuesta de manera exitosa', async () => {
    const propuesta: PropuestaEntity = {
      id: "200",
      titulo: faker.lorem.sentence(),
      descripcion: faker.lorem.paragraph(),
      palabraClave: faker.lorem.word(),
      proyecto: null,
      profesor: null
    };
    const nuevaPropuesta: PropuestaEntity = await service.createPropuesta(propuesta);
    expect(nuevaPropuesta).not.toBeNull();
    const propuestaAlmacenada: PropuestaEntity = await repositoryPropuestas.findOne({where:{id: nuevaPropuesta.id}});
    expect(propuestaAlmacenada).not.toBeNull();
    expect(propuestaAlmacenada.id).toEqual(nuevaPropuesta.id);
    expect(propuestaAlmacenada.titulo).toEqual(nuevaPropuesta.titulo);
    expect(propuestaAlmacenada.descripcion).toEqual(nuevaPropuesta.descripcion);
    expect(propuestaAlmacenada.palabraClave).toEqual(nuevaPropuesta.palabraClave);
  });

  it ("Crear una propuesta sin titulo", async () => {
    const propuesta: PropuestaEntity = {
      id: "200",
      titulo: '',
      descripcion: faker.lorem.paragraph(),
      palabraClave: faker.lorem.word(),
      proyecto: null,
      profesor: null
    };
    const nuevaPropuesta: PropuestaEntity = await service.createPropuesta(propuesta);
    expect(nuevaPropuesta).toBeNull();
    
  });

  it ("Metodo find by id", async () => {
    const propuesta: PropuestaEntity = propuestasList[0];
    const propuestaEncontrada: PropuestaEntity = await service.findPropuestaById(propuesta.id);
    expect(propuestaEncontrada).not.toBeNull();
    expect(propuestaEncontrada.id).toEqual(propuesta.id);
    expect(propuestaEncontrada.titulo).toEqual(propuesta.titulo);
    expect(propuestaEncontrada.descripcion).toEqual(propuesta.descripcion);
    expect(propuestaEncontrada.palabraClave).toEqual(propuesta.palabraClave);
  });

  it ("Metodo find by id no exitoso", async () => {
    const propuestaEncontrada: PropuestaEntity = await service.findPropuestaById("999");
    expect(propuestaEncontrada).toBeNull();
  });

});
