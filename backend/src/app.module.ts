import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EventModule } from './modules/event.module';
import { LLMModule } from './modules/llm.module';
import { RecipientModule } from './modules/recipient.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [EventModule, LLMModule, RecipientModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
