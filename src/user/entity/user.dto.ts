export class UserRO {
  id: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
  email?: string;
  gender?: string;
  isVerified?: boolean;
  roleId?: number;
  roleName?: string;
  roles: any;
  permissions?: string[];
  accessToken?: string;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
}
