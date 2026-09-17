import { DataSource } from 'typeorm';
import { Faq } from '../../faq/entities/faq.entity';

export async function seedFaqs(dataSource: DataSource): Promise<void> {
  const faqRepo = dataSource.getRepository(Faq);
  const count = await faqRepo.count();

  if (count === 0) {
    await faqRepo.save([
      faqRepo.create({
        question: 'How can I pay my Property Tax online in Lonavala?',
        answer:
          'You can pay Property Tax online by navigating to Citizen Services > Property Tax. Enter your Assessment Number or Property ID to view the outstanding bill and pay securely via UPI, Net Banking, or Cards.',
        sortOrder: 1,
        active: true,
      }),
      faqRepo.create({
        question: 'How do I register a civic grievance or complaint?',
        answer:
          'Go to the Grievance Redressal section, select the relevant department (Health & Sanitation, Water Works, Roads, etc.), provide the issue details with photos, and submit. You will receive a unique tracking token.',
        sortOrder: 2,
        active: true,
      }),
      faqRepo.create({
        question: 'What are the municipal office working hours?',
        answer:
          'The Lonavala Municipal Council administrative office and Citizen Facilitation Center (CFC) are open Monday through Saturday from 10:00 AM to 5:30 PM (closed on 2nd and 4th Saturdays and public holidays). The Emergency Control Room operates 24x7.',
        sortOrder: 3,
        active: true,
      }),
      faqRepo.create({
        question: 'How to apply for a Trade License / Renewal?',
        answer:
          'Download the Trade License application form from the Downloads section or apply online under Citizen Services with proof of establishment, NOC, and applicant identity proof.',
        sortOrder: 4,
        active: true,
      }),
    ]);
    console.log('✅ Seeded 4 FAQs');
  }
}
