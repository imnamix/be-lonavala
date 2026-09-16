import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { LoginService } from './login.service';
import { loginRexDTO } from './entity/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Post('auth/login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: loginRexDTO) {
    return this.service.login(data);
  }

  @Post('auth/verify')
  verify(@Body() obj: any) {
    return this.service.verify(obj);
  }

  @Post('verifyOtp')
  verifyOtp(@Body() obj: any) {
    return this.service.verifyOtp(obj);
  }

  @Post('forgotPassword')
  forgotPassword(@Body() obj: any) {
    return this.service.forgotPassword(obj);
  }

  @Post('resetPassword')
  resetPassword(@Body() obj: any) {
    return this.service.resetPassword(obj);
  }
}
