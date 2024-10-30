import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, SignUpDto } from './user.dto';
import { Response } from 'express';

@Controller('members')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  getLogin(@Res() res: Response, @Body() LoginDto: LoginDto) {
    try {
      const { id, password } = LoginDto;
      this.userService.getLogin(LoginDto);
      res.status(200).json({ status: 'success' });
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  async getSignUp(@Res() res: Response, @Body() SignUpDto: SignUpDto) {
    try {
      const test = await this.userService.getSignUp(SignUpDto);

      if (test) {
        res.status(200).json({ status: 'success', data: test });
      }
    } catch (error) {
      res.status(400).json({ status: 'fail' });
    }
  }

  @Get()
  async test(@Res() res: Response) {
    try {
      const test = await this.userService.getAllUser();
      if (test) {
        return res.status(200).json({ status: 'success', data: test });
      }
    } catch (error) {
      res.status(400).json({ status: 'fail', message: error.message });
    }
  }

  // userController.loginWithEmail = async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
  //     if (user) {
  //       const isMatch = bcrypt.compareSync(password, user.password);
  //       if (isMatch) {
  //         const token = user.generateToken();
  //         return res.status(200).json({ status: "success", user, token });
  //       }
  //     }
  //     throw new Error("아이디나 비밀번호를 확인해주세요.");
  //   } catch (error) {
  //     res.status(400).json({ status: "fail", message: error.message });
  //   }
  // };
}
