import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  const saltOrRounds = 10;
  return bcrypt.hashSync(password, saltOrRounds);
}
