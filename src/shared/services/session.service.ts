import { Injectable } from '@nestjs/common';

export interface IN_Session {
  id?: number;
  role?: string;
  email?: string;
}
@Injectable()
export class SessionService {
  private data: IN_Session;
  constructor() {
    this.data = {};
  }

  set(val: any) {
    if (val) {
      this.data = {
        id: val.id,
        role: val.role,
        email: val.email,
      };
    } else {
      this.data = undefined;
    }
  }

  get(): IN_Session {
    return this.data;
  }


  getUserId() {
    if (this.data) {
      return this.data.id;
    }
  }
}
