import { PartialType } from '@nestjs/swagger';
import { CreateRegionalProductDto } from './create-regional-product.dto';

export class UpdateRegionalProductDto extends PartialType(CreateRegionalProductDto) {}
