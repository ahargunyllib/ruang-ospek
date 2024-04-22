import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { FormEventHandler, useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

export default function Users({
  auth,
  users,
}: {
  auth: PageProps;
  users: User[];
}) {
  const authUser: User = auth.user as User;

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const minPage = 1;
  const maxPage = Math.ceil(users.length / usersPerPage);
  const { delete: destroy } = useForm();

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

  const { data, setData, patch } = useForm({} as User);
  const [role, setRole] = useState("");

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("users.update", data.id));
  };

  return (
    <AuthenticatedLayout user={authUser}>
      <Head title="Dashboard" />

      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            See user's info and manage their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user: User) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onClick={() => {
                                  setData(user);
                                  setRole(user.role);
                                }}
                              >
                                Edit Profile
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem
                              onClick={() =>
                                destroy(route("users.destroy", user.id))
                              }
                            >
                              Delete Profile
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit profile</DialogTitle>
                              <DialogDescription>
                                Make changes to your profile here. Click save
                                when you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={submit}>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Name
                                  </Label>
                                  <Input
                                    id="name"
                                    disabled
                                    type="text"
                                    className="col-span-3"
                                    value={user.name}
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="email" className="text-right">
                                    Email
                                  </Label>
                                  <Input
                                    id="email"
                                    disabled
                                    type="email"
                                    className="col-span-3"
                                    value={user.email}
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="role" className="text-right">
                                    Role
                                  </Label>
                                  <Select value={role} onValueChange={setRole}>
                                    <SelectTrigger
                                      id="role"
                                      aria-label={role}
                                      className="col-span-3"
                                    >
                                      <SelectValue placeholder={role} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {roles.map((r) => {
                                        return (
                                          <SelectItem
                                            key={r.value}
                                            value={r.value}
                                          >
                                            {r.name}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button
                                    type="submit"
                                    onClick={() => setData("role", role)}
                                  >
                                    Save changes
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </DropdownMenu>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {indexOfFirstUser + 1} -{" "}
              {indexOfLastUser > users.length ? users.length : indexOfLastUser}
            </strong>{" "}
            of <strong>{users.length}</strong> users
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
