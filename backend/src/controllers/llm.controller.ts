import { Body, Controller, Post, Req } from '@nestjs/common';
import { LLMService } from 'src/services/llm.service';
import { AuthRequest } from 'src/types';

@Controller('llm')
export class LLMController {
  constructor(private readonly llmService: LLMService) {}

  @Post('/ask-doc')
  async getLLMQuery(@Req() req: AuthRequest, @Body() body: any) {
    const query: string = body.query;
    return this.llmService.getLLMQuery(
      `Regarding care_recipient_id ${req.careRecipientId},` + query,
    );
  }
}
