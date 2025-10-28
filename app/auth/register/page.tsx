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
import { useSignUp } from "@/hooks/use-auth";
import type { SignUpBody } from "@/types";

export default function Register() {
  const form = useForm<SignUpBody>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const register = useSignUp();
  const onSubmit = (data: SignUpBody) => {
    register.mutate(data, {
      onSuccess: () => {
        router.push("/auth/login");
      },
    });
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Please sign up to create your new account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => router.push("/auth/login")}>
            Login
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" required />
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
            {JSON.stringify(register.isError) !== "false" && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                {register?.error?.message || "Registration failed"}
              </div>
            )}
            <div className="flex-col">
              <Button
                type="submit"
                className="w-full"
                disabled={register.isPending}
              >
                Register
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
