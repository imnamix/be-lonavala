import { DataSource } from 'typeorm';
import { CourtProceedingEntity } from '../../court-proceeding/entities/court-proceeding.entity';

export const DEFAULT_COURT_PROCEEDINGS_DATA: Partial<CourtProceedingEntity>[] = [
  {
    subject: "Hon'ble Bombay High Court - WP / 4812 / 2024: Unauthorized Hill Slope Demolition Review",
    marathiSubject: 'मा. मुंबई उच्च न्यायालय - याचिका क्र. ४८१२/२०२४: टेकडी उतार विकास प्रतिबंध व निष्कासन',
    description:
      'Statutory municipal petition challenging lower tribunal stay on demolition order passed under Maharashtra Regional and Town Planning (MRTP) Act, 1966 for unauthorized construction in Hill Slope No-Development Zone.',
    marathiDescription:
      'महाराष्ट्र प्रादेशिक व नगररचना अधिनियम, १९६६ अंतर्गत टेकडी उतार विकास प्रतिबंधक क्षेत्रातील अनधिकृत बांधकामावरील कारवाई संदर्भातील मा. उच्च न्यायालयातील सुनावणी.',
    date: '14 October 2026',
    minutes:
      "Hon'ble Division Bench heard LMC senior standing counsel. Court directed Town Planning Officer to submit updated satellite demarcation survey. Status quo maintained till next hearing.",
    marathiMinutes:
      'मा. खंडपीठासमोर विधी सल्लागारांचा युक्तिवाद पूर्ण. नगररचना विभागाला सविस्तर उपग्रह सीमांकन पाहणी अहवाल सादर करण्याचे निर्देश देण्यात आले.',
    pdfUrl: '/downloads/high-court-order-wp-4812-2024.pdf',
    fileSize: '1.4 MB',
    benchOfficers: "Hon'ble High Court of Bombay (Principal Bench, Mumbai)",
    venue: 'Court Room 14, High Court Annexe, Fort, Mumbai',
    status: 'Upcoming',
    sortOrder: 1,
    active: true,
  },
  {
    subject: 'National Green Tribunal (Western Zone) - OA / 89 / 2024: Lake Catchment & STP Compliance',
    marathiSubject: 'मा. राष्ट्रीय हरित लवाद (पश्चिम विभाग) - मूळ अर्ज क्र. ८९/२०२४: जलस्त्रोत संवर्धन व सांडपाणी प्रक्रिया',
    description:
      "Ecological conservation review for Pawna & Valvan lake catchment buffer zones. NGT Western Zone Bench vacated interim stay following LMC's comprehensive compliance on 10 MLD STP commissioning.",
    marathiDescription:
      'पवना व वळवण जलस्त्रोत संवर्धन व १० एमएलडी सांडपाणी प्रक्रिया प्रकल्पाच्या यशस्वी पूर्तता अहवालानंतर मा. हरित लवादाने प्रकल्पाच्या कामास मंजुरी दिली.',
    date: '28 August 2026',
    minutes:
      'Tribunal recorded satisfactory compliance of MPCB bio-chemical parameters. Project allowed to proceed with underground drainage pipeline connectivity across municipal wards.',
    marathiMinutes:
      'प्रदूषण नियंत्रण मंडळाच्या निकषांनुसार सांडपाणी शुद्धीकरण होत असल्याचे नमूद करून लवादाने भूमीगत गटार योजनेच्या कामास संमती दिली.',
    pdfUrl: '/downloads/ngt-order-oa-89-2024.pdf',
    fileSize: '2.1 MB',
    benchOfficers: 'Hon. Judicial & Expert Members, NGT WZ Bench Pune',
    venue: 'NGT Court Complex, Shivaji Nagar, Pune',
    status: 'Completed',
    sortOrder: 2,
    active: true,
  },
  {
    subject: 'National Mega Lok Adalat - Municipal Revenue & Property Tax Compromise Bench',
    marathiSubject: 'राष्ट्रीय महा लोक अदालत - मालमत्ता कर व पाणीपट्टी थकबाकी तडजोड खंडपीठ',
    description:
      'Comprehensive judicial conciliation bench organized under District Legal Services Authority (DLSA) Pune. Citizens availed 100% waiver on delayed payment penal interest for overdue property taxes and commercial water consumption dues upon one-time settlement.',
    marathiDescription:
      'जिल्हा विधी सेवा प्राधिकरण, पुणे यांच्या निर्देशानुसार आयोजित राष्ट्रीय महा लोक अदालत. मालमत्ता कर व पाणीपट्टी थकबाकीदारांना एकरकमी भरणा केल्यास १००% दंड व्याज माफी देऊन तडजोड हुकूमनामे पारित करण्यात आले.',
    date: '14 September 2026',
    minutes:
      'Bench commenced at 10:30 AM at LMC Main Conference Hall, presided by Hon. Civil Judge Senior Division & LMC Panel Conciliators. Total 84 recovery files evaluated; 68 matters amicably resolved with consent decrees. Revenue recovered: ₹42,80,500/-.',
    marathiMinutes:
      'सकाळी १०:३० वाजता मा. दिवाणी न्यायाधीश व नगरपरिषद पॅनेल तडजोडकार यांच्या उपस्थितीत कामकाज. ८४ पैकी ६८ प्रकरणांत तडजोड होऊन एकूण ₹४२,८०,५००/- वसुली जमा झाली.',
    pdfUrl: '/downloads/lok-adalat-minutes-sep-2026.pdf',
    fileSize: '1.8 MB',
    benchOfficers: 'Hon. Presiding Civil Judge (Vadgaon Maval) & Adv. Rajesh Deshmukh',
    venue: 'Main Conference Hall, LMC Headquarters, Lonavala',
    status: 'Minutes Published',
    sortOrder: 3,
    active: true,
  },
  {
    subject: 'Vadgaon Maval Civil Court - RCS / 142 / 2023: Commercial Property Ratable Valuation Review',
    marathiSubject: 'वडगाव मावळ दिवाणी न्यायालय - दिवाणी दावा क्र. १४२/२०२३: व्यावसायिक मालमत्ता कर मूल्यांकन',
    description:
      'Scrutiny of quadrennial municipal property tax assessment and annual ratable valuation rules for commercial establishments, hotels, and tourist resort complexes.',
    marathiDescription:
      'व्यावसायिक संकुले व हॉटेलच्या वार्षिक भाडेमूल्य आकारणी संदर्भातील दाव्यात नगरपरिषदेच्या विधी शाखेकडून वैधानिक नियमांचे पालन झाल्याचे न्यायालयाच्या निदर्शनास आणले.',
    date: '30 September 2026',
    minutes:
      'Detailed counter affidavit and revenue inspection maps placed on record by LMC panel advocate. Joint measurement schedule confirmed for contested properties.',
    marathiMinutes:
      'नगरपरिषद पॅनेल विधीज्ञांनी लेखी युक्तिवाद व मोजणी नकाशे सादर केले. संयुक्त मोजणी वेळापत्रक निश्चित करण्यात आले.',
    pdfUrl: '/downloads/civil-court-order-rcs-142-2023.pdf',
    fileSize: '920 KB',
    benchOfficers: 'Civil Judge Senior Division, Vadgaon Maval',
    venue: 'Taluka Court Complex, Vadgaon Maval, Pune',
    status: 'In Progress',
    sortOrder: 4,
    active: true,
  },
  {
    subject: "Hon'ble Bombay High Court - PIL / 102 / 2025: Traffic Congestion & Multi-level Parking Writ",
    marathiSubject: 'मा. मुंबई उच्च न्यायालय - जनहित याचिका क्र. १०२/२०२५: वाहतूक कोंडी व बहुमजली वाहनतळ पूर्तता',
    description:
      'Public interest litigation seeking directions for seasonal weekend traffic management, bypass connectivity, and multi-level parking facility execution in Lonavala municipal limits.',
    marathiDescription:
      'पर्यटन हंगामातील वाहतूक नियंत्रण, पर्यायी बाह्यवळण मार्ग व बहुमजली पार्किंग व्यवस्थेबाबत दाखल जनहित याचिकेवर सुनावणी.',
    date: '18 November 2026',
    minutes:
      'Hon\'ble Court took on record the joint compliance status report submitted by LMC Chief Officer and Pune District Traffic Police. DPR for 300-vehicle capacity smart parking facility approved in principle.',
    marathiMinutes:
      'नगरपरिषद मुख्य अधिकारी व जिल्हा वाहतूक पोलिसांचा संयुक्त पाहणी अहवाल दाखल. ३०० वाहनांच्या स्मार्ट पार्किंग आराखड्यास तत्वतः मान्यता.',
    pdfUrl: '/downloads/high-court-pil-102-2025-status.pdf',
    fileSize: '1.6 MB',
    benchOfficers: 'Hon. Division Bench (Court Room 03, Principal Bench Mumbai)',
    venue: 'High Court Annexe Building, Fort, Mumbai',
    status: 'Upcoming',
    sortOrder: 5,
    active: true,
  },
  {
    subject: 'District Consumer Disputes Redressal Commission Pune - CC / 314 / 2024: Public Water Pipeline Laying Claim',
    marathiSubject: 'जिल्हा ग्राहक तक्रार निवारण आयोग पुणे - तक्रार क्र. ३१४/२०२४: जलवाहिनी जोडणी नुकसानभरपाई दावा',
    description:
      'Consumer complaint regarding municipal water connection pressure in Khandala sector. Commission examined municipal engineer technical submissions.',
    marathiDescription:
      'खंडाळा भागातील पाणीपुरवठा दाबाबाबत दाखल तक्रारीत नगरपरिषदेच्या पाणीपुरवठा विभागाकडून सविस्तर तांत्रिक वस्तुस्थिती स्पष्ट करण्यात आली.',
    date: '12 July 2026',
    minutes:
      'Commission noted booster pump installation completion by LMC and recorded complainant satisfaction. Matter disposed with no adverse order against Council.',
    marathiMinutes:
      'नवीन बुस्टर पंप बसविल्याने पाणीपुरवठा सुरळीत झाल्याचे नोंदवून आयोगाने तक्रारदाराच्या संमतीने दावा निकाली काढला.',
    pdfUrl: '/downloads/consumer-forum-order-cc-314-2024.pdf',
    fileSize: '780 KB',
    benchOfficers: 'Hon. President & Members, District Consumer Commission Pune',
    venue: 'Consumer Court Complex, Pushpa Heights, Pune',
    status: 'Order Passed',
    sortOrder: 6,
    active: true,
  },
];

export async function seedCourtProceedings(dataSource: DataSource): Promise<void> {
  const proceedingRepo = dataSource.getRepository(CourtProceedingEntity);
  const count = await proceedingRepo.count();

  if (count === 0) {
    const entities = proceedingRepo.create(DEFAULT_COURT_PROCEEDINGS_DATA);
    await proceedingRepo.save(entities);
    console.log(`✅ Seeded ${entities.length} Court Proceedings into database`);
  } else {
    console.log(`ℹ️ Court Proceedings already exist (${count} found), skipping seed`);
  }
}
