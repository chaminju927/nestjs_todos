import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: LoginController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [AppService],
    }).compile();

    appController = app.get<LoginController>(LoginController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});