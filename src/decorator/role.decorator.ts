import { SetMetadata } from '@nestjs/common';
import { userRoles } from 'src/global/system.enums';


export const Roles = (...roles: userRoles[]) => SetMetadata('roles', roles);