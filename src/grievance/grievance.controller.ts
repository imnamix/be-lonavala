import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GrievanceService } from './grievance.service';
import { CreateGrievanceDto } from './dto/create-grievance.dto';
import { UpdateGrievanceStatusDto } from './dto/update-grievance-status.dto';
import { CitizenAuthGuard } from '../auth/guards/citizen-auth.guard';
import { OptionalCitizenAuthGuard } from '../auth/guards/optional-citizen-auth.guard';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { GrievanceCategory, GrievanceStatus } from '../global/system.enums';

@ApiTags('Grievance')
@Controller('grievance')
export class GrievanceController {
  constructor(private readonly grievanceService: GrievanceService) {}

  // ─────────────────────────────────────────────────────────────────────────
  // Citizen routes
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * POST /grievance
   * Submit a new grievance.
   * Can be called by authenticated citizens (attaches citizenId from token)
   * or by guest citizens providing their phone number and details.
   */
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit a new grievance (authenticated citizen or public with mobile)' })
  @UseGuards(OptionalCitizenAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: false }))
  create(@Req() req: any, @Body() dto: CreateGrievanceDto) {
    return this.grievanceService.create(req.citizen?.id, dto);
  }


  /**
   * GET /grievance/my
   * Get grievances submitted by the logged-in citizen.
   */
  @Get('my')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get logged-in citizen's own grievances" })
  @UseGuards(CitizenAuthGuard)
  @ApiQuery({ name: 'status', required: false, enum: GrievanceStatus })
  @ApiQuery({ name: 'category', required: false, enum: GrievanceCategory })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getMyCitizenGrievances(
    @Req() req: any,
    @Query('status') status?: GrievanceStatus,
    @Query('category') category?: GrievanceCategory,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.grievanceService.getMyCitizenGrievances(req.citizen.id, {
      status,
      category,
      page: +page,
      limit: +limit,
    });
  }

  /**
   * GET /grievance/track/:ticketNumber
   * PUBLIC — no auth required. Track a grievance by its ticket number.
   */
  @Get('track/:ticketNumber')
  @ApiOperation({
    summary: 'Track a grievance by ticket number (public — no auth required)',
  })
  @ApiParam({ name: 'ticketNumber', example: 'GRV-2024-000001' })
  trackByTicket(@Param('ticketNumber') ticketNumber: string) {
    return this.grievanceService.trackByTicket(ticketNumber);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Admin / Officer routes
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * GET /grievance
   * Get all grievances — admin/officer auth required.
   */
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all grievances (admin / officer only)' })
  @UseGuards(AuthGuard)
  @ApiQuery({ name: 'status', required: false, enum: GrievanceStatus })
  @ApiQuery({ name: 'category', required: false, enum: GrievanceCategory })
  @ApiQuery({ name: 'wardNumber', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getAll(
    @Query('status') status?: GrievanceStatus,
    @Query('category') category?: GrievanceCategory,
    @Query('wardNumber') wardNumber?: number,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.grievanceService.getAll({
      status,
      category,
      wardNumber: wardNumber ? +wardNumber : undefined,
      page: +page,
      limit: +limit,
    });
  }

  /**
   * PATCH /grievance/:id/status
   * Update grievance status — admin/officer auth required.
   */
  @Patch(':id/status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update grievance status (admin / officer only)' })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiParam({ name: 'id', type: Number })
  updateStatus(
    @Param('id') id: number,
    @Req() req: any,
    @Body() dto: UpdateGrievanceStatusDto,
  ) {
    return this.grievanceService.updateStatus(+id, dto, req.user?.id);
  }
}
