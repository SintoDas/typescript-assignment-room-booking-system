import { Schema, model, HydratedDocument } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import { USER_Role } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: 0, // Set select to false
  },
  phone: { type: String, required: [true, 'Phone is required'] },
  address: { type: String, required: [true, 'Address is required'] },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: Object.keys(USER_Role),
  },
});

userSchema.pre('save', async function (next) {
  const user = this as HydratedDocument<TUser>;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round),
    );
  }
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser, UserModel>('user', userSchema);
export { userSchema };
