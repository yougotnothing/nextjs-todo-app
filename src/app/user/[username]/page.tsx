import db from '@/app/lib/db';

const getUserById = async (id: string) => {
  const user = await db.user.findFirst({ where: { id } });

  if (!user) throw new Error('user is not found');

  return user;
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserById((await params).id);
  return (
    <div className="flex h-screen w-screen flex-col gap-2 items-center justify-center relative">
      <h1 className="text-4xl font-bold select-none">{user.name}</h1>
      <p className="text-1xl font-thin">{user.id}</p>
    </div>
  );
}
