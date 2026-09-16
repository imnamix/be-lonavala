import { Injectable } from '@nestjs/common';
import * as _ from 'underscore';

@Injectable()
export class UtilityHelper {
  constructor() {}

  generateRandomString() {
    return Math.random().toString(36).substring(5);
  }

}