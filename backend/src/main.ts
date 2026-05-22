import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Ruta raiz publica - muestra estado de la API (evita el 404 al acceder desde Railway)
  const http = app.getHttpAdapter();
  http.get('/', (_req: unknown, res: { json: (d: unknown) => void }) => {
    res.json({
      status: 'running',
      message: 'Posts & Comments Manager API',
      version: '1.0.5',
      docs: '/api/v1',
      endpoints: {
        posts: '/api/v1/posts',
        comments: '/api/v1/comments',
        auth: '/api/v1/auth/login',
      },
    });
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Aplicacion ejecutandose en el puerto ${port}`);
}

bootstrap();
