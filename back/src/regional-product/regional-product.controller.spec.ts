import { Test, TestingModule } from '@nestjs/testing';
import { RegionalProductController } from './regional-product.controller';
import { RegionalProductService } from './regional-product.service';

describe('RegionalProductController', () => {
  let controller: RegionalProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionalProductController],
      providers: [RegionalProductService],
    }).compile();

    controller = module.get<RegionalProductController>(RegionalProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
