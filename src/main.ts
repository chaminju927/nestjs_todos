import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); //cors 활성화
  app.use(loggerMiddleware);
  // app.useGlobalPipes(new ValidationPipe());
  //  await app.listen(process.env.PORT ?? 3000);
  await app.listen(3000);
}
bootstrap();
