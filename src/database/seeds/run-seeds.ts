import { AppDataSource } from '../../config/typeorm.config';
import { seedHomepage } from './homepage.seed';
import { seedAboutUs } from './about-us.seed';
import { seedTourism } from './tourism.seed';
import { seedContacts } from './contacts.seed';

async function runSeeds() {
  console.log('🌱 Initializing Database Connection for Seeding...');
  await AppDataSource.initialize();
  console.log('✅ Database connected');

  try {
    console.log('🌱 Running Homepage Seed...');
    await seedHomepage(AppDataSource);

    console.log('🌱 Running About Us Seed...');
    await seedAboutUs(AppDataSource);

    console.log('🌱 Running Tourism Seed...');
    await seedTourism(AppDataSource);

    console.log('🌱 Running Contacts & Council Members Seed...');
    await seedContacts(AppDataSource);

    console.log('🎉 All seeds completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

runSeeds();
