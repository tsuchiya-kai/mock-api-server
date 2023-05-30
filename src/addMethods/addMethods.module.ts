import { Module } from '@nestjs/common';
import { SampleController } from './addMethods.controller';

@Module({
  imports: [],
  controllers: [SampleController],
})
export class SampleModule {}
