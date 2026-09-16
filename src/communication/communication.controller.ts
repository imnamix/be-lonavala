import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommunicationService } from './communication.service';

export class tempDTO {
    id?: string;
    data?: string;
  }

@Controller('communication')
export class CommunicationController {
    constructor(public service: CommunicationService) { }

    @Post('send')
    @UsePipes(new ValidationPipe())
    send(@Body() data: tempDTO) {
        console.log('controlller',data)
      return this.service.send(data);
    }    
}
