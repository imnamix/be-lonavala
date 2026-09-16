export class UserRO {
  id: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
  email?: string;
  gender?: string;
  roles: string;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
}
