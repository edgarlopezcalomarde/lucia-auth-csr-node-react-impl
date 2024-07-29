import { useValidateMutation } from '@/lib/api/validate/validate.mutation'
import { authAtom } from '@/lib/store/auth';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/authenticated')({
  component: () => <Authenticated />
})


function Authenticated() {
  const [isValid, setIsValid] = useState<null | boolean>(null);
  const [, setAuth] = useAtom(authAtom);
  const validateMutation = useValidateMutation()

  useEffect(() => {
    (async () => {
      try {
        const validationResponse = await validateMutation.mutateAsync();
        if (validationResponse && validationResponse.username) {
          setIsValid(true);
          setAuth({ username: validationResponse.username, id: validationResponse.id })
        }
      } catch (err) {
        setIsValid(false);
        setAuth(null)
      }
    })()
  }, [])

  if (isValid === undefined || isValid === null) {
    return <>Loading..........</>
  }

  if (!isValid) {
    redirect({ to: "/login" })
  }

  return <Outlet />
}