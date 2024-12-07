import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import db from '@/app/lib/db';
import * as bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get('Content-Type') !== 'application/json')
      return new NextResponse('Invalid content type', { status: 400 });

    const { name, password } = await req.json();

    if (!name || !password)
      return new NextResponse('Invalid payload', { status: 400 });

    const user = await db.user.create({
      data: { name, password: await bcrypt.hash(password, 12) },
    });

    return NextResponse.json({
      success: true,
      message: 'User created success',
      user: {
        name: user.name,
        id: user.id,
      },
    });
  } catch {
    return NextResponse.json({
      message: 'Something went wrong',
      success: false,
    });
  }
}
