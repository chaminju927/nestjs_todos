import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(id: string, pass: string) {
    try {
      const user = await this.userService.findUserById(id);
      console.log('user:', user);
      const isMatch = bcrypt.compareSync(pass, user.password);

      if (!isMatch) {
        throw new UnauthorizedException();
      } else {
        const payload = { sub: user.id, username: user.name };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
