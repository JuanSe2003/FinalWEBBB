/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorService } from './profesor.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
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
}
);



