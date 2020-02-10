
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { catsProviders } from './users.providers';
@Module({
  imports: [DatabaseModule],
  providers: [UsersService,...catsProviders],
  exports: [UsersService]
})
export class UsersModule {}