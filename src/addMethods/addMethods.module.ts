import { Module } from '@nestjs/common';
import { addMethodsController } from './addMethods.controller';

@Module({
  imports: [],
  controllers: [addMethodsController],
})
export class addMethodsModule {}
