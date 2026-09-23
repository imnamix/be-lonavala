import { DataSource } from 'typeorm';
import {
  ImportantUpdate,
  UpdateActionType,
} from '../../important-update/entities/important-update.entity';

export async function seedImportantUpdates(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(ImportantUpdate);

  const updatesData = [
    {
      title: 'Monsoon Preparedness & 24x7 Emergency Disaster Control Helpline',
      tag: 'URGENT',
      tagBgColor: '#EF4444',
      tagTextColor: '#FFFFFF',
      actionType: UpdateActionType.CUSTOM_PAGE,
      slug: 'monsoon-preparedness-24x7-emergency-helpline',
      summary:
        'Lonavala Municipal Council establishes 24x7 emergency response centers, disaster response teams, and rescue hotlines for monsoon season.',
      description: `
        <h2>Emergency Monsoon Advisory 2026</h2>
        <p>In view of heavy rainfall forecasts by the Indian Meteorological Department (IMD) for the Western Ghats region, Lonavala Municipal Council (LMC) has activated round-the-clock emergency response teams across all municipal wards.</p>
        
        <h3>Key Citizen Instructions:</h3>
        <ul>
          <li>Avoid visiting landslide-prone spots and overflowing waterfalls during red/orange alerts.</li>
          <li>Ensure roof gutters and drains are clear of debris.</li>
          <li>For emergency rescue or waterlogging assistance, call the 24x7 Control Room immediately.</li>
        </ul>

        <h3>Emergency Contact Numbers:</h3>
        <p><strong>Disaster Control Room:</strong> 02114-272222 / 02114-273333<br/>
        <strong>Fire & Rescue Station:</strong> 101 / 02114-272101<br/>
        <strong>Ambulance Service:</strong> 108</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1200&auto=format&fit=crop&q=80',
      attachments: [
        {
          name: 'Monsoon Safety Guidelines & Ward Officers Directory.pdf',
          url: 'https://cdn.lonavalamc.gov.in/docs/monsoon_advisory_2026.pdf',
          type: 'pdf',
          size: '1.8 MB',
        },
        {
          name: 'Emergency Evacuation Centers List.pdf',
          url: 'https://cdn.lonavalamc.gov.in/docs/evacuation_centers_lonavala.pdf',
          type: 'pdf',
          size: '640 KB',
        },
      ],
      images: [
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&auto=format&fit=crop&q=80',
      ],
      isActive: true,
      isPinned: true,
      priority: 100,
      viewsCount: 142,
    },
    {
      title: 'Download Property Tax Assessment & Online Rebate Scheme 2026-27 (PDF)',
      tag: 'NEW',
      tagBgColor: '#10B981',
      tagTextColor: '#FFFFFF',
      actionType: UpdateActionType.DOWNLOAD_FILE,
      fileUrl: 'https://cdn.lonavalamc.gov.in/docs/Property_Tax_Assessment_Notice_2026_27.pdf',
      fileName: 'Property_Tax_Assessment_Notice_2026_27.pdf',
      fileSize: '2.4 MB',
      fileType: 'pdf',
      isActive: true,
      isPinned: false,
      priority: 80,
      viewsCount: 89,
    },
    {
      title: 'State Government Aaple Sarkar Citizen Services Portal',
      tag: 'PORTAL',
      tagBgColor: '#3B82F6',
      tagTextColor: '#FFFFFF',
      actionType: UpdateActionType.EXTERNAL_LINK,
      externalUrl: 'https://aaplesarkar.mahaonline.gov.in',
      openInNewTab: true,
      isActive: true,
      isPinned: false,
      priority: 60,
      viewsCount: 52,
    },
    {
      title: 'E-Tender Notice: Ward No. 4 & 7 Road Resurfacing and Stormwater Drainage',
      tag: 'TENDER',
      tagBgColor: '#F59E0B',
      tagTextColor: '#FFFFFF',
      actionType: UpdateActionType.INTERNAL_ROUTE,
      internalRoute: '/notices',
      isActive: true,
      isPinned: false,
      priority: 50,
      viewsCount: 67,
    },
    {
      title: 'Tree Plantation & Green Lonavala Drive 2026 — Register as Volunteer',
      tag: 'EVENT',
      tagBgColor: '#8B5CF6',
      tagTextColor: '#FFFFFF',
      actionType: UpdateActionType.CUSTOM_PAGE,
      slug: 'green-lonavala-tree-plantation-drive-2026',
      summary:
        'Join the Municipal Council in planting 10,000 indigenous trees across Ryewood Park, Tungarli, and Khandala slopes.',
      description: `
        <h2>Join the Green Lonavala Drive 2026</h2>
        <p>LMC invites citizens, school students, NGOs, and tourists to participate in our annual monsoon tree plantation drive aiming to restore native flora.</p>
        <p><strong>Venue:</strong> Ryewood Park Botanical Grounds, Lonavala<br/>
        <strong>Date & Time:</strong> Every Saturday in July & August, 8:00 AM onwards</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
      attachments: [],
      images: [],
      isActive: true,
      isPinned: false,
      priority: 40,
      viewsCount: 31,
    },
  ];

  for (const update of updatesData) {
    const existing = await repository.findOne({
      where: [{ title: update.title }, ...(update.slug ? [{ slug: update.slug }] : [])],
    });

    if (!existing) {
      const created = repository.create(update);
      await repository.save(created);
      console.log(`  ➕ Seeded Important Update: "${update.title}" [${update.actionType}]`);
    } else {
      console.log(`  ℹ️ Important Update already exists: "${update.title}"`);
    }
  }
}
