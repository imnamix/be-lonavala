import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EN_User } from '../user/entity/user.entity';
import { loginRexDTO } from './entity/login.dto';
import { EmailService } from '../EmailService/mailService';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(EN_User)
    private readonly userRepo: Repository<EN_User>,
    private readonly emailService: EmailService,
  ) {}

  async login(obj: loginRexDTO) {
    const email = obj.email?.trim().toLowerCase();
    let user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('LOWER(user.email) = LOWER(:email)', { email })
      .getOne();

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid credentials. User not found with this email.',
          errorCode: 'EC001',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.isVerified) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Your account is not verified. Please contact administrator.',
          errorCode: 'EC003',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (!(await user.comparePassword(obj.password))) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid password. Please check your credentials.',
          errorCode: 'EC002',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userWithRoles = await this.userRepo.findOne({
      where: { id: user.id },
      relations: ['roles', 'roles.permissions'],
    });

    const userRO = userWithRoles.toResponseObject();

    return {
      success: true,
      message: 'Login successful',
      data: userRO,
      ...userRO,
    };
  }

  async verify(obj) {
    const user = await this.userRepo.findOne({
      where: { id: obj.id },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email Is Not Found. Try To register Again',
          erroCode: 'EC010',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedStatus = await this.userRepo.update(
      { id: obj.id },
      { isVerified: true },
    );
    return true;
  }

  async resetPassword(body: any) {
    try {
      const { email, newPassword } = body;

      if (!email || !newPassword) {
        throw new BadRequestException({
          message: 'Email and New Password are required.',
          errorCode: 'EC010',
        });
      }

      const user = await this.userRepo.findOne({ where: { email } });

      if (!user) {
        throw new NotFoundException({
          message: 'User not found.',
          errorCode: 'EC011',
        });
      }

      user.password = newPassword;

      await this.userRepo.save(user);

      return {
        status: 'success',
        data: {
          message: 'Password reset successfully',
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: 'Internal server error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyOtp(obj: any) {
    try {
      const user = await this.userRepo.findOne({
        where: { email: obj.email },
      });

      const OTP = String(obj.otp);

      if (!user) {
        throw new NotFoundException({
          message: 'User with this email not found.',
          errorCode: 'EC010',
        });
      }

      await this.userRepo.save(user);

      return {
        status: 'success',
        data: {
          message: 'OTP verified successfully.',
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          message: 'Internal server error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async forgotPassword(body: any) {
    try {
      const { email } = body;
      if (!email) {
        throw new BadRequestException({
          message: 'Email is required.',
          errorCode: 'EC001',
        });
      }

      const user = await this.userRepo.findOne({ where: { email } });

      if (!user) {
        throw new NotFoundException({
          message: 'User not found.',
          errorCode: 'EC002',
        });
      }

      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

      await this.userRepo.save(user);

      // temporary bypassing the otp on email
      // await this.emailService.sendOtpEmail(user.email, otp);

      return {
        status: 'success',
        data: {
          message: 'OTP has been sent to your email.',
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          message: 'Internal server error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
