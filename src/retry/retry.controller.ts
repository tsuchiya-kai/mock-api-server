import {
  Controller,
  Req,
  Get,
  Query,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('retry')
export class RetryController {
  @Get('/')
  getSample(
    @Req() req: Request,
    @Query() { isRetry }: { isRetry: 'true' | 'false' },
  ): Record<string, unknown> | HttpException {
    console.log({ isRetry });
    if (isRetry === 'true') {
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

  @Get('/apis/init')
  init(@Body() { isSuccess = 'true' }: { isSuccess: 'true' | 'false' }) {
    // success
    if (isSuccess === 'true') return {};

    //error
    throw new HttpException(
      {
        error: { type: 'already_initialized', message: '無効なセッションです' },
      },
      // { error: { type: 'no_session_id', message: '無効なセッションです' } },
      HttpStatus.BAD_REQUEST,
    );
  }
}
