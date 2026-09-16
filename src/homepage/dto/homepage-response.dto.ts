import { ApiProperty } from '@nestjs/swagger';

export class SlideButtonDto {
  @ApiProperty({ example: 'Pay Property Tax' })
  name: string;

  @ApiProperty({ example: '/services#property-tax' })
  url: string;

  @ApiProperty({ example: 'Building2' })
  icon: string;

  @ApiProperty({ example: 'primary' })
  color: string;

  @ApiProperty({ example: true })
  active: boolean;
}

export class SlideTagDto {
  @ApiProperty({ example: 'Property Tax' })
  name: string;

  @ApiProperty({ example: 'Building2' })
  icon: string;

  @ApiProperty({ example: true })
  active: boolean;
}

export class HomepageSlideDto {
  @ApiProperty({ example: 'Gateway to Hill Station Governance' })
  slideTitle: string;

  @ApiProperty({ example: 'left' })
  alignment: string;

  @ApiProperty({ example: 'Official Citizen & Tourism Portal' })
  badgeEn: string;

  @ApiProperty({ example: 'अधिकृत नागरिक व पर्यटन पोर्टल' })
  badgeMr: string;

  @ApiProperty({
    example: 'Empowering Lonavala with Digital Governance & Tourism Excellence',
  })
  headlineEn: string;

  @ApiProperty({
    example: 'डिजिटल सुशासन आणि पर्यटन विकासातून समृद्ध लोणावळा',
  })
  headlineMr: string;

  @ApiProperty({
    example:
      'Doorstep civic delivery, instant online grievance redressal, property & water tax payments, and comprehensive tourism guides.',
  })
  taglineEn: string;

  @ApiProperty({
    example:
      'नागरिकांसाठी तत्पर ऑनलाईन सेवा, तक्रार निवारण, मालमत्ता व पाणी कर भरणा आणि पर्यटकांना सुलभ माहिती.',
  })
  taglineMr: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
  })
  mediaUrl: string;

  @ApiProperty({ example: true })
  showButtons: boolean;

  @ApiProperty({ type: [SlideButtonDto] })
  buttons: SlideButtonDto[];

  @ApiProperty({ example: true })
  showTags: boolean;

  @ApiProperty({ type: [SlideTagDto] })
  tags: SlideTagDto[];

  @ApiProperty({ example: true })
  active: boolean;
}

export class HomepageContentDto {
  @ApiProperty({
    example:
      'Property Tax Assessment 2024-25 discount period extended to 31st Oct.',
  })
  announcement: string;

  @ApiProperty({ example: true })
  announcementActive: boolean;

  @ApiProperty({ type: [HomepageSlideDto] })
  slides: HomepageSlideDto[];
}

export class HomepageResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: HomepageContentDto })
  data: {
    homepage: HomepageContentDto;
  };
}
