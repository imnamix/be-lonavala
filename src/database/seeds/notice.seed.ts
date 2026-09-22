import { DataSource } from 'typeorm';
import { Notice } from '../../notice/entities/notice.entity';

export async function seedNotices(dataSource: DataSource): Promise<void> {
  const noticeRepo = dataSource.getRepository(Notice);

  const count = await noticeRepo.count();
  if (count === 0) {
    const noticesData = [
      {
        title: '5% Early-Bird Rebate Deadline for Annual Property Tax Assessment (FY 2026-27)',
        subject: 'Extension of 5% rebate incentive for early online property tax payment up to June 30th',
        category: 'Notices',
        gazetteRefNo: 'LMC/REV/2026/042',
        status: 'PUBLISHED',
        issuingDepartmentId: 'dept-revenue',
        publishedDate: new Date('2026-06-01T10:00:00.000Z'),
        issuedBy: 'Tax Superintendent, LMC Revenue Wing',
        description:
          '<p>All residential and commercial property owners within Lonavala Municipal Council jurisdiction are hereby informed that the <strong>5% Early-Bird Rebate</strong> on current year property tax payments has been active. Citizens can easily clear taxes via the Aaple Sarkar portal or LMC citizen counters with instant digital receipts.</p><p>Please note that online payments through UPI, NetBanking, or QR code are eligible for zero transaction surcharge.</p>',
        directives: [
          { key: 'Applicability', value: 'All Wards (1 to 5)' },
          { key: 'Rebate Discount', value: '5% on Net General Tax' },
          { key: 'Online Portal', value: 'lonavalamc.gov.in / Aaple Sarkar' },
          { key: 'Helpline', value: '+91 2114 273555' },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/notices/property_tax_rebate_2026.pdf',
      },
      {
        title: 'Scheduled Water Pipeline Interconnection & Preventive Monsoon Maintenance',
        subject: 'Temporary supply shutdown for major booster pipeline maintenance at Tungarli Plant',
        category: 'Circulars',
        gazetteRefNo: 'LMC/WS/2026/118',
        status: 'PUBLISHED',
        issuingDepartmentId: 'dept-water-supply',
        publishedDate: new Date('2026-06-15T09:30:00.000Z'),
        issuedBy: 'Executive Engineer, Water Supply & Drainage',
        description:
          '<p>Notice is hereby given that essential technical repairs and pre-monsoon desilting of the primary 400mm M.S. transmission main pipeline from Tungarli WTP will be undertaken. Water supply will remain regulated across Central Lonavala, Ryewood, and Bhangarwadi sectors during the scheduled maintenance hours.</p><p>Citizens are kindly requested to store adequate drinking water in advance. Free municipal tanker assistance will be deployed in case of emergency requirements.</p>',
        directives: [
          { key: 'Maintenance Hours', value: '08:00 AM to 06:00 PM' },
          { key: 'Affected Sectors', value: 'Wards 1, 2 & 4' },
          { key: 'Tanker Helpline', value: '1800-233-0101 / 02114-273222' },
          { key: 'Water Quality', value: 'Post-restoration chlorination verified' },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/notices/water_maintenance_schedule.pdf',
      },
      {
        title: 'Monsoon Weekend Traffic Management & Tourist Parking Regulation Order',
        subject: 'Implementation of designated one-way routes and parking zones along Bushi Dam and Tiger Point corridors',
        category: 'Orders',
        gazetteRefNo: 'LMC/ADM/ORD/2026/089',
        status: 'PUBLISHED',
        issuingDepartmentId: 'dept-admin',
        publishedDate: new Date('2026-07-01T11:00:00.000Z'),
        issuedBy: 'Chief Officer & Executive Magistrate, LMC',
        description:
          '<p>Under the powers vested under the Maharashtra Municipal Councils Act, strict vehicular regulations are hereby enforced along the Khandala Ghat, Bushi Dam, and INS Shivaji routes on Saturdays, Sundays, and public holidays throughout the monsoon season to prevent bottlenecks and ensure unhindered passage for emergency ambulance services.</p><p>Heavy tourist coaches and unauthorized roadside parking will be penalized with municipal towing charges.</p>',
        directives: [
          { key: 'Active Days', value: 'Saturdays, Sundays & Gazetted Holidays' },
          { key: 'Restricted Zones', value: 'Bushi Dam Approach & Tiger Point Ghat' },
          { key: 'Designated Parking', value: 'Municipal Multi-Level & Ground Lots' },
          { key: 'Enforcement Cell', value: 'LMC Flying Squad & Traffic Police' },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/notices/traffic_order_monsoon.pdf',
      },
      {
        title: 'Swachh Bharat Mission 2026: Mandatory 100% Waste Segregation at Source',
        subject: 'Strict compliance directives for wet, dry, and sanitary waste segregation by housing societies and hotels',
        category: 'Orders',
        gazetteRefNo: 'LMC/HLT/2026/055',
        status: 'PUBLISHED',
        issuingDepartmentId: 'dept-health',
        publishedDate: new Date('2026-05-20T10:00:00.000Z'),
        issuedBy: 'Chief Medical & Sanitation Officer',
        description:
          '<p>In alignment with Swachh Survekshan guidelines, all residential housing complexes, commercial establishments, chikki shops, and luxury resorts within LMC boundaries must implement <strong>3-way waste segregation</strong> (Wet Biodegradable, Dry Recyclable, and Sanitary Domestic Waste).</p><p>Unsegregated garbage will not be accepted by municipal collection compactor vehicles. Repeat violations will attract penalties as per Municipal By-laws.</p>',
        directives: [
          { key: 'Target Compliance', value: '100% Segregation at Source' },
          { key: 'Collection Timing', value: 'Daily 06:30 AM to 11:30 AM' },
          { key: 'Sanitary Waste Bin', value: 'Red marked disposal pouch required' },
          { key: 'Sanitation Officer', value: '+91 2114 273111' },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/notices/swachh_segregation_order.pdf',
      },
      {
        title: 'Inauguration & Operationalization of 24x7 Municipal Trauma & ICU Center',
        subject: 'New state-of-the-art emergency healthcare facility open for citizen and tourist trauma care',
        category: 'News',
        gazetteRefNo: 'LMC/PR/2026/014',
        status: 'PUBLISHED',
        issuingDepartmentId: 'dept-health',
        publishedDate: new Date('2026-08-10T12:00:00.000Z'),
        issuedBy: 'Public Relations & Health Wing, LMC',
        description:
          '<p>Lonavala Municipal Council has officially inaugurated the modernized <strong>24x7 Municipal Trauma & Critical Care Unit</strong> located at the LMC Hospital Complex. Equipped with digital X-Ray, 10-bed ICU, round-the-clock emergency doctors, and subsidized civic pharmacy, this facility significantly elevates regional healthcare infrastructure.</p><p>Emergency triage services and cardiac life support ambulances are accessible 24 hours daily.</p>',
        directives: [
          { key: 'Facility Location', value: 'LMC Hospital Complex, Old Highway' },
          { key: 'ICU Beds', value: '10 Fully Equipped Ventilator Beds' },
          { key: 'Emergency Line', value: '108 / 02114-273111' },
          { key: 'Outpatient Timing', value: '08:00 AM – 08:00 PM' },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/notices/hospital_press_release.pdf',
      },
      {
        title: 'Pre-Monsoon Tree Trimming & Hazardous Branch Removal Drive',
        subject: 'Safety clearance drive along high-tension electrical cables and public thoroughfares',
        category: 'Circulars',
        gazetteRefNo: 'LMC/PWD/2026/077',
        status: 'PUBLISHED',
        issuingDepartmentId: 'dept-public-works',
        publishedDate: new Date('2026-05-10T09:00:00.000Z'),
        issuedBy: 'City Engineer, Public Works (PWD)',
        description:
          '<p>To avert electricity grid breakdowns and prevent road blockages during gale-force monsoon storms, the Garden & PWD wings of LMC are executing a comprehensive scientific pruning of dangerously overgrown branches across all arterial roads and school zones.</p><p>Citizens can report dangerously leaning trees directly to the municipal disaster control room.</p>',
        directives: [
          { key: 'Drive Duration', value: 'May 10 to June 10, 2026' },
          { key: 'Forest Dept NOC', value: 'Obtained under Tree Conservation Act' },
          { key: 'Disaster Cell', value: '+91 2114 273999' },
          { key: 'Citizen Reporting', value: 'Aaple Sarkar / LMC 311 App' },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/notices/tree_trimming_circular.pdf',
      },
      {
        title: 'Official Gazette: Revised Municipal Trade Licensing & Food Safety By-Laws',
        subject: 'Publication of gazetted rules for online renewal of trade permits and tourist food kiosk sanitation licenses',
        category: 'Gazettes',
        gazetteRefNo: 'MAH-GAZ-LMC-2026-09',
        status: 'PUBLISHED',
        issuingDepartmentId: 'dept-admin',
        publishedDate: new Date('2026-04-01T10:00:00.000Z'),
        issuedBy: 'Government of Maharashtra & LMC Administration',
        description:
          '<p>Notice is hereby published in the Official Gazette regarding the updated regulatory framework for issuing, renewing, and inspecting trade permits for chikki manufacturers, hotels, hill resorts, and commercial shops in the Lonavala Municipal area.</p><p>All business owners can file online self-declaration forms with digital fee payments on the unified civic portal.</p>',
        directives: [
          { key: 'Gazette Volume', value: 'Part-IV B (Local Authorities)' },
          { key: 'Effective Date', value: 'From 1st April 2026' },
          { key: 'Digital Portal', value: 'https://aaplesarkar.mahaonline.gov.in' },
          { key: 'Renewal Period', value: 'Annual (Up to 30th April)' },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/notices/trade_licensing_gazette.pdf',
      },
      {
        title: 'Public Advisory on Sahyadri Ghat Travelling, Water Safety & Heavy Rainfall',
        subject: 'Safety precautions for tourists and residents during red and orange weather alerts issued by IMD',
        category: 'Notices',
        gazetteRefNo: 'LMC/DM/2026/029',
        status: 'PUBLISHED',
        issuingDepartmentId: 'dept-admin',
        publishedDate: new Date('2026-07-20T08:00:00.000Z'),
        issuedBy: 'Disaster Management Cell, LMC',
        description:
          '<p>In view of torrential rainfall forecasts issued by the Meteorological Department for Pune and Western Ghats districts, citizens and travelling tourists are advised to exercise utmost caution. Venturing into unauthorized fast-flowing river streams, climbing slippery cliff edges for selfies, or swimming in deep reservoirs is strictly prohibited.</p><p>Municipal disaster response units, life guards, and quick response vehicles remain stationed at key points.</p>',
        directives: [
          { key: 'Emergency Rescue', value: '112 / 101 / 1800-233-0101' },
          { key: 'Restricted Zones', value: 'Dam spillways, deep ravines & cliff edges' },
          { key: 'Weather Updates', value: 'Broadcasted live on LMC website' },
          { key: 'First Aid Outposts', value: 'Bushi Dam, Tiger Point, Khandala' },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/notices/monsoon_safety_advisory.pdf',
      },
    ];

    for (const noticeData of noticesData) {
      const notice = noticeRepo.create(noticeData);
      await noticeRepo.save(notice);
    }

    console.log(`✅ Seeded ${noticesData.length} notices into the database`);
  } else {
    console.log(`ℹ️ Notices table already has ${count} records. Skipping seed.`);
  }
}
