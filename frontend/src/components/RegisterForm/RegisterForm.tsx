'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { pbkdf2Sync } from 'pbkdf2';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';

import { register } from '@/actions/auth';

import { isValidEmail, randomSalt } from '@/util/string';
import { passwordMeetsRequirements } from '@/util/password';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleRegister() {
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      // Missing fields.
      return;
    }
    if (!isValidEmail(email)) {
      alert('Invalid email.');
      // Invalid email.
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      // Passwords do not match.
      return;
    }
    if (!passwordMeetsRequirements(password)) {
      alert('Password does not meet requirements. It must be at least 8 characters long and contain at least 1 number.');
      // Password does not meet requirements.
      return;
    }

    const salt = randomSalt(32);
    const verifier = pbkdf2Sync(password, salt, 1, 32).toString('hex');

    const registerSuccess = await register(email, salt, verifier);
    if (registerSuccess) {
      redirect('/');
    }

    alert('Registration failed. Please try again.');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register for an account</CardTitle>
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
        <div>
          <Label className='mb-2' htmlFor='confirmPassword'>Confirm Password</Label>
          <Input
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type='password'
            id='confirmPassword'
          />
        </div>
        <Button onClick={handleRegister}>
          Register
        </Button>
        <p className='text-center'>
          Already have an account?
          {' '}
          <Link href='/login'>Log in</Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
