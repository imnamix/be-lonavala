import { PartialType } from '@nestjs/swagger';
import { CreateImportantUpdateDto } from './create-important-update.dto';

export class UpdateImportantUpdateDto extends PartialType(
  CreateImportantUpdateDto,
) {}
