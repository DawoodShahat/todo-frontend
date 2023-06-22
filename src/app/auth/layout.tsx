"use client"
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuth();

  if(user != null) return router.push('/todo');

  return (
    <html lang="en">
      <body className="mx-auto">
        <div className="grid md:grid-cols-2">
          <div className="flex h-screen  items-center justify-center">
            {children}
          </div>
          <div className="flex h-screen  items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500  w-full">
            <div className="flex flex-col px-10 items-center justify-center">
              <h1 className="text-5xl mt-8 mb-3 text-black">CCRIPT - TODO</h1>
              <div className="underscore" />
              <p className="text-xl mb-2">It&apos;s time to get things done</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
