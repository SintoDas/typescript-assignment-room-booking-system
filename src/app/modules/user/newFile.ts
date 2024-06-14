import config from '../../config';
import bcrypt from 'bcrypt';
import { userSchema } from './user.model';

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_round),
    );
  }
  next();
});
