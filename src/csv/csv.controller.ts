import { Controller, Get } from '@nestjs/common';
import { CsvService } from './csv.service';

@Controller()
export class CsvController {
  constructor(private readonly appService: CsvService) { }

  @Get()
  async startPoint(): Promise<string> {
    return await this.appService.startPoint();
  }
}
