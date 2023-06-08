import {
  Controller,
  Req,
  Res,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('retry')
export class RetryController {
  private cookieName = 'isRetry';

  @Get('/')
  getSample(@Req() req: Request, @Res() res: Response) {
    const isRetry = req.cookies[this.cookieName] as 'true' | 'false';

    console.log({ isRetry });
    if (isRetry === 'true') {
      const {
        method,
        query,
        headers: { 'content-type': contentType },
      } = req;

      const request = { method, query, contentType };

      res.clearCookie(this.cookieName);
      res.status(200).json({
        status: 200,
        request,
      });

      return;
    }

    // gateway error
    res.cookie(this.cookieName, 'true', {
      maxAge: 900000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.status(HttpStatus.BAD_REQUEST).json({
      error: { type: 'invalid_session', message: '無効なセッションです' },
    });
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
