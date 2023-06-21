"use client";
import { useState } from "react";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

import TodoListItem from "./TodoListItem";

type TodoListProps = {
  todos: TodoListProps[]
  fetchTodos: Function
  loading: boolean
}

export default function TodoList({ todos, fetchTodos, loading }: TodoListProps) {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible.Root className="w-[400px]" open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <div className="flex justify-between items-center mb-2 text-sm rounded-md w-full py-3 px-2 bg-amber-600/75">
          <span className="text-white">Your Todos</span>
          <button>
            {open ? (
              <ChevronDownIcon height={20} width={20} color="white" />
            ) : (
              <ChevronUpIcon height={20} width={20} color="white" />
            )}
          </button>
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="h-[400px] overflow-y-auto">
          {(!todos.length && !loading) && (
            <div className="flex justify-center items-center rounded-md bg-white h-[200px] w-[400px]">
              No tasks for today
            </div>
          ) }
          {todos.map((todo: any, idx) => (
            <TodoListItem
              key={todo._id}
              id={todo._id}
              message={todo.message}
              complete={todo.complete}
              createdAt={todo.createdAt}
              fetchTodos={fetchTodos}
            />
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
