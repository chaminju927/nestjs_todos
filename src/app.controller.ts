import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('login')
export class LoginController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
