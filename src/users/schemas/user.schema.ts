import * as mongoose from 'mongoose';

const usernameRegExp = new RegExp(/^[a-zA-Z0-9_-]*$/);
const emailRegExp = new RegExp(
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
);

export const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    trim: true,
    unique: true,
    validate: usernameRegExp,
    minlength: 8,
    maxlength: 20
  },
  email: {
    type: String,
    unique: true,
    validate: emailRegExp,
    required: true
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});
