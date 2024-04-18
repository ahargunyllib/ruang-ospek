import { z, ZodError } from "zod";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required." }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export default function Register({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, errors, reset } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    try {
      LoginSchema.parse(data);

      post(route("login"));
    } catch (e: any) {
      if (e.errors) {
        e.errors.map((error: any) => {
          if (error.path) {
            if (error.path[0] === "email") errors.email = error.message;
            if (error.path[0] === "password") errors.password = error.message;
          }
        });
      }
    }
  };

  return (
    <AuthLayout>
      <Head title="Register" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={data.email}
                autoComplete="username"
                onChange={(e) => setData("email", e.target.value)}
              />

              {errors.email ? (
                <p className="text-sm font-medium text-destructive">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={data.password}
                autoComplete="current-password"
                onChange={(e) => setData("password", e.target.value)}
              />

              {errors.password ? (
                <p className="text-sm font-medium text-destructive">
                  {errors.password}
                </p>
              ) : null}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign in</Button>
          </CardFooter>
        </Card>
      </form>
    </AuthLayout>
  );
}
