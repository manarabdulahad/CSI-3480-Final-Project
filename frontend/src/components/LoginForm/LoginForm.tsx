'use client';

import { Button } from '@/components/ui/Button';

import { auth } from '@/actions/auth';

function LoginForm() {
  return (
    <Button onClick={() => {
      (async() => {
        await auth('password');
      })();
    }}
    >
      Log In
    </Button>
  );
}

export default LoginForm;
