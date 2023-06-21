"use client"
import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { newTodo } from "@/api";

type TodoInputProps = {
  fetchTodos: Function
}

export default function TodoInput({ fetchTodos }: TodoInputProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
      await newTodo({ message });
      fetchTodos();
    }catch(err){
      console.log(err);
    }finally {
      setLoading(false);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex bg-white rounded w-[400px]">
        <input
          placeholder="Add new task"
          className="bg-transparent disabled:text-gray-500 focus:outline-yellow-500 focus:text-black text-sm rounded w-full font-roboto pl-3.5 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" disabled={loading} className="bg-amber-800/50 p-2 rounded m-1.5">
          <PlusIcon height={22} width={22} className={`text-amber-800 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </form>
  );
}
