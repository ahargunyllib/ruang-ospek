import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/Components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Textarea } from "@/Components/ui/textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { Assignment, PageProps, User } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { format, set } from "date-fns";
import { CalendarIcon, PlusCircleIcon } from "lucide-react";
import { FormEventHandler, useState } from "react";

export default function Assignments({
  auth,
  assignments,
}: {
  auth: PageProps;
  assignments: Assignment[];
}) {
  const authUser: User = auth.user as User;

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentAssignment = assignments.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const minPage = 1;
  const maxPage = Math.ceil(assignments.length / usersPerPage);

  const [date, setDate] = useState<Date>();
  const { data, setData, post, reset } = useForm({
    title: "",
    description: "",
    deadline: date || new Date(Date.now()),
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("assignments.store"));

    reset();
  };

  return (
    <AuthenticatedLayout user={authUser}>
      <Head title="Dashboard" />

      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col justify-center items-start space-y-1.5">
              <CardTitle>Assignments</CardTitle>
              <CardDescription>See all assignments</CardDescription>
            </div>
            {authUser.role === "admin" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-2">
                    <PlusCircleIcon /> New Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>New Assignment</DialogTitle>
                    <DialogDescription>Create new assignment</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={submit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Title</Label>
                        <Input
                          id="title"
                          type="text"
                          className="col-span-3"
                          placeholder="Enter title"
                          value={data.title}
                          onChange={(e) => setData("title", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Description</Label>
                        <Textarea
                          id="description"
                          className="col-span-3"
                          placeholder="Enter description"
                          value={data.description}
                          onChange={(e) =>
                            setData("description", e.target.value)
                          }
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Due Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          type="submit"
                          onClick={() => {
                            setDate(new Date(date!.setHours(6, 59, 59, 59)));
                            setData("deadline", date || new Date(Date.now()));
                          }}
                        >
                          Save changes
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {currentAssignment.map((assignment: Assignment) => {
              const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ];

              const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];

              const dayNumber = new Date(assignment.deadline).getDay();
              const monthNumber = new Date(assignment.deadline).getMonth();

              const day = days[dayNumber];
              const date = new Date(assignment.deadline).getDate();
              const month = months[monthNumber];
              const year = new Date(assignment.deadline).getFullYear();
              const hours =
                new Date(assignment.deadline).getHours() < 10
                  ? `0${new Date(assignment.deadline).getHours()}`
                  : new Date(assignment.deadline).getHours();
              const minutes =
                new Date(assignment.deadline).getMinutes() < 10
                  ? `0${new Date(assignment.deadline).getMinutes()}`
                  : new Date(assignment.deadline).getMinutes();

              return (
                <div
                  className="p-4 border-border border-2 rounded-xl hover:text-background hover:bg-foreground hover:cursor-pointer hover:-translate-y-2 transition-all duration-300 ease-in-out"
                  onClick={() => console.log("asd")}
                  key={assignment.id}
                >
                  <h4>{assignment.title}</h4>
                  <p>
                    <b>Due</b>: {day}, {date} {month} {year}, {hours}:{minutes}{" "}
                    WIB
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {indexOfFirstUser + 1} -{" "}
              {indexOfLastUser > assignments.length
                ? assignments.length
                : indexOfLastUser}
            </strong>{" "}
            of <strong>{assignments.length}</strong> assignments
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => {
                    if (currentPage > minPage) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {Array.from({ length: maxPage }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(pageNumber)}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => {
                    if (currentPage < maxPage) setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </AuthenticatedLayout>
  );
}
