'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { pbkdf2Sync } from 'pbkdf2';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { register } from '@/actions/auth';

import { isValidEmail } from '@/util/string';
import { randomSalt } from '@/util/string';
import { passwordMeetsRequirements } from '@/util/password';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  async function handleRegister() {
    if(!email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      // Missing fields.
      return;
    }
    if(!isValidEmail(email)) {
      alert('Invalid email.');
      // Invalid email.
      return;
    }
    if(password !== confirmPassword) {
      alert('Passwords do not match.');
      // Passwords do not match.
      return;
    }
    if(!passwordMeetsRequirements(password)) {
      alert('Password does not meet requirements. It must be at least 8 characters long and contain at least 1 number.');
      // Password does not meet requirements.
      return;
    }

    const salt = randomSalt(32);
    const verifier = pbkdf2Sync(password, salt, 1, 32).toString('hex');

    const registerSuccess = await register(email, salt, verifier);
    if(registerSuccess) {
      redirect('/');
    }

    alert('Registration failed. Please try again.');
  }
  
  return (
   <>
      <Input
        placeholder='Email'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        />
      <Input
        placeholder='Password'
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <Input
        placeholder='Confirm Password'
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value)
        }}
      />
      <Button onClick={handleRegister}>
        Register
      </Button>
      <p>Already have an account? <Link href='/login'>Log in</Link></p>
   </>
  );
}

export default RegisterForm;
