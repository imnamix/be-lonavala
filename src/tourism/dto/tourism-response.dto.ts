import { ApiProperty } from '@nestjs/swagger';

export class ImportantPointDto {
  @ApiProperty({ example: 'Clock' })
  icon: string;

  @ApiProperty({
    example: 'Best time to visit: 5:30 AM – 7:00 PM during Monsoons',
  })
  text: string;
}

export class HighlightDto {
  @ApiProperty({ example: 'Timing' })
  key: string;

  @ApiProperty({ example: '6:00 AM – 6:30 PM' })
  value: string;
}

export class GalleryMediaDto {
  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  })
  mediaUrl: string;

  @ApiProperty({ example: 'image', enum: ['image', 'video'] })
  mediaType: string;
}

export class TourismSpotDto {
  @ApiProperty({ example: 'Tiger Point (Lions Point)' })
  name: string;

  @ApiProperty({ example: 'Scenic Viewpoint & Sunrise' })
  label: string;

  @ApiProperty({ example: '12 km from Lonavala Station' })
  distance: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  })
  mediaUrl: string;

  @ApiProperty({
    example:
      'Perched at a cliff height of over 650 meters, Tiger Point offers breathtaking panoramic views of deep valleys, cascading monsoon waterfalls, and lush misty clouds.',
  })
  description: string;

  @ApiProperty({ type: [ImportantPointDto] })
  importantPoints: ImportantPointDto[];

  @ApiProperty({ type: [HighlightDto] })
  highlights: HighlightDto[];

  @ApiProperty({ type: [GalleryMediaDto] })
  galleryMedia: GalleryMediaDto[];

  @ApiProperty({ example: true })
  active: boolean;
}

export class TourismResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({
    type: 'object',
    properties: {
      tourism: {
        type: 'array',
        items: { $ref: '#/components/schemas/TourismSpotDto' },
      },
    },
  })
  data: {
    tourism: TourismSpotDto[];
  };
}
