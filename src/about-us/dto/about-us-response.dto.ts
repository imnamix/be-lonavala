import { ApiProperty } from '@nestjs/swagger';

export class CommuniqueDto {
  @ApiProperty({ example: 'Shri. Pandit Patil (IAS/State Cadre)' })
  officerName: string;

  @ApiProperty({ example: 'Chief Officer / Commissioner (मुख्याधिकारी)' })
  designation: string;

  @ApiProperty({ example: '+91 2114 273032' })
  phone: string;

  @ApiProperty({ example: 'co@lonavalamc.gov.in' })
  email: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  })
  mediaUrl: string;

  @ApiProperty({ example: "Chief Officer's Communiqué" })
  title: string;

  @ApiProperty({
    example: 'A Personal Message from the Administrative Desk',
  })
  subtitle: string;

  @ApiProperty({
    example:
      'Lonavala has evolved from a serene Sahyadri hill retreat to one of Maharashtra’s most visited destinations. Our objective is to modernise civic infrastructure, digitise property and water billing, and safeguard ecological balance.',
  })
  messageBody: string;

  @ApiProperty({
    example: 'Lonavala Municipal Council — Committed to Public Good',
  })
  signOff: string;
}

export class AboutUsContentDto {
  @ApiProperty({ example: 'Lonavala Municipal Council' })
  title: string;

  @ApiProperty({ example: '1877' })
  establishedYear: string;

  @ApiProperty({ example: '147+ Years' })
  yearsOfService: string;

  @ApiProperty({ example: '622 m (2,041 ft)' })
  elevation: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
  })
  mediaUrl: string;

  @ApiProperty({
    example:
      'Lonavala Municipal Council (लोणावळा नगर परिषद) is the urban local self-government responsible for the civic administration, infrastructure development, environmental conservation, and public amenities.',
  })
  description: string;

  @ApiProperty({
    example:
      'To build a smart, sustainable, environmentally resilient hill-station town offering world-class civic infrastructure, transparent e-governance, and eco-sensitive tourism development.',
  })
  vision: string;

  @ApiProperty({
    type: [String],
    example: [
      'Ensure 100% door-to-door solid waste segregation and zero open dumping',
      'Deliver round-the-clock treated potable drinking water supply across all wards',
      'Digitise all citizen touchpoints with single-day service resolution SLAs',
    ],
  })
  mission: string[];

  @ApiProperty({ type: CommuniqueDto })
  communique: CommuniqueDto;
}

export class AboutUsResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: AboutUsContentDto })
  data: {
    aboutUs: AboutUsContentDto;
  };
}
