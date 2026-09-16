import { DataSource } from 'typeorm';
import { HomepageConfig } from '../../homepage/entities/homepage-config.entity';
import { HomepageSlide } from '../../homepage/entities/homepage-slide.entity';
import { HomepageSlideButton } from '../../homepage/entities/homepage-slide-button.entity';
import { HomepageSlideTag } from '../../homepage/entities/homepage-slide-tag.entity';

export async function seedHomepage(dataSource: DataSource): Promise<void> {
  const configRepo = dataSource.getRepository(HomepageConfig);
  const slideRepo = dataSource.getRepository(HomepageSlide);
  const buttonRepo = dataSource.getRepository(HomepageSlideButton);
  const tagRepo = dataSource.getRepository(HomepageSlideTag);

  // 1. Seed Announcement Config
  const existingConfig = await configRepo.findOne({ where: {} });
  if (!existingConfig) {
    const config = configRepo.create({
      announcement:
        '📢 Special Rebate on Property Tax Assessment 2024-25: 5% early-bird discount extended till 31st October. Pay online now.',
      announcementActive: true,
    });
    await configRepo.save(config);
    console.log('✅ Seeded Homepage Config');
  }

  // 2. Seed Hero Slides
  const slideCount = await slideRepo.count();
  if (slideCount === 0) {
    // Slide 1: Main Gateway
    const slide1 = slideRepo.create({
      slideTitle: 'Gateway to Hill Station Governance',
      alignment: 'left',
      badgeEn: 'Official Citizen & Tourism Portal',
      badgeMr: 'अधिकृत नागरिक व पर्यटन पोर्टल',
      headlineEn:
        'Empowering Lonavala with Digital Governance & Tourism Excellence',
      headlineMr: 'डिजिटल सुशासन आणि पर्यटन विकासातून समृद्ध लोणावळा',
      taglineEn:
        'Doorstep civic delivery, instant online grievance redressal, property & water tax payments, and comprehensive tourism guides.',
      taglineMr:
        'नागरिकांसाठी तत्पर ऑनलाईन सेवा, तक्रार निवारण, मालमत्ता व पाणी कर भरणा आणि पर्यटकांना सुलभ माहिती.',
      mediaUrl:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
      showButtons: true,
      showTags: true,
      active: true,
      sortOrder: 1,
    });
    const savedSlide1 = await slideRepo.save(slide1);

    await buttonRepo.save([
      buttonRepo.create({
        name: 'Explore Citizen Services',
        url: '/services',
        icon: 'LayoutGrid',
        color: 'primary',
        active: true,
        sortOrder: 1,
        slide: savedSlide1,
      }),
      buttonRepo.create({
        name: 'Register a Grievance',
        url: '/grievance',
        icon: 'AlertCircle',
        color: 'secondary',
        active: true,
        sortOrder: 2,
        slide: savedSlide1,
      }),
    ]);

    await tagRepo.save([
      tagRepo.create({
        name: 'Property Tax',
        icon: 'Building2',
        active: true,
        sortOrder: 1,
        slide: savedSlide1,
      }),
      tagRepo.create({
        name: 'Water Supply',
        icon: 'Droplets',
        active: true,
        sortOrder: 2,
        slide: savedSlide1,
      }),
      tagRepo.create({
        name: 'Trade License',
        icon: 'FileText',
        active: true,
        sortOrder: 3,
        slide: savedSlide1,
      }),
      tagRepo.create({
        name: 'Birth & Death',
        icon: 'FileCheck',
        active: true,
        sortOrder: 4,
        slide: savedSlide1,
      }),
    ]);

    // Slide 2: Swachh Lonavala & Sustainable Hill Station
    const slide2 = slideRepo.create({
      slideTitle: 'Clean & Green Hill Station Initiative',
      alignment: 'center',
      badgeEn: 'Swachh Survekshan 2024 Awardee',
      badgeMr: 'स्वच्छ सर्वेक्षण २०२४ गौरव',
      headlineEn: 'Preserving the Pristine Beauty of the Sahyadris',
      headlineMr: 'सह्याद्रीच्या कुशीतील निसर्गसौंदर्याचे संवर्धन',
      taglineEn:
        'Join our 100% waste segregation drive, zero-plastic hill-station pledge, and eco-sensitive infrastructure development.',
      taglineMr:
        '१००% कचरा वर्गीकरण मोहीम, प्लास्टिक मुक्ती आणि पर्यावरणपूरक विकासात सक्रिय सहभाग नोंदवा.',
      mediaUrl:
        'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1920&q=80',
      showButtons: true,
      showTags: true,
      active: true,
      sortOrder: 2,
    });
    const savedSlide2 = await slideRepo.save(slide2);

    await buttonRepo.save([
      buttonRepo.create({
        name: 'Discover Tourism Spots',
        url: '/tourism',
        icon: 'Compass',
        color: 'primary',
        active: true,
        sortOrder: 1,
        slide: savedSlide2,
      }),
      buttonRepo.create({
        name: 'View Development Projects',
        url: '/projects',
        icon: 'Hammer',
        color: 'secondary',
        active: true,
        sortOrder: 2,
        slide: savedSlide2,
      }),
    ]);

    await tagRepo.save([
      tagRepo.create({
        name: 'Tiger Point',
        icon: 'Mountain',
        active: true,
        sortOrder: 1,
        slide: savedSlide2,
      }),
      tagRepo.create({
        name: 'Bhushi Dam',
        icon: 'Waves',
        active: true,
        sortOrder: 2,
        slide: savedSlide2,
      }),
      tagRepo.create({
        name: 'Karla Caves',
        icon: 'Landmark',
        active: true,
        sortOrder: 3,
        slide: savedSlide2,
      }),
    ]);

    console.log('✅ Seeded 2 Homepage Slides with buttons and tags');
  }
}
