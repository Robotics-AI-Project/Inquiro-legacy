import { auth } from "./firebase-auth";
import dayjs from "dayjs";
import { clientEnv } from "./env/client.mjs";
import { OpenAPI } from "./api";

OpenAPI.BASE = clientEnv.NEXT_PUBLIC_BACKEND_URL;
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.TOKEN = async () => {
  try {
    await auth.authStateReady();

    const tokenDecoded = await auth.currentUser?.getIdTokenResult(false);

    const exp = dayjs.unix(Number(tokenDecoded?.claims?.exp));
    const now = dayjs();

    if (exp.diff(now, "minute") > 5) {
      return (await auth.currentUser?.getIdToken(false)) ?? "";
    }
    return (await auth.currentUser?.getIdToken(true)) ?? "";
  } catch (error) {
    console.error(error);
    auth.signOut();
    return "";
  }
};
