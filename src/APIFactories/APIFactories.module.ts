import { Module } from '@nestjs/common';
import { APIFactoriesController } from './APIFactories.controller';

@Module({
  imports: [],
  controllers: [APIFactoriesController],
})
export class APIFactoriesModule {}
