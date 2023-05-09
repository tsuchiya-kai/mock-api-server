import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APIFactoriesModule } from './APIFactories/APIFactories.module';
import * as cors from 'cors';

@Module({
  imports: [APIFactoriesModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
