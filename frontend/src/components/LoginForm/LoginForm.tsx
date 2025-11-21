'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/Field';

import { login } from '@/actions/auth';
import { isValidEmail } from '@/util/string';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [error, setError] = useState<string>('');

  async function handleLogin() {
    if (!isValidEmail(email)) {
      setError('Login failed. Please check your email and password.');
      return;
    }

    const loginSuccess = await login(email, password);
    if (loginSuccess) {
      redirect('/');
    }
    setError('Login failed. Please check your email and password.');
  }

  useEffect(() => {
    if (!email || !password) {
      setLoginDisabled(true);
      return;
    }
    setLoginDisabled(false);
  }, [email, password]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Don't have an account?
          {' '}
          <Link href='/register'>Register</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id='email'
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <Input
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type='password'
              id='password'
            />
          </Field>
          <FieldError>{error}</FieldError>
          <Field>
            <Button onClick={handleLogin} disabled={loginDisabled}>
              Log In
            </Button>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
