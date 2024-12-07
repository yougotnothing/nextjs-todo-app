'use server';

import { NextRequest, NextResponse } from 'next/server';

import db from '@/app/lib/db';
import * as bcrypt from 'bcrypt';

export async function POST(req: NextRequest, res: NextResponse) {
  const { name, password } = await req.json();
  const user = await db.user.findUnique({ where: { name } });

  if (!user) return new NextResponse('user not found', { status: 404 });

  if (!(await bcrypt.compare(password, user.password)))
    return NextResponse.json({
      status: 400,
      message: "passwords don't match.",
    });

  res.cookies.set(
    'token',
    `${Buffer.from(`${user.id}:${user.password}`).toString('base64')}`,
    {
      httpOnly: true, // Доступ к куке только через сервер
      secure: process.env.NODE_ENV === 'production', // Только HTTPS в продакшене
      sameSite: 'strict', // Защита от CSRF
      maxAge: 60 * 60 * 24 * 7, // Кука активна в течение 7 дней
      path: '/', // Кука доступна для всех роутов
    },
  );

  return NextResponse.json({
    user: {
      name: user.name,
      id: user.id,
    },
  });
}