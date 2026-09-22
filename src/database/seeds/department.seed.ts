import { DataSource } from 'typeorm';
import { Department } from '../../department/entities/department.entity';

export const initialDepartments = [
  {
    code: 'dept-health',
    name: 'Health & Sanitation',
    marathiName: 'आरोग्य व स्वच्छता विभाग',
    slug: 'health-sanitation',
    icon: 'HeartPulse',
    headOfficer: 'Dr. Sandeep Deshmukh',
    headOfficerImage:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    designation: 'Chief Medical & Sanitation Officer',
    email: 'health@lonavalamc.gov.in',
    phone: '+91 2114 273111',
    location: 'Ground Floor, LMC Administrative Complex, Lonavala - 410401',
    overview:
      'Responsible for round-the-clock municipal cleanliness, solid waste segregation, hill station dengue & vector control, food hygiene inspections, and public dispensaries.',
    responsibilities: [
      'Daily door-to-door waste collection and zero-garbage initiatives',
      'Sanitary inspections of hotels, chikki shops, and restaurants',
      'Vector-borne disease monitoring and fogging operations',
      'Management of municipal dispensary and civic maternity care',
      'Public toilet maintenance along tourist spots and highway',
    ],
    services: [
      'Garbage collection escalation',
      'Dead animal disposal request',
      'Public hygiene inspection certificate',
      'Food establishment sanitary clearance',
    ],
    documents: [
      {
        title: 'Solid Waste Management By-laws 2024',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
      {
        title: 'List of Registered Chikki & Food Stalls',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
    ],
    stats: [
      { label: 'Daily Solid Waste Cleared', value: '32 MT' },
      { label: 'Segregation Compliance', value: '94%' },
      { label: 'Sanitary Workers', value: '180+' },
    ],
    clerkName: 'Shri. Rahul Shinde',
    clerkPhone: '+91 98220 54321',
    clerkEmail: 'clerk.health@lonavalamc.gov.in',
    isActive: true,
    displayOrder: 1,
  },
  {
    code: 'dept-water',
    name: 'Water Supply & Drainage',
    marathiName: 'पाणीपुरवठा व मलनिस्सारण विभाग',
    slug: 'water-supply',
    icon: 'Droplets',
    headOfficer: 'Er. Rameshwar Kale',
    headOfficerImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    designation: 'Executive Water Engineer',
    email: 'water@lonavalamc.gov.in',
    phone: '+91 2114 273222',
    location: '1st Floor, LMC Administrative Complex',
    overview:
      'Maintains uninterrupted drinking water supply drawn from Bushi and Valvan catchments, pipeline networks, water filtration plants, and underground sewerage lines.',
    responsibilities: [
      'Operation of 24 MLD Water Treatment Plant at Tungarli',
      'Pipelines inspection, leakage detection, and maintenance',
      'New domestic and commercial water connections',
      'Water meter testing and automated billing',
      'Desilting and operation of sewage treatment plants (STPs)',
    ],
    services: [
      'New Water Connection Application',
      'Water Bill Payment & Duplicate Bill',
      'Report Water Leakage / Low Pressure',
      'Tanker Water Booking for Scarcity Areas',
    ],
    documents: [
      {
        title: 'Water Supply Tariff Card 2025-26',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
      {
        title: 'Water Quality Testing Protocol',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
    ],
    stats: [
      { label: 'Potable Water Supplied', value: '24 MLD' },
      { label: 'Active Connections', value: '18,400' },
      { label: 'Purity Index', value: '99.2%' },
    ],
    clerkName: 'Smt. Manisha Patil',
    clerkPhone: '+91 98220 54322',
    clerkEmail: 'clerk.water@lonavalamc.gov.in',
    isActive: true,
    displayOrder: 2,
  },
  {
    code: 'dept-pwd',
    name: 'Public Works (PWD)',
    marathiName: 'सार्वजनिक बांधकाम विभाग',
    slug: 'public-works',
    icon: 'HardHat',
    headOfficer: 'Er. Mahesh Kulkarni',
    headOfficerImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    designation: 'City Engineer',
    email: 'pwd@lonavalamc.gov.in',
    phone: '+91 2114 273333',
    location: '2nd Floor, Engineering Wing, LMC',
    overview:
      'Oversees the construction and maintenance of municipal roads, bridges, storm water drains, street lighting networks, civic parks, and government properties.',
    responsibilities: [
      'Maintenance of 145+ km of asphalt and concrete city roads',
      'Monsoon gutter desilting and flood-prevention culverts',
      'Streetlight LED maintenance and smart pole deployment',
      'Construction of tourist promenade and footpath beautification',
      'Structural safety audit of municipal assets and bridges',
    ],
    services: [
      'Road Cutting Permission for utilities',
      'Streetlight outage reporting',
      'Pothole repair complaint',
      'Public garden booking for events',
    ],
    documents: [
      {
        title: 'Annual Works Schedule 2025-26',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
      {
        title: 'Standard Specification for Road Works',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
    ],
    stats: [
      { label: 'Road Network Managed', value: '148 km' },
      { label: 'Smart Streetlights', value: '4,200' },
      { label: 'Ongoing Infrastructure Works', value: '14' },
    ],
    clerkName: 'Shri. Ganesh More',
    clerkPhone: '+91 98220 54323',
    clerkEmail: 'clerk.pwd@lonavalamc.gov.in',
    isActive: true,
    displayOrder: 3,
  },
  {
    code: 'dept-town-planning',
    name: 'Town Planning & Building Permissions',
    marathiName: 'नगररचना व इमारत बांधकाम परवानगी विभाग',
    slug: 'town-planning',
    icon: 'Building2',
    headOfficer: 'Ar. Sneha Joshi',
    headOfficerImage:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    designation: 'Assistant Director of Town Planning',
    email: 'tp@lonavalamc.gov.in',
    phone: '+91 2114 273444',
    location: '2nd Floor, Town Planning Wing, LMC',
    overview:
      'Regulates hill station development plan (DP), architectural zoning, building sanctions, eco-sensitive zone (ESZ) compliances, and heritage preservation.',
    responsibilities: [
      'Scrutiny of residential and commercial building proposals via BPMS',
      'Issuing Commencement Certificates (CC) and Occupancy Certificates (OC)',
      'Strict action against unauthorized hill-cutting and constructions',
      'Zoning verification and Development Plan (DP) remarks',
    ],
    services: [
      'Building Permission Online (BPMS)',
      'Occupancy / Completion Certificate',
      'Zoning Certificate / DP Extract',
      'Demolition / Renovation Permission',
    ],
    documents: [
      {
        title: 'Lonavala Revised Development Plan 2031',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
      {
        title: 'Hill Station Building By-Laws & ESZ Norms',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
    ],
    stats: [
      { label: 'Sanctioned Approvals (FY25)', value: '340' },
      { label: 'Average Approval Time', value: '21 Days' },
      { label: 'ESZ Protected Areas', value: '100%' },
    ],
    clerkName: 'Smt. Priya Gaikwad',
    clerkPhone: '+91 98220 54324',
    clerkEmail: 'clerk.tp@lonavalamc.gov.in',
    isActive: true,
    displayOrder: 4,
  },
  {
    code: 'dept-revenue',
    name: 'Revenue & Property Tax',
    marathiName: 'कर आकारणी व संकलन विभाग',
    slug: 'revenue-tax',
    icon: 'Receipt',
    headOfficer: 'Shri. Vikas Shinde',
    headOfficerImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    designation: 'Chief Revenue Superintendent',
    email: 'tax@lonavalamc.gov.in',
    phone: '+91 2114 273555',
    location: 'Ground Floor, Citizen Facilitation Centre (CFC)',
    overview:
      'Administers property assessment, annual rateable value calculation, property tax collection, trade licenses, advertisement tax, and municipal rental leases.',
    responsibilities: [
      'Assessment of 24,000+ taxable residential and commercial properties',
      'Digital tax billing and doorstep payment facilitation',
      'Name transfer / mutation in property records',
      'Trade license issuance for tourist resorts, chikkis, and shops',
    ],
    services: [
      'Online Property Tax Payment',
      'Property Assessment / Self-Declaration',
      'Mutation / Name Transfer of Property',
      'Trade License Renewal & Issuance',
    ],
    documents: [
      {
        title: 'Property Tax Assessment Rules & Rebates',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
      {
        title: 'Trade License Category Schedule',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
    ],
    stats: [
      { label: 'Annual Collection', value: '₹48.2 Cr' },
      { label: 'Digital Payments Share', value: '78%' },
      { label: 'Properties Assessed', value: '24,850' },
    ],
    clerkName: 'Shri. Sanjay Pawar',
    clerkPhone: '+91 98220 54325',
    clerkEmail: 'clerk.tax@lonavalamc.gov.in',
    isActive: true,
    displayOrder: 5,
  },
  {
    code: 'dept-disaster',
    name: 'Disaster Management & Control Room',
    marathiName: 'आपत्कालीन व्यवस्थापन व नियंत्रण कक्ष',
    slug: 'disaster-management',
    icon: 'ShieldAlert',
    headOfficer: 'Capt. Anand Rao (Retd.)',
    headOfficerImage:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    designation: 'Emergency Operations Chief',
    email: 'disaster@lonavalamc.gov.in',
    phone: '+91 2114 273999 / 1800-233-0101',
    location: 'Control Room, LMC Central Tower (24x7)',
    overview:
      'Monitors monsoon rainfall in the Western Ghats, landslide warnings, flash floods, ghat road safety, tourist rescue coordination with NDRF, and hill station emergency alerts.',
    responsibilities: [
      '24x7 Centralized Emergency Control Room operations',
      'Coordination with Maharashtra Police, NDRF, and Shivdurg Sanvardhan Rescue Team',
      'Real-time monitoring of dam water levels (Bushi, Valvan, Pawna)',
      'High-risk landslide slope stabilization and hazard barricading',
    ],
    services: [
      '24x7 Emergency Help Desk (Toll-Free 1800-233-0101)',
      'Ghat Weather & Road Status Broadcast',
      'Trekker Assistance and Search Coordination',
    ],
    documents: [
      {
        title: 'Monsoon Preparedness Plan 2025',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
      {
        title: 'Landslide Vulnerable Points Map',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
    ],
    stats: [
      { label: 'Control Room Readiness', value: '24x7x365' },
      { label: 'Avg Incident Response Time', value: '8 Mins' },
      { label: 'Monsoon Safe Zones', value: '12 Points' },
    ],
    clerkName: 'Shri. Vinod Chavan',
    clerkPhone: '+91 98220 54326',
    clerkEmail: 'clerk.disaster@lonavalamc.gov.in',
    isActive: true,
    displayOrder: 6,
  },
  {
    code: 'dept-fire',
    name: 'Fire Brigade & Rescue Services',
    marathiName: 'अग्निशामक व बचाव दल',
    slug: 'fire-brigade',
    icon: 'Flame',
    headOfficer: 'Station Officer Vijay Jadhav',
    headOfficerImage:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    designation: 'Chief Fire Officer',
    email: 'fire@lonavalamc.gov.in',
    phone: '101 / +91 2114 273101',
    location: 'Fire Station, Pune-Mumbai Highway, Lonavala',
    overview:
      'Dedicated firefighting unit equipped with hydraulic aerial ladders, water foam tenders, cliff-rescue harnesses, and forest-fire mitigation capabilities across the Lonavala-Khandala plateau.',
    responsibilities: [
      'Rapid fire suppression in residential, commercial, and forest areas',
      'Valley and waterfall drowning rescues during heavy monsoons',
      'Fire safety compliance audit and issuance of Fire NOCs',
      'Civic mock drills in schools, hotels, and tourist resorts',
    ],
    services: [
      'Fire Safety NOC (Provisional & Final)',
      'Emergency Rescue Response',
      'Fire Drill & Training for Commercial Resorts',
    ],
    documents: [
      {
        title: 'Fire Safety Standards Checklist for Hotels',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
      {
        title: 'Maharashtra Fire Prevention Act Rules',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
    ],
    stats: [
      { label: 'Fire Fleet Vehicles', value: '6 Tenders' },
      { label: 'Rescue Operations (2024)', value: '84' },
      { label: 'Average Turnout Time', value: '3 Mins' },
    ],
    clerkName: 'Shri. Santosh Kadam',
    clerkPhone: '+91 98220 54327',
    clerkEmail: 'clerk.fire@lonavalamc.gov.in',
    isActive: true,
    displayOrder: 7,
  },
  {
    code: 'dept-it',
    name: 'IT & e-Governance',
    marathiName: 'माहिती तंत्रज्ञान व ई-प्रशासन विभाग',
    slug: 'it-governance',
    icon: 'Cpu',
    headOfficer: 'Mr. Tanmay Kulkarni',
    headOfficerImage:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    designation: 'Systems & e-Governance Manager',
    email: 'it@lonavalamc.gov.in',
    phone: '+91 2114 273666',
    location: '3rd Floor, IT Cell, LMC Administrative Complex',
    overview:
      'Drives paperless civic workflows, online payment gateways, GIS mapping, public grievance tracking, citizen mobile apps, and government cybersecurity compliance.',
    responsibilities: [
      'Maintenance of official LMC web portal and citizen mobile apps',
      'Integration with Maha-Online, Aaple Sarkar, and Bharat BillPay (BBPS)',
      'Cybersecurity, server uptime, and municipal cloud data integrity',
      'Real-time Grievance Redressal portal monitoring',
    ],
    services: [
      'Citizen Portal Support & Grievance Assistance',
      'GIS Property Boundary Mapping Inquiries',
      'Public Wi-Fi Hotline at Ryewood and Market',
    ],
    documents: [
      {
        title: 'LMC Citizen Charter 2025',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
      {
        title: 'Data Privacy & e-Governance Policy',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      },
    ],
    stats: [
      { label: 'Online Citizen Transactions', value: '1.2 Lakh+' },
      { label: 'Portal Uptime', value: '99.98%' },
      { label: 'Digital Services', value: '32 Online' },
    ],
    clerkName: 'Smt. Ankita Sawant',
    clerkPhone: '+91 98220 54328',
    clerkEmail: 'clerk.it@lonavalamc.gov.in',
    isActive: true,
    displayOrder: 8,
  },
];

export async function seedDepartments(dataSource: DataSource): Promise<void> {
  const departmentRepository = dataSource.getRepository(Department);

  let inserted = 0;
  let updated = 0;

  for (const deptData of initialDepartments) {
    const existing = await departmentRepository.findOne({
      where: [{ slug: deptData.slug }, { code: deptData.code }],
    });

    if (existing) {
      departmentRepository.merge(existing, deptData);
      await departmentRepository.save(existing);
      updated++;
    } else {
      const newDept = departmentRepository.create(deptData);
      await departmentRepository.save(newDept);
      inserted++;
    }
  }

  console.log(
    `✅ Departments synchronized: ${inserted} inserted, ${updated} updated (Total: ${initialDepartments.length})`,
  );
}

if (require.main === module) {
  (async () => {
    console.log('🌱 Starting standalone Department Seeding...');
    const { AppDataSource } = await import('../../config/typeorm.config');
    await AppDataSource.initialize();
    try {
      await seedDepartments(AppDataSource);
      const results = await AppDataSource.getRepository(Department).find({
        order: { displayOrder: 'ASC' },
      });
      console.table(
        results.map((d) => ({
          ID: d.id,
          Name: d.name,
          HOD: d.headOfficer,
          HOD_Image: d.headOfficerImage ? 'Yes' : 'No',
          Clerk: d.clerkName,
          Clerk_Phone: d.clerkPhone,
          Clerk_Email: d.clerkEmail,
        })),
      );
      console.log('🎉 Department seed completed successfully!');
    } catch (e) {
      console.error('❌ Department seed error:', e);
      process.exit(1);
    } finally {
      await AppDataSource.destroy();
    }
  })();
}
