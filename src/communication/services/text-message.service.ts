import { Injectable } from '@nestjs/common';
import { COMMUNICATION_SMS_CONSTANT } from '../../global/global.constant';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TextMessageService {
  enableMsg: boolean;
  constructor() {
    this.enableMsg = false;
  }

  init(templateInstance, payload) {
    if (Array.isArray(payload)) {
      payload.forEach((element) => {
        this.process(templateInstance, element);
      });
    } else {
      this.process(templateInstance, payload);
    }
  }

  private process(templateInstance, payload) {
    var ejs = require('ejs');
    let template = ejs.compile(templateInstance.body, {});
    let compledBody = template({ data: payload.data });
    // here we are preparing function name dynamically. sendMessage_SMSJUST()
    this[`sendMessage_${COMMUNICATION_SMS_CONSTANT.API_PROVIDER}`](
      compledBody,
      payload.phoneNumber,
    );
    return;
  }

  private sendMessage_SMSJUST(content, phoneNumber) {
    let http = new HttpService();
    let url = `${COMMUNICATION_SMS_CONSTANT.SMSJUST.BASE_URL}?username=${COMMUNICATION_SMS_CONSTANT.SMSJUST.username}&pass=${COMMUNICATION_SMS_CONSTANT.SMSJUST.password}&type=0&dlr=0&senderid=${COMMUNICATION_SMS_CONSTANT.SMSJUST.senderId}&msgtype=UNI&message=${content}&dest_mobileno=${phoneNumber}&response=Y`;
    console.log(url);
    url = encodeURI(url);
    // commented as gateway is not working.
    //http.get(url).subscribe(response => {}, error => {});
  }
}
