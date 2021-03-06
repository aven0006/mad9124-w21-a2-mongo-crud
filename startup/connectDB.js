import mongoose from 'mongoose';
import createDebug from 'debug';

const debug = createDebug('a2:db');

export default function () {
  mongoose
    .connect('mongodb://localhost:27017/cListR', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => debug('Successfully connected to MongoDB...'))
    .catch(error => {
      debug('Error connecting to MongoDB ...', error.message);
      process.exit(1);
    });
};
