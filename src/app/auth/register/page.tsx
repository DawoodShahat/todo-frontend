import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export const metadata = {
  title: "Register",
};

export default function Register() {
  return (
    <main>
      <section className="border bg-white rounded-2xl w-[400px] border p-8">
        <header className="text-center">
          <h2 className="text-4xl font-bold">Register</h2>
          <p className="mt-4">Create your account</p>
        </header>

        <RegisterForm />

        <div className="text-center text-gray-400 my-4">or</div>
        <div className="text-center">
          <span className="mr-1">Already have an account?</span>
          <Link className="underline text-blue-500" href="/auth/login">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}
