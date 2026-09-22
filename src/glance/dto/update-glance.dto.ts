import { PartialType } from '@nestjs/swagger';
import { CreateGlanceDto } from './create-glance.dto';

export class UpdateGlanceDto extends PartialType(CreateGlanceDto) {}
