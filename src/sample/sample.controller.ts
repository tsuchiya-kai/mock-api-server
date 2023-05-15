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
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api-sample')
export class SampleController {
  commandMessage(command) {
    return command ? `なお指定された command は [${command}] です。` : '';
  }

  @Get('/')
  getSample(
    @Query() { command }: { command: string },
  ): Record<string, unknown> {
    return {
      message: `この endpoint は GET です。 ${this.commandMessage(command)}`,
    };
  }

  @Post('/')
  postSample(
    @Req() req: Request,
    @Query() { command }: { command: string },
    @Body() data: any,
  ) {
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
      message: `この endpoint は POST です。 ${this.commandMessage(command)}`,
      request,
    };
  }

  @UseInterceptors(FileFieldsInterceptor([]))
  @Put('/')
  putSample(
    @Req() req: Request,
    @Query() { command }: { command: string },
    @Body() data: any,
  ) {
    console.log({ data });
    const { url, method, originalUrl, params, query, body } = req;
    const request = { url, method, originalUrl, params, query, body };
    return {
      status: 200,
      message: `この endpoint は PUT です。 ${this.commandMessage(command)}`,
      request,
    };
  }

  @Delete('/')
  deleteSample(
    @Req() req: Request,
    @Query() { command }: { command: string },
    @Body() data: any,
  ) {
    console.log('delete', { data });

    const { url, method, originalUrl, params, query, body } = req;
    const request = { url, method, originalUrl, params, query, body };
    return {
      status: 200,
      message: `この endpoint は DELETE です。 ${this.commandMessage(command)}`,
      request,
    };
  }
}
