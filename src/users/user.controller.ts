import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, SignUpDto } from './user.dto';

@Controller('members')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  getLogin(@Body() LoginDto: LoginDto) {
    const id = LoginDto.id;
    return this.userService.getLogin(LoginDto);
  }

  @Post()
  async getSignUp(@Body() SignUpDto: SignUpDto) {
    return this.userService.getSignUp(SignUpDto);
  }

  // @Get()
  // test(@Res() res: Response) {
  //   // res.status(HttpStatus.CREATED).send();
  //   console.log('success');
  //   //  res.status(HttpStatus.OK).json([]);
  // }
}
