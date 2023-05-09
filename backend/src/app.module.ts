import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { EventModule } from './modules/event.module';

@Module({
  imports: [EventModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
