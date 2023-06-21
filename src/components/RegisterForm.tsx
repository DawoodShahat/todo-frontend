
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { login, register } from "@/api";

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
      await register({ name, email, password });
      router.push('/auth/login');
    }catch(err){
      console.log(err);
    }finally {
      setLoading(false);
    }

  };

  return (
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="fullName">Full name</label>
            <Input
              inputContainerClassNames="mt-1"
              id="fullName"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <Input
              inputContainerClassNames="mt-1"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="E-mail"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <Input
              inputContainerClassNames="mt-1"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password"
            />
          </div>

          <Button
            id="sign-in-button"
            type="submit"
            className="focus:outline-none focus:bg-yellow-400 focus:border-yellow-500 mt-5 w-full bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
          >
            {loading ? 'wait...' : 'Register'}
          </Button>
        </form>
  );
}
