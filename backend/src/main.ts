import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors();

   app.enableCors({
     origin: 'http://localhost:5173',
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
     allowedHeaders: 'Content-Type, Accept, Authorization',
   });
  await app.listen(3000);
}
bootstrap();
