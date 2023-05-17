import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RecipientService {
  private readonly prisma = new PrismaClient();

  async getCareRecipientById(careRecipientId: string): Promise<any> {
    const recipientById = await this.prisma.recipients.findFirst({
      where: {
        recipient_id: careRecipientId,
      },
    });
    return recipientById;
  }
}
