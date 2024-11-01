import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: LoginDto, @Res() res: Response) {
    try {
      return await this.authService.signIn(signInDto.id, signInDto.password);
      // return res.status(401).json({ message: '로그인 실패' });
    } catch (error) {
      return null;
    }
  }
}
