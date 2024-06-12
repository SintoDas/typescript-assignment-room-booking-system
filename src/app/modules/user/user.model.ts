import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';

const UserSchema = new Schema<TUser, UserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], required: true },
});

export const User = model<TUser, UserModel>('user', UserSchema);
