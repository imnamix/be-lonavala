import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { COMMUNICATION_MAIL_CONSTANT } from '../../global/global.constant';

@Injectable()
export class MailService {
  enableMsg: boolean;
  constructor(private readonly mailerService: MailerService) {
    this.enableMsg = false;
  }

  init(templateInstance, payload){
    if (Array.isArray(payload)) {
      payload.forEach(element => {
        this.process(templateInstance, element);
      });
    } else {
      this.process(templateInstance, payload);
    }    
  }

  private process(templateInstance, payload) {
    var ejs = require('ejs');
    templateInstance.body = templateInstance.body.replace(/&lt;/g, '<');
    templateInstance.body = templateInstance.body.replace(/&gt;/g, '>');
    let templateBody = ejs.compile(templateInstance.body, {});
    let compiledBody = templateBody({ data: payload.data });

    let templateSubject = ejs.compile(templateInstance.subject, {});
    let compiledSubject = templateSubject({ data: payload.data });

    let localSender = {
      email: COMMUNICATION_MAIL_CONSTANT.DEFAULT_SENDER_EMAIL,
      name: COMMUNICATION_MAIL_CONSTANT.DEFAULT_SENDER_NAME,
    };

    if (payload.sender) {
      if (payload.sender.email) {
        localSender.email = payload.sender.email;
      }
      if (payload.sender.name) {
        localSender.name = payload.sender.name;
      }
    }
    let receiver = {
      email: payload.receiver.email,
    };
    this.sendMail(compiledSubject, compiledBody, localSender, receiver);
    return true;
  }

  private sendMail(subject, body, sender, receiver) {
    this.mailerService
      .sendMail({
        to: receiver.email,
        from: `${sender.name} <${sender.email}>`,
        subject: subject,
        html: body,
      })
      .then(s => {
        // console.log(JSON.stringify(s));
      })
      .catch(e => {
        // console.log(JSON.stringify(e));
      });
  }
}
