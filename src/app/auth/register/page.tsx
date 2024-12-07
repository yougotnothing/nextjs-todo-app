'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';

export default function Register() {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const router = useRouter();

  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleSetName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleSetConfirmPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  const handleRegister = async () => {
    if (password !== confirmPassword) console.error("passwords don't match.");

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });

    if (response.ok) router.push('/auth/sign-in');
    else console.warn(await response.text());
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="flex flex-col gap-6 p-4 rounded-xl">
        <Card className="flex flex-col gap-4 dark:bg-current p-4 dark w-[30rem]">
          <CardHeader className="text-[2rem]">Register</CardHeader>
          <Input placeholder="name" onChange={handleSetName} />
          <Input
            type="password"
            placeholder="password"
            onChange={handleSetPassword}
          />
          <Input
            type="password"
            placeholder="confirm password"
            onChange={handleSetConfirmPassword}
          />
          <Button onClick={handleRegister}>Register</Button>
        </Card>
      </div>
    </div>
  );
}

