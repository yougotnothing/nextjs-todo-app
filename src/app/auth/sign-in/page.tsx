'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function Page() {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleSetName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSignIn = async () => {
    const response = await fetch('/api/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });

    if (response.ok) router.push(`/user/${(await response.json()).user.id}`);
    else console.warn(await response.text());
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <Card className="flex flex-col p-4 dark gap-4 w-[30rem]">
        <CardHeader className="text-[2rem]">Sign in</CardHeader>
        <Input placeholder="name" onChange={handleSetName} />
        <Input placeholder="password" onChange={handleSetPassword} />
        <Button onClick={handleSignIn}>Sign in</Button>
      </Card>
    </div>
  );
}
