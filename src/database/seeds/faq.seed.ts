import { DataSource } from 'typeorm';
import { Faq } from '../../faq/entities/faq.entity';

export async function seedFaq(dataSource: DataSource): Promise<void> {
  const faqRepo = dataSource.getRepository(Faq);
  const count = await faqRepo.count();

  if (count === 0) {
    const defaultFaqs = [
      {
        question: 'How can I pay my Property Tax online and claim the early rebate?',
        answer:
          'Visit the Citizen Services page, select "Property Tax", enter your Assessment ID or Ward number, review arrears, and pay via Net Banking, UPI, or Credit Card. Payments completed before June 30 receive an automatic 5% rebate.',
        category: 'Property Tax',
        sortOrder: 1,
        active: true,
      },
      {
        question: 'What is the procedure for registering a civic grievance?',
        answer:
          'Citizens can register grievances via the 5-step Grievance portal or Maha-Lonavala 311 app. Upload a photo, select your ward and category, and submit. You will receive an SMS with a tracking token and guaranteed resolution within 3 to 7 days.',
        category: 'Grievance Redressal',
        sortOrder: 2,
        active: true,
      },
      {
        question: 'What are the timings and entry rules for Bhushi Dam and Tiger Point?',
        answer:
          'Bhushi Dam is accessible daily from 09:00 AM to 05:00 PM during the monsoon season. Tiger Point remains open until 06:30 PM. Swimming beyond demarcated safety barriers is strictly prohibited by order of the Sub-Divisional Magistrate.',
        category: 'Tourism & Safety',
        sortOrder: 3,
        active: true,
      },
      {
        question: 'How can I obtain a digitised QR-coded Birth or Death certificate?',
        answer:
          'Search by date of event and parent/deceased name in the Health Department portal. Verified certificates can be downloaded instantly with a state government digital signature without visiting the municipal council office.',
        category: 'Health & Sanitation',
        sortOrder: 4,
        active: true,
      },
      {
        question: 'How do I apply for a new municipal drinking water pipeline connection?',
        answer:
          'Submit an online application through the Water Supply Department section with your property 7/12 extract, tax receipt, and site plan. An engineer will conduct site inspection within 7 working days.',
        category: 'Water Supply',
        sortOrder: 5,
        active: true,
      },
      {
        question: 'What documents are required for Trade License renewal?',
        answer:
          'For annual trade license renewal, you require previous license copy, updated shop property tax receipt, fire safety NOC (for commercial establishments), and applicant photo ID.',
        category: 'Town Planning & Trade',
        sortOrder: 6,
        active: true,
      },
      {
        question: 'Where can I report illegal construction or tree felling in hill station limits?',
        answer:
          'Immediate reports can be lodged 24x7 via the Emergency Control Room at 02114-273030 or logged under the "Town Planning & Anti-Encroachment" category on the civic portal.',
        category: 'General & Emergency',
        sortOrder: 7,
        active: true,
      },
    ];

    await faqRepo.save(faqRepo.create(defaultFaqs));
    console.log(`✅ Seeded ${defaultFaqs.length} FAQs into database`);
  }
}
