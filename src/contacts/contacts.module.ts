import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ContactsConfig } from './entities/contacts-config.entity';
import { EmergencyContact } from './entities/emergency-contact.entity';
import { CouncilMember } from './entities/council-member.entity';
import { OfficeContact } from './entities/office-contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContactsConfig,
      EmergencyContact,
      CouncilMember,
      OfficeContact,
    ]),
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class ContactsModule {}
