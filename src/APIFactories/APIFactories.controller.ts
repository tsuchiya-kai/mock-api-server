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

@Controller('api-factory')
export class APIFactoriesController {
  @Get('/')
  getSample(): Record<string, unknown> {
    return {
      message: 'Hello, this is a mock API!',
    };
  }

  @Post('/')
  postSample(@Req() req: Request, @Body() data: any) {
    console.log({ data });
    if (data.try === 1 || data.try === 0)
      throw new HttpException(
        { message: 'token切れ' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const { url, method, originalUrl, params, query, body } = req;
    return {
      status: 200,
      request: {
        url,
        method,
        originalUrl,
        params,
        query,
        body,
      },
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
      message: 'このendpointはPUTです',
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
      message: 'このendpointはDELETEです',
      request,
    };
  }
}
