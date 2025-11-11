import { redirect } from 'next/navigation';

import { getSession } from '@/util/auth';

async function Home() {
  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect('/login');
  }

  return (
    <div>
      <p>Hello world!</p>
    </div>
  );
}

export default Home;
