import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryCourtSessionDto {
  @ApiPropertyOptional({
    description: 'Filter by session status (Scheduled, In Progress, Concluded, Adjourned, or ALL)',
    example: 'Scheduled',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Search keyword across sessionTitle, courtForum, presidingBench, and sessionAgenda',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean()
  active?: boolean;
}
