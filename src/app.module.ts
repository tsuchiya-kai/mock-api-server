import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { addMethodsModule } from './addMethods/addMethods.module';
import { RetryModule } from './retry/retry.module';
import * as cors from 'cors';

@Module({
  imports: [addMethodsModule, RetryModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('http://127.0.0.1:8081'); // * にするとcorsを全て無効化する
  }
}
