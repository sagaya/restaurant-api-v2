import mongoose from 'mongoose';
import config from './config'

export default callback => {
  let db = mongoose.connect(config.mongoUrl);
  //this will pass back the db
  callback(db);
}
