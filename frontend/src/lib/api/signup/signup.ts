import api from "../ky";


export async function signUp(username: string, password: string) {
    return api.post("/api/signup", { json: { username, password } }).json();
}