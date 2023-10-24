"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { backendClient } from "@/lib/axios";
import { ROUTES } from "@/constants/nav";
import { Loader2 } from "lucide-react";

type Props = {};

enum ConnectionType {
  CREDENTIALS = "CREDENTIALS",
  URL = "URL",
}

type FormProps = {
  onSubmit: (data: { name: string; url: string }) => Promise<void>;
};

const credentialsFormSchema = z.object({
  name: z.string(),
  port: z.number().int().positive(),
  host: z.string().url().or(z.string().ip()),
  username: z.string(),
  password: z.string(),
  database: z.string(),
});

const urlFormSchema = z.object({
  name: z.string(),
  url: z
    .string()
    .regex(
      /^postgres:\/\/(?<username>[^:]+):(?<password>[^@]+)@(?<host>[^:]+):(?<port>[^\/]+)\/(?<database>.*)$/
    ),
});

const CredentialsForm = (props: FormProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof credentialsFormSchema>>({
    resolver: zodResolver(credentialsFormSchema),
  });
  async function onSubmit(values: z.infer<typeof credentialsFormSchema>) {
    setLoading(true);
    await props.onSubmit({
      name: values.name,
      url: `postgres://${values.username}:${values.password}@${values.host}:${values.port}`,
    });
    setLoading(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Datasource" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="host"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Host</FormLabel>
              <FormControl>
                <Input
                  placeholder="Connection Host (DNS or IP address) e.g. x.us-east-1.rds.amazon"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="database"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Database</FormLabel>
              <FormControl>
                <Input placeholder="Database" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="port"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Port"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="px-6 mt-4 w-max">
          {loading && <Loader2 className="animate-spin" />}
          {!loading && <p>Connect</p>}
        </Button>
      </form>
    </Form>
  );
};

const UrlForm = (props: FormProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof urlFormSchema>>({
    resolver: zodResolver(urlFormSchema),
  });
  async function onFormSubmit(values: z.infer<typeof urlFormSchema>) {
    setLoading(true);
    await props.onSubmit(values);
    setLoading(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Datasource" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="postgres://username:password@host:port/database"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="px-6 mt-4 w-max">
          {loading && <Loader2 className="animate-spin" />}
          {!loading && <p>Connect</p>}
        </Button>
      </form>
    </Form>
  );
};

const Page = (props: Props) => {
  const [connectionType, setConnectionType] = useState<ConnectionType>(
    ConnectionType.CREDENTIALS
  );
  const router = useRouter();

  const onSubmit = async (data: { name: string; url: string }) => {
    await backendClient.post("/api/datasource", {
      name: data.name,
      url: data.url,
      engine: "POSTGRES",
    });
    router.push(ROUTES.DATASOURCE);
  };

  return (
    <div className="space-y-10">
      <h1 className="font-bold text-5xl">Connect to Postgres</h1>
      <RadioGroup
        className="flex space-x-4"
        value={connectionType}
        onValueChange={(value) => setConnectionType(value as ConnectionType)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={ConnectionType.CREDENTIALS}
            id={ConnectionType.CREDENTIALS}
            checked={connectionType === ConnectionType.CREDENTIALS}
          />
          <Label htmlFor="option-one" className="font-semibold text-base">
            Credentials
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={ConnectionType.URL}
            id={ConnectionType.URL}
            checked={connectionType === ConnectionType.URL}
          />
          <Label htmlFor="option-two" className="font-semibold text-base">
            URL
          </Label>
        </div>
      </RadioGroup>
      <div className="w-[40%] min-w-[400px]">
        {connectionType === ConnectionType.CREDENTIALS && (
          <CredentialsForm onSubmit={onSubmit} />
        )}
        {connectionType === ConnectionType.URL && (
          <UrlForm onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
};

export default Page;
