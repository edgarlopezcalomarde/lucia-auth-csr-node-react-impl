import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query";
import { signUp } from "./signup";


export function useSignUpMutation() {
    return useMutation({
        mutationKey: ["sign-up"],
        mutationFn: (data: { username: string, password: string }) => signUp(data.username, data.password),
        onError(err) {
            toast.error(err.message)
        },
        onSuccess() {
            toast.success("Account created succesfully")
        },
        onSettled(data, err) {
            if (err) {
                toast.error(err.message)
            }
            console.log(data)
            toast.success("ok")
        }
    })

}