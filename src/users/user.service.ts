import { Injectable } from '@nestjs/common';
import { LoginDto, SignUpDto } from './user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  isExist(id) {
    this.userModel.findOne({ id });
  }

  getLogin(LoginData: LoginDto) {
    return LoginData;
  }
  findOne(username: string) {
    return;
  }

  async getSignUp(SignUpDto: SignUpDto): Promise<User> {
    const signupMember = new this.userModel(SignUpDto);
    return signupMember.save();
  }
}
