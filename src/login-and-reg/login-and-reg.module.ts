import { Module } from '@nestjs/common';
import { LoginAndRegController } from './login-and-reg.controller';
import {UsersModule} from '../users/users.module'
import {AuthModule} from '../auth/auth.module'
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[UsersModule,AuthModule,PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [LoginAndRegController]
})
export class LoginAndRegModule {}
