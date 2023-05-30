import { Controller, Req, Get, Query } from '@nestjs/common';
import { Request } from 'express';

@Controller('retry')
export class RetryController {
  @Get('/')
  getSample(
    @Req() req: Request,
    @Query() {}: { command: string },
  ): Record<string, unknown> {
    const {
      method,
      query,
      headers: { 'content-type': contentType },
    } = req;
    const request = { method, query, contentType };
    return {
      status: 200,
      request,
    };
  }
}
