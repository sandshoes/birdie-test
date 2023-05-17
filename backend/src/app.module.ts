import { Module } from '@nestjs/common';
import { EventModule } from './modules/event.module';
import { LLMModule } from './modules/llm.module';

@Module({
  imports: [EventModule, LLMModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
