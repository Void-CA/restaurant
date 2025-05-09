// api/client.ts
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // permite enviar cookies
});

export default client;
