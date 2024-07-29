import api from "../ky";



export interface ValidateResponse {
    username: string;
    id: string;
}

export async function validateSession(): Promise<ValidateResponse> {
    return await api.post("/api/validate").json();
}