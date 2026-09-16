import { DataSource } from 'typeorm';
import { AboutUs } from '../../about-us/entities/about-us.entity';
import { AboutUsMissionItem } from '../../about-us/entities/about-us-mission-item.entity';
import { AboutUsCommunique } from '../../about-us/entities/about-us-communique.entity';

export async function seedAboutUs(dataSource: DataSource): Promise<void> {
  const aboutUsRepo = dataSource.getRepository(AboutUs);
  const missionRepo = dataSource.getRepository(AboutUsMissionItem);
  const communiqueRepo = dataSource.getRepository(AboutUsCommunique);

  const count = await aboutUsRepo.count();
  if (count === 0) {
    // 1. Create Chief Officer Communique
    const communique = communiqueRepo.create({
      officerName: 'Shri. Pandit Patil (IAS/State Cadre)',
      designation: 'Chief Officer / Commissioner (मुख्याधिकारी)',
      phone: '+91 2114 273032',
      email: 'co@lonavalamc.gov.in',
      mediaUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      title: "Chief Officer's Communiqué",
      subtitle: 'A Personal Message from the Administrative Desk',
      messageBody:
        'Lonavala has evolved from a serene Sahyadri hill retreat to one of Western India’s most visited tourist and residential destinations. As Chief Officer, my utmost priority is to harmonize this tremendous growth with sustainable hill-station environmental conservation. Through our digitized portal, we guarantee transparent governance, swift grievance resolution, and paperless citizen services.',
      signOff:
        'Lonavala Municipal Council — Committed to Public Good & Ecological Heritage',
    });
    const savedCommunique = await communiqueRepo.save(communique);

    // 2. Create About Us Main Record
    const aboutUs = aboutUsRepo.create({
      title: 'Lonavala Municipal Council (लोणावळा नगर परिषद)',
      establishedYear: '1877',
      yearsOfService: '147+ Years',
      elevation: '622 m (2,041 ft)',
      mediaUrl:
        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      description:
        'Lonavala Municipal Council is the urban local self-government authority governing the picturesque hill station of Lonavala in Pune district, Maharashtra. Established in 1877 during the British era, the council has continuously safeguarded the Sahyadri ecosystem while providing essential municipal services across 18 electoral wards.',
      vision:
        'To build a smart, sustainable, environmentally resilient hill-station town offering world-class civic infrastructure, transparent e-governance, and eco-sensitive tourism development.',
      communique: savedCommunique,
    });
    const savedAboutUs = await aboutUsRepo.save(aboutUs);

    // 3. Create Ordered Mission Items
    await missionRepo.save([
      missionRepo.create({
        itemText:
          'Ensure 100% door-to-door solid waste segregation, scientific bio-mining, and a zero-open-garbage municipal area.',
        sortOrder: 1,
        aboutUs: savedAboutUs,
      }),
      missionRepo.create({
        itemText:
          'Deliver 24x7 treated, potable drinking water supply to all residential wards and hospitality sectors through automated SCADA telemetry.',
        sortOrder: 2,
        aboutUs: savedAboutUs,
      }),
      missionRepo.create({
        itemText:
          'Digitize 100% of citizen-facing public services under the Maharashtra Right to Public Services Act (RTS) with guaranteed SLA turnaround.',
        sortOrder: 3,
        aboutUs: savedAboutUs,
      }),
      missionRepo.create({
        itemText:
          'Preserve and develop eco-tourism trails, heritage viewpoints, and hill lakes (Bhushi, Tungarli, Valvan) with zero ecological degradation.',
        sortOrder: 4,
        aboutUs: savedAboutUs,
      }),
      missionRepo.create({
        itemText:
          'Maintain an accountable, corruption-free administrative ecosystem through transparent public e-tenders and open municipal finance disclosures.',
        sortOrder: 5,
        aboutUs: savedAboutUs,
      }),
    ]);

    console.log('✅ Seeded About Us with ordered mission items and communique');
  }
}
