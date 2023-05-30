import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SampleModule } from './addMethods/addMethods.module';
import * as cors from 'cors';

@Module({
  imports: [SampleModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
