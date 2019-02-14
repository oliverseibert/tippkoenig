import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TeamSchema = new Schema({
  _id: String,
  name: String,
  logo: String
});
