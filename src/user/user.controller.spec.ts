import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { UtilityHelper } from '../shared/services/utility.helper';
import { SharedModule } from '../shared/shared.module';
import { EN_User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    let moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockImplementation((obj) => {
              return {};
            }),
          },
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  it(' it Should Be Defined', () => {
    expect(userController).toBeDefined();
  });

  it('it Should Return Object', () => {
    expect(userService.create({})).toStrictEqual({});
  });
});
