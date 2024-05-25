/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
describe('ProfesorService', () => {
  let service: ProfesorService;
  let repositoryProfesores: Repository<ProfesorEntity>;
  let profesoresList: ProfesorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repositoryProfesores = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repositoryProfesores.clear();
    profesoresList = [];
    for (let i=0; i<5; i++) {
      const profesor :ProfesorEntity= await repositoryProfesores.save({
        numeroCedula: faker.number.int(),
        numeroextension: faker.number.int(),
        nombre: faker.person.firstName(),
        grupoInvestigacion: "TICSW",
        propuestas:[],
        
      });
      profesoresList.push(profesor);
    }
  };
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("Crear un profesor de manera exitosa", async () => {
    const profesor:ProfesorEntity= {
      id:"200",
      numeroCedula: faker.number.int(),
      numeroextension: faker.number.int(),
      nombre: faker.person.firstName(),
      grupoInvestigacion: "TICSW",
      propuestas:[],
    };
    const nuevoProfesor:ProfesorEntity= await service.crearProfesor(profesor);
    expect(nuevoProfesor).not.toBeNull();
    const profesorAlmacenado: ProfesorEntity= await repositoryProfesores.findOne({where:{id: nuevoProfesor.id}});
    expect(profesorAlmacenado).not.toBeNull();
    expect (profesorAlmacenado.id).toEqual(nuevoProfesor.id);
    expect (profesorAlmacenado.numeroCedula).toEqual(nuevoProfesor.numeroCedula);
    expect (profesorAlmacenado.numeroextension).toEqual(nuevoProfesor.numeroextension);
    expect (profesorAlmacenado.nombre).toEqual(nuevoProfesor.nombre);
    expect (profesorAlmacenado.grupoInvestigacion).toEqual(nuevoProfesor.grupoInvestigacion);
  }); 
  
  it ("No se puede crear un profesor con un grupo de investigacion diferente a TICSW, IMAGINE o COMIT", async () => {
    const profesor:ProfesorEntity= {
      id:"200",
      numeroCedula: faker.number.int(),
      numeroextension: faker.number.int(),
      nombre: faker.person.firstName(),
      grupoInvestigacion: "BABYGIRL",
      propuestas:[],
    };
    const nuevoProfesor:ProfesorEntity= await service.crearProfesor(profesor);
    expect(nuevoProfesor).toEqual(BusinessLogicException("Grupo de investigacion no valido", BusinessError.BAD_REQUEST));
  });

  it ("findbyId exitoso", async () => {
    const storedProfesor:ProfesorEntity = profesoresList[0];
    const profesor:ProfesorEntity = await service.findbyId(storedProfesor.id);
    expect(profesor).not.toBeNull();
    expect(profesor.id).toEqual(storedProfesor.id);
    expect(profesor.numeroCedula).toEqual(storedProfesor.numeroCedula);
    expect(profesor.numeroextension).toEqual(storedProfesor.numeroextension);
    expect(profesor.nombre).toEqual(storedProfesor.nombre);
    expect(profesor.grupoInvestigacion).toEqual(storedProfesor.grupoInvestigacion);
  });

  it ("findbyId fallido", async () => {
    await expect(()=>service.findbyId("999")).rejects.toHaveProperty("message", "Profesor no encontrado");
  });

}
);



