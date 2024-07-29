import ky from "ky"

const api = ky.create({
    // prefixUrl: "/api",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    hooks: {
        beforeRequest: [
            (request) => {
                const TOKEN_KEY = "auth.token"
                const access_token = localStorage.getItem(TOKEN_KEY);

                if (access_token) {
                    request.headers.set("Authorization", "Bearer " + access_token);
                }

            },
        ],
    },
})


export default api