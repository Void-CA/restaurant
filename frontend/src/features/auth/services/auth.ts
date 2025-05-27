// api/auth.ts
import client from "./auth_client";

export const login = (username: string, password: string) => {
  return client.post("/token/", { username, password });
};

export const refreshToken = (refresh: string) => {
  return client.post("/token/refresh/", { refresh });
};
