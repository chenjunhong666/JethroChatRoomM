import { Connection } from 'mongoose';
import { UserSchema } from '../common/schema/user.schema';

export const catsProviders = [
  {
    provide: 'CAT_MODEL',
    useFactory: (connection: Connection) => connection.model('user', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];