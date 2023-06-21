"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { login } from "@/api";
import { useAuth } from "@/contexts/auth-context";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await login({ email, password });
      setUser(res.data.user)
      localStorage.setItem('token', res.data.token);
      router.push('/todo');
    }catch(err){
      console.log(err);
    }finally {
      setLoading(false);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
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
        {loading ? 'wait...' : 'Login'}
      </Button>
    </form>
  );
}
