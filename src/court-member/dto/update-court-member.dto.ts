import { PartialType } from '@nestjs/swagger';
import { CreateCourtMemberDto } from './create-court-member.dto';

export class UpdateCourtMemberDto extends PartialType(CreateCourtMemberDto) {}
