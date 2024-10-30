import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './logger.middleware';
import { HttpExceptionFilter } from './common/exception/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); //cors 활성화
  app.use(loggerMiddleware);
  app.useGlobalFilters(new HttpExceptionFilter());
  //const PORT = process.env.PORT; // .env에 저장된 포트 넘버

  await app.listen(process.env.PORT || 3000, () => {
    console.log('server on 3000');
  });
}
bootstrap();
