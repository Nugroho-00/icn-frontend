"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useSignin } from "@/hooks/use-auth";
import type { SignInBody } from "@/types";

// import { AlertCircleIcon } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import {setAccessToken} from "@/lib/token";
export default function Auth() {
  const signin = useSignin();
  const form = useForm<SignInBody>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = (data: SignInBody) => {
    signin.mutate(data, {
      onSuccess: () => {
        // localStorage.setItem("access_token", signin.data.data.access_token)
        router.push("/dashboard");
      },
    });
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => router.push("/auth/register")}>
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" required />
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
                    <Input {...field} type="password" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* {signin.data?.data?.access_token} */}
            {/* <Alert variant="destructive" className={signin.isError ? "block" : "hidden"}>
              <div className="flex items-center gap-1">
                <AlertCircleIcon size={14} />
                <AlertTitle>Error</AlertTitle>
              </div>
              <AlertDescription>
                <ul className="list-inside list-disc text-sm">
                  {signin.error?.response?.data?.message?.map((msg: string, index: number) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert> */}
            <div className="flex-col">
              <Button
                type="submit"
                className="w-full"
                disabled={signin.isPending}
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
