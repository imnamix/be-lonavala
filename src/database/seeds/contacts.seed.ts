import { DataSource } from 'typeorm';
import { CouncilMember } from '../../contacts/entities/council-member.entity';
import { OfficeContact } from '../../contacts/entities/office-contact.entity';
import { ContactsConfig } from '../../contacts/entities/contacts-config.entity';
import { EmergencyContact } from '../../contacts/entities/emergency-contact.entity';

export async function seedContacts(dataSource: DataSource): Promise<void> {
  const configRepo = dataSource.getRepository(ContactsConfig);
  const emergencyRepo = dataSource.getRepository(EmergencyContact);
  const memberRepo = dataSource.getRepository(CouncilMember);
  const contactRepo = dataSource.getRepository(OfficeContact);

  // 1. Seed Contacts Config (WhatsApp helpline + HQ)
  const configCount = await configRepo.count();
  if (configCount === 0) {
    await configRepo.save(
      configRepo.create({
        whatsappHelpline: '+91 94235 88990',
        complexName: 'Administrative Complex',
        addressLine1: 'Old Mumbai-Pune Highway, Near Kumar Resort',
        addressLine2: 'Lonavala, Dist. Pune, Maharashtra',
        pinCode: '410401',
        epabxPhones: '+91 2114 273030 / 273031 / 273032',
        officialEmail: 'contact@lonavalamc.gov.in',
        coEmail: 'co@lonavalamc.gov.in',
        workingHours: 'Monday to Saturday: 09:45 AM – 05:45 PM',
        workingHoursNote: '(Closed on 2nd & 4th Saturdays and Public Holidays)',
        mapEmbedUrl: '',
      }),
    );
    console.log('✅ Seeded Contacts Config (WhatsApp helpline & HQ)');
  }

  // 2. Seed Emergency Hotlines
  const emergencyCount = await emergencyRepo.count();
  if (emergencyCount === 0) {
    await emergencyRepo.save([
      emergencyRepo.create({
        name: '24x7 Municipal Disaster Control Room',
        number: '1800-233-0101',
        icon: 'ShieldAlert',
        category: 'emergency',
        sortOrder: 1,
        active: true,
      }),
      emergencyRepo.create({
        name: 'Lonavala Fire & Rescue Brigade',
        number: '101 / +91 2114 273101',
        icon: 'Flame',
        category: 'emergency',
        sortOrder: 2,
        active: true,
      }),
      emergencyRepo.create({
        name: 'Lonavala City Police Station',
        number: '100 / +91 2114 273033',
        icon: 'Siren',
        category: 'emergency',
        sortOrder: 3,
        active: true,
      }),
      emergencyRepo.create({
        name: 'Municipal General Ambulance & Medical',
        number: '108 / +91 2114 273111',
        icon: 'Ambulance',
        category: 'emergency',
        sortOrder: 4,
        active: true,
      }),
    ]);
    console.log('✅ Seeded 4 Emergency Hotlines');
  }

  // 3. Seed Council Members
  const memberCount = await memberRepo.count();
  if (memberCount === 0) {
    await memberRepo.save([
      memberRepo.create({
        name: 'Smt. Surekha Nitin Jadhav',
        marathiName: 'श्रीमती सुरेखा नितीन जाधव',
        designation: 'President (नगराध्यक्ष)',
        roleCategory: 'President',
        ward: 'All Wards / Central Council',
        tenure: '2022 - 2027',
        committee: 'Standing Committee Chairperson',
        phone: '+91 2114 273030',
        email: 'president@lonavalamc.gov.in',
        address: 'LMC Administrative Complex, Lonavala - 410401',
        imageUrl:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        sortOrder: 1,
        active: true,
      }),
      memberRepo.create({
        name: 'Shri. Rajesh Madhavrao Shinde',
        marathiName: 'श्री. राजेश माधवराव शिंदे',
        designation: 'Vice President (उपनगराध्यक्ष)',
        roleCategory: 'Vice President',
        ward: 'All Wards / Public Works',
        tenure: '2022 - 2027',
        committee: 'Public Works Committee',
        phone: '+91 2114 273031',
        email: 'vicepresident@lonavalamc.gov.in',
        address: 'LMC Administrative Complex, Lonavala - 410401',
        imageUrl:
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
        sortOrder: 2,
        active: true,
      }),
      memberRepo.create({
        name: 'Shri. Pandit Patil (IAS/State Cadre)',
        marathiName: 'श्री. पंडित पाटील',
        designation: 'Chief Officer / Commissioner (मुख्याधिकारी)',
        roleCategory: 'Commissioner',
        ward: 'Lonavala Municipal Council Administration',
        tenure: 'Cadre Posting',
        committee: 'Chief Administrative Officer',
        phone: '+91 2114 273032',
        email: 'co@lonavalamc.gov.in',
        address: 'Chief Officer Office, LMC Administrative Complex',
        imageUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        sortOrder: 3,
        active: true,
      }),
      memberRepo.create({
        name: 'Shri. Amit Vilas Gaikwad',
        marathiName: 'श्री. अमित विलास गायकवाड',
        designation: 'Corporator - Ward 1 (Bangarwadi)',
        roleCategory: 'Corporator',
        ward: 'Ward 1 - Bangarwadi & Railway Station',
        tenure: '2022 - 2027',
        committee: 'Sanitation & Water Works',
        phone: '+91 98220 11221',
        email: 'ward1@lonavalamc.gov.in',
        address: 'Bangarwadi, Lonavala - 410401',
        imageUrl:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        sortOrder: 4,
        active: true,
      }),
      memberRepo.create({
        name: 'Smt. Priyanka Sagar Kadam',
        marathiName: 'श्रीमती प्रियांका सागर कदम',
        designation: 'Corporator - Ward 2 (Ryewood & Bazaar)',
        roleCategory: 'Corporator',
        ward: 'Ward 2 - Ryewood & Main Bazaar',
        tenure: '2022 - 2027',
        committee: 'Education & Health',
        phone: '+91 98220 33442',
        email: 'ward2@lonavalamc.gov.in',
        address: 'Main Bazaar Road, Lonavala - 410401',
        imageUrl:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
        sortOrder: 5,
        active: true,
      }),
      memberRepo.create({
        name: 'Shri. Sunil Tukaram Bhosale',
        marathiName: 'श्री. सुनील तुकाराम भोसले',
        designation: 'Corporator - Ward 3 (Khandala Side)',
        roleCategory: 'Corporator',
        ward: 'Ward 3 - Khandala Ridge & Nagpal Estate',
        tenure: '2022 - 2027',
        committee: 'Town Planning Committee',
        phone: '+91 98220 55663',
        email: 'ward3@lonavalamc.gov.in',
        address: 'Khandala Heights, Lonavala',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
        sortOrder: 6,
        active: true,
      }),
    ]);
    console.log('✅ Seeded 6 Council Members');
  }

  // 4. Seed Office Contacts
  const contactCount = await contactRepo.count();
  if (contactCount === 0) {
    await contactRepo.save([
      contactRepo.create({
        title: '24x7 Municipal Disaster Control Room',
        phone: '1800-233-0101',
        altPhone: '+91 2114 273030',
        email: 'controlroom@lonavalamc.gov.in',
        location: 'Ground Floor, LMC Administrative Complex',
        timing: '24 Hours / 7 Days a Week',
        category: 'emergency',
        sortOrder: 1,
        active: true,
      }),
      contactRepo.create({
        title: 'Lonavala Fire & Rescue Brigade',
        phone: '101',
        altPhone: '+91 2114 273101',
        email: 'fire@lonavalamc.gov.in',
        location: 'Fire Station, Near Kumar Resort, Old Highway',
        timing: '24x7 Emergency Response',
        category: 'emergency',
        sortOrder: 2,
        active: true,
      }),
      contactRepo.create({
        title: 'Municipal General Dispensary & Ambulance',
        phone: '108',
        altPhone: '+91 2114 273111',
        email: 'health@lonavalamc.gov.in',
        location: 'Municipal Health Center, Gawli Wada Road',
        timing: '24 Hours Emergency Care',
        category: 'emergency',
        sortOrder: 3,
        active: true,
      }),
      contactRepo.create({
        title: 'Citizen Facilitation Center (CFC Helpdesk)',
        phone: '+91 2114 273035',
        email: 'helpdesk@lonavalamc.gov.in',
        location: 'LMC Administrative Complex, Lonavala',
        timing: '10:00 AM – 5:30 PM (Mon to Sat)',
        category: 'administrative',
        sortOrder: 4,
        active: true,
      }),
    ]);
    console.log('✅ Seeded 4 Office & Department Contacts');
  }
}
