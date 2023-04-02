import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  const saltOrRounds = 10;
  return bcrypt.hashSync(password, saltOrRounds);
}

export function comparePasswords(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
