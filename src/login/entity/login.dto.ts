import { IsNotEmpty } from 'class-validator';

export class loginRexDTO {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
    fcmToken?: string;
  }
