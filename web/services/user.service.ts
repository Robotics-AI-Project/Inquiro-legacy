import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const getUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No session");
  return session;
};
