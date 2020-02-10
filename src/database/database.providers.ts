
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://root:845599319@119.29.113.152:27017/JeNetdisk?authSource=admin', { keepAlive: 120, useNewUrlParser: true, useUnifiedTopology: true }),
  },
];