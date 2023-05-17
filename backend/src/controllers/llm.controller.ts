import { Body, Controller, Post } from '@nestjs/common';
import { LLMService } from 'src/services/llm.service';

@Controller('llm')
export class LLMController {
  constructor(private readonly llmService: LLMService) {}

  @Post('/ask-doc')
  async getLLMQuery(@Body() body: any) {
    const query: string = body.body?.query || body.query;
    return this.llmService.getLLMQuery(
      'Regarding care_recipient_id df50cac5-293c-490d-a06c-ee26796f850d,' +
        query,
    );
  }
}
