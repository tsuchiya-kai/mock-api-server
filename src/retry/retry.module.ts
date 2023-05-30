import { Module } from '@nestjs/common';
import { RetryController } from './retry.controller';

@Module({
  imports: [],
  controllers: [RetryController],
})
export class RetryModule {}
