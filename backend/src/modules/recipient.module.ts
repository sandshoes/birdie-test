import { Module } from '@nestjs/common';
import { RecipientController } from 'src/controllers/recipients.controller';
import { RecipientService } from 'src/services/recipient.service';

@Module({
  imports: [],
  controllers: [RecipientController],
  providers: [RecipientService],
})
export class RecipientModule {}
