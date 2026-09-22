import { DataSource } from 'typeorm';
import { CourtSessionEntity } from '../../court-session/entities/court-session.entity';

export const DEFAULT_COURT_SESSIONS_DATA = [
  {
    sessionTitle: 'Bombay High Court Division Bench Hearing on MRTP Hill Slope Actions',
    marathiSessionTitle: 'मा. मुंबई उच्च न्यायालय खंडपीठ सुनावणी - टेकडी उतार बांधकाम निष्कासन',
    hearingDate: '14 October 2026',
    time: '11:00 AM',
    courtForum: 'Bombay High Court (Principal Bench, Mumbai)',
    presidingBench: "Hon'ble Division Bench (Court Room 14)",
    casesListed: [
      'WP / 4812 / 2024: LMC vs. Eco Valley Developers Pvt Ltd',
      'PIL / 39 / 2023: Citizens Green Action Forum vs. State of Maharashtra & LMC',
    ],
    sessionAgenda:
      'Presentation of updated satellite boundary demarcation & compliance affidavit on demolition notices for unauthorised slope constructions.',
    marathiSessionAgenda:
      'नगररचना विभागाचा उपग्रह सीमांकन नकाशा व वस्तुस्थिती प्रतिज्ञापत्र सादरीकरण.',
    status: 'Scheduled',
    noticePdfUrl: 'https://res.cloudinary.com/dmwfd0prm/raw/upload/v1726000000/hearing-notice-oct-14.pdf',
    sortOrder: 1,
    active: true,
  },
  {
    sessionTitle: 'National Green Tribunal (Western Zone) Environmental Compliance Session',
    marathiSessionTitle: 'मा. राष्ट्रीय हरित लवाद (पश्चिम विभाग) - सांडपाणी प्रकल्प पूर्तता सुनावणी',
    hearingDate: '28 October 2026',
    time: '02:30 PM',
    courtForum: 'National Green Tribunal (Western Zone Bench, Pune)',
    presidingBench: "Hon'ble Judicial & Expert Members (Court Hall 1)",
    casesListed: [
      'OA / 89 / 2024 (WZ): Pawna & Valvan Catchment Conservation vs. LMC',
    ],
    sessionAgenda:
      'Review of 10 MLD Sewage Treatment Plant performance metrics and pipeline connectivity in municipal fringe wards.',
    marathiSessionAgenda:
      '१० एमएलडी सांडपाणी शुद्धीकरण प्रकल्पाचे गुणवत्ता परीक्षण अहवाल सादरीकरण.',
    status: 'Scheduled',
    noticePdfUrl: 'https://res.cloudinary.com/dmwfd0prm/raw/upload/v1726000000/ngt-session-notice-oct-28.pdf',
    sortOrder: 2,
    active: true,
  },
  {
    sessionTitle: 'National Mega Lok Adalat Municipal Special Settlement Bench',
    marathiSessionTitle: 'राष्ट्रीय महा लोक अदालत - नगरपालिका कर व दंड तडजोड खंडपीठ',
    hearingDate: '14 September 2026',
    time: '10:00 AM - 05:00 PM',
    courtForum: 'Main Conference & Court Hall, LMC Administrative Headquarters',
    presidingBench: "Hon'ble Civil Judge Senior Division & Panel Conciliators",
    casesListed: [
      'Property Tax Penal Interest Waiver Cases (Batch 1 to 4)',
      'Commercial Water Tariff Disconnection Disputes',
      'Minor Building Permission Compounding Petitions',
    ],
    sessionAgenda:
      'Citizen conciliation session offering 100% penal interest rebate on property dues and instant consent order issuance.',
    marathiSessionAgenda:
      'थकबाकीदारांना १००% दंड व्याज माफी देऊन जागीच तडजोड हुकूमनामा देण्याची विशेष सुनावणी.',
    status: 'Concluded',
    noticePdfUrl: 'https://res.cloudinary.com/dmwfd0prm/raw/upload/v1726000000/lok-adalat-schedule-sep-14.pdf',
    sortOrder: 3,
    active: true,
  },
  {
    sessionTitle: 'Civil Court Vadgaon Maval - Commercial Assessment Joint Inspection Hearing',
    marathiSessionTitle: 'वडगाव मावळ दिवाणी न्यायालय - व्यावसायिक कर मूल्यांकन संयुक्त पाहणी सुनावणी',
    hearingDate: '18 August 2026',
    time: '11:30 AM',
    courtForum: 'Civil Court Complex, Vadgaon Maval, Pune',
    presidingBench: 'Civil Judge Senior Division, Court Room 2',
    casesListed: [
      'RCS / 142 / 2023: Tungarli Commercial Complex Owners Association vs. LMC',
    ],
    sessionAgenda:
      'Cross-examination of municipal valuation officers and filing of municipal resolution records on reassessment criteria.',
    marathiSessionAgenda:
      'नगरपरिषद मूल्यांकन अधिकाऱ्यांची साक्ष व ठराव नोंद सादर करण्यात आली.',
    status: 'Concluded',
    noticePdfUrl: '',
    sortOrder: 4,
    active: true,
  },
];

export async function seedCourtSessions(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(CourtSessionEntity);
  const count = await repository.count();

  if (count === 0) {
    console.log('🌱 Seeding Court Sessions table...');
    const entities = repository.create(DEFAULT_COURT_SESSIONS_DATA);
    await repository.save(entities);
    console.log(`✅ Seeded ${entities.length} Court Sessions.`);
  } else {
    console.log(`ℹ️ Court Sessions table already contains ${count} records. Skipping seed.`);
  }
}
