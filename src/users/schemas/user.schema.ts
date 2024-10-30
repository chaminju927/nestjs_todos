import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;
}
// object 가 json 으로 바뀔때 호출할수 있는 함수 toJSON
// 응답데이터 보낼때 항상 호출됨
// UserSchema.methods.toJSON = function () {
//   const obj = this._doc;
//   delete obj.password;
//   return obj;
// };

// User.methods.generateToken = function () {
//   const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
//     expiresIn: '1d',
//   });
//   return token;
// };

export const UserSchema = SchemaFactory.createForClass(User);
