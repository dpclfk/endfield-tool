import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './filter/http-exception/http-exception.filter';
import { MysqlErrFilter } from './filter/mysql-err/mysql-err.filter';
import { TypeErrFilter } from './filter/type-err/type-err.filter';
import { ValidationPipe } from '@nestjs/common';
import { JwtErrFilter } from './filter/jwt-err/jwt-err.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = parseInt(configService.get<string>('PORT') || '3000');

  // dto에서 타입이 잘못되면 안되게 막음
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // 리프레시토큰을 쿠키에 저장하기위해 사용
  app.use(cookieParser(process.env.COOKIE_SECRET));

  app.setGlobalPrefix('api');

  // 에러 필터 관련
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new MysqlErrFilter(),
    new JwtErrFilter(),
    new TypeErrFilter(),
  );

  // swagger 관련
  const options = new DocumentBuilder()
    .setTitle('endfield tool api')
    .setDescription('엔드필드 툴 상세 api 입니다.')
    .setVersion('1.0')
    .addCookieAuth('refresh_token')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors({
    origin: 'http://localhost:3807',
    credentials: true,
  });

  await app.listen(port);
}

bootstrap();
