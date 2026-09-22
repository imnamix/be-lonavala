import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryCourtProceedingDto {
  @ApiPropertyOptional({
    description: 'Filter by proceeding status (Upcoming, In Progress, Completed, Minutes Published, Order Passed)',
    example: 'Upcoming',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Search across subject, marathiSubject, description, minutes, benchOfficers, venue',
    example: 'High Court',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter active status (true/false)',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  @IsBoolean()
  active?: boolean;
}
