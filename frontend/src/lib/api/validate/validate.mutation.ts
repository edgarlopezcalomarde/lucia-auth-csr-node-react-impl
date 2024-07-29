import { useMutation } from "@tanstack/react-query";
import { validateSession } from "./validate";

export function useValidateMutation() {
    return useMutation({
        mutationKey: ["validate"],
        mutationFn: () => validateSession(),
    })

}