import { PartialType } from '@nestjs/swagger';
import { CreateCourtSessionDto } from './create-court-session.dto';

export class UpdateCourtSessionDto extends PartialType(CreateCourtSessionDto) {}
