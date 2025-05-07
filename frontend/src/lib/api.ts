import ky from "ky";

const API_URL = "http://localhost:3000";

export const api = ky.create({
  prefixUrl: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // Aqui você pode adicionar headers dinâmicos, como tokens de autenticação
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          // Aqui você pode tratar erros de autenticação
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return response;
      },
    ],
  },
  retry: {
    limit: 2,
    methods: ["get", "put", "head", "delete", "options", "trace"],
  },
  timeout: 30000,
});
