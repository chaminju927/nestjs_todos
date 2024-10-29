import { IsString } from 'class-validator';

export class LoginDto {
  id: string;
  password: string;
}
export class SignUpDto {
  @IsString()
  name: string;

  @IsString()
  id: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;
}
