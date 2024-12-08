import db from '@/app/lib/db';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';

const getUserById = async (name: string) => {
  const user = await db.user.findFirst({ where: { name } });

  if (!user) throw new Error('user is not found');

  return user;
};

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const user = await getUserById((await params).username);
  return (
    <div className="flex h-screen w-screen flex-col gap-2 items-center justify-center relative">
      <Card className="flex flex-col gap-4 w-50 dark p-4">
        <CardHeader className="text-4xl font-bold p-0">{user.name}</CardHeader>
        <CardDescription className="text-2xl font-bold">
          {user.id}
        </CardDescription>
      </Card>
    </div>
  );
}
