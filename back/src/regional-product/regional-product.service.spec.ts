import { Test, TestingModule } from '@nestjs/testing';
import { RegionalProductService } from './regional-product.service';

describe('RegionalProductService', () => {
  let service: RegionalProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegionalProductService],
    }).compile();

    service = module.get<RegionalProductService>(RegionalProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
