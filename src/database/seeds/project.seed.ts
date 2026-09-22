import { DataSource } from 'typeorm';
import { Project } from '../../project/entities/project.entity';

export async function seedProjects(dataSource: DataSource): Promise<void> {
  const projectRepo = dataSource.getRepository(Project);

  const count = await projectRepo.count();
  if (count === 0) {
    const projectsData = [
      {
        title: 'Lonavala Comprehensive Underground Drainage & 24 MLD STP Project',
        marathiTitle: 'लोणावळा सर्वसमावेशक भूमिगत गटार व २४ एमएलडी सांडपाणी प्रक्रिया केंद्र प्रकल्प',
        projectCode: 'LMC-SAN-2024-001',
        category: 'Sanitation',
        status: 'IN_PROGRESS',
        departmentId: 'dept-engineering',
        location: 'Bhangarwadi & Indrayani River Basin',
        contractorName: 'Larsen & Toubro Infra Solutions Ltd.',
        sanctionedBudget: '₹ 48.50 Crore',
        startDate: new Date('2024-01-15T00:00:00.000Z'),
        targetCompletionDate: new Date('2026-12-31T00:00:00.000Z'),
        physicalProgress: 72,
        financialProgress: 65,
        coverImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
        description:
          'Construction of an eco-friendly Sewage Treatment Plant (STP) using advanced SBR technology with 42 km of underground trunk sewer lines connecting all 5 municipal wards to preserve the pristine Indrayani river ecology.',
        highlights: [
          { key: 'Sewer Network', value: '42.5 km laid out of 54 km' },
          { key: 'STP Capacity', value: '24 Million Litres/Day (MLD)' },
          { key: 'House Connections', value: '6,400+ connected' },
          { key: 'River Protection', value: '100% interception of open nallahs' },
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
            title: 'STP Aeration Tank Construction',
          },
          {
            url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
            title: 'Underground Trunk Pipeline Laying',
          },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/projects/dpr_stp_2024.pdf',
      },
      {
        title: 'Tiger Point Glass Skywalk & Eco-Tourism Viewpoint Promenade',
        marathiTitle: 'टायगर पॉईंट काचेचा स्कायवॉक व पर्यावरणपूरक व्ह्यू पॉईंट कॉरिडोअर',
        projectCode: 'LMC-TOU-2024-007',
        category: 'Tourism',
        status: 'IN_PROGRESS',
        departmentId: 'dept-tourism',
        location: 'Tiger Point, Kurvande Ghat',
        contractorName: 'Maharashtra State Tourism Infra Consortium',
        sanctionedBudget: '₹ 33.20 Crore',
        startDate: new Date('2024-04-10T00:00:00.000Z'),
        targetCompletionDate: new Date('2026-11-30T00:00:00.000Z'),
        physicalProgress: 58,
        financialProgress: 52,
        coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        description:
          'A state-of-the-art cantilevered transparent glass skywalk extending 40 meters over the Sahyadri valley at Tiger Point with amphitheatre, telescope decks, artisan craft kiosks, and smart tourist ticketing facilities.',
        highlights: [
          { key: 'Skywalk Span', value: '40 Metres Cantilever Glass' },
          { key: 'Safety Factor', value: 'Grade 1 Seismic & Wind Shielded' },
          { key: 'Parking Capacity', value: '250 Tourist Vehicles' },
          { key: 'Green Energy', value: '100% Solar Powered Lighting' },
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
            title: 'Valley Edge Viewpoint Deck',
          },
          {
            url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
            title: 'Promenade Landscaping',
          },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/projects/tiger_point_skywalk.pdf',
      },
      {
        title: '24x7 Pressurized Drinking Water Distribution & Tungarli Dam Augmentation',
        marathiTitle: '२४ तास पाणीपुरवठा योजना व तुंगार्ली धरण जलसंवर्धन प्रकल्प',
        projectCode: 'LMC-WAT-2023-012',
        category: 'Water Infrastructure',
        status: 'COMPLETED',
        departmentId: 'dept-water-supply',
        location: 'Tungarli & Valvan Corridor',
        contractorName: 'Shree Ganesh Watertech Infrastructure Ltd.',
        sanctionedBudget: '₹ 27.60 Crore',
        startDate: new Date('2023-02-01T00:00:00.000Z'),
        targetCompletionDate: new Date('2025-05-30T00:00:00.000Z'),
        physicalProgress: 100,
        financialProgress: 100,
        coverImageUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80',
        description:
          'Augmentation of Tungarli raw water intake, construction of modern SCADA-enabled 15 MLD rapid gravity filtration plant, and installation of automatic ultrasonic AMR water meters across 12,000 households.',
        highlights: [
          { key: 'Filtration Capacity', value: '15 MLD Rapid Gravity Plant' },
          { key: 'Smart Water Meters', value: '12,400 AMR Meters Installed' },
          { key: 'Non-Revenue Water', value: 'Reduced by 38%' },
          { key: 'SCADA Automation', value: 'Fully operational remote pressure control' },
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
            title: 'SCADA Control Room',
          },
          {
            url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
            title: 'Filtration Basin',
          },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/projects/water_distribution_report.pdf',
      },
      {
        title: 'Modernization & Expansion of 100-Bed LMC Multi-Speciality Trauma Hospital',
        marathiTitle: '१०० खाटांचे लोणावळा नगरपरिषद सुपर-स्पेशालिटी ट्रॉमा हॉस्पिटल आधुनिकीकरण',
        projectCode: 'LMC-HLT-2024-004',
        category: 'Healthcare',
        status: 'IN_PROGRESS',
        departmentId: 'dept-health',
        location: 'Old Mumbai-Pune Highway, Ward 2',
        contractorName: 'Sahyadri Healthcare Infrastructure JV',
        sanctionedBudget: '₹ 21.40 Crore',
        startDate: new Date('2024-03-01T00:00:00.000Z'),
        targetCompletionDate: new Date('2026-10-15T00:00:00.000Z'),
        physicalProgress: 84,
        financialProgress: 78,
        coverImageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
        description:
          'Upgradation of civic hospital with 100 specialized beds, 2 modern modular operation theatres, 12-bed cardiac ICU, computerized CT Scan, and 24x7 emergency golden-hour trauma response center.',
        highlights: [
          { key: 'Bed Capacity', value: '100 Beds (with 12 ICU Beds)' },
          { key: 'Modular OTs', value: '2 Fully Equipped Operation Theatres' },
          { key: 'Diagnostic Wing', value: 'CT Scan, Digital X-Ray & Pathology' },
          { key: 'Subsidized Pharmacy', value: 'Generic medicines 24x7' },
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
            title: 'Modular ICU Ward',
          },
          {
            url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
            title: 'Hospital Exterior Façade',
          },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/projects/hospital_upgradation_dpr.pdf',
      },
      {
        title: 'Smart City LED Street Lighting & Solar Energy Micro-Grid',
        marathiTitle: 'स्मार्ट एलईडी पथदिवे व सौर ऊर्जा मायक्रोग्रिड प्रकल्प',
        projectCode: 'LMC-ENG-2023-009',
        category: 'Roads & Transport',
        status: 'COMPLETED',
        departmentId: 'dept-electrical',
        location: 'All Wards & Ghat Road Corridors',
        contractorName: 'EESL Energy Solutions Pvt. Ltd.',
        sanctionedBudget: '₹ 8.90 Crore',
        startDate: new Date('2023-06-01T00:00:00.000Z'),
        targetCompletionDate: new Date('2024-12-15T00:00:00.000Z'),
        physicalProgress: 100,
        financialProgress: 100,
        coverImageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
        description:
          'Replacement of 6,200 conventional high-pressure sodium street lamps with energy-efficient smart dimmable LED lights connected with CCMS web dashboard, reducing civic power consumption by 52%.',
        highlights: [
          { key: 'LED Fixtures', value: '6,240 Smart LEDs Installed' },
          { key: 'Energy Savings', value: '52% annual reduction in electricity bill' },
          { key: 'CCMS Monitoring', value: 'Real-time fault alerts via IoT' },
          { key: 'Solar Rooftops', value: '180 kWp installed on municipal buildings' },
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
            title: 'Illuminated Ghat Highway',
          },
          {
            url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
            title: 'Solar Rooftop Array',
          },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/projects/led_smart_lighting.pdf',
      },
      {
        title: 'Ryewood Heritage Botanical Park Revitalization & Canopy Walkway',
        marathiTitle: 'रायवूड हेरिटेज वनस्पती उद्यान पुनरुज्जीवन व कॅनोपी वॉकवे',
        projectCode: 'LMC-ENV-2024-015',
        category: 'Tourism',
        status: 'IN_PROGRESS',
        departmentId: 'dept-garden',
        location: 'Ryewood Park, Lonavala Central',
        contractorName: 'Western Ghats Eco-Constructions',
        sanctionedBudget: '₹ 11.75 Crore',
        startDate: new Date('2024-08-01T00:00:00.000Z'),
        targetCompletionDate: new Date('2026-09-30T00:00:00.000Z'),
        physicalProgress: 66,
        financialProgress: 60,
        coverImageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
        description:
          'Conservation and scientific enrichment of the historic 25-acre Ryewood botanical park, introducing elevated treetop canopy nature walks, medicinal plant conservatory, organic butterfly garden, and illuminated musical fountain.',
        highlights: [
          { key: 'Park Area', value: '25 Acres Conserved' },
          { key: 'Tree Species', value: '140+ native botanical varieties tagged' },
          { key: 'Elevated Canopy Walk', value: '450 Metres Wooden Boardwalk' },
          { key: 'Children Activity Zone', value: 'Zero-plastic adventure playground' },
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
            title: 'Lush Tree Canopy',
          },
          {
            url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
            title: 'Illuminated Garden Pathway',
          },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/projects/ryewood_park_revitalization.pdf',
      },
      {
        title: 'Khandala Lake Beautification & Sustainable Waterfront Promenade',
        marathiTitle: 'खंडाळा तलाव सुशोभीकरण व पर्यावरणपूरक लेकफ्रंट प्रोमेनेड',
        projectCode: 'LMC-ENV-2025-003',
        category: 'Town Planning',
        status: 'PLANNED',
        departmentId: 'dept-town-planning',
        location: 'Khandala Lake Zone',
        contractorName: 'Tendering Stage (RFP Published)',
        sanctionedBudget: '₹ 16.50 Crore',
        startDate: new Date('2026-10-01T00:00:00.000Z'),
        targetCompletionDate: new Date('2027-12-31T00:00:00.000Z'),
        physicalProgress: 12,
        financialProgress: 8,
        coverImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        description:
          'Ecological desilting and water purification of Khandala Lake, constructed wetlands for bio-filtration, continuous walking and cycling tracks, open air yoga pavilion, and non-motorized pedal boating jetty.',
        highlights: [
          { key: 'Waterfront Track', value: '1.8 km Periphery Jogging Track' },
          { key: 'Bio-Remediation', value: 'Natural floating reed-bed treatment' },
          { key: 'Public Amenities', value: 'Solar gazebos, drinking water kiosks' },
          { key: 'Pedal Boating', value: '15 Eco-friendly boats' },
        ],
        gallery: [
          {
            url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            title: 'Lakefront Design Concept',
          },
        ],
        attachmentUrl: 'https://cdn.lonavalamc.gov.in/projects/khandala_lake_dpr.pdf',
      },
    ];

    for (const projectData of projectsData) {
      const project = projectRepo.create(projectData);
      await projectRepo.save(project);
    }

    console.log(`✅ Seeded ${projectsData.length} projects into the database`);
  } else {
    console.log(`ℹ️ Projects table already has ${count} records. Skipping seed.`);
  }
}
