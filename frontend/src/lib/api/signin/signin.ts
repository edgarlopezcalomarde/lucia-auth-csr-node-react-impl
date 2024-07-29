import api from "../ky";


export async function signIn(username: string, password: string) {
    return api.post("/api/login", { json: { username, password } }).json();
}


