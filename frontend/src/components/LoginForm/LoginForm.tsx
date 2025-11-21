'use client';

import Link from 'next/link';
import { useState } from 'react';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';

import { login } from '@/actions/auth';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email || !password) {
      alert('Please fill in all fields.');
      // Missing fields.
      return;
    }

    const loginSuccess = await login(email, password);
    if (loginSuccess) {
      redirect('/');
    }

    alert('Login failed. Please try again.');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div>
          <Label className='mb-2' htmlFor='email'>Email</Label>
          <Input
            placeholder='Email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id='email'
          />
        </div>
        <div>
          <Label className='mb-2' htmlFor='password'>Password</Label>
          <Input
            placeholder='Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type='password'
            id='password'
          />
        </div>
        <Button onClick={handleLogin}>
          Log In
        </Button>
        <p className='text-center'>
          {'Don\'t have an account? '}
          <Link href='/register'>Register</Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
