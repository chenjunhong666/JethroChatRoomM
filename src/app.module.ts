import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoginAndRegModule } from './login-and-reg/login-and-reg.module';
import { InfoGateway } from './info/info.gateway';
@Module({
  imports: [UsersModule, LoginAndRegModule],
  controllers: [],
  providers: [InfoGateway],
})
export class AppModule { }
