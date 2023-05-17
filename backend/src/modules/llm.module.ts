import { Module } from '@nestjs/common';
import { LLMController } from 'src/controllers/llm.controller';
import { LLMService } from 'src/services/llm.service';

@Module({
  imports: [],
  controllers: [LLMController],
  providers: [LLMService],
})
export class LLMModule {}
