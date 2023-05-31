import {
  Controller,
  Req,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('retry')
export class RetryController {
  @Get('/')
  getSample(
    @Req() req: Request,
    @Query() { isRetry }: { isRetry: boolean },
  ): Record<string, unknown> | HttpException {
    if (isRetry) {
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

    // gateway error
    throw new HttpException(
      { error: { type: 'invalid_session', message: '無効なセッションです' } },
      HttpStatus.BAD_REQUEST,
    );
  }
}
