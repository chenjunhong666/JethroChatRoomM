import { Injectable, Inject } from '@nestjs/common';
import {User} from '../common/schema/user.schema'
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(@Inject('CAT_MODEL') private readonly userModel: Model<User>) {}

  async findOne({username}): Promise<User | undefined> {
    return await this.userModel.findOne({username:username}).exec();
  }

  async findOneByID({userID}): Promise<User | undefined> {
    return await this.userModel.findOne({_id:userID}).exec();
  }
}
