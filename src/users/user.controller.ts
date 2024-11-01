import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, UserDto } from './user.dto';
import { Response } from 'express';

@Controller('members')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('login')
  // async getLogin(@Res() res: Response, @Body() loginReqData: LoginDto) {
  //   try {
  //     const token = this.userService.getLogin(loginReqData);

  //     if (token) {
  //       console.log('!!!!');
  //       return res.status(200).json({ status: 'loginsuccess', token });
  //     } else {
  //       return res
  //         .status(401)
  //         .json({ status: 'login failed', message: 'Invalid credentials' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  @Post('signup')
  async getSignUp(@Res() res: Response, @Body() userReq: UserDto) {
    try {
      const newUser = await this.userService.getSignUp(userReq);

      if (newUser) {
        return res
          .status(201)
          .json({ status: 'signup success', data: newUser });
      }
    } catch (error) {
      res.status(400).json({ status: 'fail', message: error.message });
    }
  }

  @Get()
  async getAllUser(@Res() res: Response) {
    try {
      const users = await this.userService.getAllUser();
      if (users) {
        return res.status(201).json({ status: 'getlist success', data: users });
      }
    } catch (error) {
      res.status(400).json({ status: 'fail', message: error.message });
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.userService.deleteUser(id);

      res.status(200).json({ status: 'success', message: 'deleted' });
    } catch (err) {
      res.status(404).json({ status: 'fail', error: err });
    }
  }
}
