import { z } from "zod";
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
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().min(1, { message: "Email is required." }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  password_confirmation: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export default function Register() {
  const { data, setData, post, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    try {
      if (data.password !== data.password_confirmation) {
        errors.password_confirmation = "Passwords do not match.";
        throw new Error("Passwords do not match.");
      }

      RegisterSchema.parse(data);

      post(route("register"));
    } catch (e: any) {
      if (e.errors) {
        e.errors.map((error: any) => {
          if (error.path) {
            if (error.path[0] === "name") errors.name = error.message;
            if (error.path[0] === "email") errors.email = error.message;
            if (error.path[0] === "password") errors.password = error.message;
            if (error.path[0] === "password_confirmation")
              errors.password_confirmation = error.message;
          }
        });
      } else {
        if (e.message === "Passwords do not match.") {
          errors.password_confirmation = e.message;
        }
      }
    }
  };

  return (
    <AuthLayout>
      <Head title="Register" />

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
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={data.name}
                className="mt-1 block w-full"
                autoComplete="name"
                onChange={(e) => setData("name", e.target.value)}
              />

              {errors.name ? (
                <p className="text-sm font-medium text-destructive">
                  {errors.name}
                </p>
              ) : null}
            </div>
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
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
              />

              {errors.password_confirmation ? (
                <p className="text-sm font-medium text-destructive">
                  {errors.password_confirmation}
                </p>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">Sign Up</Button>
            <Button variant={"link"}>
              <Link href={route("login")}>Already registered?</Link>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </AuthLayout>
  );
}
