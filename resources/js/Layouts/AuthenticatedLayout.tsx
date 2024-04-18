import { PropsWithChildren } from "react";
import {
  CircleUser,
  Home,
  Menu,
  Users,
} from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";

import { InertiaLinkProps, Link } from "@inertiajs/react";
import { User } from "@/types";

export default function Authenticated({
  user,
  children,
}: PropsWithChildren<{ user: User;}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <Navigation />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center md:justify-end justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <Navigation />
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link method="post" href={route("logout")} as="button">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="">Ruang Ospek</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <NavItem
            href={route("dashboard")}
            active={route().current("dashboard")}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </NavItem>
          <NavItem href={route("users")} active={route().current("users")}>
            <Users className="h-4 w-4" />
            Users
          </NavItem>
        </nav>
      </div>
    </>
  );
}

function NavItem({
  active = false,
  className = "",
  children,
  ...props
}: InertiaLinkProps & { active: boolean }) {
  return (
    <Link
      {...props}
      className={
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary " +
        (active ? "bg-muted text-primary " : "text-muted-foreground ") +
        className
      }
    >
      {children}
    </Link>
  );
}
