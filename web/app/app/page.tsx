"use client";
import Header from "@/components/layouts/chat/header";
import Footer from "@/components/layouts/chat/footer";
import { Database, LayoutDashboard, Lightbulb } from "lucide-react";
import OnboardingNav from "@/components/layouts/chat/onboarding-nav";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatService } from "@/services/chat.service";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/nav";

export default function Home() {
  const delay = 0.1;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: chatService.createChat,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [chatService.queryKey],
      });
    },
    mutationKey: [chatService.createChatMutationKey],
  });
  const onCreateNewChat = async (message: string) => {
    const { id } = await mutateAsync(message);
    router.push(ROUTES.CHAT.replace("[chatId]", id));
  };
  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <section className="relative flex flex-col flex-1 items-center text-background space-y-6 top-10">
        <motion.h1
          className="text-[98px] font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: delay * 5,
            ease: "easeOut",
          }}
        >
          Inquiro
        </motion.h1>
        <div className="flex space-x-4">
          <OnboardingNav
            order={0}
            delay={delay}
            icon={Lightbulb}
            title="Example"
            messages={[
              {
                message:
                  "“Find the products that are frequently bought together”",
                onClick: () => {},
              },
              {
                message:
                  "“Show a list of customers who have not placed an order in the last 6 months”",
                onClick: () => {},
              },
            ]}
          />
          <OnboardingNav
            order={1}
            delay={delay}
            icon={Database}
            title="Data sources"
            messages={[
              {
                message:
                  "Connect to execute generation directly from your databases",
              },
              {
                message:
                  "Inquiro is compatible with different data sources span across PostgreSQL and SQLite",
              },
            ]}
          />
          <OnboardingNav
            order={2}
            delay={delay}
            icon={LayoutDashboard}
            title="Data Dashboards"
            messages={[
              {
                message: "Add snippets with database queries to your library",
              },
              {
                message:
                  "Save snippets by clicking on the “Save Snippet” button and select the desired dashboard",
              },
            ]}
          />
        </div>
      </section>
      <Footer onSubmit={onCreateNewChat} />
    </div>
  );
}
