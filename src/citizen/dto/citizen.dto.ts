import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CheckCitizenPhoneDto {
  @ApiProperty({
    description: '10-digit mobile number of the citizen',
    example: '9876543210',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class VerifyFirebaseTokenDto {
  @ApiProperty({
    required: false,
    description:
      'Firebase ID token returned after successful OTP verification on the client side',
    example: 'eyJhbGciOiJSUzI1NiIs...',
  })
  @IsOptional()
  @IsString()
  idToken?: string;

  @ApiProperty({
    required: false,
    description: 'Mobile number of citizen',
    example: '9876543210',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    required: false,
    description: 'OTP code entered by user (supports default 123456)',
    example: '123456',
  })
  @IsOptional()
  @IsString()
  otp?: string;

  @ApiProperty({
    required: false,
    description: 'Full name for registration',
    example: 'Aniket Sharma',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiProperty({
    required: false,
    description: 'Address for registration',
    example: 'Near Shivaji Chowk, Lonavala',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    required: false,
    description: 'Optional email for registration',
    example: 'citizen@example.com',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @ApiProperty({
    required: false,
    description: 'Optional profile picture URL uploaded to Cloudinary',
  })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({
    required: false,
    description: 'Flag indicating registration mode',
    example: false,
  })
  @IsOptional()
  isRegistering?: boolean;
}

export class UpdateCitizenProfileDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false, description: 'Cloudinary URL for profile picture' })
  @IsOptional()
  @IsString()
  profilePicture?: string;
}
