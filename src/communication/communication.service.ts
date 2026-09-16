import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EN_Template } from '../template/entity/template.entity';
import { Repository } from 'typeorm';
import { TextMessageService } from './services/text-message.service';
import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from './services/mail.service';
import { templateType } from '../global/system.enums';

@Injectable()
export class CommunicationService {
  constructor(
    @InjectRepository(EN_Template)
    private readonly dbRepository: Repository<EN_Template>,
    private readonly mailerService: MailerService,
  ) {}

  async send(data: any) {
    const templateInstance = await this.dbRepository.findOne({
      where: { id: data.id },
    });
    switch (templateInstance.type) {
      case templateType.SMS:
        {
          let t = new TextMessageService();
          t.init(templateInstance, data.info);
        }
        break;
      case templateType.EMAIL:
        {
          let e = new MailService(this.mailerService);
          e.init(templateInstance, data.info);
        }
        break;
    }

    return templateInstance;
  }
}
