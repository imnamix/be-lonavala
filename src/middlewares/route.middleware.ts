import { Injectable, NestMiddleware, Body } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SessionService } from '../shared/services/session.service';
import * as moment from 'moment';

@Injectable()
export class RouteMiddleware implements NestMiddleware {
  constructor(private ss: SessionService) {}
  use(req: any, res: any, next: () => void) {
    let virtualview = 0;
    let tokenInfo = undefined;
    if (req.headers) {
      if (req.headers.virtualview) {
        virtualview = req.headers.virtualview;
      }
      if (req.headers.authorization) {
        tokenInfo = jwt.decode(req.headers.authorization.split(' ')[1]);
        if (tokenInfo) {
          tokenInfo.virtualview = virtualview;
          req['sessionService'] = this.ss;
          this.ss.set(tokenInfo);
        }
      }
    } else {
      this.ss.set(null);
    }

    if (req.body) {
      if (req.method === 'POST') {
        req.body.createdBy = this.ss.getUserId() || 0;
        req.body.updatedBy = this.ss.getUserId() || 0;
        if (!req.body.createdDate) {
          req.body.createdDate = moment().format('YYYY-MM-DD h:mm:ss');
        }
        req.body.updatedDate = moment().format('YYYY-MM-DD h:mm:ss');
      } else if (req.method === 'PUT') {
        req.body.updatedBy = this.ss.getUserId();
        req.body.updatedDate = moment().format('YYYY-MM-DD h:mm:ss');
      }
    }

    next();
  }
}
