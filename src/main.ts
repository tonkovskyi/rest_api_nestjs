import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootsrap');
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => logger.log(`Server started on port ${PORT}`));
}
bootstrap();
