import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from './users/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), MemberModule],
})
export class AppModule {}
