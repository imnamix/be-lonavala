import { AppDataSource } from '../../config/typeorm.config';
import { seedHomepage } from './homepage.seed';
import { seedAboutUs } from './about-us.seed';
import { seedTourism } from './tourism.seed';
import { seedContacts } from './contacts.seed';
import { seedFaq } from './faq.seed';
import { seedGlance } from './glance.seed';
import { seedNotices } from './notice.seed';
import { seedProjects } from './project.seed';
import { seedDepartments } from './department.seed';
import { seedCourtMembers } from './court-member.seed';
import { seedCourtProceedings } from './court-proceeding.seed';
import { seedCourtSessions } from './court-session.seed';

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

    console.log('🌱 Running FAQ Seed...');
    await seedFaq(AppDataSource);

    console.log('🌱 Running Glance Metrics Seed...');
    await seedGlance(AppDataSource);

    console.log('🌱 Running Notices Seed...');
    await seedNotices(AppDataSource);

    console.log('🌱 Running Projects Seed...');
    await seedProjects(AppDataSource);

    console.log('🌱 Running Departments Seed...');
    await seedDepartments(AppDataSource);

    console.log('🌱 Running Court Committee Members Seed...');
    await seedCourtMembers(AppDataSource);

    console.log('🌱 Running Court Proceedings Seed...');
    await seedCourtProceedings(AppDataSource);

    console.log('🌱 Running Court Sessions Seed...');
    await seedCourtSessions(AppDataSource);

    console.log('🎉 All seeds completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

runSeeds();
