
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {User} from '../common/schema/user.schema'
import {TokenPayload} from '../common/class/tokenPayload'
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne({username});
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload : TokenPayload = { userID: user._id,userName : user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}