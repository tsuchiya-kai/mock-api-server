import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class SampleController {
  @Get('sample')
  getSample(): Record<string, unknown> {
    return {
      message: 'Hello, this is a mock API!',
    };
  }
}
