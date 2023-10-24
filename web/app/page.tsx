"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/firebase-auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn({
        method: "GOOGLE",
      });
    } catch (error) {
      console.log("home error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex h-96 w-96 bg-white justify-center items-center">
        <Button onClick={handleSignIn}>
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <p>Sign in with google</p>
          )}
        </Button>
      </div>
    </div>
  );
}
