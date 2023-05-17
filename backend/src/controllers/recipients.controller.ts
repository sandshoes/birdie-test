import { Controller, Get, Param } from '@nestjs/common';
import { RecipientService } from 'src/services/recipient.service';

@Controller('recipient')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Get('/:care_recipient_id')
  async getEvents(@Param('care_recipient_id') careRecipientId) {
    console.log('careRecipientId: ', careRecipientId);
    return this.recipientService.getCareRecipientById(careRecipientId);
  }
}
