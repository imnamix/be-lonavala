import { PartialType } from '@nestjs/swagger';
import { CreateCourtProceedingDto } from './create-court-proceeding.dto';

export class UpdateCourtProceedingDto extends PartialType(CreateCourtProceedingDto) {}
