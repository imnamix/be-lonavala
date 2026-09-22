import { DataSource } from 'typeorm';
import { GlanceItem } from '../../glance/entities/glance-item.entity';

export async function seedGlance(dataSource: DataSource): Promise<void> {
  const glanceRepo = dataSource.getRepository(GlanceItem);
  const count = await glanceRepo.count();

  if (count === 0) {
    const defaultMetrics = [
      {
        title: 'Citizens Served',
        value: '75,000+',
        tag: 'Across 5 Wards',
        icon: 'Users',
        sortOrder: 1,
        active: true,
      },
      {
        title: 'Resolution SLA',
        value: '99.4%',
        tag: 'Avg: 3 Days',
        icon: 'CheckCircle',
        sortOrder: 2,
        active: true,
      },
      {
        title: 'Annual Tourists',
        value: '5.2M+',
        tag: 'Sahyadri Gateway',
        icon: 'Trees',
        sortOrder: 3,
        active: true,
      },
      {
        title: 'Digital Services',
        value: '100%',
        tag: '100% Online',
        icon: 'Smartphone',
        sortOrder: 4,
        active: true,
      },
      {
        title: 'Clean City Rank',
        value: '#1 Eco-City',
        tag: 'Swachh Survekshan',
        icon: 'Award',
        sortOrder: 5,
        active: true,
      },
      {
        title: 'Protected Area',
        value: '38.2 sq km',
        tag: 'Eco-Sensitive Zone',
        icon: 'ShieldCheck',
        sortOrder: 6,
        active: true,
      },
    ];

    await glanceRepo.save(glanceRepo.create(defaultMetrics));
    console.log(`✅ Seeded ${defaultMetrics.length} Glance metrics into database`);
  }
}
