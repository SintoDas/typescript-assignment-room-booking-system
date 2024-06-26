import bcrypt from 'bcrypt';
export const isPasswordMatched = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return passwordMatch;
};
