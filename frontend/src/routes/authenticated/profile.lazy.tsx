import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/store/auth';
import { createLazyFileRoute } from '@tanstack/react-router'


export const Route = createLazyFileRoute('/authenticated/profile')({
  component: () => <ProfilePage />
})



function ProfilePage() {
  const { auth } = useAuth();

  return (<div className='h-full w-full flex flex-col justify-center items-center'>

    <div className='border bg-slate-50 rounded p-6 flex flex-col justify-between gap-3'>
      <p className='font-medium'>id: {auth?.id}</p>
      <h1 className='text-3xl font-bold'>Welcome Mr. {auth?.username}</h1>
      <Button>Log out</Button>
    </div>

  </div>)

}