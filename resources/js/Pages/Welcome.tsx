import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";

export default function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <>
      <Head title="Welcome" />
      <div className="min-h-screen flex flex-col items-center">
        <header className="flex p-4 w-full">
          <nav className="flex flex-1 justify-end gap-2">
            {auth.user ? (
              <Button>
                <Link href={route("dashboard")}>Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button>
                  <Link href={route("login")}>Log in</Link>
                </Button>
                <Button>
                  <Link href={route("register")}>Register</Link>
                </Button>
              </>
            )}
          </nav>
        </header>

        <main className="flex flex-1 bg-secondary/70 w-full items-center justify-center h-full">
          <h1 className="prose">Hai Manies</h1>
        </main>

        <footer className="p-4">
          <h6>
            Laravel v{laravelVersion} (PHP v{phpVersion})
          </h6>
        </footer>
      </div>
    </>
  );
}
