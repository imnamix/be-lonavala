import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CitizenJwtPayload } from '../interfaces/citizen-jwt-payload.interface';

/**
 * Guard for citizen-protected routes.
 * Decodes the backend JWT (type === 'citizen') and sets req.citizen.
 */
@Injectable()
export class CitizenAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new HttpException('No authorization token provided', HttpStatus.UNAUTHORIZED);
    }

    const parts = request.headers.authorization.split(' ');
    if (parts[0] !== 'Bearer' || !parts[1]) {
      throw new HttpException('Invalid authorization header format', HttpStatus.UNAUTHORIZED);
    }

    const token = parts[1];
    const secret =
      process.env.JWT_SECRET ||
      process.env.SECRET ||
      'CHANGE_ME_IN_PRODUCTION';

    try {
      const decoded = jwt.verify(token, secret) as CitizenJwtPayload;

      if (decoded.type !== 'citizen') {
        throw new HttpException(
          'Token is not a citizen token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      request.citizen = decoded;
      return true;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException(
        'Token error: ' + (err.message || err.name),
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
