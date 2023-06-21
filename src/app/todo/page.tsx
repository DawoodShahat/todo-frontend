"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Avatar from "@/components/Avatar";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { useAuth } from "@/contexts/auth-context";
import { getTodos } from "@/api";
import Button from "@/components/ui/Button";

export default function Todo() {
  const router = useRouter();
  const { user, logoutUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const resp = await getTodos();
      setTodos(resp.data);
    }catch(err){
      console.log(err);
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  if(user == null) return router.push('/auth/login');

  return (
    <main className="flex justify-center items-start mx-auto h-screen container border">
      <div className="flex flex-col mt-16 gap-8 items-center">
        <nav className="w-[400px] bg-white flex justify-between p-3 rounded-md text-sm">
          <span>Logged In as {user?.name}</span>
          <Button onClick={logoutUser}>Logout</Button>
        </nav>
        <Avatar />
        <TodoInput fetchTodos={fetchTodos} />
        <TodoList todos={todos} loading={loading} fetchTodos={fetchTodos} />
      </div>
    </main>
  );
}
