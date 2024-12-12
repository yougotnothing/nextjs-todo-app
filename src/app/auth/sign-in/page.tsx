'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import callServer from '@/lib/call-server';

export default function Page() {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleSetName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSignIn = async () => {
    await callServer<SignIn>('/api/sign-in', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
    })
      .then(async ([_, data]) => {
        localStorage.setItem('token', (await data).token);
        localStorage.setItem('username', (await data).user.name);
        router.push(`/self`);
      })
      .catch(r => console.error(r));
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <Card className="flex flex-col p-4 dark gap-4 w-[30rem]">
        <CardHeader className="text-[2rem]">Sign in</CardHeader>
        <Input placeholder="name" onChange={handleSetName} />
        <Input
          placeholder="password"
          type="password"
          onChange={handleSetPassword}
        />
        <Button onClick={handleSignIn}>Sign in</Button>
        <div className="flex gap-2 items-center">
          <p>not registered yet?</p>
          <a className="font-semibold" target="_self" href="/auth/register">
            Register
          </a>
        </div>
      </Card>
    </div>
  );
}

type SignIn = { user: { name: string; id: string }; token: string };
