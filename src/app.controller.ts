import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//TODO http:localhost:300
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


}
