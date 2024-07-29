import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query";
import { signIn } from "./signin";
import { redirect } from "@tanstack/react-router";


export function useSignInMutation() {
    return useMutation({
        mutationKey: ["sign-in"],
        mutationFn: (data: { username: string, password: string }) => signIn(data.username, data.password),
        onError(err) {
            toast.error(err.message)
        },
        onSuccess() {
            toast.success("User logged succesfully")

        },
        onSettled(_data, err) {
            if (!err) {
                redirect({ to: "/authenticated/profile" })
            }
        }
    })

}