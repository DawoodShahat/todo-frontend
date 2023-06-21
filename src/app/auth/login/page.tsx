import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function Login() {
  console.log(process.env.BASE_URL);

  return (
    <main>
      <section className="bg-white rounded-2xl w-[400px] border p-8">
        <header className="text-center">
          <h2 className="text-4xl font-bold">Welcome back</h2>
          <p className="mt-4">Sign in to your account.</p>
        </header>

        <LoginForm />
        <div className="text-center text-gray-400 my-4">or</div>
        <div className="text-center">
          <span className="mr-1">No Account?</span>
          <Link className="underline text-blue-500" href="/auth/register">
            Register
          </Link>
        </div>
      </section>
    </main>
  );
}
