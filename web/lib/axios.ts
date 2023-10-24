import { env } from "@/env/client.mjs";
import axios from "axios";
import { auth } from "./firebase-auth";
import { ROUTES } from "@/constants/nav";
import dayjs from "dayjs";

export const backendClient = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

backendClient.interceptors.request.use(
  async (config: any) => {
    try {
      await auth.authStateReady();

      const tokenDecoded = await auth.currentUser?.getIdTokenResult(false);

      const exp = dayjs.unix(Number(tokenDecoded?.claims?.exp));
      const now = dayjs();

      let token = "";
      if (exp.diff(now, "minute") > 5) {
        token = (await auth.currentUser?.getIdToken(false)) ?? "";
      } else {
        token = (await auth.currentUser?.getIdToken(true)) ?? "";
      }

      if (token.length > 0) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    } catch (error) {
      auth.signOut();
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

backendClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== ROUTES.SIGN_IN
    ) {
      await auth.signOut();
      return (window.location.href = ROUTES.SIGN_IN);
    }
    return Promise.reject(error);
  }
);
