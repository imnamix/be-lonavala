import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CitizenService } from './citizen.service';
import {
  CheckCitizenPhoneDto,
  UpdateCitizenProfileDto,
  VerifyFirebaseTokenDto,
} from './dto/citizen.dto';
import { CitizenAuthGuard } from '../auth/guards/citizen-auth.guard';

@ApiTags('Citizen Auth')
@Controller('citizen')
export class CitizenController {
  constructor(private readonly citizenService: CitizenService) {}

  /**
   * POST /citizen/auth/check-phone
   * Checks if a mobile number is already registered in the system.
   */
  @Post('auth/check-phone')
  @ApiOperation({
    summary: 'Check if mobile number is registered',
    description: 'Returns isRegistered: true/false for the given phone number.',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  checkPhone(@Body() dto: CheckCitizenPhoneDto) {
    return this.citizenService.checkPhone(dto);
  }

  /**
   * POST /citizen/auth/verify-otp
   * Accepts Firebase idToken or default OTP (with optional registration profile data),
   * verifies it server-side, and returns a backend JWT.
   */
  @Post('auth/verify-otp')
  @ApiOperation({
    summary: 'Citizen login / register via Phone OTP',
    description:
      'Verify OTP or Firebase idToken. Creates or logs into citizen account and returns JWT.',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  verifyOtp(@Body() dto: VerifyFirebaseTokenDto) {
    return this.citizenService.verifyAndLogin(dto);
  }

  /**
   * GET /citizen
   * Admin / List all citizens
   */
  @Get()
  @ApiOperation({ summary: 'List all registered citizens (admin/internal)' })
  findAll(
    @Req() req: any,
  ) {
    const { search, page, limit } = req.query || {};
    return this.citizenService.findAll({ search, page, limit });
  }

  /**
   * GET /citizen/profile
   */
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get logged-in citizen profile' })
  @UseGuards(CitizenAuthGuard)
  getProfile(@Req() req: any) {
    return this.citizenService.getProfile(req.citizen.id);
  }

  /**
   * GET /citizen/:id
   * Admin / Get single citizen details and grievance history
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get single citizen by ID with grievances' })
  findOne(@Req() req: any) {
    const id = Number(req.params.id);
    return this.citizenService.findOne(id);
  }

  /**
   * PATCH /citizen/profile
   */
  @Patch('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update citizen profile (name, email, address)' })
  @UseGuards(CitizenAuthGuard)
  @UsePipes(new ValidationPipe())
  updateProfile(@Req() req: any, @Body() dto: UpdateCitizenProfileDto) {
    return this.citizenService.updateProfile(req.citizen.id, dto);
  }
}
