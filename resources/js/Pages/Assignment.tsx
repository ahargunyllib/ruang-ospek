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
import { Separator } from "@/Components/ui/separator";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import dateToString from "@/lib/date";
import type { Assignment, CustomDate, PageProps, User } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Link } from "lucide-react";
import { FormEventHandler } from "react";

export default function Assignment({
  auth,
  assignment,
}: {
  auth: PageProps;
  assignment: Assignment;
}) {
  const authUser: User = auth.user as User;

  const { day, date, month, year, hours, minutes } = dateToString(
    assignment.deadline
  );

  const { data, setData, post } = useForm({
    url: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("submissions.store", assignment.slug));
  };

  return (
    <AuthenticatedLayout user={authUser}>
      <Head title="Assignment" />

      <Card className="min-h-full flex flex-col">
        <CardHeader>
          <CardTitle>{assignment.title}</CardTitle>
          <CardDescription>
            <b>Due</b>: {day}, {date} {month} {year}, {hours}:{minutes} WIB
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-auto">
          {assignment.description}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-start">
          <Separator orientation="horizontal" />
          <Label htmlFor="Submission">
            <h5>Submission</h5>
          </Label>
          <form onSubmit={submit} className="w-full">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Enter your link"
                startIcon={Link}
                value={data.url}
                type="url"
                onChange={(e) => setData("url", e.target.value)}
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </AuthenticatedLayout>
  );
}
