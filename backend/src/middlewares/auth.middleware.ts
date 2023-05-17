import { config } from 'dotenv';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { Response, NextFunction } from 'express';
import { AuthRequest } from 'src/types';
config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
  );

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }
    const userData = await this.supabase.auth.getUser(
      accessToken.split(' ')[1],
    );
    if (!userData) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }
    req.userId = userData.data.user.id;

    const { data } = await this.supabase
      .from('profiles')
      .select('care_recipient_id')
      .eq('user_id', req.userId)
      .single();

    req.careRecipientId = data.care_recipient_id;

    next();
  }
}
