import { Module } from '@nestjs/common';
import { EventModule } from './modules/event.module';
import { LLMModule } from './modules/llm.module';
import { RecipientModule } from './modules/recipient.module';

@Module({
  imports: [EventModule, LLMModule, RecipientModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
