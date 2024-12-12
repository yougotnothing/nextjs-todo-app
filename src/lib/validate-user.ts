import { NextResponse } from 'next/server';
import { Buffer } from 'buffer';

import db from '@/app/lib/db';

export default async function validateUser(
  token: string,
): Promise<{ name: string; id: string }> {
  const id = Buffer.from(token, 'base64').toString('utf8').split(':')[0];

  if (!id) throw NextResponse.json({ status: '401', message: 'unauthorized' });
  console.log('user id:', id);

  const user = await db.user.findFirst({ where: { id } });
  console.log('user: ', user);

  if (!user)
    throw NextResponse.json({ status: '401', message: 'unauthorized' });

  return { id: user.id, name: user.name };
}
