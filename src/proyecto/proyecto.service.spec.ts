/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('ProyectoService', () => {
  let service: ProyectoService;
  let repositoryProyectos: Repository<ProyectoEntity>;
  let proyectosList: ProyectoEntity[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repositoryProyectos = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repositoryProyectos.clear();
    proyectosList = [];
    for (let i=0; i<5; i++) {
      const proyecto :ProyectoEntity= await repositoryProyectos.save({
        fechaInicio: String(faker.date.recent()),
        fechaFin: String(faker.date.future()),
        URL: faker.internet.url(),
      });
      proyectosList.push(proyecto);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("Crear un proyecto de manera exitosa", async () => {
    const proyecto:ProyectoEntity= {
      id:"200",
      fechaInicio: String(faker.date.recent()),
      fechaFin: String(faker.date.future()),
      URL: faker.internet.url(),
      propuesta: null,
      estudiante: null
    };
    const nuevoProyecto:ProyectoEntity= await service.crearProyecto(proyecto);
    expect(nuevoProyecto).not.toBeNull();
    const proyectoAlmacenado: ProyectoEntity= await repositoryProyectos.findOne({where:{id: nuevoProyecto.id}});
    expect(proyectoAlmacenado).not.toBeNull();
    expect (proyectoAlmacenado.id).toEqual(nuevoProyecto.id);
    expect (proyectoAlmacenado.fechaInicio).toEqual(nuevoProyecto.fechaInicio);
    expect (proyectoAlmacenado.fechaFin).toEqual(nuevoProyecto.fechaFin);
    expect (proyectoAlmacenado.URL).toEqual(nuevoProyecto.URL);
  });

  it ("crear un proyecto que no se pueda", async () => {
    const proyecto: ProyectoEntity = {
      id: '200',
      fechaInicio: String(faker.date.future()),
      fechaFin: String(faker.date.recent()),
      URL: faker.internet.url(),
      propuesta: null,
      estudiante: null
    };
    const nuevoProyecto: ProyectoEntity = await service.crearProyecto(proyecto);
    expect(nuevoProyecto).toBeNull();
  });
  
});
