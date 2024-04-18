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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

export default function EditUser({
  auth,
  user,
}: {
  auth: PageProps;
  user: User;
}) {
  const authUser: User = auth.user as User;

  const roles = [
    {
      name: "Admin",
      value: "admin",
    },
    {
      name: "Student",
      value: "student",
    },
  ];

  const { data, setData, patch } = useForm({
    ...user,
  });

  const [role, setRole] = useState(data.role);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("users.update", user.id));
  };

  return (
    <AuthenticatedLayout user={authUser}>
      <Head title="Edit User" />

      <form onSubmit={submit}>
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Edit User</CardTitle>
            <CardDescription>
              Edit user's info and manage their roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input disabled type="text" value={data.name} />
          </CardContent>
          <CardContent>
            <Input disabled type="email" value={data.email} />
          </CardContent>
          <CardContent>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role" aria-label={role}>
                <SelectValue placeholder={role} />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => {
                  return (
                    <SelectItem key={r.value} value={r.value}>
                      {r.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={() => setData("role", role)}>
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </AuthenticatedLayout>
  );
}
