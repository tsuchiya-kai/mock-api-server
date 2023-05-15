import {
  Controller,
  Req,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api-sample')
export class SampleController {
  @Get('/')
  getSample(): Record<string, unknown> {
    return {
      message: 'この endpoint は GET です',
    };
  }

  @Post('/')
  postSample(@Req() req: Request, @Body() data: any) {
    // リトライの挙動を確認するための記述
    if (data.try === 1 || data.try === 0)
      throw new HttpException(
        { message: 'token切れ' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const { url, method, originalUrl, params, query, body } = req;
    const request = { url, method, originalUrl, params, query, body };

    return {
      status: 200,
      message: 'この endpoint は POST です',
      request,
    };
  }

  @UseInterceptors(FileFieldsInterceptor([]))
  @Put('/')
  putSample(@Req() req: Request, @Body() data: any) {
    console.log({ data });
    const { url, method, originalUrl, params, query, body } = req;
    const request = { url, method, originalUrl, params, query, body };
    return {
      status: 200,
      message: 'この endpoint は PUT です',
      request,
    };
  }

  @Delete('/')
  deleteSample(@Req() req: Request, @Body() data: any) {
    console.log('delete', { data });

    const { url, method, originalUrl, params, query, body } = req;
    const request = { url, method, originalUrl, params, query, body };
    return {
      status: 200,
      message: 'この endpoint は DELETE です',
      request,
    };
  }
}
