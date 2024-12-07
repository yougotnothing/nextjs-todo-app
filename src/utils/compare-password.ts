import { Buffer } from 'buffer';

const comparePassword = (password: string, hashed: string): boolean =>
  password === Buffer.from(hashed, 'base64').toString('utf-8');

export default comparePassword;
