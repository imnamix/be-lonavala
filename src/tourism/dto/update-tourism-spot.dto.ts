import { PartialType } from '@nestjs/swagger';
import { CreateTourismSpotDto } from './create-tourism-spot.dto';

export class UpdateTourismSpotDto extends PartialType(CreateTourismSpotDto) {}
