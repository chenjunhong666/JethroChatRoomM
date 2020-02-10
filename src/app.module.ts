import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoginAndRegModule } from './login-and-reg/login-and-reg.module';
@Module({
  imports: [UsersModule, LoginAndRegModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
