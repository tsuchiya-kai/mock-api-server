import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller';

@Module({
  imports: [],
  controllers: [SampleController],
})
export class SampleModule {}
