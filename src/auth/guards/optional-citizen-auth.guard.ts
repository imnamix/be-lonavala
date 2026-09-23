import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CitizenJwtPayload } from '../interfaces/citizen-jwt-payload.interface';

/**
 * Optional guard for citizen routes.
 * If authorization header is present and valid, attaches req.citizen.
 * If no authorization header is present, allows request to proceed.
 */
@Injectable()
export class OptionalCitizenAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      return true;
    }

    const parts = request.headers.authorization.split(' ');
    if (parts[0] !== 'Bearer' || !parts[1]) {
      return true;
    }

    const token = parts[1];
    const secret =
      process.env.JWT_SECRET ||
      process.env.SECRET ||
      'CHANGE_ME_IN_PRODUCTION';

    try {
      const decoded = jwt.verify(token, secret) as CitizenJwtPayload;
      if (decoded && decoded.type === 'citizen') {
        request.citizen = decoded;
      }
    } catch {
      // Ignore token verification errors for optional auth
    }

    return true;
  }
}
