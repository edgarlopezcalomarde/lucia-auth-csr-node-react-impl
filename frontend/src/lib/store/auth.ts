import { atom, useAtom } from 'jotai'
import { Auth } from '../models/auth'

export const authAtom = atom<Auth | null>(null)

export function useAuth() {
    const [auth, setAuth] = useAtom(authAtom);


    return { auth, setAuth }
}
