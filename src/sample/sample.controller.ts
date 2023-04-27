import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('api')
export class SampleController {
  private isObject(value: any): boolean {
    return value !== null && typeof value === 'object';
  }

  @Get('sample')
  getSample(): Record<string, unknown> {
    return {
      message: 'Hello, this is a mock API!',
    };
  }

  // post用
  @Post('sample')
  postSample(@Body() data: any) {
    console.log({ data });
    return {
      status: 200,
      data,
    };
  }
}
