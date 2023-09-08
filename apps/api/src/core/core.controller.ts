import { Controller, Get } from '@nestjs/common';

import { CoreService } from './core.service';

@Controller()
export class CoreController {
  constructor(private readonly service: CoreService) {}

  @Get()
  getData() {
    return this.service.getData();
  }
}
