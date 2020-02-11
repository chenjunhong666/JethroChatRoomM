import { Module } from '@nestjs/common';
import { LoginAndRegController } from './login-and-reg.controller';
import { UsersModule } from '../users/users.module'
import { AuthModule } from '../auth/auth.module'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
@Module({
  imports: [UsersModule, AuthModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn },
  }), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [LoginAndRegController]
})
export class LoginAndRegModule { }
