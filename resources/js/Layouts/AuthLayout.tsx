import { PropsWithChildren } from "react";

export default function Auth({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center">
        {children}
    </div>
  );
}
