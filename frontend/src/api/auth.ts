// api/auth.ts
import client from "./client";

export const login = (username: string, password: string) => {
  return client.post("/login/", { username, password });
};

export const logout = () => {
  return client.post("/logout/");
};
