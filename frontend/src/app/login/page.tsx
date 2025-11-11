import { redirect } from 'next/navigation';

import LoginForm from '@/components/LoginForm/LoginForm';

import { getSession } from '@/util/auth';

async function LoginPage() {
  const session = await getSession();

  if (session.isAuthenticated) {
    redirect('/');
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
