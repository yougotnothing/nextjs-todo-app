import { type NextRequest } from 'next/server';

export default function verifyToken(req: NextRequest): string {
  return req.headers.get('authorization')?.split(' ')[1] ?? '';
}
