import { SetMetadata } from '@nestjs/common';
import { userRoles } from '../global/system.enums';


export const Roles = (...roles: userRoles[]) => SetMetadata('roles', roles);