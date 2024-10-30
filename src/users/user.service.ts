import { Inject, Injectable } from '@nestjs/common';
import { LoginDto, SignUpDto } from './user.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getLogin(LoginData: LoginDto) {
    try {
      const { id, password } = LoginData;
      const user = await this.userModel.findOne({ id });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          //const token = user.generateToken();
        }
      }
    } catch (error) {
      console.log('error', error);
    }

    // return LoginData;
  }

  async getSignUp(SignUpData: SignUpDto): Promise<User> {
    try {
      const { id, password, name, email } = SignUpData;
      const test = await this.userModel.findOne({ id });
      if (test) {
        throw new Error('이미 가입됨');
      } else {
        const salt = bcrypt.genSalt(saltRounds);
        const hash = bcrypt.hashSync(password, salt); //암호화된 값
        const newUser = new this.userModel({ name, email, id, password: hash });
        return await newUser.save();
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async getAllUser(): Promise<User[]> {
    try {
      const test = await this.userModel.find({});
      //console.log('result', test);
      return test;
    } catch (error) {
      console.log(error);
    }
  }
}
