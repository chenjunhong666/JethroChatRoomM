import { Test, TestingModule } from '@nestjs/testing';
import { LoginAndRegController } from './login-and-reg.controller';

describe('LoginAndReg Controller', () => {
  let controller: LoginAndRegController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginAndRegController],
    }).compile();

    controller = module.get<LoginAndRegController>(LoginAndRegController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
