import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LoginDto, UserDto } from './user.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // async getLogin(LoginData: LoginDto) {
  //   try {
  //     const { id, password } = LoginData;
  //     const user = await this.userModel.findOne({ id: id });

  //     if (!user) {
  //       return null; // 유저가 존재하지 않음
  //     }

  //     const isMatch = await bcrypt.compare(password, user.password);

  //     console.log(isMatch);
  //     if (!isMatch) {
  //       // return;
  //       throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
  //     } else {
  //       // 비밀번호가 일치하는 경우 토큰 생성
  //       const token = jwt.sign(
  //         { id: user.id, name: user.name },
  //         `TOKENsdgsdgfsdfg`,
  //         // process.env.JWT_SECRET_KEY, // 환경 변수로 JWT_SECRET_KEY 설정
  //         //{ expiresIn: '1d' },
  //       );

  //       return token;
  //     }
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // }

  async getSignUp(SignUpData: UserDto): Promise<User> {
    try {
      const { id, password, name, email, phone } = SignUpData;
      const existingUser = await this.userModel.findOne(
        { id },
        '-password -_id -__v',
      );
      if (existingUser) {
        throw new ConflictException('이미 등록된 이메일입니다.');
      } else {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new this.userModel({
          name,
          email,
          id,
          phone,
          password: hash,
        });
        return await newUser.save();
      }
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  }

  async getAllUser(): Promise<User[]> {
    try {
      return await this.userModel.find({}, '-password -_id -__v');
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      await this.userModel.deleteOne({ id: id });
    } catch (error) {
      console.error('error', error);
    }
  }

  async findUserById(id: string) {
    console.log('here');

    return await this.userModel.findOne({ id });
  }
}
