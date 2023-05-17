import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import supabase from 'src/clients/supabaseClient';
import { AuthRequest } from 'src/types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }
    const userData = await supabase.auth.getUser(accessToken.split(' ')[1]);
    if (!userData) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }
    req.userId = userData.data.user.id;

    const { data } = await supabase
      .from('profiles')
      .select('care_recipient_id')
      .eq('user_id', req.userId)
      .single();

    req.careRecipientId = data.care_recipient_id;

    next();
  }
}
