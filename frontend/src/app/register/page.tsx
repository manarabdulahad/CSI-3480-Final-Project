import { redirect } from 'next/navigation';

import RegisterForm from '@/components/RegisterForm/RegisterForm';

import { getSession } from '@/util/auth';

async function RegisterPage() {
  const session = await getSession();

  if (session.isAuthenticated) {
    redirect('/');
  }

  return (
    <div className='flex h-full w-full items-center justify-center p-4'>
      <div className='w-full max-w-sm flex flex-col gap-4'>
        <p className='text-center text-2xl font-bold'>Password Manager</p>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
