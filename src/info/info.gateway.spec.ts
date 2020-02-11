import { Test, TestingModule } from '@nestjs/testing';
import { InfoGateway } from './info.gateway';

describe('InfoGateway', () => {
  let gateway: InfoGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoGateway],
    }).compile();

    gateway = module.get<InfoGateway>(InfoGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
