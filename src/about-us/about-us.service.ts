import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutUs } from './entities/about-us.entity';
import { AboutUsContentDto, CommuniqueDto } from './dto/about-us-response.dto';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectRepository(AboutUs)
    private readonly aboutUsRepo: Repository<AboutUs>,
  ) {}

  async getAboutUs(): Promise<{ aboutUs: AboutUsContentDto }> {
    const record = await this.aboutUsRepo.findOne({
      where: {},
      order: { id: 'DESC' },
      relations: ['missionItems', 'communique'],
    });

    if (!record) {
      return {
        aboutUs: {
          title: 'Lonavala Municipal Council',
          establishedYear: '1877',
          yearsOfService: '147+ Years',
          elevation: '622 m (2,041 ft)',
          mediaUrl: '',
          description: '',
          vision: '',
          mission: [],
          communique: {
            officerName: '',
            designation: '',
            phone: '',
            email: '',
            mediaUrl: '',
            title: '',
            subtitle: '',
            messageBody: '',
            signOff: '',
          },
        },
      };
    }

    const sortedMission = (record.missionItems || [])
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => item.itemText);

    const communiqueDto: CommuniqueDto = {
      officerName: record.communique?.officerName ?? '',
      designation: record.communique?.designation ?? '',
      phone: record.communique?.phone ?? '',
      email: record.communique?.email ?? '',
      mediaUrl: record.communique?.mediaUrl ?? '',
      title: record.communique?.title ?? '',
      subtitle: record.communique?.subtitle ?? '',
      messageBody: record.communique?.messageBody ?? '',
      signOff: record.communique?.signOff ?? '',
    };

    return {
      aboutUs: {
        title: record.title,
        establishedYear: record.establishedYear,
        yearsOfService: record.yearsOfService,
        elevation: record.elevation,
        mediaUrl: record.mediaUrl,
        description: record.description,
        vision: record.vision,
        mission: sortedMission,
        communique: communiqueDto,
      },
    };
  }
}
