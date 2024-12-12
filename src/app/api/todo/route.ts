import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import validateUser from '@/lib/validate-user';
import verifyToken from '@/lib/verify-token';

export async function POST(req: NextRequest) {
  try {
    const { finished, title }: { finished: boolean; title: string } =
      await req.json();
    const { id } = await validateUser(verifyToken(req));

    if (!id)
      throw NextResponse.json({}, { status: 401, statusText: 'unauthorized' });

    if (!title || !title.length)
      throw NextResponse.json(
        {},
        { status: 403, statusText: 'no credentials' },
      );

    const todo = await db.todo.create({
      data: {
        userId: id,
        finished,
        title,
      },
    });

    return NextResponse.json({ ...todo });
  } catch (error: any) {
    throw NextResponse.json({ error }, { status: 500, statusText: 'error' });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { finished, id } = await req.json();
    const { id: userId } = await validateUser(verifyToken(req));

    const todo = await db.todo.update({
      where: { id, userId },
      data: { finished },
    });

    return NextResponse.json({ status: 200, todo });
  } catch (error: any) {
    throw NextResponse.json({ error }, { status: 500, statusText: 'error' });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { id: userId } = await validateUser(verifyToken(req));
    const todos = await db.todo.findMany({ where: { userId } });

    if (!todos.length)
      throw NextResponse.json(
        {},
        { status: 404, statusText: 'user have no todos' },
      );

    return NextResponse.json({ todos });
  } catch (error: any) {
    throw NextResponse.json({ error }, { status: 500, statusText: 'error' });
  }
}
